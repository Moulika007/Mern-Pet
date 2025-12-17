import { useNavigate } from 'react-router-dom';

const TestNavigation = () => {
  const navigate = useNavigate();

  const testNavigation = () => {
    console.log('Testing navigation to pet/1');
    navigate('/pet/1');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Navigation Test</h1>
      <button 
        onClick={testNavigation}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Test Navigate to Pet 1
      </button>
    </div>
  );
};

export default TestNavigation;