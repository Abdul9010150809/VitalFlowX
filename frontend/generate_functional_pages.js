import fs from 'fs';
import path from 'path';

const pages = {
  warehouse: {
    SecureAccess: { title: 'Secure Access Control', table: {cols:['ID','Person','Role','Zone','Action','Method','Time'], keys:['id','person','role','zone','action','method','timestamp']} },
    ReceiveShipment: { title: 'Receive Shipment', table: {cols:['ID','Shipment','Product','Zone','Qty','Temp','Status'], keys:['id','shipmentId','product','zone','qty','tempOnArrival','status']} },
    SensorAnalytics: { title: 'Sensor Analytics', table: {cols:['ID','Zone','Type','Status','Battery','Signal','Reading','Sync'], keys:['id','zone','type','status','battery','signal','lastReading','lastSync']} },
    DataGapDetection: { title: 'Data Gap Detection', table: {cols:['ID','Zone','Sensor','Duration','Severity','Cause'], keys:['id','zone','sensor','duration','severity','cause']} },
    ManualInspection: { title: 'Manual Inspection', table: {cols:['ID','Zone','Inspector','Date','Findings','Result'], keys:['id','zone','inspector','date','findings','result']} },
    UploadDocs: { title: 'Upload Documents', form: 'upload' },
    HandoffPrep: { title: 'Handoff Preparation', form: 'handoff' },
    SLACompliance: { title: 'SLA Compliance', table: {cols:['Metric','Target','Actual','Status'], keys:['metric','target','actual','status']} },
    AlertHandling: { title: 'Alert Handling', table: {cols:['ID','Severity','Message','Zone','Status'], keys:['id','severity','message','zone','status']} },
    InventoryView: { title: 'Inventory View', table: {cols:['Batch','Product','Zone','Qty','Received','Expiry','Status'], keys:['batch','product','zone','qty','receivedDate','expiryDate','status']} },
    SyncStatus: { title: 'Blockchain Sync Status', table: {cols:['Node','Status','Last Block','Latency'], keys:['node','status','lastBlock','latency']} },
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
    SensorValidation: { title: 'Sensor Validation', table: {cols:['Sensor ID','Shipment','Battery','Calibration','Last Sync'], keys:['sensorId','shipment','battery','calibStatus','lastSync']} },
    DocumentCheck: { title: 'Document Verification', inline: true },
    UploadReport: { title: 'Upload Inspection Report', form: 'upload' },
    PassFail: { title: 'Inspection Verdict', form: 'verdict' },
    FraudPanel: { title: 'Fraud Detection Panel', inline: true },
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
    DeliveryLog: { title: 'Delivery Log', table: {cols:['ID','Shipment','Received','QA Status','Temp'], keys:['id','shipment','received','QAStatus','tempStability']} },
    ShipmentHistory: { title: 'Shipment History', table: {cols:['ID','Product','Origin','Format','Status','ETA'], keys:['id','product','origin','expectedFormat','status','eta']} },
    ComplianceView: { title: 'Compliance Dashboard', inline: true },
    ProfileSettings: { title: 'Profile Settings', form: 'profile' },
  },
  regulator: {
    AuthorityAccess: { title: 'Authority Access', form: 'auth' },
    GlobalOverview: { title: 'Global Overview', inline: true },
    LedgerExplorer: { title: 'Ledger Explorer', inline: true },
    DocumentValidator: { title: 'Document Validator', inline: true },
    SensorAudit: { title: 'Sensor Audit Trail', table: {cols:['ID','Facility','Inspector','Findings','Date'], keys:['id','facility','inspector','findings','date']} },
    AlertAnalytics: { title: 'Alert Analytics', inline: true },
    ViolationDetection: { title: 'Violation Detection', table: {cols:['Case ID','Severity','Description','Status'], keys:['caseId','severity','description','status']} },
    ApprovalPanel: { title: 'Approval Panel', inline: true },
    CaseManagement: { title: 'Case Management', table: {cols:['Case ID','Severity','Description','Status'], keys:['caseId','severity','description','status']} },
    AuditTrail: { title: 'Audit Trail', table: {cols:['ID','Facility','Inspector','Findings','Date'], keys:['id','facility','inspector','findings','date']} },
    EntityComparison: { title: 'Entity Comparison', table: {cols:['ID','Entity','Status','Score','Last Audit'], keys:['id','entity','status','score','lastAudit']} },
    ReportsExport: { title: 'Reports & Export', form: 'export' },
    Settings: { title: 'System Settings', form: 'settings' },
  },
};

const roleColors = { warehouse: 'teal', transporter: 'orange', inspector: 'red', retailer: 'emerald', regulator: 'purple' };

function genInteractiveTable(cfg, accent) {
  const heads = cfg.cols.map(c => "<th className=\"px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider\">" + c + "</th>").join('\\n');
  const rows = cfg.keys.map(k => "<td className=\"px-4 py-3 text-sm text-slate-600 whitespace-nowrap\">{row." + k + " || 'N/A'}</td>").join('\\n');
  
  return "<div className=\"bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full\">\n" +
    "  <div className=\"p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50\">\n" +
    "    <input type=\"text\" placeholder=\"Search records...\" className=\"px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-" + accent + "-500 focus:ring-1 focus:ring-" + accent + "-500\" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />\n" +
    "    <span className=\"text-sm text-slate-500\">{filteredData.length} records found</span>\n" +
    "  </div>\n" +
    "  <div className=\"overflow-x-auto\">\n" +
    "    <table className=\"min-w-full divide-y divide-slate-100\">\n" +
    "      <thead className=\"bg-slate-50\"><tr>\n" + heads + "\n</tr></thead>\n" +
    "      <tbody className=\"divide-y divide-slate-50\">\n" +
    "        {filteredData.map((row, i) => (\n" +
    "          <tr key={i} className=\"hover:bg-slate-50/50 transition-colors\">\n" + rows + "\n          </tr>\n" +
    "        ))}\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "    {filteredData.length === 0 && <div className=\"p-8 text-center text-slate-500\">No matching records found.</div>}\n" +
    "  </div>\n" +
    "</div>";
}

function genInteractiveForm(type, accent) {
  const fields = {
    auth: [['Email','email'],['Password','password']],
    profile: [['Name','text'],['Email','email']],
    upload: [['Title','text'],['Category','text']],
    handoff: [['Shipment ID','text'],['Notes','text']],
    pickup: [['Shipment ID','text'],['Driver','text']],
    incident: [['Title','text'],['Description','text']],
    delivery: [['Shipment ID','text'],['Condition','text']],
    checklist: [['Item','text'],['Status','text']],
    inspection: [['Zone','text'],['Notes','text']],
    verdict: [['Inspection ID','text'],['Decision','text']],
    alert: [['Title','text'],['Description','text']],
    scan: [['QR Code','text']],
    decision: [['Shipment ID','text'],['Comments','text']],
    complaint: [['Subject','text'],['Description','text']],
    export: [['Type','text'],['Date Range','text']],
    settings: [['Org Name','text']],
  };
  
  const f = fields[type] || fields.profile;
  const inputs = f.map(([lbl, t]) => 
    "<div className=\"space-y-2\">\n" +
    "  <label className=\"text-xs font-semibold text-slate-500 uppercase tracking-wider\">" + lbl + "</label>\n" +
    "  <input type=\"" + t + "\" name=\"" + lbl.toLowerCase().replace(/ /g,'_') + "\" placeholder=\"Enter " + lbl + "\" required className=\"w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-" + accent + "-500 focus:outline-none\" />\n" +
    "</div>"
  ).join('\n');
          
  return "<div className=\"bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-w-2xl mx-auto\">\n" +
    "  {success ? (\n" +
    "    <div className=\"bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 mb-6 flex items-center gap-3\">\n" +
    "       <div className=\"w-8 h-8 bg-green-100 rounded-full flex items-center justify-center\">✓</div>\n" +
    "       <div className=\"flex-1\">\n" +
    "         <p className=\"font-bold\">Success!</p>\n" +
    "         <p className=\"text-sm\">Action has been recorded on the blockchain.</p>\n" +
    "       </div>\n" +
    "       <button type=\"button\" onClick={() => setSuccess(false)} className=\"text-green-800 hover:underline text-sm\">Dismiss</button>\n" +
    "    </div>\n" +
    "  ) : null}\n" +
    "  <form onSubmit={handleSubmit} className=\"space-y-5\">\n" +
    "    " + inputs + "\n" +
    "    <button type=\"submit\" disabled={isSubmitting} className={`mt-8 w-full py-3 rounded-xl font-semibold text-white transition-colors ${isSubmitting ? 'bg-slate-400' : 'bg-" + accent + "-600 hover:bg-" + accent + "-700'}`}>\n" +
    "      {isSubmitting ? 'Processing Transaction...' : 'Submit to Ledger'}\n" +
    "    </button>\n" +
    "  </form>\n" +
    "</div>";
}

for (const [role, rolePages] of Object.entries(pages)) {
  const accent = roleColors[role];
  const dir = path.join('src', role);
  
  for (const [compName, cfg] of Object.entries(rolePages)) {
    const filePath = path.join(dir, compName + ".jsx");
    
    let body = '';
    let stateDecls = "  const [isSubmitting, setIsSubmitting] = useState(false);\n" +
                     "  const [success, setSuccess] = useState(false);\n" +
                     "  const [searchTerm, setSearchTerm] = useState('');\n" +
                     "  const handleSubmit = (e) => {\n" +
                     "    e.preventDefault();\n" +
                     "    setIsSubmitting(true);\n" +
                     "    setTimeout(() => { setIsSubmitting(false); setSuccess(true); e.target.reset(); }, 1500);\n" +
                     "  };";
  
    let mockDataDecl = '';

    if (cfg.table) {
      mockDataDecl = "  const mockData = Array(5).fill(0).map((_,i) => ({" + cfg.table.keys.map(k => k + ": 'Sample ' + i").join(', ') + "}));\n" +
                     "  const filteredData = mockData.filter(row => Object.values(row).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase())));";
      body += genInteractiveTable(cfg.table, accent);
    } else if (cfg.form) {
      body += genInteractiveForm(cfg.form, accent);
    } else {
      body += "<div className=\"bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center text-slate-500\">\n" +
              "   <p className=\"mb-4\">This section displays " + cfg.title + " data securely retrieved from the blockchain.</p>\n" +
              "   <button onClick={() => setSuccess(!success)} className=\"px-4 py-2 bg-" + accent + "-100 text-" + accent + "-700 rounded-lg hover:bg-" + accent + "-200\">\n" +
              "     {success ? 'Connected' : 'Click to Connect Node'}\n" +
              "   </button>\n" +
              "</div>";
    }

    const component = "import { useState } from 'react';\n\n" +
                      "const " + compName + " = () => {\n" +
                      stateDecls + "\n" +
                      mockDataDecl + "\n\n" +
                      "  return (\n" +
                      "    <div className=\"space-y-6 animate-fade-in-up\">\n" +
                      "      <div className=\"flex items-center justify-between mb-6\">\n" +
                      "        <div>\n" +
                      "          <h2 className=\"text-2xl font-bold text-slate-800\">" + cfg.title + "</h2>\n" +
                      "          <p className=\"text-slate-500 text-sm mt-1\">" + role.charAt(0).toUpperCase() + role.slice(1) + " module — functionality enabled</p>\n" +
                      "        </div>\n" +
                      "      </div>\n" +
                      "      " + body + "\n" +
                      "    </div>\n" +
                      "  );\n" +
                      "};\n\n" +
                      "export default " + compName + ";\n";

    fs.writeFileSync(filePath, component);
    console.log("✓ " + filePath);
  }
}

console.log('\\nAll pages successfully regenerated with functional state!');
