import { ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';

const Safety = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-blue-600 py-20 text-center text-white">
        <ShieldCheck className="w-16 h-16 mx-auto mb-4 opacity-80" />
        <h1 className="text-4xl font-bold">Pet Safety Guide</h1>
        <p className="mt-4 text-blue-100">Keep your new family member safe and secure.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-12 grid md:grid-cols-2 gap-8">
        {/* Safe Foods */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-green-500">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <CheckCircle className="w-6 h-6 text-green-500 mr-2" /> Home Safety (Do's)
          </h2>
          <ul className="space-y-4">
            {['Secure trash cans', 'Keep toilet lids closed', 'Store cleaning supplies high up', 'Check fence for gaps', 'Use a pet crate for travel'].map(item => (
              <li key={item} className="flex items-center text-gray-700 bg-green-50 p-3 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Hazards */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-red-500">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-2" /> Toxic Items (Don'ts)
          </h2>
          <ul className="space-y-4">
            {['Chocolate & Caffeine', 'Grapes & Raisins', 'Lilies (highly toxic to cats)', 'Xylitol (gum/candy)', 'Human Medication'].map(item => (
              <li key={item} className="flex items-center text-gray-700 bg-red-50 p-3 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-600 mr-3" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Safety;
