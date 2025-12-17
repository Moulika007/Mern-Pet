import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSlider = ({ title, subtitle, images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slider logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-b-3xl shadow-xl mb-8 group">
      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={img} alt="Slide" className="w-full h-full object-cover" />
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
      ))}

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 drop-shadow-lg transform transition-all duration-700 translate-y-0 opacity-100">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-lg drop-shadow-md">
          {subtitle}
        </p>
        
        {/* Indicators */}
        <div className="flex space-x-2">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-orange-500' : 'w-2 bg-white/50'
              }`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;