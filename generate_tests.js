import fs from 'fs';
import path from 'path';

const roles = {
  producer: ["ProducerDashboard", "CreateShipment", "ProductBatchConfig", "RoutePlan", "TempRulesConfig", "UploadDocs", "DocumentPreview", "SensorBinding", "ActorKeySetup", "RiskAssessment", "OnChainRegister", "QRGenerator", "LedgerView", "AlertsMonitor", "ExceptionCase"],
  transporter: ["TransportDashboard", "Login", "PickupEvent", "HandoffEvent", "LiveTracking", "SensorMonitor", "SensorCheck", "TemperatureGraph", "IncidentReport", "SensorFailure", "OfflineQueue", "SyncEngine", "AlertResponse", "DeliveryConfirm", "ProfileSettings"],
  warehouse: ["WarehouseDashboard", "SecureAccess", "ReceiveShipment", "StorageAllocation", "ColdMonitoring", "SensorAnalytics", "DataGapDetection", "ManualInspection", "UploadDocs", "HandoffPrep", "SLACompliance", "AlertHandling", "InventoryView", "SyncStatus", "ProfileSettings"],
  retailer: ["RetailDashboard", "SecureLogin", "ScanShipment", "LedgerExplorer", "DocumentValidation", "SensorGraph", "AlertSummary", "AcceptReject", "FinalReport", "CustomerView", "RaiseComplaint", "DeliveryLog", "ShipmentHistory", "ComplianceView", "ProfileSettings"],
  inspector: ["InspectorDashboard", "SecureAuth", "InspectionQueue", "ChecklistEngine", "PhysicalEntry", "SensorValidation", "DocumentCheck", "GeoProof", "UploadReport", "PassFail", "FraudPanel", "CreateAlert", "Timeline", "Escalation", "ProfileSettings"],
  regulator: ["RegulatorDashboard", "AuthorityAccess", "GlobalOverview", "ComplianceAnalytics", "LedgerExplorer", "DocumentValidator", "SensorAudit", "AlertAnalytics", "ViolationDetection", "ApprovalPanel", "CaseManagement", "AuditTrail", "EntityComparison", "ReportsExport", "Settings"]
};

// ... include common components
const common = [
  { folder: "common", page: "EntryPage" },
  { folder: "common", page: "LoginPage" },
  { folder: "common", page: "NotFoundPage" },
  { folder: "layouts", page: "DashboardLayout" },
];

const srcDir = path.join(process.cwd(), 'src');

const getTestCode = (folderName, pageName) => "import React from 'react';\nimport { render, screen } from '@testing-library/react';\nimport { BrowserRouter } from 'react-router-dom';\nimport " + pageName + " from './" + pageName + "';\n\ndescribe('" + pageName + " Component', () => {\n  it('renders without crashing', () => {\n    render(\n      <BrowserRouter>\n        <" + pageName + (folderName === 'layouts' ? " role=\"producer\" links={[]} />\n      </BrowserRouter>\n    );\n" : " />\n      </BrowserRouter>\n    );\n") + "  });\n});\n";

Object.entries(roles).forEach(([role, pages]) => {
  pages.forEach(page => {
    const filePath = path.join(srcDir, role, page + ".test.jsx");
    fs.writeFileSync(filePath, getTestCode(role, page));
  });
});

common.forEach(({folder, page}) => {
    const filePath = path.join(srcDir, folder, page + ".test.jsx");
    fs.writeFileSync(filePath, getTestCode(folder, page));
});

console.log('Successfully generated 94 test files.');
