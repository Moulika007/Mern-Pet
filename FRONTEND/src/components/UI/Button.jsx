import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = "button", variant = "primary", className = "" }) => {
  const baseStyle = "px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/30",
    secondary: "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;