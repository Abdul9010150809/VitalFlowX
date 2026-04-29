import React from 'react';
import { RadioReceiver, AlertOctagon } from 'lucide-react';
const AlertsMonitor = () => (
  <div className="max-w-5xl mx-auto animate-fade-in-up space-y-6">
    <div className="flex justify-between items-end border-b border-slate-200 pb-4">
      <div>
        <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3"><RadioReceiver className="w-8 h-8 text-red-500"/> Realtime Alerts</h2>
        <p className="text-slate-500 mt-1">WebSocket aggregated anomaly detections.</p>
      </div>
      <div className="flex gap-2">
         <span className="flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>
      </div>
    </div>
    
    <div className="space-y-4 pt-4">
      {[1,2,3].map(i => (
        <div key={i} className={`p-6 rounded-2xl flex items-start gap-4 shadow-sm border ${i===1 ? 'bg-red-50 border-red-200' : 'bg-white border-slate-100 hover:bg-slate-50'}`}>
          <div className={`p-3 rounded-full ${i===1 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h4 className="font-bold text-slate-800 text-lg">{i===1 ? 'Critical Temperature Spike' : 'Geolocation Ping Delayed'}</h4>
              <span className="text-xs font-mono text-slate-400">14:0{i}:22 UTC</span>
            </div>
            <p className="text-slate-600 mt-1 text-sm">{i===1 ? 'Internal sensors on Batch #X recorded -15C, violating the -20C floor limit!' : 'Transporter vehicle GPS signal lost for 5 minutes during transit boundary.'}</p>
            {i===1 && <button className="mt-4 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg shadow-md hover:bg-red-700">Acknowledge & Escalate</button>}
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default AlertsMonitor;