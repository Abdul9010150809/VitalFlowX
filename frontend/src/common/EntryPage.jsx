import React from 'react';
import { useNavigate } from 'react-router-dom';

const EntryPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">VitalFlowX</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-lg text-center">
        Blockchain-based cold chain system. Select your role to continue.
      </p>
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <button
          onClick={() => navigate('/login')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Go to Login / Role Selection
        </button>
      </div>
    </div>
  );
};

export default EntryPage;
