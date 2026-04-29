import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from '../common/ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';

import ProducerProducerDashboard from '../producer/ProducerDashboard';
import ProducerCreateShipment from '../producer/CreateShipment_v2';
import ProducerProductBatchConfig from '../producer/ProductBatchConfig';
import ProducerRoutePlan from '../producer/RoutePlan';
import ProducerTempRulesConfig from '../producer/TempRulesConfig';
import ProducerUploadDocs from '../producer/UploadDocs';
import ProducerDocumentPreview from '../producer/DocumentPreview';
import ProducerSensorBinding from '../producer/SensorBinding';
import ProducerActorKeySetup from '../producer/ActorKeySetup';
import ProducerRiskAssessment from '../producer/RiskAssessment';
import ProducerOnChainRegister from '../producer/OnChainRegister';
import ProducerQRGenerator from '../producer/QRGenerator';
import ProducerLedgerView from '../producer/LedgerViewV2';
import ProducerAlertsMonitor from '../producer/AlertsMonitor_Improved';
import ProducerExceptionCase from '../producer/ExceptionCase';
import ProducerShipments from '../producer/ProducerShipments';
import ProducerLiveTracking from '../producer/ProducerLiveTracking';
import TransporterTransportDashboard from '../transporter/TransportDashboard';
import TransporterLogin from '../transporter/Login';
import TransporterPickupEvent from '../transporter/PickupEvent';
import TransporterHandoffEvent from '../transporter/HandoffEvent';
import TransporterLiveTracking from '../transporter/LiveTracking';
import TransporterShipments from '../transporter/TransporterShipments';
import TransporterSensorMonitor from '../transporter/SensorMonitor';
import TransporterSensorCheck from '../transporter/SensorCheck';
import TransporterTemperatureGraph from '../transporter/TemperatureGraph';
import TransporterIncidentReport from '../transporter/IncidentReport';
import TransporterSensorFailure from '../transporter/SensorFailure';
import TransporterOfflineQueue from '../transporter/OfflineQueue';
import TransporterSyncEngine from '../transporter/SyncEngine';
import TransporterAlertResponse from '../transporter/AlertResponse';
import TransporterDeliveryConfirm from '../transporter/DeliveryConfirm';
import TransporterProfileSettings from '../transporter/ProfileSettings';
import WarehouseWarehouseDashboard from '../warehouse/WarehouseDashboard';
import WarehouseSecureAccess from '../warehouse/SecureAccess';
import WarehouseReceiveShipment from '../warehouse/ReceiveShipment';
import WarehouseReceiptTracking from '../warehouse/WarehouseReceiptTracking';
import WarehouseStorageAllocation from '../warehouse/StorageAllocation';
import WarehouseColdMonitoring from '../warehouse/ColdMonitoring';
import WarehouseSensorAnalytics from '../warehouse/SensorAnalytics';
import WarehouseDataGapDetection from '../warehouse/DataGapDetection';
import WarehouseManualInspection from '../warehouse/ManualInspection';
import WarehouseUploadDocs from '../warehouse/UploadDocs';
import WarehouseHandoffPrep from '../warehouse/HandoffPrep';
import WarehouseSLACompliance from '../warehouse/SLACompliance';
import WarehouseAlertHandling from '../warehouse/AlertHandling';
import WarehouseInventoryView from '../warehouse/InventoryView';
import WarehouseSyncStatus from '../warehouse/SyncStatus';
import WarehouseProfileSettings from '../warehouse/ProfileSettings';
import RetailerRetailDashboard from '../retailer/RetailDashboard';
import RetailerSecureLogin from '../retailer/SecureLogin';
import RetailerScanShipment from '../retailer/ScanShipment';
import RetailerShipmentTracking from '../retailer/RetailerShipmentTracking';
import RetailerLedgerExplorer from '../retailer/LedgerExplorer';
import RetailerDocumentValidation from '../retailer/DocumentValidation';
import RetailerSensorGraph from '../retailer/SensorGraph';
import RetailerAlertSummary from '../retailer/AlertSummary';
import RetailerAcceptReject from '../retailer/AcceptReject';
import RetailerFinalReport from '../retailer/FinalReport';
import RetailerCustomerView from '../retailer/CustomerView';
import RetailerRaiseComplaint from '../retailer/RaiseComplaint';
import RetailerDeliveryLog from '../retailer/DeliveryLog';
import RetailerShipmentHistory from '../retailer/ShipmentHistory';
import RetailerComplianceView from '../retailer/ComplianceView';
import RetailerProfileSettings from '../retailer/ProfileSettings';
import InspectorInspectorDashboard from '../inspector/InspectorDashboard';
import InspectorSecureAuth from '../inspector/SecureAuth';
import InspectorInspectionQueue from '../inspector/InspectionQueue';
import InspectorChecklistEngine from '../inspector/ChecklistEngine';
import InspectorPhysicalEntry from '../inspector/PhysicalEntry';
import InspectorSensorValidation from '../inspector/SensorValidation';
import InspectorDocumentCheck from '../inspector/DocumentCheck';
import InspectorGeoProof from '../inspector/GeoProof';
import InspectorUploadReport from '../inspector/UploadReport';
import InspectorPassFail from '../inspector/PassFail';
import InspectorFraudPanel from '../inspector/FraudPanel';
import InspectorCreateAlert from '../inspector/CreateAlert';
import InspectorTimeline from '../inspector/Timeline';
import InspectorEscalation from '../inspector/Escalation';
import InspectorProfileSettings from '../inspector/ProfileSettings';
import RegulatorRegulatorDashboard from '../regulator/RegulatorDashboard';
import RegulatorAuthorityAccess from '../regulator/AuthorityAccess';
import RegulatorGlobalOverview from '../regulator/GlobalOverview';
import RegulatorComplianceAnalytics from '../regulator/ComplianceAnalytics';
import RegulatorLedgerExplorer from '../regulator/LedgerExplorer';
import RegulatorDocumentValidator from '../regulator/DocumentValidator';
import RegulatorSensorAudit from '../regulator/SensorAudit';
import RegulatorAlertAnalytics from '../regulator/AlertAnalytics';
import RegulatorViolationDetection from '../regulator/ViolationDetection';
import RegulatorApprovalPanel from '../regulator/ApprovalPanel';
import RegulatorCaseManagement from '../regulator/CaseManagement';
import RegulatorAuditTrail from '../regulator/AuditTrail';
import RegulatorEntityComparison from '../regulator/EntityComparison';
import RegulatorReportsExport from '../regulator/ReportsExport';
import RegulatorSettings from '../regulator/Settings';

const AppRoutes = () => {
  const roleLinks = {
    producer: [
      { name: 'Dashboard & Ledger', path: 'producerdashboard' },
      { name: 'Live Shipments', path: 'shipments' },
      { name: 'Live Tracking', path: 'livetracking' },
      { name: 'Shipment Wizard', path: 'createshipment' },
      { name: 'Route & Maps', path: 'routeplan' },
      { name: 'Compliance & Settings', path: 'temprulesconfig' },
    ],
    transporter: [
      { name: 'Fleet Dashboard', path: 'transportdashboard' },
      { name: 'Shipments', path: 'shipments' },
      { name: 'Live Tracking', path: 'livetracking' },
      { name: 'Events & Sync', path: 'pickupevent' },
      { name: 'Alerts & Reports', path: 'incidentreport' },
    ],
    warehouse: [
      { name: 'Warehouse Overview', path: 'warehousedashboard' },
      { name: 'Receipt Tracking', path: 'receipttracking' },
      { name: 'Storage & Inventory', path: 'storageallocation' },
      { name: 'Sensor Analytics', path: 'sensoranalytics' },
      { name: 'Compliance & SLA', path: 'slacompliance' },
    ],
    retailer: [
      { name: 'Retail Dashboard', path: 'retaildashboard' },
      { name: 'Scan & Receive', path: 'scanshipment' },
      { name: 'Shipment Tracking', path: 'shipmenttracking' },
      { name: 'Shipment Ledger', path: 'shipmenthistory' },
      { name: 'Customer Portal', path: 'customerview' },
    ],
    inspector: [
      { name: 'Inspector Panel', path: 'inspectordashboard' },
      { name: 'Geo Proof Maps', path: 'geoproof' },
      { name: 'Checklist & Audits', path: 'checklistengine' },
      { name: 'Fraud & Alerts', path: 'fraudpanel' },
    ],
    regulator: [
      { name: 'Global Overview', path: 'globaloverview' },
      { name: 'Ledger Audit', path: 'ledgerexplorer' },
      { name: 'Case Management', path: 'casemanagement' },
      { name: 'Settings & Exports', path: 'reportsexport' },
    ],
  };

  return (
    <Routes>
      <Route path="/producer" element={<ProtectedRoute allowedRoles={['producer']} />}>
        <Route element={<DashboardLayout role="producer" links={roleLinks['producer']}><Outlet/></DashboardLayout>}>
          <Route index element={<Navigate to="producerdashboard" replace />} />
          <Route path="producerdashboard" element={<ProducerProducerDashboard />} />
          <Route path="shipments" element={<ProducerShipments />} />
          <Route path="livetracking" element={<ProducerLiveTracking />} />
          <Route path="createshipment" element={<ProducerCreateShipment />} />
          <Route path="productbatchconfig" element={<ProducerProductBatchConfig />} />
          <Route path="routeplan" element={<ProducerRoutePlan />} />
          <Route path="temprulesconfig" element={<ProducerTempRulesConfig />} />
          <Route path="uploaddocs" element={<ProducerUploadDocs />} />
          <Route path="documentpreview" element={<ProducerDocumentPreview />} />
          <Route path="sensorbinding" element={<ProducerSensorBinding />} />
          <Route path="actorkeysetup" element={<ProducerActorKeySetup />} />
          <Route path="riskassessment" element={<ProducerRiskAssessment />} />
          <Route path="onchainregister" element={<ProducerOnChainRegister />} />
          <Route path="qrgenerator" element={<ProducerQRGenerator />} />
          <Route path="ledgerview" element={<ProducerLedgerView />} />
          <Route path="alertsmonitor" element={<ProducerAlertsMonitor />} />
          <Route path="exceptioncase" element={<ProducerExceptionCase />} />
        </Route>
      </Route>
      <Route path="/transporter" element={<ProtectedRoute allowedRoles={['transporter']} />}>
        <Route element={<DashboardLayout role="transporter" links={roleLinks['transporter']}><Outlet/></DashboardLayout>}>
          <Route index element={<Navigate to="transportdashboard" replace />} />
          <Route path="transportdashboard" element={<TransporterTransportDashboard />} />
          <Route path="login" element={<TransporterLogin />} />
          <Route path="pickupevent" element={<TransporterPickupEvent />} />
          <Route path="handoffevent" element={<TransporterHandoffEvent />} />
          <Route path="livetracking" element={<TransporterLiveTracking />} />
          <Route path="shipments" element={<TransporterShipments />} />
          <Route path="sensormonitor" element={<TransporterSensorMonitor />} />
          <Route path="sensorcheck" element={<TransporterSensorCheck />} />
          <Route path="temperaturegraph" element={<TransporterTemperatureGraph />} />
          <Route path="incidentreport" element={<TransporterIncidentReport />} />
          <Route path="sensorfailure" element={<TransporterSensorFailure />} />
          <Route path="offlinequeue" element={<TransporterOfflineQueue />} />
          <Route path="syncengine" element={<TransporterSyncEngine />} />
          <Route path="alertresponse" element={<TransporterAlertResponse />} />
          <Route path="deliveryconfirm" element={<TransporterDeliveryConfirm />} />
          <Route path="profilesettings" element={<TransporterProfileSettings />} />
        </Route>
      </Route>
      <Route path="/warehouse" element={<ProtectedRoute allowedRoles={['warehouse']} />}>
        <Route element={<DashboardLayout role="warehouse" links={roleLinks['warehouse']}><Outlet/></DashboardLayout>}>
          <Route index element={<Navigate to="warehousedashboard" replace />} />
          <Route path="warehousedashboard" element={<WarehouseWarehouseDashboard />} />
          <Route path="secureaccess" element={<WarehouseSecureAccess />} />
          <Route path="receiveshipment" element={<WarehouseReceiveShipment />} />
          <Route path="receipttracking" element={<WarehouseReceiptTracking />} />
          <Route path="storageallocation" element={<WarehouseStorageAllocation />} />
          <Route path="coldmonitoring" element={<WarehouseColdMonitoring />} />
          <Route path="sensoranalytics" element={<WarehouseSensorAnalytics />} />
          <Route path="datagapdetection" element={<WarehouseDataGapDetection />} />
          <Route path="manualinspection" element={<WarehouseManualInspection />} />
          <Route path="uploaddocs" element={<WarehouseUploadDocs />} />
          <Route path="handoffprep" element={<WarehouseHandoffPrep />} />
          <Route path="slacompliance" element={<WarehouseSLACompliance />} />
          <Route path="alerthandling" element={<WarehouseAlertHandling />} />
          <Route path="inventoryview" element={<WarehouseInventoryView />} />
          <Route path="syncstatus" element={<WarehouseSyncStatus />} />
          <Route path="profilesettings" element={<WarehouseProfileSettings />} />
        </Route>
      </Route>
      <Route path="/retailer" element={<ProtectedRoute allowedRoles={['retailer']} />}>
        <Route element={<DashboardLayout role="retailer" links={roleLinks['retailer']}><Outlet/></DashboardLayout>}>
          <Route index element={<Navigate to="retaildashboard" replace />} />
          <Route path="retaildashboard" element={<RetailerRetailDashboard />} />
          <Route path="securelogin" element={<RetailerSecureLogin />} />
          <Route path="scanshipment" element={<RetailerScanShipment />} />
          <Route path="shipmenttracking" element={<RetailerShipmentTracking />} />
          <Route path="ledgerexplorer" element={<RetailerLedgerExplorer />} />
          <Route path="documentvalidation" element={<RetailerDocumentValidation />} />
          <Route path="sensorgraph" element={<RetailerSensorGraph />} />
          <Route path="alertsummary" element={<RetailerAlertSummary />} />
          <Route path="acceptreject" element={<RetailerAcceptReject />} />
          <Route path="finalreport" element={<RetailerFinalReport />} />
          <Route path="customerview" element={<RetailerCustomerView />} />
          <Route path="raisecomplaint" element={<RetailerRaiseComplaint />} />
          <Route path="deliverylog" element={<RetailerDeliveryLog />} />
          <Route path="shipmenthistory" element={<RetailerShipmentHistory />} />
          <Route path="complianceview" element={<RetailerComplianceView />} />
          <Route path="profilesettings" element={<RetailerProfileSettings />} />
        </Route>
      </Route>
      <Route path="/inspector" element={<ProtectedRoute allowedRoles={['inspector']} />}>
        <Route element={<DashboardLayout role="inspector" links={roleLinks['inspector']}><Outlet/></DashboardLayout>}>
          <Route index element={<Navigate to="inspectordashboard" replace />} />
          <Route path="inspectordashboard" element={<InspectorInspectorDashboard />} />
          <Route path="secureauth" element={<InspectorSecureAuth />} />
          <Route path="inspectionqueue" element={<InspectorInspectionQueue />} />
          <Route path="checklistengine" element={<InspectorChecklistEngine />} />
          <Route path="physicalentry" element={<InspectorPhysicalEntry />} />
          <Route path="sensorvalidation" element={<InspectorSensorValidation />} />
          <Route path="documentcheck" element={<InspectorDocumentCheck />} />
          <Route path="geoproof" element={<InspectorGeoProof />} />
          <Route path="uploadreport" element={<InspectorUploadReport />} />
          <Route path="passfail" element={<InspectorPassFail />} />
          <Route path="fraudpanel" element={<InspectorFraudPanel />} />
          <Route path="createalert" element={<InspectorCreateAlert />} />
          <Route path="timeline" element={<InspectorTimeline />} />
          <Route path="escalation" element={<InspectorEscalation />} />
          <Route path="profilesettings" element={<InspectorProfileSettings />} />
        </Route>
      </Route>
      <Route path="/regulator" element={<ProtectedRoute allowedRoles={['regulator']} />}>
        <Route element={<DashboardLayout role="regulator" links={roleLinks['regulator']}><Outlet/></DashboardLayout>}>
          <Route index element={<Navigate to="regulatordashboard" replace />} />
          <Route path="regulatordashboard" element={<RegulatorRegulatorDashboard />} />
          <Route path="authorityaccess" element={<RegulatorAuthorityAccess />} />
          <Route path="globaloverview" element={<RegulatorGlobalOverview />} />
          <Route path="complianceanalytics" element={<RegulatorComplianceAnalytics />} />
          <Route path="ledgerexplorer" element={<RegulatorLedgerExplorer />} />
          <Route path="documentvalidator" element={<RegulatorDocumentValidator />} />
          <Route path="sensoraudit" element={<RegulatorSensorAudit />} />
          <Route path="alertanalytics" element={<RegulatorAlertAnalytics />} />
          <Route path="violationdetection" element={<RegulatorViolationDetection />} />
          <Route path="approvalpanel" element={<RegulatorApprovalPanel />} />
          <Route path="casemanagement" element={<RegulatorCaseManagement />} />
          <Route path="audittrail" element={<RegulatorAuditTrail />} />
          <Route path="entitycomparison" element={<RegulatorEntityComparison />} />
          <Route path="reportsexport" element={<RegulatorReportsExport />} />
          <Route path="settings" element={<RegulatorSettings />} />
        </Route>
      </Route>

      {/* Catch-all inner */}
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};

export default AppRoutes;
