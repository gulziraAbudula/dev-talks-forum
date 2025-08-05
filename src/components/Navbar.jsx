import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        DevTalks
      </Link>
      {location.pathname !== '/create' && (
        <Link
          to="/create"
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded font-semibold"
        >
          Create Post
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
