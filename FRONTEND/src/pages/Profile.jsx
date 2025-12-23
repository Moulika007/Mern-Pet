import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Trash2, PlusCircle } from 'lucide-react'; // Removed Heart since we use PetCard
import api from '../utils/api';
import AuthContext from '../context/AuthContext';
import PetCard from '../components/UI/PetCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' or 'favorites'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // This calls the updated backend controller
        const { data } = await api.get('/users/profile');
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
    else navigate('/login');
  }, [user, navigate]);

  const handleDeletePet = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await api.delete(`/pets/${id}`);
      // Remove from UI
      setProfileData(prev => ({
        ...prev,
        myPets: prev.myPets.filter(pet => pet._id !== id)
      }));
      alert("Pet deleted successfully");
    } catch (error) {
      alert("Failed to delete pet");
    }
  };

  if (loading) return <div className="flex justify-center mt-20"><LoadingSpinner /></div>;
  if (!profileData) return <div className="text-center mt-20">Profile not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* HEADER SECTION */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-orange-100 p-6 rounded-full">
            <User className="w-16 h-16 text-orange-600" />
          </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
            <p className="text-gray-500 flex items-center justify-center md:justify-start mt-2">
              <Mail className="w-4 h-4 mr-2" /> {profileData.email}
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/sell')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center"
            >
              <PlusCircle className="w-5 h-5 mr-2" /> List New Pet
            </button>
            <button 
              onClick={logout}
              className="border-2 border-red-500 text-red-500 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-6 border-b border-gray-200 mb-8">
          <button 
            className={`pb-4 px-2 font-bold text-lg transition ${activeTab === 'listings' ? 'text-orange-600 border-b-4 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('listings')}
          >
            My Listings ({profileData.myPets?.length || 0})
          </button>
          <button 
            className={`pb-4 px-2 font-bold text-lg transition ${activeTab === 'favorites' ? 'text-orange-600 border-b-4 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites ({profileData.favorites?.length || 0})
          </button>
        </div>

        {/* CONTENT GRID */}
        {activeTab === 'listings' && (
          <div>
            {profileData.myPets && profileData.myPets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profileData.myPets.map(pet => (
                  <PetCard 
                    key={pet._id} 
                    pet={pet} 
                    onDelete={handleDeletePet} // Only owner sees this
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl">
                <p className="text-gray-500 text-xl">You haven't listed any pets yet.</p>
                <button onClick={() => navigate('/sell')} className="text-orange-600 font-bold mt-2 hover:underline">List one now!</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div>
            {profileData.favorites && profileData.favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profileData.favorites.map(pet => (
                  <PetCard key={pet._id} pet={pet} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl">
                <p className="text-gray-500 text-xl">No favorites yet.</p>
                <p className="text-gray-400">Heart some pets to see them here!</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;