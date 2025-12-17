import { useEffect, useState } from 'react';
import api from '../utils/api';
import PetCard from '../components/UI/PetCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import HeroSlider from '../components/UI/HeroSlider';

const Birds = () => {
  // FIX 1: Initialize with empty array
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [breeds, setBreeds] = useState([]);

  const heroImages = [
    'https://images.unsplash.com/photo-1552728089-57bdde30ebd1?w=1200',
    'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=1200',
    'https://images.unsplash.com/photo-1522926193341-e9e6d9b8600d?w=1200'
  ];

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const { data } = await api.get('/pets/category/Bird');
        
        // --- FIX 2: Handle data correctly ---
        // Check if data is array, if so use it directly. 
        // If not, default to empty array.
        const birdsArray = Array.isArray(data) ? data : [];

        setPets(birdsArray);
        setBreeds(['All', ...new Set(birdsArray.map(p => p.breed))]);
        // ------------------------------------

      } catch (error) {
        console.error("Error fetching birds:", error);
        setPets([]); // Ensure it stays an array on error
      } finally {
        setLoading(false);
      }
    };
    fetchBirds();
  }, []);

  // Safe filtering
  const filteredPets = selectedBreed === 'All' 
    ? pets 
    : pets.filter(p => p.breed === selectedBreed);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <HeroSlider 
        title="Feathered Friends" 
        subtitle="Bring song and color into your life." 
        images={heroImages} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse by Breed</h2>
          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
            {breeds.map(breed => (
              <button
                key={breed}
                onClick={() => setSelectedBreed(breed)}
                className={`px-5 py-2 rounded-full whitespace-nowrap transition-all font-medium ${
                  selectedBreed === breed 
                    ? 'bg-orange-500 text-white shadow-lg transform scale-105' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {breed}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="large" />
          </div> 
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* FIX 3: Safe rendering with optional chaining */}
            {filteredPets?.length > 0 ? (
              filteredPets.map(pet => <PetCard key={pet._id} pet={pet} />)
            ) : (
              <p className="text-gray-500 col-span-full text-center">No birds found in this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Birds;