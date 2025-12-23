const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();
// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Allows us to accept JSON data in the body
app.use(cors()); // Enable CORS for frontend access

// Routes
app.use('/api/pets', require('./routes/petRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
// Basic route to check if server is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handling Middleware (Optional but recommended)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`🚀 Server running on port ${PORT}`));