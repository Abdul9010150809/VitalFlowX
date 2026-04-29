import React, { useState } from 'react';
import { ShieldAlert, RefreshCw, AlertTriangle, FileSearch, CheckCircle2, XCircle } from 'lucide-react';

const SensorFailure = () => {
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState(null);

  const runDiagnostics = () => {
    setIsDiagnosing(true);
    setDiagnosticResult(null);
    setTimeout(() => {
      setIsDiagnosing(false);
      setDiagnosticResult({
        status: 'Failure Detected',
        code: 'ERR-772A',
        component: 'GSM Transceiver',
        recommendation: 'Switch to Satellite Backup or Replace Unit at Hub 04',
        timestamp: new Date().toLocaleTimeString()
      });
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div>
        <h2 className="text-3xl font-black text-slate-800">Sensor Failure Diagnostics</h2>
        <p className="text-slate-500 font-medium mt-1">Deep-dive hardware analysis and automated recovery protocols.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${isDiagnosing ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}>
              <FileSearch className={`w-12 h-12 ${isDiagnosing ? 'animate-pulse' : ''}`} />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">Analyze Hardware Integrity</h3>
            <p className="text-slate-500 text-sm mb-8 max-w-sm">Connect via Bluetooth or NFC to run the complete diagnostic suite on a specific sensor node.</p>
            <button 
              onClick={runDiagnostics}
              disabled={isDiagnosing}
              className={`px-10 py-4 rounded-2xl font-black transition-all flex items-center gap-3 ${
                isDiagnosing 
                ? 'bg-slate-100 text-slate-400' 
                : 'bg-slate-900 text-white hover:bg-black shadow-xl shadow-slate-200'
              }`}
            >
              {isDiagnosing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <ShieldAlert className="w-5 h-5" />}
              {isDiagnosing ? 'Running Multi-Point Scan...' : 'Start Diagnostic Scan'}
            </button>
          </div>

          {diagnosticResult && (
            <div className="bg-red-50 border border-red-100 rounded-3xl p-8 animate-fade-in">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-red-800">{diagnosticResult.status}</h4>
                    <p className="text-red-600 font-bold text-sm">{diagnosticResult.code} • {diagnosticResult.component}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest">{diagnosticResult.timestamp}</span>
              </div>
              <div className="mt-6 pt-6 border-t border-red-200 flex items-center justify-between">
                <p className="text-sm font-medium text-red-700"><strong>Recommendation:</strong> {diagnosticResult.recommendation}</p>
                <button className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-colors">Request Replace</button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h4 className="text-lg font-black text-slate-800 mb-6">Common Failure Codes</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-help">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-slate-700">ERR-101: Calibration Drift</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-help">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-slate-700">ERR-202: Power Cell Depletion</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-help">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-bold text-slate-700">RES-00: All Systems Optimal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorFailure;
