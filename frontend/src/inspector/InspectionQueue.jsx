import React from 'react';
import { inspectionQueue } from './dummyData';
import { ClipboardList } from 'lucide-react';

const InspectionQueuePage = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-red-50 text-red-600 rounded-lg"><ClipboardList /></div>
        <h2 className="text-2xl font-bold text-gray-800">Master Audit Schedule</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Ref</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facility Hub</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audit Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action Required</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inspectionQueue.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{row.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.facility}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   <button className="text-blue-600 font-medium hover:underline">Execute Audit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default InspectionQueuePage;