import { Star, Quote } from 'lucide-react';

const SuccessStories = () => {
  // Mock Data for Success Stories
  const stories = [
    {
      id: 1,
      petName: 'Bella',
      petImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600',
      owner: 'The Sharma Family',
      date: 'Adopted Oct 2024',
      story: "Bella has brought so much joy to our home! She was shy at first, but now she rules the house. Thank you PetHaven for connecting us!",
    },
    {
      id: 2,
      petName: 'Oreo',
      petImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600',
      owner: 'Vikram & Anjali',
      date: 'Adopted Sept 2024',
      story: "We were looking for a companion and found a soulmate. Oreo is the calmest cat ever. The adoption process was seamless.",
    },
    {
      id: 3,
      petName: 'Bruno',
      petImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
      owner: 'Rohan Das',
      date: 'Adopted Nov 2024',
      story: "Bruno loves his morning runs! He's healthy, happy, and very playful. Best decision of my life.",
    },
    {
      id: 4,
      petName: 'Luna',
      petImage: 'https://images.unsplash.com/photo-1529778873920-4da4926a7071?w=600',
      owner: 'Sarah J.',
      date: 'Adopted Aug 2024',
      story: "Luna is a little bundle of energy. She loves her new toys and has settled in perfectly. Highly recommend adopting!",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Happily Ever Afters <span className="text-orange-500">❤️</span>
        </h1>
        <p className="text-xl text-gray-500">
          Nothing makes us happier than seeing our pets find their forever homes. 
          Here are some of our favorite success stories.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {stories.map((story) => (
          <div key={story.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col md:flex-row">
            
            {/* Image Side */}
            <div className="md:w-2/5 h-64 md:h-auto relative">
              <img 
                src={story.petImage} 
                alt={story.petName} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white text-xl font-bold">{story.petName}</h3>
                <p className="text-white/90 text-sm">{story.date}</p>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 md:w-3/5 flex flex-col justify-center relative">
              <Quote className="absolute top-6 right-6 text-orange-100 w-12 h-12 rotate-180" />
              
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 italic mb-6 text-lg leading-relaxed relative z-10">
                "{story.story}"
              </p>

              <div className="flex items-center mt-auto">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold mr-3">
                  {story.owner.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{story.owner}</p>
                  <p className="text-sm text-gray-500">Pet Parent</p>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default SuccessStories;