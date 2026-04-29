import React from 'react';

const IncidentReport = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
      <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl text-orange-500">🚚</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Incident Report</h2>
      <p className="text-gray-500 max-w-md mx-auto">
        This portal module is engineered for Transporter IoT tracking and delivery verifications.
        (Configurable form/data placeholder)
      </p>
      <button className="mt-6 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium">Manage Logistics</button>
    </div>
  );
};
export default IncidentReport;
