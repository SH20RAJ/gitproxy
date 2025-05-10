import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GitProxy - Secure GitHub Repository Downloads",
  description: "Download GitHub repositories, releases, and files without revealing the original URL. Perfect for selling code or protecting intellectual property.",
  keywords: "GitHub, proxy, download, repository, secure, private, code sharing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-gray-900 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <a href="/" className="text-2xl font-bold">GitProxy</a>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:text-gray-300">Home</a></li>
                <li><a href="/#how-it-works" className="hover:text-gray-300">How It Works</a></li>
                <li><a href="https://github.com/SH20RAJ/gitproxy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">GitHub</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer className="bg-gray-900 text-white p-6 mt-12">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-xl font-bold mb-2">GitProxy</h2>
                <p className="text-gray-400">Secure GitHub repository downloads without revealing the source.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Links</h3>
                <ul className="space-y-1 text-gray-400">
                  <li><a href="/" className="hover:text-white">Home</a></li>
                  <li><a href="https://github.com/SH20RAJ/gitproxy" className="hover:text-white">GitHub</a></li>
                  <li><a href="https://github.com/SH20RAJ/gitproxy/issues" className="hover:text-white">Report Issues</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-800 text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} GitProxy. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
