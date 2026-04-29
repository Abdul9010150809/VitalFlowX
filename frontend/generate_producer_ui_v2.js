import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const producerDir = path.join(srcDir, 'producer');

const templates = {
  ProducerDashboard: `import React from 'react';
import { Activity, AlertTriangle, Package, TrendingUp, Box, Zap, Link } from 'lucide-react';

const ProducerDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">VitalFlowX <span className="text-blue-400">Producer Center</span></h1>
            <p className="text-blue-100/80 text-sm md:text-base max-w-xl">
              Blockchain-enabled cold chain logistics. Monitoring end-to-end telemetry and immutable verifications.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-inner">
            <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span></span>
            <span className="text-sm font-medium tracking-wide">Blockchain Sync: Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[ { label: 'Active Shipments', val: 12, icon: Package, color: 'from-blue-500 to-cyan-400' },
           { label: 'Critical Alerts', val: 2, icon: AlertTriangle, color: 'from-orange-500 to-red-500' },
           { label: 'Blockchain TXs', val: '1,492', icon: Link, color: 'from-indigo-500 to-purple-500' },
           { label: 'Success Rate', val: '99.8%', icon: Activity, color: 'from-emerald-400 to-teal-500' }
        ].map((stat, i) => (
          <div key={i} className="group relative bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className={\`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br \${stat.color} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform duration-500\`}></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-black text-slate-800 mt-2 tracking-tight">{stat.val}</p>
              </div>
              <div className={\`p-4 bg-gradient-to-br \${stat.color} text-white rounded-xl shadow-lg\`}> <stat.icon className="w-6 h-6"/> </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProducerDashboard;`,

  CreateShipment: `import React from 'react';
import { PackagePlus } from 'lucide-react';
const CreateShipment = () => (
  <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
    <div>
      <h2 className="text-3xl font-black text-slate-800 tracking-tight">Initialize Shipment</h2>
      <p className="text-slate-500 mt-2 text-lg">Deploy a new cold chain product envelope onto the blockchain.</p>
    </div>
    <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
      <div className="flex border-b border-slate-100 bg-slate-50/50">
         {['Product Details', 'Routing Plan', 'Sensor Hardware', 'Block Verify'].map((step, i) => (
           <div key={i} className={\`flex-1 text-center py-4 text-xs lg:text-sm font-black tracking-widest \${i === 0 ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-slate-400'}\`}>STEP 0{i+1}: {step}</div>
         ))}
      </div>
      <div className="p-8 md:p-12 space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-3">
             <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Product Identifier</label>
             <input type="text" placeholder="e.g. mRNA-1273 Batch X" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-slate-50 text-slate-800 font-medium font-mono" />
           </div>
           <div className="space-y-3">
             <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Quantity (Units)</label>
             <input type="number" placeholder="5000" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-slate-50 text-slate-800 font-medium font-mono" />
           </div>
         </div>
         <div className="pt-8 border-t border-slate-100 flex justify-end gap-4 mt-12">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black tracking-wide hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1">Next: Routing Engine &rarr;</button>
         </div>
      </div>
    </div>
  </div>
);
export default CreateShipment;`,

  ProductBatchConfig: `import React from 'react';
import { Layers, Plus } from 'lucide-react';
const ProductBatchConfig = () => (
  <div className="max-w-6xl mx-auto animate-fade-in-up space-y-6">
    <div className="bg-gradient-to-r from-blue-900 to-indigo-800 rounded-3xl p-8 text-white shadow-xl flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-black">Batch Configuration</h2>
        <p className="text-blue-100 opacity-80 mt-1">Manage active product blueprints before shipment generation.</p>
      </div>
      <button className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors"><Plus /> New Batch</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1,2,3].map(i => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Layers /></div>
            <h3 className="font-bold text-slate-800">Batch Code #B-{i}89X</h3>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p><strong>Product:</strong> {i%2===0 ? 'Insulin Standard' : 'mRNA-1273'}</p>
            <p><strong>Volume:</strong> {i*500} Units</p>
            <p><strong>Standard:</strong> ISO-9001</p>
          </div>
          <button className="mt-6 w-full py-2 bg-slate-50 text-slate-600 rounded-lg font-semibold hover:bg-slate-100">Edit Config</button>
        </div>
      ))}
    </div>
  </div>
);
export default ProductBatchConfig;`,

  RoutePlan: `import React from 'react';
import { Map, MapPin } from 'lucide-react';
const RoutePlan = () => (
   <div className="max-w-5xl mx-auto animate-fade-in-up space-y-8">
      <h2 className="text-3xl font-black text-slate-800">Dynamic Routing Matrix</h2>
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-slate-50 p-8 border-r border-slate-100">
           <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Map /> Defined Nodes</h3>
           <div className="space-y-8">
             {['Producer Site (NYC)', 'Distribution Hub', 'Retail Pharmacy'].map((node, i) => (
               <div key={i} className="relative flex items-center gap-4">
                 {i !== 2 && <div className="absolute top-10 left-5 bottom-[-30px] w-0.5 bg-blue-200"></div>}
                 <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 border border-blue-200 flex items-center justify-center font-black z-10">{i+1}</div>
                 <span className="font-semibold text-slate-700">{node}</span>
               </div>
             ))}
           </div>
        </div>
        <div className="w-full md:w-2/3 p-8 flex items-center justify-center bg-slate-900 relative overflow-hidden">
           <div className="absolute inset-0 bg-blue-900/20 blur-2xl"></div>
           <div className="relative z-10 text-center">
             <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-bounce" />
             <h3 className="text-white text-xl font-bold">Interactive Geo-Fence Engine</h3>
             <p className="text-slate-400 mt-2 max-w-sm mx-auto">Blockchain-approved geographical coordinates will trigger Smart Contract handoffs.</p>
             <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500">Configure Rules</button>
           </div>
        </div>
      </div>
   </div>
);
export default RoutePlan;`,

  TempRulesConfig: `import React from 'react';
import { ThermometerSnowflake, Settings2 } from 'lucide-react';
const TempRulesConfig = () => (
  <div className="max-w-4xl mx-auto animate-fade-in-up space-y-6">
    <div className="flex items-center gap-4 mb-8">
      <div className="p-4 bg-cyan-100 text-cyan-700 rounded-2xl"><ThermometerSnowflake className="w-8 h-8" /></div>
      <div>
        <h2 className="text-3xl font-black text-slate-800">Temperature Rules Engine</h2>
        <p className="text-slate-500">Establish strict SLA boundaries written into the smart contract.</p>
      </div>
    </div>
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-cyan-900/5">
      <div className="space-y-8">
        {[ { title: 'Cryogenic Range', min: '-80°C', max: '-60°C', color: 'bg-indigo-500' },
           { title: 'Standard Cold', min: '-20°C', max: '0°C', color: 'bg-cyan-500' } ].map((rule, i) => (
          <div key={i} className="flex border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
             <div className={\`w-2 \${rule.color}\`}></div>
             <div className="flex-1 p-6 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{rule.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">Smart contract SLA trigger bounds.</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center"><span className="block text-xs uppercase text-slate-400 font-bold">MIN</span><span className="text-xl font-black text-slate-700">{rule.min}</span></div>
                  <div className="text-center"><span className="block text-xs uppercase text-slate-400 font-bold">MAX</span><span className="text-xl font-black text-slate-700">{rule.max}</span></div>
                </div>
             </div>
          </div>
        ))}
      </div>
      <button className="mt-8 w-full py-4 border-2 border-dashed border-cyan-300 text-cyan-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-50/50"><Settings2 /> Create Custom Rule</button>
    </div>
  </div>
);
export default TempRulesConfig;`,

  UploadDocs: `import React from 'react';
import { UploadCloud, FileText } from 'lucide-react';
const UploadDocs = () => (
  <div className="max-w-3xl mx-auto animate-fade-in-up flex flex-col items-center justify-center py-10">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-black text-slate-800">Upload Certifications</h2>
      <p className="text-slate-500">Documents will be hashed and verified via InterPlanetary File System (IPFS).</p>
    </div>
    <div className="w-full bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl p-16 flex flex-col items-center justify-center text-center hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer">
       <UploadCloud className="w-16 h-16 text-blue-500 mb-4 animate-bounce" />
       <h3 className="text-xl font-bold text-slate-700">Drag & Drop Files Here</h3>
       <p className="text-slate-500 mt-2">Supports PDF, JSON, PNG up to 50MB</p>
       <button className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:-translate-y-1 transition-all">Browse Files</button>
    </div>
  </div>
);
export default UploadDocs;`,

  DocumentPreview: `import React from 'react';
import { FileSearch, ShieldCheck } from 'lucide-react';
const DocumentPreview = () => (
  <div className="max-w-6xl mx-auto animate-fade-in-up grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="col-span-2 bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden flex flex-col min-h-[600px] relative">
       <div className="bg-slate-800 text-slate-300 p-4 font-mono text-sm flex justify-between absolute top-0 w-full z-10 shadow-md">
          <span>file_preview_renderer.pdf</span>
          <span>Zoom: 100%</span>
       </div>
       <div className="flex-1 flex items-center justify-center text-slate-400 mt-12 bg-white m-8 shadow-2xl">
          <FileSearch className="w-12 h-12 opacity-50" />
       </div>
    </div>
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6">
      <h3 className="text-xl font-black text-slate-800 border-b border-slate-100 pb-4">Verification Metadata</h3>
      <div className="space-y-4">
         <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Document Status</p><p className="font-bold text-emerald-600 flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Verified Valid</p></div>
         <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">IPFS Hash (CID)</p><p className="font-mono text-xs text-blue-600 bg-blue-50 p-2 rounded">QmYwAPJzv5CZsnA625s3Xf2n...</p></div>
         <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Timestamp Signed</p><p className="font-bold text-slate-700">2026-04-29 14:02 UTC</p></div>
      </div>
      <button className="w-full mt-4 py-3 bg-slate-900 text-white rounded-xl font-bold">Attach to Ledger &rarr;</button>
    </div>
  </div>
);
export default DocumentPreview;`,

  SensorBinding: `import React from 'react';
import { Cpu, WifiHigh } from 'lucide-react';
const SensorBinding = () => (
   <div className="max-w-5xl mx-auto animate-fade-in-up space-y-8">
      <div className="text-center">
         <h2 className="text-3xl font-black text-slate-800">Hardware Sensor Binding</h2>
         <p className="text-slate-500 mt-2">Pair registered local IoT sensors to your active shipments via Bluetooth/RFID.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full animate-ping"></div>
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-blue-500/30 rounded-full animate-ping delay-150"></div>
           <div className="flex flex-col items-center justify-center h-64 relative z-10">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/50">
                 <WifiHigh className="w-10 h-10" />
               </div>
               <p className="text-blue-200 mt-6 font-mono tracking-widest font-semibold">SCANNING FOR HARDWARE...</p>
           </div>
        </div>
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
           <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Cpu className="text-indigo-600"/> Available Devices</h3>
           <div className="space-y-4">
             {[1,2].map(i => (
               <div key={i} className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 flex justify-between items-center transition-colors cursor-pointer">
                 <div>
                   <p className="font-bold text-slate-800">Sensor Node X-{i}A</p>
                   <p className="text-xs font-mono text-emerald-500 mt-1">BATTERY: 9{i}% | SIGNAL: STRONG</p>
                 </div>
                 <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-md">Bind To Batch</button>
               </div>
             ))}
           </div>
        </div>
      </div>
   </div>
);
export default SensorBinding;`,

  ActorKeySetup: `import React from 'react';
import { KeyRound, Shield } from 'lucide-react';
const ActorKeySetup = () => (
  <div className="max-w-4xl mx-auto animate-fade-in-up space-y-6">
    <div className="flex gap-4 items-center mb-8 border-b border-slate-100 pb-4">
      <div className="p-3 bg-red-50 text-red-600 rounded-xl"><Shield className="w-8 h-8"/></div>
      <div>
        <h2 className="text-2xl font-black text-slate-800">Security Credentials</h2>
        <p className="text-slate-500">Manage your private encryption keys used to sign transactions.</p>
      </div>
    </div>
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 space-y-6 border border-slate-100">
       <div className="space-y-2">
         <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Public Wallet Address (Identity)</label>
         <div className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-600 flex justify-between items-center text-sm">
            0x71C...49A2 
            <button className="text-blue-600 font-bold hover:underline font-sans text-xs">Copy</button>
         </div>
       </div>
       <div className="space-y-2">
         <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Master Private Signature Key</label>
         <div className="w-full px-5 py-4 bg-red-50 border border-red-200 rounded-xl font-mono text-red-600 flex justify-between items-center text-sm">
            ************************************************
            <button className="text-red-700 font-bold hover:underline font-sans text-xs">Reveal</button>
         </div>
         <p className="text-xs text-slate-400 font-semibold mt-2">DANGER: Never share this key with anyone. It gives full control.</p>
       </div>
    </div>
  </div>
);
export default ActorKeySetup;`,

  RiskAssessment: `import React from 'react';
import { HeartPulse, CheckSquare } from 'lucide-react';
const RiskAssessment = () => (
  <div className="max-w-5xl mx-auto animate-fade-in-up space-y-6">
     <div className="text-center mb-10"><h2 className="text-3xl font-black text-slate-800">AI Risk Matrix</h2></div>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[ { label: 'Route Vulnerability', risk: 'Low', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
           { label: 'Carrier History', risk: 'Medium', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
           { label: 'Spoilage Probability', risk: 'Low', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
        ].map((item, i) => (
          <div key={i} className={\`p-6 rounded-2xl border \${item.color} flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden\`}>
             <h3 className="font-bold text-lg mb-2">{item.label}</h3>
             <span className="text-sm font-black uppercase tracking-widest opacity-80 backdrop-blur-md px-3 py-1 rounded bg-white/50">{item.risk} RISK</span>
          </div>
        ))}
     </div>
     <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl mt-8 flex justify-between items-center">
       <div>
         <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2"><CheckSquare className="w-5 h-5 text-blue-500"/> Assessment Passed</h4>
         <p className="text-slate-500 text-sm mt-1">This shipment has a 98% probability of success according to ledger models.</p>
       </div>
       <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold">Acknowledge</button>
     </div>
  </div>
);
export default RiskAssessment;`,

  OnChainRegister: `import React from 'react';
import { Terminal, Lock } from 'lucide-react';
const OnChainRegister = () => (
   <div className="max-w-3xl mx-auto animate-fade-in-up">
      <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 text-green-400 font-mono text-sm leading-relaxed relative">
        <div className="bg-slate-800 p-4 border-b border-slate-700 flex gap-2 items-center text-slate-400 font-sans">
           <Terminal className="w-5 h-5"/> <span>Smart Contract Executor</span>
        </div>
        <div className="p-8 space-y-4">
           <p className="opacity-80">> Initializing consensus protocol...</p>
           <p className="opacity-80">> Compiling shipment variables constraints...</p>
           <p className="opacity-80">> Pinging nodes 1... 4... 12... [OK]</p>
           <p className="text-yellow-400">> Requesting Signature payload required for TX allocation.</p>
           
           <div className="mt-8 p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-md relative z-10 flex flex-col items-center justify-center text-center">
              <Lock className="w-10 h-10 text-yellow-500 mb-4 animate-pulse" />
              <p className="text-white font-sans font-bold text-lg mb-4">Sign Contract To Execute</p>
              <button className="px-8 py-3 bg-green-500 text-slate-900 font-black rounded hover:bg-green-400 transition-colors">APPROVE TRANSACTION</button>
           </div>
        </div>
      </div>
   </div>
);
export default OnChainRegister;`,

  QRGenerator: `import React from 'react';
import { QrCode, Printer } from 'lucide-react';
const QRGenerator = () => (
  <div className="max-w-4xl mx-auto animate-fade-in-up flex flex-col items-center">
     <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-slate-800">Physical Labels</h2>
        <p className="text-slate-500">Attach tracking visual identifiers to the outward packaging.</p>
     </div>
     <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center hover:shadow-2xl transition-all">
        <div className="w-64 h-64 bg-slate-50 border-4 border-slate-800 rounded-xl flex items-center justify-center relative">
           {/* Abstract fake QR Pattern */}
           <div className="absolute inset-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-900 [mask-image:repeating-linear-gradient(45deg,transparent,transparent_10px,black_10px,black_20px)] opacity-80"></div>
           <QrCode className="w-20 h-20 text-white z-10 drop-shadow-xl" />
        </div>
        <p className="font-mono text-slate-400 font-bold tracking-widest mt-6">ID: SHP-X889-1-V</p>
        <button className="mt-8 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl flex items-center gap-3 hover:-translate-y-1 transition-all"><Printer /> Print ZPL Label</button>
     </div>
  </div>
);
export default QRGenerator;`,

  AlertsMonitor: `import React from 'react';
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
        <div key={i} className={\`p-6 rounded-2xl flex items-start gap-4 shadow-sm border \${i===1 ? 'bg-red-50 border-red-200' : 'bg-white border-slate-100 hover:bg-slate-50'}\`}>
          <div className={\`p-3 rounded-full \${i===1 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}\`}>
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
export default AlertsMonitor;`,

  LedgerView: `import React from 'react';
import { Database, Link2 } from 'lucide-react';
const LedgerView = () => (
  <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
    <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border border-slate-800">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="relative z-10 flex items-center gap-6">
        <div className="p-4 bg-indigo-500/20 backdrop-blur-xl rounded-2xl border border-indigo-500/30"><Database className="w-8 h-8 text-indigo-400" /></div>
        <div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight">Immutable Ledger</h2>
          <p className="text-slate-400 mt-2 text-lg">Real-time cryptographic proofs and block-chain verifications.</p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto p-4 flex flex-col items-center justify-center text-slate-400 py-20 min-h-[400px]">
         <div className="animate-pulse w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
         <p className="font-mono text-sm uppercase tracking-widest font-bold text-indigo-900/50">Fetching Merkle Trees...</p>
      </div>
    </div>
  </div>
);
export default LedgerView;`,

  ExceptionCase: `import React from 'react';
import { FileWarning, HelpCircle } from 'lucide-react';
const ExceptionCase = () => (
  <div className="max-w-4xl mx-auto animate-fade-in-up space-y-6">
     <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-slate-800">Initiate Arbitration</h2>
        <p className="text-slate-500 mt-2">Submit documented disputes relating to rejected endpoints or damaged consignments.</p>
     </div>
     <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-slate-200"><HelpCircle className="w-32 h-32 opacity-20" /></div>
        <div className="relative z-10 space-y-6">
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Dispute Subject</label>
             <input type="text" placeholder="e.g. Broken SLA on Shipment X" className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 outline-none" />
           </div>
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Detailed Context</label>
             <textarea rows="4" placeholder="Describe the physical condition of the packaging upon arrival..." className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 outline-none"></textarea>
           </div>
           <button className="px-8 py-4 bg-red-600 text-white font-bold rounded-xl flex items-center gap-3 shadow-lg hover:bg-red-700 transition-colors"><FileWarning /> File Claim On-Chain</button>
        </div>
     </div>
  </div>
);
export default ExceptionCase;`
};

const producerPages = ["ProducerDashboard", "CreateShipment", "ProductBatchConfig", "RoutePlan", "TempRulesConfig", "UploadDocs", "DocumentPreview", "SensorBinding", "ActorKeySetup", "RiskAssessment", "OnChainRegister", "QRGenerator", "LedgerView", "AlertsMonitor", "ExceptionCase"];

producerPages.forEach(page => {
  const code = templates[page]; // All 15 templates are explicitly defined inside
  if(code) {
      fs.writeFileSync(path.join(producerDir, page + '.jsx'), code);
  }
});

console.log('Producer UI v3 (All 15 Fully Customized Modules) successfully generated!');
