import fs from 'fs';
import path from 'path';

const pages = {
  warehouse: {
    WarehouseDashboard: { title: 'Warehouse Dashboard', data: 'storageZones, inventoryItems, warehouseAlerts', stats: [
      {l:'Storage Zones',v:'4',c:'teal'},{l:'Active Sensors',v:'6',c:'blue'},{l:'Items in Stock',v:'9,950',c:'emerald'},{l:'Open Alerts',v:'1',c:'amber'}
    ]},
    SecureAccess: { title: 'Secure Access Control', data: 'accessLog', table: {cols:['ID','Person','Role','Zone','Action','Method','Time'], keys:['id','person','role','zone','action','method','timestamp']}},
    ReceiveShipment: { title: 'Receive Shipment', data: 'receivedShipments', table: {cols:['ID','Shipment','Product','Zone','Qty','Temp','Status'], keys:['id','shipmentId','product','zone','qty','tempOnArrival','status']}},
    StorageAllocation: { title: 'Storage Allocation', data: 'storageZones', cards: true },
    ColdMonitoring: { title: 'Cold Chain Monitoring', data: 'coldReadings, storageZones', chart: true },
    SensorAnalytics: { title: 'Sensor Analytics', data: 'warehouseSensors', table: {cols:['ID','Zone','Type','Status','Battery','Signal','Reading','Sync'], keys:['id','zone','type','status','battery','signal','lastReading','lastSync']}},
    DataGapDetection: { title: 'Data Gap Detection', data: 'dataGaps', table: {cols:['ID','Zone','Sensor','Duration','Severity','Cause'], keys:['id','zone','sensor','duration','severity','cause']}},
    ManualInspection: { title: 'Manual Inspection', data: 'inspectionRecords', table: {cols:['ID','Zone','Inspector','Date','Findings','Result'], keys:['id','zone','inspector','date','findings','result']}},
    UploadDocs: { title: 'Upload Documents', form: 'upload' },
    HandoffPrep: { title: 'Handoff Preparation', form: 'handoff' },
    SLACompliance: { title: 'SLA Compliance', data: 'slaMetrics', table: {cols:['Metric','Target','Actual','Status'], keys:['metric','target','actual','status']}},
    AlertHandling: { title: 'Alert Handling', data: 'warehouseAlerts', table: {cols:['ID','Severity','Message','Zone','Status'], keys:['id','severity','message','zone','status']}},
    InventoryView: { title: 'Inventory View', data: 'inventoryItems', table: {cols:['Batch','Product','Zone','Qty','Received','Expiry','Status'], keys:['batch','product','zone','qty','receivedDate','expiryDate','status']}},
    SyncStatus: { title: 'Blockchain Sync Status', data: 'syncStatus', table: {cols:['Node','Status','Last Block','Latency'], keys:['node','status','lastBlock','latency']}},
    ProfileSettings: { title: 'Profile Settings', form: 'profile' },
  },
  transporter: {
    Login: { title: 'Transporter Authentication', form: 'auth' },
    PickupEvent: { title: 'Pickup Event', form: 'pickup' },
    HandoffEvent: { title: 'Custody Handoff', form: 'handoff' },
    SensorMonitor: { title: 'Sensor Monitor', inline: true },
    SensorCheck: { title: 'Pre-Trip Sensor Check', form: 'checklist' },
    TemperatureGraph: { title: 'Temperature Timeline', chart: true },
    IncidentReport: { title: 'Incident Report', form: 'incident' },
    SensorFailure: { title: 'Sensor Failure Diagnostics', inline: true },
    OfflineQueue: { title: 'Offline Transaction Queue', inline: true },
    SyncEngine: { title: 'Sync Engine', inline: true },
    AlertResponse: { title: 'Alert Response Queue', inline: true },
    DeliveryConfirm: { title: 'Delivery Confirmation', form: 'delivery' },
    ProfileSettings: { title: 'Profile Settings', form: 'profile' },
  },
  inspector: {
    SecureAuth: { title: 'Inspector Authentication', form: 'auth' },
    ChecklistEngine: { title: 'Inspection Checklist', form: 'checklist' },
    PhysicalEntry: { title: 'Physical Inspection Entry', form: 'inspection' },
    SensorValidation: { title: 'Sensor Validation', data: 'validatedSensors', table: {cols:['Sensor ID','Shipment','Battery','Calibration','Last Sync'], keys:['sensorId','shipment','battery','calibStatus','lastSync']}},
    DocumentCheck: { title: 'Document Verification', inline: true },
    UploadReport: { title: 'Upload Inspection Report', form: 'upload' },
    PassFail: { title: 'Inspection Verdict', form: 'verdict' },
    FraudPanel: { title: 'Fraud Detection Panel', data: 'fraudAlerts', inline: true },
    CreateAlert: { title: 'Create Alert', form: 'alert' },
    Timeline: { title: 'Event Timeline', inline: true },
    Escalation: { title: 'Escalation Workflow', inline: true },
    ProfileSettings: { title: 'Profile Settings', form: 'profile' },
  },
  retailer: {
    SecureLogin: { title: 'Retailer Authentication', form: 'auth' },
    ScanShipment: { title: 'Scan Shipment', form: 'scan' },
    LedgerExplorer: { title: 'Blockchain Ledger Explorer', inline: true },
    DocumentValidation: { title: 'Document Validation', inline: true },
    SensorGraph: { title: 'Sensor Data Graph', chart: true },
    AlertSummary: { title: 'Alert Summary', inline: true },
    AcceptReject: { title: 'Accept / Reject Shipment', form: 'decision' },
    FinalReport: { title: 'Final Shipment Report', inline: true },
    CustomerView: { title: 'Customer Verification Portal', inline: true },
    RaiseComplaint: { title: 'Raise Complaint', form: 'complaint' },
    DeliveryLog: { title: 'Delivery Log', data: 'recentDeliveries', table: {cols:['ID','Shipment','Received','QA Status','Temp'], keys:['id','shipment','received','QAStatus','tempStability']}},
    ShipmentHistory: { title: 'Shipment History', data: 'inboundShipments', table: {cols:['ID','Product','Origin','Format','Status','ETA'], keys:['id','product','origin','expectedFormat','status','eta']}},
    ComplianceView: { title: 'Compliance Dashboard', inline: true },
    ProfileSettings: { title: 'Profile Settings', form: 'profile' },
  },
  regulator: {
    AuthorityAccess: { title: 'Authority Access', form: 'auth' },
    GlobalOverview: { title: 'Global Overview', inline: true },
    LedgerExplorer: { title: 'Ledger Explorer', inline: true },
    DocumentValidator: { title: 'Document Validator', inline: true },
    SensorAudit: { title: 'Sensor Audit Trail', data: 'auditData', table: {cols:['ID','Facility','Inspector','Findings','Date'], keys:['id','facility','inspector','findings','date']}},
    AlertAnalytics: { title: 'Alert Analytics', inline: true },
    ViolationDetection: { title: 'Violation Detection', data: 'activeCases', table: {cols:['Case ID','Severity','Description','Status'], keys:['caseId','severity','description','status']}},
    ApprovalPanel: { title: 'Approval Panel', inline: true },
    CaseManagement: { title: 'Case Management', data: 'activeCases', table: {cols:['Case ID','Severity','Description','Status'], keys:['caseId','severity','description','status']}},
    AuditTrail: { title: 'Audit Trail', data: 'auditData', table: {cols:['ID','Facility','Inspector','Findings','Date'], keys:['id','facility','inspector','findings','date']}},
    EntityComparison: { title: 'Entity Comparison', data: 'complianceData', table: {cols:['ID','Entity','Status','Score','Last Audit'], keys:['id','entity','status','score','lastAudit']}},
    ReportsExport: { title: 'Reports & Export', form: 'export' },
    Settings: { title: 'System Settings', form: 'settings' },
  },
};

const roleColors = {
  warehouse: { accent: 'teal', icon: '📦' },
  transporter: { accent: 'orange', icon: '🚚' },
  inspector: { accent: 'red', icon: '🔍' },
  retailer: { accent: 'emerald', icon: '🛒' },
  regulator: { accent: 'purple', icon: '⚖️' },
};

function genTable(cfg, dataVar) {
  const rows = cfg.keys.map(k => `<td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{row.${k}}</td>`).join('\n                    ');
  const heads = cfg.cols.map(c => `<th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">${c}</th>`).join('\n                    ');
  return `
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                    ${heads}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {${dataVar}.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    ${rows}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>`;
}

function genForm(type, accent) {
  const fields = {
    auth: [['Email Address','email','text'],['Password','password','password']],
    profile: [['Full Name','name','text'],['Email','email','email'],['Organization','org','text']],
    upload: [['Document Title','title','text'],['Category','category','text']],
    handoff: [['Shipment ID','shipmentId','text'],['Recipient Name','recipient','text'],['Notes','notes','text']],
    pickup: [['Shipment ID','shipmentId','text'],['Vehicle ID','vehicleId','text'],['Driver','driver','text']],
    incident: [['Report Title','title','text'],['Severity','severity','text'],['Description','description','text']],
    delivery: [['Shipment ID','shipmentId','text'],['Recipient','recipient','text'],['Condition','condition','text']],
    checklist: [['Item Name','item','text'],['Status','status','text']],
    inspection: [['Zone / Area','zone','text'],['Measurements','measurements','text'],['Notes','notes','text']],
    verdict: [['Inspection ID','inspId','text'],['Decision','decision','text'],['Reason','reason','text']],
    alert: [['Alert Title','title','text'],['Severity','severity','text'],['Description','desc','text']],
    scan: [['Shipment ID / QR Code','shipmentId','text']],
    decision: [['Shipment ID','shipmentId','text'],['Decision','decision','text'],['Comments','comments','text']],
    complaint: [['Subject','subject','text'],['Shipment Reference','ref','text'],['Description','desc','text']],
    export: [['Report Type','type','text'],['Date Range','dateRange','text']],
    settings: [['Organization Name','orgName','text'],['Notification Email','notifEmail','email']],
  };
  const f = fields[type] || fields.profile;
  const inputs = f.map(([label, id, t]) => `
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">${label}</label>
            <input type="${t}" placeholder="Enter ${label.toLowerCase()}" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-${accent}-500 focus:ring-2 focus:ring-${accent}-100 transition-all outline-none bg-slate-50 text-slate-800 text-sm" />
          </div>`).join('');
  
  if (type === 'upload') {
    return `
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">
        ${inputs}
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center hover:border-${accent}-300 hover:bg-${accent}-50/30 transition-colors cursor-pointer">
          <p className="text-slate-500 font-medium">Drag & drop files here or click to browse</p>
          <p className="text-xs text-slate-400 mt-1">PDF, JSON, PNG up to 50MB</p>
        </div>
        <button className="w-full py-3 bg-${accent}-600 text-white rounded-xl font-semibold hover:bg-${accent}-700 transition-colors">Upload & Hash to Blockchain</button>
      </div>`;
  }

  return `
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-w-2xl">
        <div className="space-y-5">
          ${inputs}
        </div>
        <button className="mt-8 w-full py-3 bg-${accent}-600 text-white rounded-xl font-semibold hover:bg-${accent}-700 transition-colors">Submit</button>
      </div>`;
}

function genInline(title, accent) {
  const inlineData = {
    'Sensor Monitor': { items: [
      {label:'Sensor A',value:'-71.2°C',status:'Active'},{label:'Sensor B',value:'-70.8°C',status:'Active'},
      {label:'Humidity',value:'35%',status:'Active'},{label:'Pressure',value:'101.3 kPa',status:'Active'}
    ]},
    'Sensor Failure Diagnostics': { items: [
      {label:'WS-004',value:'Battery Critical (28%)',status:'Warning'},{label:'WS-007',value:'Signal Lost',status:'Offline'}
    ]},
    'Offline Transaction Queue': { items: [
      {label:'TX-9001',value:'Pending sensor reading upload',status:'Queued'},{label:'TX-9002',value:'Handoff confirmation',status:'Queued'}
    ]},
    'Sync Engine': { items: [
      {label:'Mainnet',value:'Synced (Block 12,839,520)',status:'Active'},{label:'IPFS',value:'Connected',status:'Active'},
      {label:'Local Edge',value:'Syncing...',status:'Pending'}
    ]},
    'Alert Response Queue': { items: [
      {label:'ALT-501',value:'Temperature excursion SHP-1001',status:'Critical'},{label:'ALT-504',value:'Humidity approaching threshold',status:'Warning'}
    ]},
    'Document Verification': { items: [
      {label:'Certificate of Analysis',value:'Hash verified ✓',status:'Verified'},{label:'Temperature Log',value:'Hash verified ✓',status:'Verified'},
      {label:'Shipping Label',value:'Pending review',status:'Pending'}
    ]},
    'Fraud Detection Panel': { items: [
      {label:'F-001',value:'Spoofed UUID Token detected on SHP-1002',status:'Critical'},{label:'F-002',value:'Unusual sensor pattern on SHP-1004',status:'Investigating'}
    ]},
    'Event Timeline': { items: [
      {label:'16:45',value:'Temperature reading: -70.2°C',status:'Info'},{label:'16:30',value:'Location updated: 40.71°N',status:'Info'},
      {label:'16:00',value:'Sensors synchronized',status:'Info'},{label:'15:30',value:'Route checkpoint passed',status:'Info'}
    ]},
    'Escalation Workflow': { items: [
      {label:'ESC-001',value:'Critical temp excursion → Supervisor notified',status:'Escalated'},{label:'ESC-002',value:'Fraud alert → Compliance team review',status:'In Review'}
    ]},
    'Blockchain Ledger Explorer': { items: [
      {label:'Block 12839420',value:'create_shipment by Producer Admin',status:'Confirmed'},{label:'Block 12839445',value:'update_temp_rules by Quality Mgr',status:'Confirmed'},
      {label:'Block 12839467',value:'bind_sensors by Producer Admin',status:'Confirmed'}
    ]},
    'Document Validation': { items: [
      {label:'DOC-001',value:'Certificate of Analysis — Verified',status:'Valid'},{label:'DOC-002',value:'Temperature Log — Verified',status:'Valid'}
    ]},
    'Alert Summary': { items: [
      {label:'Critical',value:'1 active alert',status:'Critical'},{label:'Warning',value:'2 active alerts',status:'Warning'},{label:'Info',value:'5 resolved',status:'Info'}
    ]},
    'Final Shipment Report': { items: [
      {label:'Chain Integrity',value:'100% verified — 3 blocks',status:'Pass'},{label:'Temp Compliance',value:'All readings within range',status:'Pass'},
      {label:'Documents',value:'3/3 verified on IPFS',status:'Pass'},{label:'Overall',value:'SHIPMENT APPROVED',status:'Pass'}
    ]},
    'Customer Verification Portal': { items: [
      {label:'Product',value:'Pfizer BNT162b2 — Batch 2024-001',status:'Verified'},{label:'Origin',value:'Kalamazoo, MI → NYC Hub',status:'Traced'},
      {label:'Cold Chain',value:'100% compliant throughout',status:'Pass'}
    ]},
    'Compliance Dashboard': { items: [
      {label:'FDA 21 CFR Part 211',value:'Compliant',status:'Pass'},{label:'WHO GDP Guidelines',value:'Compliant',status:'Pass'},
      {label:'EU GMP Annex 15',value:'Under review',status:'Pending'}
    ]},
    'Global Overview': { items: [
      {label:'Active Shipments',value:'47 globally',status:'Active'},{label:'Compliance Rate',value:'94.2%',status:'Active'},
      {label:'Open Violations',value:'3 pending',status:'Warning'},{label:'Entities Monitored',value:'128',status:'Active'}
    ]},
    'Ledger Explorer': { items: [
      {label:'Total Transactions',value:'14,892',status:'Active'},{label:'Latest Block',value:'#12,839,520',status:'Synced'},
      {label:'Network Nodes',value:'24 active',status:'Active'}
    ]},
    'Document Validator': { items: [
      {label:'Certificates Verified',value:'1,247 total',status:'Active'},{label:'Pending Review',value:'12 documents',status:'Pending'},
      {label:'Rejected',value:'3 this month',status:'Warning'}
    ]},
    'Alert Analytics': { items: [
      {label:'Total Alerts (30d)',value:'127',status:'Info'},{label:'Critical',value:'8 (6.3%)',status:'Critical'},
      {label:'Avg Response Time',value:'8.2 min',status:'Active'},{label:'Resolution Rate',value:'97.6%',status:'Pass'}
    ]},
    'Approval Panel': { items: [
      {label:'APR-001',value:'New carrier registration — FastTrans',status:'Pending'},{label:'APR-002',value:'License renewal — PharmaCorp',status:'Pending'}
    ]},
  };

  const data = inlineData[title] || { items: [{label:'Status',value:'Module operational',status:'Active'}] };
  
  const statusColors = (s) => {
    const m = {Active:'emerald',Verified:'emerald',Pass:'emerald',Valid:'emerald',Confirmed:'emerald',Traced:'emerald',Synced:'emerald',
      Warning:'amber',Pending:'amber','In Review':'amber',Investigating:'amber',Queued:'amber',
      Critical:'red',Offline:'red',Escalated:'red',Info:'blue','In Progress':'blue',Syncing:'blue'};
    return m[s] || 'slate';
  };

  const cards = data.items.map((item, i) => {
    const c = statusColors(item.status);
    return `
          <div key={${i}} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-slate-800">${item.label}</span>
              <span className="text-xs px-2 py-1 rounded-full font-semibold bg-${c}-100 text-${c}-700">${item.status}</span>
            </div>
            <p className="text-sm text-slate-600">${item.value}</p>
          </div>`;
  }).join('');

  return `
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${cards}
      </div>`;
}

function genStats(stats, accent) {
  const cards = stats.map((s, i) => `
          <div key={${i}} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">${s.l}</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">${s.v}</p>
          </div>`).join('');
  return `
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        ${cards}
      </div>`;
}

function genStorageCards() {
  return `
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {storageZones.map((zone, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-slate-800">{zone.name}</span>
              <span className={\`text-xs px-2 py-1 rounded-full font-semibold \${zone.status === 'operational' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}\`}>{zone.status}</span>
            </div>
            <p className="text-xs text-slate-500 mb-2">Range: {zone.tempRange}</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-blue-600">{zone.currentTemp}</span>
              <span className="text-xs text-slate-500">{zone.units} units</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-teal-500 h-2 rounded-full" style={{width: zone.capacity + '%'}}></div>
            </div>
            <p className="text-xs text-slate-400 mt-1">{zone.capacity}% capacity</p>
          </div>
        ))}
      </div>`;
}

function genChart(accent) {
  return `
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="space-y-3">
          {[
            {t:'16:45',v:92,c:'${accent}'}, {t:'16:30',v:88,c:'${accent}'}, {t:'16:15',v:95,c:'${accent}'},
            {t:'16:00',v:85,c:'${accent}'}, {t:'15:45',v:90,c:'${accent}'}, {t:'15:30',v:87,c:'${accent}'}
          ].map((point, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-xs text-slate-500 w-12 font-mono">{point.t}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-3">
                <div className={\`bg-${accent}-500 h-3 rounded-full transition-all duration-500\`} style={{width: point.v + '%'}}></div>
              </div>
              <span className="text-xs font-semibold text-slate-700 w-10 text-right">{point.v}%</span>
            </div>
          ))}
        </div>
      </div>`;
}

// Generate all files
for (const [role, rolePages] of Object.entries(pages)) {
  const rc = roleColors[role];
  const accent = rc.accent;
  const dir = path.join('src', role);
  
  for (const [compName, cfg] of Object.entries(rolePages)) {
    const filePath = path.join(dir, `${compName}.jsx`);
    
    let dataImport = '';
    if (cfg.data) {
      dataImport = `import { ${cfg.data} } from './dummyData';\n`;
    }

    let body = '';
    
    if (cfg.stats) {
      body += genStats(cfg.stats, accent);
    }
    
    if (cfg.cards) {
      body += genStorageCards();
    }
    
    if (cfg.table) {
      const dataVar = cfg.data ? cfg.data.split(',')[0].trim() : 'data';
      body += genTable(cfg.table, dataVar);
    }
    
    if (cfg.chart) {
      body += genChart(accent);
    }
    
    if (cfg.form) {
      body += genForm(cfg.form, accent);
    }
    
    if (cfg.inline) {
      body += genInline(cfg.title, accent);
    }
    
    if (!body) {
      body = genInline(cfg.title, accent);
    }

    const component = `import { useState } from 'react';
${dataImport}
const ${compName} = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">${cfg.title}</h2>
          <p className="text-slate-500 text-sm mt-1">${role.charAt(0).toUpperCase() + role.slice(1)} module — blockchain verified</p>
        </div>
      </div>
      ${body}
    </div>
  );
};

export default ${compName};
`;

    fs.writeFileSync(filePath, component);
    console.log(`✓ ${filePath}`);
  }
}

console.log('\\nAll pages generated successfully!');
