import React from 'react';

const CaseManagement = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
      <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl text-purple-500">⚖️</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Case Management</h2>
      <p className="text-gray-500 max-w-md mx-auto">
        This portal module is restricted to authorized Regulatory nodes on the supply chain network.
        (Configurable form/data placeholder)
      </p>
      <button className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">Access Settings</button>
    </div>
  );
};
export default CaseManagement;
