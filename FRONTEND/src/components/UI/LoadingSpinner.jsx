const LoadingSpinner = ({ size = 'medium', color = 'indigo' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    indigo: 'border-indigo-600',
    purple: 'border-purple-600',
    pink: 'border-pink-600',
    blue: 'border-blue-600',
    orange: 'border-orange-600',
    red: 'border-red-600'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} border-4 border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

export default LoadingSpinner;