import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';
import InputField from '../components/UI/InputField';
import Button from '../components/UI/Button';
import { Upload, PawPrint, Info, MapPin, Image as ImageIcon } from 'lucide-react';

const SellPet = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State matches your Backend Schema
  const [formData, setFormData] = useState({
    name: '',
    category: 'Dog',
    breed: '',
    age: '',
    gender: 'Male',
    size: 'Medium',
    price: '',
    description: '',
    location: '',
    contactName: user?.name || '',
    contactEmail: user?.email || '',
    contactPhone: ''
  });

  // State for 5 Image URLs
  const [imageUrls, setImageUrls] = useState(['', '', '', '', '']);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { returnTo: '/sell' } });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle changes for specific image input index
  const handleImageChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Filter out empty strings from images
    const validImages = imageUrls.filter(url => url.trim() !== '');

    if (validImages.length === 0) {
      setLoading(false);
      setError('Please provide at least one image URL.');
      return;
    }

    // Prepare payload for Backend
    const payload = {
      ...formData,
      price: Number(formData.price), // Ensure number
      images: validImages, // Send the array of valid images
      contact: {
        name: formData.contactName,
        email: formData.contactEmail,
        phone: formData.contactPhone
      }
    };

    try {
      await api.post('/pets', payload);
      navigate('/'); // Redirect to Home on success
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform rotate-3">
            <PawPrint className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Rehome a Pet</h1>
          <p className="text-gray-500 mt-2">Help them find a loving forever home</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r shadow-sm">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Section 1: Basic Info */}
          <div className="p-8 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Info className="w-5 h-5 mr-2 text-indigo-500" />
              Pet Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Pet Name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Max" required />
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                >
                  {['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Other'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <InputField label="Breed" name="breed" value={formData.breed} onChange={handleChange} placeholder="e.g. Golden Retriever" required />
              <InputField label="Age" name="age" value={formData.age} onChange={handleChange} placeholder="e.g. 2 years" required />
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <select 
                  name="size" 
                  value={formData.size} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Extra Large">Extra Large</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                placeholder="Tell us about the pet's personality, history, and needs..."
                required
              />
            </div>
          </div>

          {/* Section 2: Details & Media */}
          <div className="p-8 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <ImageIcon className="w-5 h-5 mr-2 text-indigo-500" />
              Media & Location
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 5 Image Inputs */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">Pet Images (Max 5)</label>
                <div className="space-y-3">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm w-6">#{index + 1}</span>
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder={`Paste Image URL ${index + 1}`}
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm transition-all"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Paste direct links to images (e.g., from Unsplash, Imgur).</p>
              </div>

              <InputField label="Location (City, State)" name="location" value={formData.location} onChange={handleChange} placeholder="Mumbai, Maharashtra" required />
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Adoption Fee (₹)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-bold">₹</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="0 for free adoption"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Contact Info */}
          <div className="p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Contact Name" name="contactName" value={formData.contactName} onChange={handleChange} required />
              <InputField label="Phone Number" name="contactPhone" value={formData.contactPhone} onChange={handleChange} placeholder="+91 98765 43210" required />
              <div className="md:col-span-2">
                <InputField label="Email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} type="email" required />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="p-8 bg-gray-50 border-t border-gray-100">
            <Button 
              type="submit" 
              className="w-full py-4 text-lg shadow-xl shadow-orange-200 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <Upload className="animate-bounce mr-2 w-5 h-5" /> Listing Pet...
                </span>
              ) : 'Create Listing'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellPet;