import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import InputField from '../../components/UI/InputField';
import Button from '../../components/UI/Button';
import { Heart, UserPlus } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    // Call register from AuthContext
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500">Join our community of pet lovers</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <InputField 
            label="Full Name" 
            name="name"
            type="text" 
            placeholder="John Doe" 
            value={formData.name}
            onChange={handleChange}
            required
          />
          <InputField 
            label="Email Address" 
            name="email"
            type="email" 
            placeholder="john@example.com" 
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField 
            label="Password" 
            name="password"
            type="password" 
            placeholder="••••••••" 
            value={formData.password}
            onChange={handleChange}
            required
          />
          <InputField 
            label="Confirm Password" 
            name="confirmPassword"
            type="password" 
            placeholder="••••••••" 
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          
          <div className="mt-6">
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;