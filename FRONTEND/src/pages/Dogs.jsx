import { useEffect, useState } from 'react';
import api from '../utils/api';
import PetCard from '../components/UI/PetCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import HeroSlider from '../components/UI/HeroSlider';

const Dogs = () => {
  // FIX 1: Initialize with empty array
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [breeds, setBreeds] = useState([]);

  // Slider Images for Dogs
  const heroImages = [
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200',
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1200',
    'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9205?w=1200'
  ];

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const { data } = await api.get('/pets/category/Dog');
        
        // --- FIX 2: Handle data correctly ---
        // Check if data is array, if so use it directly.
        const dogsArray = Array.isArray(data) ? data : [];
        
        setPets(dogsArray);
        
        // Use the array directly (removed .pets)
        setBreeds(['All', ...new Set(dogsArray.map(p => p.breed))]);
        // ------------------------------------

      } catch (error) {
        console.error("Error fetching dogs:", error);
        setPets([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };
    fetchDogs();
  }, []);

  const filteredPets = selectedBreed === 'All' 
    ? pets 
    : pets.filter(p => p.breed === selectedBreed);

  const handlePetDelete = (petId) => {
    setPets(pets.filter(p => p._id !== petId));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* 1. Hero Slider Section */}
      <HeroSlider 
        title="Loyal Companions" 
        subtitle="Find a furry friend who will love you unconditionally." 
        images={heroImages} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2. Filter Section */}
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

        {/* 3. Grid Section */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* FIX 3: Safe rendering with optional chaining */}
            {filteredPets?.length > 0 ? (
              filteredPets.map(pet => (
                <PetCard key={pet._id} pet={pet} onDelete={handlePetDelete} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">No dogs found in this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dogs;