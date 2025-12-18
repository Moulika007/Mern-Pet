import axios from 'axios';

const api = axios.create({
  baseURL: 'http://https://mern-pet-2.onrender.com', // Matches your backend port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the Token to every request
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
