export const runtime = 'edge';

import { NextResponse } from 'next/server';
import axios from 'axios';
import { decryptUrl, getFilenameFromUrl } from '@/utils/crypto';

/**
 * Handles the download request
 * @param {Request} request - The incoming request
 * @returns {Response} - The response with the file or error
 */
export async function GET(request) {
  try {
    // Get the encrypted URL from the query parameters
    const { searchParams } = new URL(request.url);
    const encryptedUrl = searchParams.get('url');
    
    if (!encryptedUrl) {
      return NextResponse.json(
        { error: 'Missing URL parameter' },
        { status: 400 }
      );
    }
    
    // Decrypt the URL
    let githubUrl;
    try {
      githubUrl = decryptUrl(encryptedUrl);
    } catch (error) {
      console.error('Error decrypting URL:', error);
      return NextResponse.json(
        { error: 'Invalid URL parameter' },
        { status: 400 }
      );
    }
    
    // Get the filename from the URL
    const filename = getFilenameFromUrl(githubUrl);
    
    // Fetch the file from GitHub
    const response = await axios.get(githubUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'GitProxy/1.0.0',
      },
    });
    
    // Create a buffer from the response data
    const buffer = Buffer.from(response.data, 'binary');
    
    // Determine the content type
    let contentType = 'application/octet-stream';
    if (filename.endsWith('.zip')) {
      contentType = 'application/zip';
    } else if (filename.endsWith('.tar.gz')) {
      contentType = 'application/gzip';
    } else if (filename.endsWith('.js')) {
      contentType = 'application/javascript';
    } else if (filename.endsWith('.css')) {
      contentType = 'text/css';
    } else if (filename.endsWith('.html')) {
      contentType = 'text/html';
    } else if (filename.endsWith('.json')) {
      contentType = 'application/json';
    }
    
    // Return the file as a response
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error handling download:', error);
    
    // Check if it's a GitHub API rate limit error
    if (error.response && error.response.status === 403 && 
        error.response.headers['x-ratelimit-remaining'] === '0') {
      return NextResponse.json(
        { error: 'GitHub API rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Check if the file doesn't exist
    if (error.response && error.response.status === 404) {
      return NextResponse.json(
        { error: 'The requested file does not exist' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
}
