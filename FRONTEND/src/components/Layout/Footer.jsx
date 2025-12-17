import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">
                Pet<span className="text-indigo-400">Haven</span>
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Connecting loving families with loyal companions since 2025. 
              We believe every pet deserves a forever home filled with love and care.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Youtube, href: '#', label: 'YouTube' }
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="bg-gray-800 hover:bg-indigo-600 p-3 rounded-lg transition-colors duration-200 group"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Find Pets</h3>
            <ul className="space-y-3">
              {[
                { label: '🐕 Adopt a Dog', href: '/' },
                { label: '🐱 Adopt a Cat', href: '/cats' },
                { label: '🐰 Small Pets', href: '/small-pets' },
                { label: '🐦 Birds', href: '/birds' },
                { label: '🏠 Rehome a Pet', href: '/sell' },
                { label: '🏥 Find Shelters', href: '/shelters' }
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link 
                    to={href} 
                    className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Resources</h3>
            <ul className="space-y-3">
              {[
                { label: '📚 Pet Care Guide', href: '/care-guide' },
                { label: '❓ Adoption FAQs', href: '/faqs' },
                { label: '✨ Success Stories', href: '/success' },
                { label: '🛡️ Safety Tips', href: '/safety' },
                { label: '💰 Pricing Guide', href: '/pricing' },
                { label: '📞 Support Center', href: '/support' }
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link 
                    to={href} 
                    className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Email us</p>
                  <a href="mailto:help@pethaven.com" className="text-white hover:text-indigo-400 transition-colors duration-200">
                    help@pethaven.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Call us</p>
                  <a href="tel:1-800-PET-LOVE" className="text-white hover:text-indigo-400 transition-colors duration-200">
                    1-800-PET-LOVE
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Visit us</p>
                  <p className="text-white">Nationwide Network</p>
                </div>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-8">
              <h4 className="font-semibold mb-3 text-white">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-lg transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              &copy; 2025 PetHaven. All rights reserved. Made with 
              <Heart className="w-4 h-4 inline mx-1 text-red-500" /> 
              for animals everywhere.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;