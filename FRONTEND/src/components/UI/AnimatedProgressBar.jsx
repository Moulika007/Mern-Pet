import { useState, useEffect } from 'react';

const AnimatedProgressBar = ({ 
  percentage, 
  label, 
  color = 'indigo', 
  height = 'h-3',
  showPercentage = true,
  animated = true 
}) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setCurrentPercentage(percentage);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setCurrentPercentage(percentage);
    }
  }, [percentage, animated]);

  const colorClasses = {
    indigo: 'from-indigo-400 to-indigo-600',
    purple: 'from-purple-400 to-purple-600',
    pink: 'from-pink-400 to-pink-600',
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    yellow: 'from-yellow-400 to-yellow-600',
    red: 'from-red-400 to-red-600'
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-bold text-gray-900">{percentage}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <div
          className={`${height} bg-gradient-to-r ${colorClasses[color]} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
          style={{ width: `${currentPercentage}%` }}
        >
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedProgressBar;