import { Heart, Activity, Utensils, Scissors } from 'lucide-react';

const PetCare = () => {
  const guides = [
    {
      title: 'Nutrition & Diet',
      icon: <Utensils className="w-6 h-6 text-orange-500" />,
      desc: 'Balanced diets are key to a long life. Learn about age-appropriate food and portion control.',
      image: 'https://images.unsplash.com/photo-1589924691195-41432c84c161?w=800&q=80'
    },
    {
      title: 'Regular Exercise',
      icon: <Activity className="w-6 h-6 text-green-500" />,
      desc: 'Daily walks and playtime keep your pet fit and reduce behavioral issues.',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255db?w=800&q=80'
    },
    {
      title: 'Grooming Basics',
      icon: <Scissors className="w-6 h-6 text-blue-500" />,
      desc: 'Regular brushing, nail trimming, and baths keep your pet comfortable and clean.',
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80'
    },
    {
      title: 'Health & Vet Visits',
      icon: <Heart className="w-6 h-6 text-red-500" />,
      desc: 'Routine check-ups and vaccinations are essential for preventing serious diseases.',
      image: 'https://images.unsplash.com/photo-1628009368231-76033527212e?w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero */}
      <div className="relative h-96 bg-indigo-900 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1600" alt="Pet Care" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Pet Care Guide</h1>
          <p className="text-xl max-w-2xl">Expert tips to ensure your furry friend lives a happy, healthy life.</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {guides.map((guide, idx) => (
            <div key={idx} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="h-64 overflow-hidden">
                <img src={guide.image} alt={guide.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gray-50 rounded-xl">{guide.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900">{guide.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">{guide.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetCare;