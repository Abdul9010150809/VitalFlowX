import React from 'react';
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
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${c.status === 'Compliant' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{c.status}</span>
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
export default RegulatorDashboard;