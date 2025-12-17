# 🐾 PetHaven - Pet Adoption Platform

A modern, full-stack pet adoption platform built with React, Node.js, Express, and MongoDB. Inspired by thepetnest.com design.

## ✨ Features

### Frontend
- 🎨 Modern, responsive UI with Tailwind CSS
- 🐕 Dedicated pages for Dogs and Cats with 15+ pets each
- 🔍 Advanced filtering (breed, age, price, location)
- 💖 Interactive pet cards with animations
- 📱 Mobile-responsive design
- 🎭 Floating action buttons and progress bars
- 🔐 User authentication (login/signup)
- ❤️ Favorites system
- 📝 Pet listing form with multi-step wizard

### Backend
- 🚀 RESTful API with Express.js
- 🗄️ MongoDB database with Mongoose
- 🔒 JWT authentication
- 📊 Comprehensive pet model with health info
- 🔍 Search and filtering capabilities
- 📈 Pet views and likes tracking
- 👤 User profiles and favorites
- 🏷️ Featured pets system

## 🛠️ Tech Stack

### Frontend
- React 19.2.0
- Tailwind CSS 4.1.18
- Vite
- Lucide React (icons)
- Axios (API calls)
- React Router DOM

### Backend
- Node.js
- Express.js 5.2.1
- MongoDB with Mongoose 8.20.2
- JWT for authentication
- bcryptjs for password hashing
- express-validator for validation

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd PET-ADOPTION-PROJECT
   ```

2. **Easy Setup (Windows)**
   ```bash
   # Run the automated setup script
   start-dev.bat
   ```

3. **Manual Setup**

   **Backend Setup:**
   ```bash
   cd mern-ecom-auth
   npm install
   
   # Create .env file with:
   # NODE_ENV=development
   # PORT=5000
   # MONGO_URI=mongodb://127.0.0.1:27017/pethaven_db
   # JWT_SECRET=your_jwt_secret_key_here
   
   # Seed the database
   npm run seed
   
   # Start backend server
   npm run dev
   ```

   **Frontend Setup:**
   ```bash
   cd FRONTEND
   npm install
   
   # Start frontend server
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

## 📁 Project Structure

```
PET-ADOPTION-PROJECT/
├── FRONTEND/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Layout/       # Navbar, Footer
│   │   │   └── UI/           # PetCard, LoadingSpinner, etc.
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx      # Landing page
│   │   │   ├── Dogs.jsx      # Dogs listing
│   │   │   ├── Cats.jsx      # Cats listing
│   │   │   ├── SellPet.jsx   # Pet listing form
│   │   │   ├── Login.jsx     # User login
│   │   │   └── Signup.jsx    # User registration
│   │   ├── services/         # API services
│   │   └── context/          # React context
│   └── package.json
├── mern-ecom-auth/           # Node.js backend
│   ├── controller/           # Route controllers
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   ├── config/               # Database config
│   ├── .env                  # Environment variables
│   └── package.json
└── start-dev.bat            # Development setup script
```

## 🔌 API Endpoints

### Pets
- `GET /api/pets` - Get all pets with filtering
- `GET /api/pets/:id` - Get single pet
- `GET /api/pets/featured` - Get featured pets
- `GET /api/pets/category/:category` - Get pets by category
- `POST /api/pets` - Create new pet listing
- `PUT /api/pets/:id` - Update pet
- `DELETE /api/pets/:id` - Delete pet
- `POST /api/pets/:id/like` - Like a pet

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/favorites` - Get user favorites
- `POST /api/users/favorites/:petId` - Add to favorites
- `DELETE /api/users/favorites/:petId` - Remove from favorites

## 🎨 Design Features

### Inspired by thepetnest.com
- Clean, modern interface
- Card-based pet listings
- Advanced filtering system
- Responsive grid layouts
- Smooth animations and transitions
- Professional color scheme
- Mobile-first design

### Interactive Elements
- Floating action buttons
- Animated progress bars
- Image carousels
- Loading spinners
- Hover effects
- Smooth page transitions

## 🔧 Development

### Backend Development
```bash
cd mern-ecom-auth
npm run dev          # Start with nodemon
npm run seed         # Seed database
npm start           # Production start
```

### Frontend Development
```bash
cd FRONTEND
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

## 🌟 Key Features Implemented

1. **Pet Management**
   - Comprehensive pet profiles
   - Image galleries
   - Health information tracking
   - Contact details for adoption

2. **User System**
   - Secure authentication
   - User profiles
   - Favorites system
   - Pet listing management

3. **Search & Filter**
   - Text search across pet details
   - Filter by category, breed, age, price
   - Location-based filtering
   - Sort by popularity, price, date

4. **Modern UI/UX**
   - Responsive design
   - Loading states
   - Error handling
   - Smooth animations
   - Interactive components

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use local MongoDB
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to Vercel, Netlify, or similar platforms
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from thepetnest.com
- Icons by Lucide React
- Images from Unsplash
- Built with love for pets and their future families! 🐾❤️