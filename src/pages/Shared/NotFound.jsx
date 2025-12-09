import React from "react";
import { useRouteError, Link } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-indigo-600 mb-2">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-sm text-gray-500 mb-4">
        The page you are looking for has been moved, deleted, or maybe it never
        existed.
      </p>
      {error && (
        <p className="text-xs text-gray-400 mb-4">
          {error.statusText || error.message}
        </p>
      )}
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
