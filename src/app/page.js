'use client';

import { useState } from 'react';
import Image from 'next/image';
import { encryptUrl, isValidGitHubUrl } from '@/utils/crypto';

export default function Home() {
  const [githubUrl, setGithubUrl] = useState('');
  const [proxyUrl, setProxyUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setProxyUrl('');
    setCopied(false);

    // Validate the GitHub URL
    if (!githubUrl) {
      setError('Please enter a GitHub URL');
      return;
    }

    if (!isValidGitHubUrl(githubUrl)) {
      setError('Please enter a valid GitHub URL');
      return;
    }

    try {
      setIsLoading(true);

      // Encrypt the URL
      const encrypted = encryptUrl(githubUrl);

      // Create the proxy URL
      const baseUrl = window.location.origin;
      const newProxyUrl = `${baseUrl}/api/download?url=${encrypted}`;

      setProxyUrl(newProxyUrl);
    } catch (error) {
      console.error('Error creating proxy URL:', error);
      setError('Failed to create proxy URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(proxyUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Secure GitHub Downloads Without Revealing Sources</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            GitProxy allows you to download GitHub repositories, releases, and files without revealing the original URL.
            Perfect for selling code or protecting intellectual property.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Create a Proxy Download Link</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="githubUrl" className="block text-sm font-medium mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    id="githubUrl"
                    className="form-input"
                    placeholder="https://github.com/username/repo/archive/refs/heads/main.zip"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Enter a GitHub URL for a repository, release, or specific file
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Proxy Link'}
                </button>
              </form>

              {proxyUrl && (
                <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">Your Proxy Link</h3>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="form-input flex-grow mr-2"
                      value={proxyUrl}
                      readOnly
                    />
                    <button
                      onClick={copyToClipboard}
                      className="btn btn-secondary"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="mt-4">
                    <a
                      href={proxyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full"
                    >
                      Test Download
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900" id="how-it-works">
        <div className="container mx-auto px-4">
          <h2 className="section-title">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enter GitHub URL</h3>
              <p>Paste the GitHub URL of the repository, release, or file you want to share.</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Generate Proxy Link</h3>
              <p>GitProxy encrypts the URL and generates a secure proxy download link.</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Share Securely</h3>
              <p>Share the proxy link with others. When accessed, GitProxy fetches the content without revealing the source.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Use Cases</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">Selling Code</h3>
              <p>Provide download links after purchase without revealing your GitHub repository.</p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">Protecting IP</h3>
              <p>Share your code while keeping your repository private and protected.</p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">Distributing Private Code</h3>
              <p>Share specific files without exposing your entire repository structure.</p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">Preventing Scraping</h3>
              <p>Reduce the risk of your repository being indexed or scraped by bots.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
