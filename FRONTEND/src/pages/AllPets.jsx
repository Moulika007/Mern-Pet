import { useEffect, useState } from 'react';
import api from '../utils/api';
import PetCard from '../components/UI/PetCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data } = await api.get('/pets'); // Gets all pets
        setPets(data.pets); // data.pets comes from backend pagination
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Available Pets</h1>
        {loading ? <div className="flex justify-center"><LoadingSpinner /></div> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pets.map(pet => <PetCard key={pet._id} pet={pet} />)}
          </div>
        )}
      </div>
    </div>
  );
};
export default AllPets;