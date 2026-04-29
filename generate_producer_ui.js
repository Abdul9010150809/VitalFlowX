import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const producerDir = path.join(srcDir, 'producer');

const templates = {
  ProducerDashboard: `import React from 'react';
import { shipmentsData, alertsData } from './dummyData';
import { Activity, AlertTriangle, Package, TrendingUp } from 'lucide-react';

const ProducerDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Producer Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[ { label: 'Active Shipments', val: 12, icon: Package },
           { label: 'Alerts', val: alertsData.length, icon: AlertTriangle },
           { label: 'Success Rate', val: '99.4%', icon: Activity },
           { label: 'Volume (Monthly)', val: '+14%', icon: TrendingUp }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.val}</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><stat.icon className="w-6 h-6"/></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Recent Shipments</h3></div>
          <div className="divide-y divide-gray-100">
            {shipmentsData.map(s => (
              <div key={s.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                <div><p className="font-medium text-gray-800">{s.product}</p><p className="text-sm text-gray-500">{s.id} • {s.dest}</p></div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">{s.status}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Recent Alerts</h3></div>
          <div className="divide-y divide-gray-100">
            {alertsData.map(a => (
              <div key={a.id} className="p-4 hover:bg-gray-50">
                <p className="font-medium text-gray-800 flex justify-between">{a.severity} <span className="text-sm text-gray-400">{a.time}</span></p>
                <p className="text-sm text-gray-600 mt-1">{a.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProducerDashboard;`,

  LedgerView: `import React from 'react';
import { ledgerData } from './dummyData';
import { Database } from 'lucide-react';

const LedgerView = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Database /></div>
        <h2 className="text-2xl font-bold text-gray-800">Immutable Ledger</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tx Hash</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ledgerData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">{row.hash}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.action}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.actor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.block}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LedgerView;`,

  AlertsMonitor: `import React from 'react';
import { alertsData } from './dummyData';
import { Bell } from 'lucide-react';

const AlertsMonitor = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Bell /> Alerts Monitor</h2>
      <div className="grid grid-cols-1 gap-4">
        {alertsData.map(a => (
          <div key={a.id} className={\`p-4 rounded-lg border-l-4 \${a.severity === 'Critical' ? 'bg-red-50 border-red-500' : a.severity === 'Warning' ? 'bg-yellow-50 border-yellow-500' : 'bg-blue-50 border-blue-500'}\`}>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-800">{a.id} - {a.severity}</h4>
                <p className="text-gray-700 mt-1">{a.message}</p>
              </div>
              <span className="text-sm text-gray-500 shrink-0">{a.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AlertsMonitor;`
};

const defaultTemplate = (pageName) => "import React from 'react';\n\nconst " + pageName + " = () => {\n  return (\n    <div className=\"bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center\">\n      <div className=\"w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4\">\n        <span className=\"text-2xl text-blue-500\">⚡</span>\n      </div>\n      <h2 className=\"text-2xl font-bold text-gray-800 mb-2\">" + pageName.replace(/([A-Z])/g, ' $1').trim() + "</h2>\n      <p className=\"text-gray-500 max-w-md mx-auto\">\n        This portal module represents a specific piece of the Producer supply chain block mapping.\n        (Configurable form/data placeholder)\n      </p>\n      <button className=\"mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium\">Configure Module Setup</button>\n    </div>\n  );\n};\nexport default " + pageName + ";\n";

const producerPages = ["ProducerDashboard", "CreateShipment", "ProductBatchConfig", "RoutePlan", "TempRulesConfig", "UploadDocs", "DocumentPreview", "SensorBinding", "ActorKeySetup", "RiskAssessment", "OnChainRegister", "QRGenerator", "LedgerView", "AlertsMonitor", "ExceptionCase"];

producerPages.forEach(page => {
  const code = templates[page] || defaultTemplate(page);
  fs.writeFileSync(path.join(producerDir, page + '.jsx'), code);
});

console.log('Producer UI code successfully generated!');
