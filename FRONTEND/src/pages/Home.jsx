import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, Heart, Home as HomeIcon, Star, Smile, BookOpen, HelpCircle, DollarSign, Phone, Lock } from 'lucide-react';
import api from '../utils/api';
import PetCard from '../components/UI/PetCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import HeroSlider from '../components/UI/HeroSlider';

const Home = () => {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Search State
  const [searchCategory, setSearchCategory] = useState('Dog');
  const [searchLocation, setSearchLocation] = useState('');

  // Premium Hero Images
  const heroImages = [
    'https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90',
    'https://images.unsplash.com/photo-1555685812-4b943f3db990?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90' 
  ];

  // Resources Data (From your screenshot)
  const resources = [
    { title: 'Pet Care Guide', link: '/care-guide', icon: <BookOpen className="w-6 h-6 text-green-500" />, desc: 'which parent ' },
    { title: 'Adoption FAQs', link: '/faqs', icon: <HelpCircle className="w-6 h-6 text-orange-500" />, desc: 'Common questions answered.' },
    { title: 'Success Stories', link: '/success', icon: <Star className="w-6 h-6 text-yellow-500" />, desc: 'Read happy adoption tales.' },
    { title: 'Safety Tips', link: '/safety', icon: <Lock className="w-6 h-6 text-blue-500" />, desc: 'Keep your pet safe & secure.' },
    { title: 'Pricing Guide', link: '/pricing', icon: <DollarSign className="w-6 h-6 text-purple-500" />, desc: 'Understanding adoption fees.' },
    { title: 'Support Center', link: '/support', icon: <Phone className="w-6 h-6 text-red-500" />, desc: 'We are here to help you.' }
  ];

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const { data } = await api.get('/pets/featured');
        setFeaturedPets(data);
      } catch (error) {
        console.error("Error fetching pets", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCategory === 'Dog') navigate('/dogs');
    else if (searchCategory === 'Cat') navigate('/cats');
    else if (searchCategory === 'Bird') navigate('/birds');
    else navigate('/all-pets');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 1. HERO SECTION */}
      <div className="relative">
        <HeroSlider 
          images={heroImages} 
          title="Bringing Joy Home"
          subtitle="Connect with thousands of adoptable pets from trusted shelters and owners."
        />
        
        {/* Premium Floating Search Bar */}
        <div className="absolute bottom-[-50px] left-0 right-0 z-20 px-4">
          <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-end border border-white/20">
            
            <div className="w-full md:w-1/3">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Pet Type</label>
              <div className="relative">
                <select 
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full bg-gray-50 hover:bg-gray-100 border-none rounded-2xl px-5 py-4 font-bold text-gray-800 focus:ring-4 focus:ring-orange-100 transition-all appearance-none cursor-pointer"
                >
                  <option value="Dog">🐶 Dog</option>
                  <option value="Cat">🐱 Cat</option>
                  <option value="Bird">🐦 Bird</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Location</label>
              <input 
                type="text" 
                placeholder="Enter City (e.g. Mumbai)" 
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full bg-gray-50 hover:bg-gray-100 border-none rounded-2xl px-5 py-4 font-bold text-gray-800 focus:ring-4 focus:ring-orange-100 placeholder-gray-400 transition-all"
              />
            </div>

            <div className="w-full md:w-1/3">
              <button 
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-orange-200 transform hover:-translate-y-1 flex items-center justify-center text-lg"
              >
                <Search className="w-6 h-6 mr-2" /> Find Pet
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-24 md:h-32"></div>

      {/* 2. TRUST STATS */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-200">
          {[
            { label: 'Pets Adopted', val: '2,500+', icon: <HomeIcon className="w-6 h-6 text-orange-500 mb-2 mx-auto" /> },
            { label: 'Active Listings', val: '800+', icon: <Search className="w-6 h-6 text-indigo-500 mb-2 mx-auto" /> },
            { label: 'Happy Families', val: '2,000+', icon: <Smile className="w-6 h-6 text-green-500 mb-2 mx-auto" /> },
            { label: 'Verified Shelters', val: '150+', icon: <ShieldCheck className="w-6 h-6 text-blue-500 mb-2 mx-auto" /> },
          ].map((stat, idx) => (
            <div key={idx} className="p-2">
              {stat.icon}
              <h3 className="text-3xl font-bold text-gray-900">{stat.val}</h3>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. BROWSE BY CATEGORY */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Your Companion</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Dogs', path: '/dogs', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800', subtitle: 'Loyal & Playful' },
              { name: 'Cats', path: '/cats', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800', subtitle: 'Independent & Cute' },
              { name: 'Birds', path: '/birds', img: 'https://media.istockphoto.com/id/1243410279/photo/portrait-of-two-cute-cuddling-budgies-perched-on-branch-with-blue-background-as-symbol-of.jpg?s=612x612&w=0&k=20&c=d3YXfJpe6GS1qqs6V-bQVQpLNKv2Dd6Yvh7unm1KeGU=', subtitle: 'Colorful & Chirpy' }
            ].map((cat) => (
              <Link 
                key={cat.name} 
                to={cat.path}
                className="group relative h-80 rounded-3xl overflow-hidden shadow-lg cursor-pointer"
              >
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                  <h3 className="text-3xl font-bold text-white mb-1 group-hover:translate-x-2 transition-transform duration-300">{cat.name}</h3>
                  <p className="text-gray-300 font-medium group-hover:translate-x-2 transition-transform duration-300 delay-75">{cat.subtitle}</p>
                  <div className="mt-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                    <ArrowRight className="text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 4. FEATURED PETS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Pets</h2>
            <p className="text-gray-500 mt-2 text-lg">New arrivals looking for a loving home</p>
          </div>
          <Link to="/all-pets" className="group flex items-center bg-white border border-gray-200 px-6 py-3 rounded-full text-indigo-600 font-bold hover:bg-indigo-50 transition-all shadow-sm hover:shadow-md">
            View All <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? <div className="flex justify-center"><LoadingSpinner size="large" /></div> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPets.map((pet) => <PetCard key={pet._id} pet={pet} />)}
          </div>
        )}
      </div>

      {/* 5. WHY CHOOSE US (Updated Design) */}
      <div className="bg-indigo-900 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Adopt from PetHaven?</h2>
            <p className="text-indigo-200 text-lg">We make the adoption process transparent, safe, and joyful.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Verified Profiles', desc: 'Every listing is checked for safety.', icon: <ShieldCheck className="w-12 h-12 text-green-400" /> },
              { title: 'Health Checks', desc: 'Vaccination and health records included.', icon: <Heart className="w-12 h-12 text-red-400" /> },
              { title: 'Adoption Support', desc: 'Guidance throughout your journey.', icon: <Star className="w-12 h-12 text-yellow-400" /> }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/20 transition-all">
                <div className="mb-6 bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-indigo-200 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. NEW: RESOURCES & SUPPORT SECTION (Based on your image) */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Resources & Support</h2>
            <p className="text-gray-500">Everything you need to know about adopting and caring for your pet.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res, index) => (
              <Link 
                key={index} 
                to={res.link} 
                className="flex items-start p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="bg-gray-50 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                  {res.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">{res.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{res.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 7. NEWSLETTER CTA */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-20 mb-20">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold mb-2">Join our Newsletter</h3>
            <p className="text-orange-100">Get updates on new pets and care tips directly to your inbox.</p>
          </div>
          <div className="md:w-1/2 w-full flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-6 py-4 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
