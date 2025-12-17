import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../../components/UI/Button';
import InputField from '../../components/UI/InputField';

const Support = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">How can we help?</h1>
          <p className="text-gray-500 mt-4">We are here for you 24/7. Reach out to us anytime.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
              <div className="bg-blue-50 p-4 rounded-full mr-4"><Phone className="text-blue-500" /></div>
              <div>
                <p className="text-gray-500 text-sm">Call us</p>
                <p className="font-bold text-gray-900">+91 98765 43210</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
              <div className="bg-orange-50 p-4 rounded-full mr-4"><Mail className="text-orange-500" /></div>
              <div>
                <p className="text-gray-500 text-sm">Email us</p>
                <p className="font-bold text-gray-900">help@pethaven.com</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
              <div className="bg-green-50 p-4 rounded-full mr-4"><MapPin className="text-green-500" /></div>
              <div>
                <p className="text-gray-500 text-sm">Visit us</p>
                <p className="font-bold text-gray-900">Mumbai, India</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <InputField label="Name" placeholder="Your Name" />
                <InputField label="Email" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-200 outline-none" placeholder="How can we help you?"></textarea>
              </div>
              <Button className="w-full bg-indigo-900 hover:bg-black">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;