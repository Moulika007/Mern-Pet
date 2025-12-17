import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [likedCount, setLikedCount] = useState(0);
  const { user, logout } = useContext(AuthContext); // Get user from context
  const navigate = useNavigate();

  // Listen for storage events (Likes)
  useEffect(() => {
    const updateLikedCount = () => {
      // If logged in, we might fetch from API, but for UI speed we use local check or context
      // For now, let's count localStorage items for the badge
      const likedPets = JSON.parse(localStorage.getItem('likedPets') || '[]');
      setLikedCount(likedPets.length);
    };

    updateLikedCount();
    window.addEventListener('storage', updateLikedCount);
    // Custom event listener for instant updates from PetCard
    window.addEventListener('favoritesUpdated', updateLikedCount);
    
    return () => {
      window.removeEventListener('storage', updateLikedCount);
      window.removeEventListener('favoritesUpdated', updateLikedCount);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl group-hover:scale-110 transition-transform duration-200">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">
              Pet<span className="text-orange-600">Haven</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dogs" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Find Dogs</Link>
            <Link to="/cats" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Find Cats</Link>
            <Link to="/birds" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Find Birds</Link>
            <Link to="/success" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Success Stories</Link>
            <Link to="/sell" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Rehome Pet</Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Favorites Icon */}
            <Link to="/favorites" className="relative p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
              <Heart className="w-6 h-6" />
              {likedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {likedCount}
                </span>
              )}
            </Link>

            {/* User Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-900 font-semibold bg-gray-100 px-3 py-1 rounded-lg">
                  Hi, {user.name?.split(' ')[0]}
                </span>
                <button 
                  onClick={handleLogout}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-gray-700 font-semibold hover:text-orange-600 px-3 py-2">Log in</Link>
                <Link to="/signup" className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-2 rounded-xl font-bold hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-orange-600">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-3 shadow-xl">
          <Link to="/dogs" className="block text-gray-700 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Find Dogs</Link>
          <Link to="/cats" className="block text-gray-700 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Find Cats</Link>
          <Link to="/birds" className="block text-gray-700 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Find Birds</Link>
          <Link to="/favorites" className="block text-gray-700 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Favorites ({likedCount})</Link>
          <div className="border-t border-gray-100 pt-3">
            {user ? (
              <button onClick={handleLogout} className="w-full text-left text-red-600 font-bold py-2">Logout</button>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" className="block text-center text-gray-700 font-bold border border-gray-200 py-2 rounded-lg" onClick={() => setIsMenuOpen(false)}>Log in</Link>
                <Link to="/signup" className="block text-center bg-orange-500 text-white font-bold py-2 rounded-lg" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;