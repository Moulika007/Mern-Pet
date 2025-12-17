import { useState } from 'react';
import { Heart, MessageCircle, Phone, Mail, Share2 } from 'lucide-react';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Heart, label: 'Favorites', color: 'bg-red-500 hover:bg-red-600' },
    { icon: MessageCircle, label: 'Chat', color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: Phone, label: 'Call', color: 'bg-green-500 hover:bg-green-600' },
    { icon: Mail, label: 'Email', color: 'bg-purple-500 hover:bg-purple-600' },
    { icon: Share2, label: 'Share', color: 'bg-orange-500 hover:bg-orange-600' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      <div className={`flex flex-col-reverse items-end space-y-reverse space-y-3 mb-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <div
              key={action.label}
              className="flex items-center space-x-3 group"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="bg-white px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  {action.label}
                </span>
              </div>
              <button
                className={`${action.color} text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200`}
              >
                <Icon className="w-5 h-5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl transform transition-all duration-300 ${
          isOpen ? 'rotate-45 scale-110' : 'hover:scale-110'
        }`}
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          {isOpen ? (
            <div className="w-6 h-6 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white transform -translate-y-1/2"></div>
              <div className="absolute left-1/2 top-0 w-0.5 h-full bg-white transform -translate-x-1/2"></div>
            </div>
          ) : (
            <Heart className="w-6 h-6" />
          )}
        </div>
      </button>

      {/* Ripple Effect */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 animate-ping ${
        isOpen ? 'opacity-20' : 'opacity-0'
      }`}></div>
    </div>
  );
};

export default FloatingActionButton;