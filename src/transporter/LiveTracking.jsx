import React from 'react';
import { liveTrackingData } from './dummyData';
import { MapPin } from 'lucide-react';

const LiveTracking = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><MapPin /></div>
        <h2 className="text-2xl font-bold text-gray-800">Live GPS & Telemetry Tracking</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Internal Temp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coordinate Frame</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sensor Power</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {liveTrackingData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.timestamp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">{row.temp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{row.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{row.battery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LiveTracking;