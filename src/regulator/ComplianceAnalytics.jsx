import React from 'react';
import { complianceData } from './dummyData';
import { BarChart2 } from 'lucide-react';

const ComplianceAnalytics = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><BarChart2 /></div>
        <h2 className="text-2xl font-bold text-gray-800">Compliance Analytics</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audit Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Audit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action Required</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {complianceData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-purple-600">{row.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{row.entity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.score}/100</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.lastAudit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   {row.score < 80 ? <button className="text-red-600 hover:underline">Revoke / Audit</button> : <span className="text-green-600">None</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ComplianceAnalytics;