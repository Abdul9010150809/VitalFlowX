import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const retailerDir = path.join(srcDir, 'retailer');

const templates = {
  RetailDashboard: `import React from 'react';
import { inboundShipments, recentDeliveries, localInventory } from './dummyData';
import { PackageSearch, Store, AlertCircle, Calendar } from 'lucide-react';

const RetailDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Retailer Command Center</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[ { label: 'Inbound En Route', val: inboundShipments.length, icon: PackageSearch },
           { label: 'Local Stock Lots', val: localInventory.length, icon: Store },
           { label: 'Flagged Items', val: 1, icon: AlertCircle },
           { label: 'Avg Shelving Time', val: '4 Days', icon: Calendar }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.val}</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><stat.icon className="w-6 h-6"/></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Incoming Shipments</h3></div>
          <div className="divide-y divide-gray-100">
            {inboundShipments.map(s => (
              <div key={s.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                <div><p className="font-medium text-gray-800">{s.product}</p><p className="text-sm text-gray-500">{s.id} • ETA: {s.eta}</p></div>
                <span className={\`px-3 py-1 rounded-full text-xs font-semibold \${s.status === 'En Route' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}\`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Recent Deliveries Log</h3></div>
          <div className="divide-y divide-gray-100">
            {recentDeliveries.map(d => (
              <div key={d.id} className="p-4 hover:bg-gray-50">
                <p className="font-medium text-gray-800 flex justify-between">{d.shipment} <span className="text-sm text-gray-400">{d.received}</span></p>
                <div className="flex gap-2 mt-2">
                   <span className={\`text-xs px-2 py-1 rounded \${d.QAStatus === 'Passed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}\`}>QA: {d.QAStatus}</span>
                   <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">Temp: {d.tempStability}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RetailDashboard;`,

  InventoryView: `import React from 'react';
import { localInventory } from './dummyData';
import { Store } from 'lucide-react';

const InventoryView = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Store /></div>
        <h2 className="text-2xl font-bold text-gray-800">Local Validated Inventory</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Ref</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {localInventory.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-emerald-600">{row.batch}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{row.product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.qty}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.exp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   <button className="text-emerald-600 hover:underline">Dispense</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default InventoryView;`
};

const defaultTemplate = (pageName) => "import React from 'react';\n\nconst " + pageName + " = () => {\n  return (\n    <div className=\"bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center\">\n      <div className=\"w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4\">\n        <span className=\"text-2xl text-emerald-500\">🛒</span>\n      </div>\n      <h2 className=\"text-2xl font-bold text-gray-800 mb-2\">" + pageName.replace(/([A-Z])/g, ' $1').trim() + "</h2>\n      <p className=\"text-gray-500 max-w-md mx-auto\">\n        This portal module allows Retailers/Pharmacists to integrate incoming data streams from transporters securely.\n        (Configurable form/data placeholder)\n      </p>\n      <button className=\"mt-6 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium\">Manage Interface</button>\n    </div>\n  );\n};\nexport default " + pageName + ";\n";

const retailerPages = ['RetailDashboard', 'SecureLogin', 'ScanShipment', 'LedgerExplorer', 'DocumentValidation', 'SensorGraph', 'AlertSummary', 'AcceptReject', 'FinalReport', 'CustomerView', 'RaiseComplaint', 'DeliveryLog', 'ShipmentHistory', 'ComplianceView', 'ProfileSettings'];

retailerPages.forEach(page => {
  const code = templates[page] || defaultTemplate(page);
  fs.writeFileSync(path.join(retailerDir, page + '.jsx'), code);
});

console.log('Retailer UI code successfully generated!');
