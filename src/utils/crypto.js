import CryptoJS from 'crypto-js';

// Secret key for encryption/decryption - in a real app, this should be stored securely
// For this demo, we're using a hardcoded key
const SECRET_KEY = 'gitproxy-secret-key-2024';

/**
 * Encrypts a GitHub URL
 * @param {string} url - The GitHub URL to encrypt
 * @returns {string} - The encrypted URL as a base64 string
 */
export function encryptUrl(url) {
  if (!url) return '';
  
  // Validate that it's a GitHub URL
  if (!isValidGitHubUrl(url)) {
    throw new Error('Invalid GitHub URL');
  }
  
  // Encrypt the URL
  const encrypted = CryptoJS.AES.encrypt(url, SECRET_KEY).toString();
  
  // Convert to base64 for URL safety
  return btoa(encrypted);
}

/**
 * Decrypts an encrypted GitHub URL
 * @param {string} encryptedUrl - The encrypted URL (base64 string)
 * @returns {string} - The decrypted GitHub URL
 */
export function decryptUrl(encryptedUrl) {
  if (!encryptedUrl) return '';
  
  try {
    // Convert from base64
    const encrypted = atob(encryptedUrl);
    
    // Decrypt the URL
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    
    // Validate that it's a GitHub URL
    if (!isValidGitHubUrl(decrypted)) {
      throw new Error('Invalid GitHub URL after decryption');
    }
    
    return decrypted;
  } catch (error) {
    console.error('Error decrypting URL:', error);
    throw new Error('Failed to decrypt URL');
  }
}

/**
 * Validates if a URL is a valid GitHub URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export function isValidGitHubUrl(url) {
  try {
    const parsedUrl = new URL(url);
    
    // Check if it's a GitHub URL
    if (parsedUrl.hostname !== 'github.com' && 
        !parsedUrl.hostname.endsWith('.github.com') &&
        parsedUrl.hostname !== 'raw.githubusercontent.com') {
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Extracts filename from GitHub URL
 * @param {string} url - The GitHub URL
 * @returns {string} - The filename
 */
export function getFilenameFromUrl(url) {
  try {
    const parsedUrl = new URL(url);
    const pathParts = parsedUrl.pathname.split('/');
    
    // For repository downloads
    if (url.includes('/archive/refs/heads/') || url.includes('/archive/refs/tags/')) {
      const repoName = pathParts[2];
      const branchOrTag = pathParts[pathParts.length - 1].replace('.zip', '');
      return `${repoName}-${branchOrTag}.zip`;
    }
    
    // For release assets
    if (url.includes('/releases/download/')) {
      return pathParts[pathParts.length - 1];
    }
    
    // For raw files
    if (parsedUrl.hostname === 'raw.githubusercontent.com') {
      return pathParts[pathParts.length - 1];
    }
    
    // Default fallback
    return 'github-download.zip';
  } catch (error) {
    console.error('Error extracting filename:', error);
    return 'github-download.zip';
  }
}
