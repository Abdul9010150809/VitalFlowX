import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const inspectorDir = path.join(srcDir, 'inspector');

const templates = {
  InspectorDashboard: `import React from 'react';
import { inspectionQueue, fraudAlerts, validatedSensors } from './dummyData';
import { ClipboardCheck, ShieldAlert, Cpu, Search } from 'lucide-react';

const InspectorDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Inspector Command Central</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[ { label: 'Pending Audits', val: inspectionQueue.length, icon: ClipboardCheck },
           { label: 'Fraud Alerts', val: fraudAlerts.length, icon: ShieldAlert },
           { label: 'Sensors Validated', val: validatedSensors.length, icon: Cpu },
           { label: 'Active Scanning', val: 'Online', icon: Search }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.val}</p>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-lg"><stat.icon className="w-6 h-6"/></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between">
            <h3 className="font-semibold text-gray-800">Daily Inspection Queue</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {inspectionQueue.map(q => (
              <div key={q.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                <div><p className="font-medium text-gray-800">{q.id}: {q.type}</p><p className="text-sm text-gray-500">Target: {q.target}</p></div>
                <div className="text-right">
                   <div className="text-xs font-bold text-gray-700">{q.facility}</div>
                   <span className={\`mt-1 inline-block text-xs px-2 py-1 rounded \${q.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}\`}>{q.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Fraud & Security Triage</h3></div>
          <div className="divide-y divide-gray-100">
            {fraudAlerts.map(f => (
              <div key={f.alertId} className="p-4 hover:bg-gray-50">
                <p className="font-medium text-red-600 flex justify-between">{f.alertId} <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">{f.riskLevel} Risk</span></p>
                <p className="text-sm text-gray-800 mt-1">{f.suspicion}</p>
                <p className="text-xs text-gray-500 mt-1">Bound to {f.shipment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default InspectorDashboard;`,

  InspectionQueue: `import React from 'react';
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
export default InspectionQueuePage;`
};

const defaultTemplate = (pageName) => "import React from 'react';\n\nconst " + pageName + " = () => {\n  return (\n    <div className=\"bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center\">\n      <div className=\"w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4\">\n        <span className=\"text-2xl text-red-500\">🔍</span>\n      </div>\n      <h2 className=\"text-2xl font-bold text-gray-800 mb-2\">" + pageName.replace(/([A-Z])/g, ' $1').trim() + "</h2>\n      <p className=\"text-gray-500 max-w-md mx-auto\">\n        This portal module allows Quality Inspectors to perform physical layout checks and hardware verifications on-chain.\n      </p>\n      <button className=\"mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium\">Open Field Tool</button>\n    </div>\n  );\n};\nexport default " + pageName + ";\n";

const inspectorPages = ['InspectorDashboard', 'SecureAuth', 'InspectionQueue', 'ChecklistEngine', 'PhysicalEntry', 'SensorValidation', 'DocumentCheck', 'GeoProof', 'UploadReport', 'PassFail', 'FraudPanel', 'CreateAlert', 'Timeline', 'Escalation', 'ProfileSettings'];

inspectorPages.forEach(page => {
  const compName = page === 'InspectionQueue' ? 'InspectionQueuePage' : page; 
  const code = templates[page] || defaultTemplate(compName);
  fs.writeFileSync(path.join(inspectorDir, page + '.jsx'), code);
});

console.log('Inspector UI code successfully generated!');
