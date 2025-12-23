import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import FloatingActionButton from './components/UI/FloatingActionButton'; 
import ProtectedRoute from './components/UI/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage'; // ✅ Import new page
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup'; 
import PetDetails from './pages/PetDetails'; 
import SellPet from './pages/SellPet';
import Notifications from './pages/Notifications';
// Categories
import Dogs from './pages/Dogs';
import Cats from './pages/Cats';
import Birds from './pages/Birds';
import AllPets from './pages/AllPets';

// Other Pages
import Favorites from './pages/Favorites';
import SuccessStories from './pages/SuccessStories';
import Profile from './pages/Profile';

// Resources
import PetCare from './pages/Resources/PetCare';
import FAQs from './pages/Resources/FAQs';
import Safety from './pages/Resources/Safety';
import Pricing from './pages/Resources/Pricing';
import Support from './pages/Resources/Support';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              {/* ✅ CHANGED ROUTES HERE */}
              <Route path="/" element={<LandingPage />} /> {/* Intro Screen */}
              <Route path="/home" element={<Home />} />    {/* Main App */}
              
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              <Route path="/pet/:id" element={<PetDetails />} />
              
              <Route path="/dogs" element={<Dogs />} />
              <Route path="/cats" element={<Cats />} />
              <Route path="/birds" element={<Birds />} />
              <Route path="/all-pets" element={<AllPets />} />
              
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/success" element={<SuccessStories />} />
              
              <Route path="/care-guide" element={<PetCare />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/support" element={<Support />} />

              <Route 
                path="/sell" 
                element={
                  <ProtectedRoute>
                    <SellPet />
                  </ProtectedRoute>
                } 
              />
               <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
  path="/notifications" 
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  } 
/>
            </Routes>
          </main>
          
          <FloatingActionButton />
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;