import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
    <h1 className="text-9xl font-extrabold text-indigo-100">404</h1>
    <h2 className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</h2>
    <p className="text-gray-500 mt-2">Oops! The page you are looking for doesn't exist.</p>
    <Link to="/" className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold">Go Home</Link>
  </div>
);
export default NotFound;