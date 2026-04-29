import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const transporterDir = path.join(srcDir, 'transporter');

const templates = {
  TransportDashboard: `import React from 'react';
import { activeRoutes, incidentLogs } from './dummyData';
import { Truck, Navigation, AlertTriangle, BatteryCharging } from 'lucide-react';

const TransportDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Transporter Fleet Center</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[ { label: 'Active Routes', val: activeRoutes.length, icon: Truck },
           { label: 'Live GPS Signals', val: 34, icon: Navigation },
           { label: 'Open Incidents', val: incidentLogs.length, icon: AlertTriangle },
           { label: 'Sensor Battery Avg', val: '88%', icon: BatteryCharging }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.val}</p>
            </div>
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><stat.icon className="w-6 h-6"/></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Fleet Operations</h3></div>
          <div className="divide-y divide-gray-100">
            {activeRoutes.map(r => (
              <div key={r.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                <div><p className="font-medium text-gray-800">{r.id} ({r.vehicle})</p><p className="text-sm text-gray-500">Driver: {r.driver}</p></div>
                <div className="text-right">
                   <div className="text-sm font-bold text-gray-700">{r.progress}</div>
                   <span className={\`text-xs px-2 py-1 rounded \${r.status === 'On Route' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}\`}>{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Incident Matrix</h3></div>
          <div className="divide-y divide-gray-100">
            {incidentLogs.map(inc => (
              <div key={inc.reportId} className="p-4 hover:bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{inc.reportId}</p>
                  <p className="text-sm text-gray-600 mt-1">{inc.type}</p>
                </div>
                <span className={\`px-2 py-1 text-xs rounded-full \${inc.resolving ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}\`}>
                  {inc.resolving ? 'Resolving' : 'Pending Action'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TransportDashboard;`,

  LiveTracking: `import React from 'react';
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
export default LiveTracking;`
};

const defaultTemplate = (pageName) => "import React from 'react';\n\nconst " + pageName + " = () => {\n  return (\n    <div className=\"bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center\">\n      <div className=\"w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4\">\n        <span className=\"text-2xl text-orange-500\">🚚</span>\n      </div>\n      <h2 className=\"text-2xl font-bold text-gray-800 mb-2\">" + pageName.replace(/([A-Z])/g, ' $1').trim() + "</h2>\n      <p className=\"text-gray-500 max-w-md mx-auto\">\n        This portal module is engineered for Transporter IoT tracking and delivery verifications.\n        (Configurable form/data placeholder)\n      </p>\n      <button className=\"mt-6 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium\">Manage Logistics</button>\n    </div>\n  );\n};\nexport default " + pageName + ";\n";

const transporterPages = ["TransportDashboard", "Login", "PickupEvent", "HandoffEvent", "LiveTracking", "SensorMonitor", "SensorCheck", "TemperatureGraph", "IncidentReport", "SensorFailure", "OfflineQueue", "SyncEngine", "AlertResponse", "DeliveryConfirm", "ProfileSettings"];

transporterPages.forEach(page => {
  const code = templates[page] || defaultTemplate(page);
  fs.writeFileSync(path.join(transporterDir, page + '.jsx'), code);
});

console.log('Transporter UI code successfully generated!');
