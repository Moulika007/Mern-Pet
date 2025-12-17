import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "How does the adoption process work?", a: "First, browse our pets and submit an application. We'll review it, schedule a meet-and-greet, and if it's a match, you'll sign the adoption contract!" },
    { q: "What are the adoption fees?", a: "Fees range from ₹0 to ₹15,000 depending on the pet. This covers vaccinations, microchipping, and spay/neuter surgeries." },
    { q: "Can I return a pet if it doesn't work out?", a: "Yes. We understand things happen. We ask that you return the pet to us so we can find them a new suitable home." },
    { q: "Do you offer post-adoption support?", a: "Absolutely! You gain access to our community of pet parents and 24/7 email support for behavioral advice." },
    { q: "Are all pets vaccinated?", a: "Yes, all pets listed as 'Verified' are fully vaccinated and health-checked before adoption." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-orange-500 py-20 text-center text-white">
        <HelpCircle className="w-16 h-16 mx-auto mb-4 opacity-80" />
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-gray-100 last:border-0 py-6">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full flex justify-between items-center text-left focus:outline-none"
              >
                <span className="text-lg font-bold text-gray-800">{faq.q}</span>
                {openIndex === idx ? <Minus className="text-orange-500" /> : <Plus className="text-gray-400" />}
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;