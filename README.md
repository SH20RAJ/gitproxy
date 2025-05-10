# GitProxy

GitProxy is a service that allows you to download GitHub repositories, releases, and specific files without revealing the actual GitHub repository link. It acts as a proxy between you and the GitHub repository, providing an additional layer of security and privacy.

## 🌟 Features

- **Secure Downloads**: Download GitHub repositories without exposing the original URL
- **Multiple Download Types**: Support for repositories, releases, and specific files
- **No Login Required**: Public mode allows anyone to create and use proxy links
- **URL Encryption**: GitHub URLs are encrypted to prevent reverse engineering
- **Easy to Use**: Simple interface to create and share proxy links
- **Privacy-Focused**: Perfect for selling or distributing code without revealing sources

## 🚀 Use Cases

- **Selling Code**: Provide download links after purchase without revealing the GitHub repository
- **Protecting Intellectual Property**: Hide your GitHub repository while sharing the code
- **Distributing Private Code**: Share specific files without exposing your entire repository
- **Preventing Scraping**: Reduce the risk of your repository being indexed or scraped

## 🔍 How It Works

1. Enter a GitHub URL (repository, release, or specific file)
2. GitProxy encrypts the URL and generates a proxy link
3. Share the proxy link with others
4. When someone accesses the proxy link, GitProxy fetches the content from GitHub and serves it without revealing the original URL

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/SH20RAJ/gitproxy.git

# Navigate to the project directory
cd gitproxy

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📋 Requirements

- Node.js 18.18.0 or higher
- npm or yarn

## 🔄 Modes

### Public Mode (Current)
- No login required
- URLs are encrypted client-side
- No database storage
- Perfect for quick sharing

### Private Mode (Coming Soon)
- User authentication required
- Analytics for downloads
- Saved links management
- Additional security features

## 🌐 Deployment

Deploy to Cloudflare Pages:

```bash
npm run deploy
```

## 📝 License

[MIT](LICENSE)

## 🔗 Links

- [GitHub Repository](https://github.com/SH20RAJ/gitproxy)
- [Live Demo](https://gitproxy.pages.dev)
- [Report Issues](https://github.com/SH20RAJ/gitproxy/issues)
