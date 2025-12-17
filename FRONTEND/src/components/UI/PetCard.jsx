import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Info, Trash2 } from 'lucide-react';
import AuthContext from '../../context/AuthContext';
import api from '../../utils/api';

const PetCard = ({ pet, onDelete }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const likedPets = JSON.parse(localStorage.getItem('likedPets') || '[]');
    setIsLiked(likedPets.some(p => p._id === pet._id));
  }, [pet._id]);

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const likedPets = JSON.parse(localStorage.getItem('likedPets') || '[]');
    let newLikedState;
    if (isLiked) {
      const filtered = likedPets.filter(p => p._id !== pet._id);
      localStorage.setItem('likedPets', JSON.stringify(filtered));
      newLikedState = false;
    } else {
      likedPets.push(pet);
      localStorage.setItem('likedPets', JSON.stringify(likedPets));
      newLikedState = true;
    }
    setIsLiked(newLikedState);
    window.dispatchEvent(new Event("favoritesUpdated"));
    window.dispatchEvent(new Event("storage"));
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      navigate(`/pet/${pet._id}`);
    } else {
      navigate('/signup', { state: { returnTo: `/pet/${pet._id}` } });
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${pet.name}?`)) {
      try {
        await api.delete(`/pets/${pet._id}`);
        if (onDelete) onDelete(pet._id);
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete pet');
      }
    }
  };

  const isOwner = user && pet.owner && user._id === pet.owner;

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full"
      onClick={handleViewDetails}
    >
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={pet.images && pet.images.length > 0 ? pet.images[0] : 'https://via.placeholder.com/300'} 
          alt={pet.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Like Button */}
        <button 
          onClick={handleLikeClick}
          className="absolute top-3 right-3 p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all"
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>

        {/* Delete Button - Only for Owner */}
        {isOwner && (
          <button 
            onClick={handleDelete}
            className="absolute top-3 right-16 p-2.5 bg-red-500/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-600 transition-all"
          >
            <Trash2 className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Breed Badge */}
        <div className="absolute top-3 left-3 bg-indigo-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
          {pet.breed}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
            {pet.name}
          </h3>
          <span className="text-indigo-600 font-bold">
             ₹{pet.price ? pet.price.toLocaleString('en-IN') : '0'}
          </span>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1 text-orange-500" /> 
          <span className="truncate">{pet.location}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
           <button 
             onClick={handleViewDetails}
             className="w-full bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center"
           >
             <Info className="w-4 h-4 mr-2" /> View Details
           </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;