import { DollarSign, Check } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-purple-700 py-20 text-center text-white">
        <DollarSign className="w-16 h-16 mx-auto mb-4 opacity-80" />
        <h1 className="text-4xl font-bold">Adoption Fees Explained</h1>
        <p className="mt-4 text-purple-100">100% of fees go towards caring for animals.</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          <div className="p-10 md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What does the fee cover?</h2>
            <div className="space-y-4">
              {[
                { item: 'Spay/Neuter Surgery', cost: '₹5,000 value' },
                { item: 'Core Vaccinations', cost: '₹2,000 value' },
                { item: 'Microchip & Registration', cost: '₹1,500 value' },
                { item: 'Flea/Tick Treatment', cost: '₹500 value' },
                { item: 'Health Exam', cost: '₹1,000 value' }
              ].map((row, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="font-medium text-gray-700">{row.item}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-400 uppercase">{row.cost}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 p-10 md:w-1/3 flex flex-col justify-center items-center text-center">
            <h3 className="text-gray-500 font-bold uppercase tracking-wider mb-2">Total Value</h3>
            <span className="text-4xl font-bold text-gray-400 line-through">₹10,000+</span>
            
            <div className="my-6 w-full h-px bg-purple-200"></div>
            
            <h3 className="text-purple-600 font-bold uppercase tracking-wider mb-2">Adoption Fee</h3>
            <span className="text-5xl font-bold text-purple-700">₹0 - ₹5k</span>
            <p className="text-sm text-gray-500 mt-4">Fees vary by pet age & breed.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pricing;