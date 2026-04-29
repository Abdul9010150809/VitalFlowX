import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const regulatorDir = path.join(srcDir, 'regulator');

const templates = {
  RegulatorDashboard: `import React from 'react';
import { complianceData, activeCases } from './dummyData';
import { ShieldAlert, FileText, Globe, CheckCircle } from 'lucide-react';

const RegulatorDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Regulator Master Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[ { label: 'Active Cases', val: activeCases.length, icon: ShieldAlert },
           { label: 'Audits Issued', val: 45, icon: FileText },
           { label: 'Global Compliance', val: '89%', icon: Globe },
           { label: 'Cleared Entities', val: 128, icon: CheckCircle }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.val}</p>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><stat.icon className="w-6 h-6"/></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Compliance Top Watchlist</h3></div>
          <div className="divide-y divide-gray-100">
            {complianceData.map(c => (
              <div key={c.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                <div><p className="font-medium text-gray-800">{c.entity}</p><p className="text-sm text-gray-500">Score: {c.score}</p></div>
                <span className={\`px-3 py-1 rounded-full text-xs font-semibold \${c.status === 'Compliant' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}\`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">High-Priority Cases</h3></div>
          <div className="divide-y divide-gray-100">
            {activeCases.map(a => (
              <div key={a.caseId} className="p-4 hover:bg-gray-50">
                <p className="font-medium text-gray-800 flex justify-between">{a.caseId} <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded">{a.status}</span></p>
                <p className="text-sm text-gray-600 mt-1">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegulatorDashboard;`,

  ComplianceAnalytics: `import React from 'react';
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
export default ComplianceAnalytics;`
};

const defaultTemplate = (pageName) => "import React from 'react';\n\nconst " + pageName + " = () => {\n  return (\n    <div className=\"bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center\">\n      <div className=\"w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4\">\n        <span className=\"text-2xl text-purple-500\">⚖️</span>\n      </div>\n      <h2 className=\"text-2xl font-bold text-gray-800 mb-2\">" + pageName.replace(/([A-Z])/g, ' $1').trim() + "</h2>\n      <p className=\"text-gray-500 max-w-md mx-auto\">\n        This portal module is restricted to authorized Regulatory nodes on the supply chain network.\n        (Configurable form/data placeholder)\n      </p>\n      <button className=\"mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium\">Access Settings</button>\n    </div>\n  );\n};\nexport default " + pageName + ";\n";

const regulatorPages = ["RegulatorDashboard", "AuthorityAccess", "GlobalOverview", "ComplianceAnalytics", "LedgerExplorer", "DocumentValidator", "SensorAudit", "AlertAnalytics", "ViolationDetection", "ApprovalPanel", "CaseManagement", "AuditTrail", "EntityComparison", "ReportsExport", "Settings"];

regulatorPages.forEach(page => {
  const code = templates[page] || defaultTemplate(page);
  fs.writeFileSync(path.join(regulatorDir, page + '.jsx'), code);
});

console.log('Regulator UI code successfully generated!');
