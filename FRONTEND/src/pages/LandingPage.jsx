import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Smile } from 'lucide-react';
import heroBg from '../assets/hero-bg.png'; // Make sure you have a background image

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=2000&q=90')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div> {/* Dark Overlay */}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-up">
            Find Your <span className="text-orange-500">Pawfect</span> Friend
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light max-w-2xl mx-auto">
            Thousands of adoptable pets are looking for a loving home. 
            Start your journey today and change a life forever.
          </p>
          
          <button 
            onClick={() => navigate('/home')}
            className="group bg-orange-600 hover:bg-orange-700 text-white text-xl font-bold py-4 px-10 rounded-full transition-all shadow-2xl hover:shadow-orange-500/50 flex items-center mx-auto gap-3"
          >
            Explore More <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 2. DESCRIPTION & FEATURES */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Adopt?</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Save a Life</h3>
              <p className="text-gray-600">When you adopt, you give a deserving pet a second chance at happiness and open up shelter space for another.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Verified & Safe</h3>
              <p className="text-gray-600">Every pet listed on our platform is verified for health and vaccination status to ensure a safe adoption.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smile className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Unconditional Love</h3>
              <p className="text-gray-600">Pets bring joy, reduce stress, and become your most loyal companions. Experience the bond today.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PHOTO GALLERY (A Glimpse of Happiness) */}
      <div className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Happy Tails</h2>
            <p className="text-gray-500 mt-2">See recent adoptions and happy families.</p>
          </div>
          <button onClick={() => navigate('/success')} className="text-orange-600 font-bold hover:underline">View All Stories</button>
        </div>

        {/* Masonry Style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[500px] md:h-[600px] px-4">
          <div className="col-span-1 row-span-2 overflow-hidden rounded-2xl group relative">
            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Dog" />
          </div>
          <div className="col-span-1 row-span-1 overflow-hidden rounded-2xl group relative">
            <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Cat" />
          </div>
          <div className="col-span-1 row-span-1 overflow-hidden rounded-2xl group relative">
            <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Puppy" />
          </div>
          <div className="col-span-1 row-span-2 overflow-hidden rounded-2xl group relative">
            <img src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Human and Dog" />
          </div>
          <div className="col-span-2 row-span-1 overflow-hidden rounded-2xl group relative">
             <img src="https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Pets playing" />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
           <button 
            onClick={() => navigate('/home')}
            className="text-lg font-bold text-gray-900 border-2 border-gray-900 py-3 px-8 rounded-full hover:bg-gray-900 hover:text-white transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;