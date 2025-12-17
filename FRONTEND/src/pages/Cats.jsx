import { useEffect, useState } from 'react';
import api from '../utils/api';
import PetCard from '../components/UI/PetCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import HeroSlider from '../components/UI/HeroSlider';

const Cats = () => {
  // FIX 1: Initialize with empty array to prevent render crashes
  const [pets, setPets] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [breeds, setBreeds] = useState([]);

  const heroImages = [
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200',
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=1200',
    'https://images.unsplash.com/photo-1495360019602-e001922271aa?w=1200'
  ];

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const { data } = await api.get('/pets/category/Cat');
        
        // --- FIX STARTS HERE ---
        // Verify data is an array before using it
        const petsArray = Array.isArray(data) ? data : [];
        
        setPets(petsArray);
        
        // Use petsArray directly (removed .pets)
        setBreeds(['All', ...new Set(petsArray.map(p => p.breed))]);
        // --- FIX ENDS HERE ---
        
      } catch (error) {
        console.error("Error fetching cats:", error);
        setPets([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, []);

  // Safe filtering
  const filteredPets = selectedBreed === 'All' 
    ? pets 
    : pets.filter(p => p.breed === selectedBreed);

  const handlePetDelete = (petId) => {
    setPets(pets.filter(p => p._id !== petId));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <HeroSlider 
        title="Purrfect Friends" 
        subtitle="Independent, elegant, and full of personality." 
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
            {/* Added optional chaining and length check for safety */}
            {filteredPets?.length > 0 ? (
              filteredPets.map(pet => <PetCard key={pet._id} pet={pet} onDelete={handlePetDelete} />)
            ) : (
              <p className="text-gray-500 col-span-full text-center">No cats found in this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cats;