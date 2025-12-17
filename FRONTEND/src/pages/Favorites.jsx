import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../components/UI/PetCard';
import { Heart, ArrowLeft } from 'lucide-react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from local storage
    const storedFavorites = JSON.parse(localStorage.getItem('likedPets') || '[]');
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Heart className="w-8 h-8 text-red-500 mr-3 fill-red-500" />
            Your Favorites
          </h1>
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 flex items-center font-medium">
            <ArrowLeft className="w-4 h-4 mr-1" /> Continue Browsing
          </Link>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-red-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Favorites Yet</h2>
            <p className="text-gray-500 mb-8">Start browsing and click the heart icon to save pets you love!</p>
            <Link 
              to="/dogs" 
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
            >
              Browse Pets
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;