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

const srcDir = path.join(process.cwd(), 'src');

const generateComponentCode = (folderName, pageName) => "import React from 'react';\n\nconst " + pageName + " = () => {\n  return (\n    <div className=\"bg-white p-6 rounded-lg shadow-sm border border-gray-100\">\n      <h2 className=\"text-2xl font-bold text-gray-800 mb-4\">" + pageName.replace(/([A-Z])/g, ' $1').trim() + "</h2>\n      <p className=\"text-gray-600\">\n        This is the " + pageName + " page for the " + folderName + " role.\n      </p>\n    </div>\n  );\n};\n\nexport default " + pageName + ";\n";

let imports = "import React from 'react';\nimport { Routes, Route, Navigate, Outlet } from 'react-router-dom';\nimport ProtectedRoute from '../common/ProtectedRoute';\nimport DashboardLayout from '../layouts/DashboardLayout';\n\n";

let routesCode = "const AppRoutes = () => {\n  const roleLinks = {\n";

Object.entries(roles).forEach(([role, pages]) => {
  let linkStr = "    " + role + ": [\n";
  pages.forEach(page => {
    const filePath = path.join(srcDir, role, page + ".jsx");
    fs.writeFileSync(filePath, generateComponentCode(role, page));
    const componentAlias = role.charAt(0).toUpperCase() + role.slice(1) + page;
    imports += "import " + componentAlias + " from '../" + role + "/" + page + "';\n";
    const routePath = page.toLowerCase();
    linkStr += "      { name: '" + page.replace(/([A-Z])/g, ' $1').trim() + "', path: '" + routePath + "' },\n";
  });
  linkStr += "    ],\n";
  routesCode += linkStr;
});

routesCode += "  };\n\n  return (\n    <Routes>\n";

Object.entries(roles).forEach(([role, pages]) => {
  routesCode += "      <Route path=\"/" + role + "\" element={<ProtectedRoute allowedRoles={['" + role + "']} />}>\n";
  routesCode += "        <Route element={<DashboardLayout role=\"" + role + "\" links={roleLinks['" + role + "']}><Outlet/></DashboardLayout>}>\n";
  routesCode += "          <Route index element={<Navigate to=\"" + pages[0].toLowerCase() + "\" replace />} />\n";
  pages.forEach(page => {
    const componentAlias = role.charAt(0).toUpperCase() + role.slice(1) + page;
    routesCode += "          <Route path=\"" + page.toLowerCase() + "\" element={<" + componentAlias + " />} />\n";
  });
  routesCode += "        </Route>\n";
  routesCode += "      </Route>\n";
});

routesCode += "\n      {/* Catch-all inner */}\n      <Route path=\"*\" element={<Navigate to=\"/not-found\" replace />} />\n    </Routes>\n  );\n};\n\nexport default AppRoutes;\n";

const appRoutesPath = path.join(srcDir, 'routes', 'AppRoutes.jsx');
fs.writeFileSync(appRoutesPath, imports + '\n' + routesCode);
console.log('Successfully generated 90 components and AppRoutes.jsx');
