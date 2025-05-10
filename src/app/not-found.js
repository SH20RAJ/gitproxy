export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)] py-20">
      <h1 className="text-6xl font-bold mb-4 text-blue-600">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400 max-w-md text-center">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <a
        href="/"
        className="btn btn-primary"
      >
        Return to Home
      </a>
    </div>
  );
}
