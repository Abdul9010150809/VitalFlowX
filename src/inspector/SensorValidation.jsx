import React from 'react';

const SensorValidation = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl text-red-500">🔍</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Sensor Validation</h2>
      <p className="text-gray-500 max-w-md mx-auto">
        This portal module allows Quality Inspectors to perform physical layout checks and hardware verifications on-chain.
      </p>
      <button className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">Open Field Tool</button>
    </div>
  );
};
export default SensorValidation;
