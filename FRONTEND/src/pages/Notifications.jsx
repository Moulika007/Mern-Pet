import { useEffect, useState } from 'react';
import { Check, X, Bell, Loader } from 'lucide-react';
import api from '../utils/api';

const Notifications = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const { data } = await api.get('/requests/received');
      setRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    if(!window.confirm("Approving this will REMOVE the pet from the website. Continue?")) return;
    try {
      await api.put(`/requests/${id}/approve`);
      alert("Success! The pet has been marked as sold.");
      setRequests(requests.filter(req => req._id !== id));
    } catch (error) {
      alert("Error approving request");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/requests/${id}/reject`);
      setRequests(requests.filter(req => req._id !== id));
    } catch (error) {
      alert("Error rejecting request");
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <Bell className="w-8 h-8 mr-3 text-orange-600" /> 
          Adoption Requests
        </h1>

        {requests.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center text-gray-500">
            No pending requests at the moment.
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req._id} className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Pet Info */}
                <div className="flex items-center gap-4">
                  <img src={req.pet?.image || "https://via.placeholder.com/100"} alt="Pet" className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-bold text-lg">{req.pet?.name || "Unknown Pet"}</h3>
                    <p className="text-sm text-gray-500">Requested by: <span className="font-bold text-indigo-600">{req.buyer?.name}</span></p>
                    <p className="text-xs text-gray-400">{req.buyer?.email}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleReject(req._id)}
                    className="flex items-center px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
                  >
                    <X className="w-4 h-4 mr-1" /> Reject
                  </button>
                  <button 
                    onClick={() => handleApprove(req._id)}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-lg"
                  >
                    <Check className="w-4 h-4 mr-1" /> Approve & Sell
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;