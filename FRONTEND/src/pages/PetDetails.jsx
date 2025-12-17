import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Info, Heart, Share2, Check, X } from 'lucide-react'; // Added Check and X icons
import AuthContext from '../context/AuthContext';
import api from '../utils/api';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const PetDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // State for the popup

  // Fetch Pet Data
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const { data } = await api.get(`/pets/${id}`);
        setPet(data);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  const handleBuyNow = () => {
    if (!user) {
      // If user is not logged in, send them to signup
      navigate('/signup', { state: { returnTo: `/pet/${id}` } });
    } else {
      // Show the success popup
      setShowPopup(true);
    }
  };

  // 1. Loading State (Prevents blank page)
  if (loading) return (
    <div className="min-h-screen flex justify-center items-center">
      <LoadingSpinner size="large" />
    </div>
  );

  // 2. Error State (If pet ID is wrong)
  if (!pet) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-800">Pet not found</h2>
      <Link to="/" className="mt-4 text-indigo-600 hover:underline">Go back home</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation */}
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-6 font-medium transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Pets
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* --- LEFT: IMAGE GALLERY --- */}
          <div className="space-y-4">
            <div className="aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden shadow-lg bg-gray-200 h-[400px] relative group">
               <img 
                 src={pet.images && pet.images[activeImage] ? pet.images[activeImage] : 'https://via.placeholder.com/600'} 
                 alt={pet.name} 
                 className="w-full h-full object-cover"
               />
            </div>
            
            {/* Thumbnails */}
            {pet.images && pet.images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {pet.images.map((img, index) => (
                  <button 
                    key={index} 
                    onClick={() => setActiveImage(index)}
                    className={`h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === index ? 'border-indigo-600 scale-95 ring-2 ring-indigo-200' : 'border-transparent hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT: INFO SECTION --- */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full">
             
             {/* Header: Name & Price */}
             <div className="flex justify-between items-start mb-6">
               <div>
                 <h1 className="text-4xl font-bold text-gray-900 mb-2">{pet.name}</h1>
                 <div className="flex items-center text-gray-500 font-medium">
                    <MapPin className="w-4 h-4 mr-1 text-orange-500" /> {pet.location}
                 </div>
               </div>
               <div className="bg-indigo-50 px-4 py-2 rounded-xl">
                 <span className="text-2xl font-bold text-indigo-600">
                   ₹{pet.price ? pet.price.toLocaleString('en-IN') : 'Free'}
                 </span>
               </div>
             </div>

             {/* Stats Grid */}
             <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-orange-50 p-4 rounded-2xl text-center border border-orange-100">
                    <span className="block text-orange-400 text-xs uppercase font-bold tracking-wider mb-1">Age</span>
                    <span className="text-gray-900 font-bold text-lg">{pet.age}</span>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100">
                    <span className="block text-blue-400 text-xs uppercase font-bold tracking-wider mb-1">Gender</span>
                    <span className="text-gray-900 font-bold text-lg">{pet.gender}</span>
                </div>
                <div className="bg-purple-50 p-4 rounded-2xl text-center border border-purple-100">
                    <span className="block text-purple-400 text-xs uppercase font-bold tracking-wider mb-1">Breed</span>
                    <span className="text-gray-900 font-bold text-lg truncate px-1">{pet.breed}</span>
                </div>
             </div>

             {/* Description */}
             <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-indigo-500" /> About {pet.name}
                </h3>
                <p className="text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-2xl">
                    {pet.description}
                </p>
             </div>

             {/* --- BUY NOW BUTTON (Placed after description) --- */}
             <div className="mb-8">
                <Button 
                  onClick={handleBuyNow} 
                  className="w-full py-4 text-lg shadow-xl shadow-indigo-200 transform transition-transform active:scale-95 flex items-center justify-center font-bold"
                >
                  Buy Now
                </Button>
             </div>

             {/* Owner Info (Optional) */}
             {pet.contact && (
               <div className="mt-auto p-4 border border-gray-100 rounded-2xl flex items-center justify-between bg-gray-50/50">
                 <div className="flex items-center">
                   <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold mr-3">
                     {pet.contact.name?.charAt(0) || 'O'}
                   </div>
                   <div>
                     <p className="text-sm text-gray-400 font-medium">Pet Owner</p>
                     <p className="font-bold text-gray-900">{pet.contact.name}</p>
                   </div>
                 </div>
               </div>
             )}

          </div>
        </div>
      </div>

      {/* --- SUCCESS POPUP MODAL --- */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center relative transform scale-100 animate-in zoom-in-95 duration-200">
            
            {/* Close Icon */}
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Adoption Noted!</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Thank you for showing interest in <strong>{pet.name}</strong>. The owner has been notified and will contact you shortly.
            </p>

            <button 
              onClick={() => setShowPopup(false)}
              className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-black transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default PetDetails;