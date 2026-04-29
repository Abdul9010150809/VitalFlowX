// ============ SHIPMENTS DATA ============
export const shipmentsData = [
  {
    id: 'SHP-1001',
    product: 'Pfizer BNT162b2',
    batchNumber: 'BATCH-2024-001',
    quantity: 5000,
    unit: 'doses',
    origin: 'Kalamazoo, MI',
    destination: 'NYC Hub',
    status: 'in_transit',
    temperature: '-70°C',
    humidity: '35%',
    createdAt: '2026-04-28T10:30:00Z',
    estimatedDelivery: '2026-04-30T14:00:00Z',
    progress: 65,
  },
  {
    id: 'SHP-1002',
    product: 'Moderna mRNA-1273',
    batchNumber: 'BATCH-2024-002',
    quantity: 3000,
    unit: 'doses',
    origin: 'Norwood, MA',
    destination: 'Boston General',
    status: 'delivered',
    temperature: '-20°C',
    humidity: '40%',
    createdAt: '2026-04-27T08:00:00Z',
    estimatedDelivery: '2026-04-29T12:00:00Z',
    progress: 100,
  },
  {
    id: 'SHP-1003',
    product: 'Insulin Glargine',
    batchNumber: 'BATCH-2024-003',
    quantity: 2000,
    unit: 'pens',
    origin: 'Indianapolis, IN',
    destination: 'Chicago Medical Center',
    status: 'pending',
    temperature: '4°C',
    humidity: '45%',
    createdAt: '2026-04-29T09:15:00Z',
    estimatedDelivery: '2026-05-01T10:00:00Z',
    progress: 10,
  },
  {
    id: 'SHP-1004',
    product: 'AstraZeneca COVID-19',
    batchNumber: 'BATCH-2024-004',
    quantity: 4500,
    unit: 'doses',
    origin: 'Cambridge, UK',
    destination: 'London Hub',
    status: 'in_transit',
    temperature: '2-8°C',
    humidity: '50%',
    createdAt: '2026-04-28T15:45:00Z',
    estimatedDelivery: '2026-04-30T08:00:00Z',
    progress: 45,
  },
];

// ============ ALERTS DATA ============
export const alertsData = [
  {
    id: 'ALT-501',
    severity: 'critical',
    type: 'temperature_excursion',
    shipmentId: 'SHP-1001',
    message: 'Temperature excursion detected: Below -75°C for 5 minutes',
    description: 'SHP-1001 experienced a critical temperature drop',
    timestamp: '2026-04-29T16:20:00Z',
    status: 'active',
    acknowledgedBy: null,
    action: 'Monitor closely and contact logistics team',
  },
  {
    id: 'ALT-502',
    severity: 'warning',
    type: 'route_deviation',
    shipmentId: 'SHP-1003',
    message: 'Route deviation: Shipment delayed by 2 hours due to traffic',
    description: 'SHP-1003 is experiencing route delay',
    timestamp: '2026-04-29T14:30:00Z',
    status: 'active',
    acknowledgedBy: 'John Smith',
    action: 'Adjust delivery window if needed',
  },
  {
    id: 'ALT-503',
    severity: 'info',
    type: 'sensor_sync',
    shipmentId: 'SHP-1002',
    message: 'Sensor synchronization completed successfully',
    description: 'All sensors for Batch #892 synchronized',
    timestamp: '2026-04-29T08:00:00Z',
    status: 'resolved',
    acknowledgedBy: 'Admin',
    action: 'No action required',
  },
  {
    id: 'ALT-504',
    severity: 'warning',
    type: 'humidity_high',
    shipmentId: 'SHP-1004',
    message: 'Humidity levels approaching threshold: 48%',
    description: 'SHP-1004 humidity trending upward',
    timestamp: '2026-04-29T15:50:00Z',
    status: 'active',
    acknowledgedBy: null,
    action: 'Monitor humidity levels',
  },
];

// ============ LEDGER/BLOCKCHAIN DATA ============
export const ledgerData = [
  {
    id: 'BLK-001',
    hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
    action: 'create_shipment',
    actionLabel: 'Create Shipment',
    actor: 'Producer Admin',
    actorAddress: '0x742d35Cc6634C0532925a3b844Bc92e2d90e3c26',
    block: '12839420',
    timestamp: '2026-04-29T08:00:00Z',
    data: {
      shipmentId: 'SHP-1001',
      product: 'Pfizer BNT162b2',
      quantity: 5000,
    },
  },
  {
    id: 'BLK-002',
    hash: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
    action: 'update_temp_rules',
    actionLabel: 'Update Temperature Rules',
    actor: 'Quality Manager',
    actorAddress: '0x3c3b3E4B3E5E3D3C3B3E4B3E5E3D3C3B',
    block: '12839445',
    timestamp: '2026-04-29T08:15:00Z',
    data: {
      shipmentId: 'SHP-1001',
      minTemp: -75,
      maxTemp: -65,
    },
  },
  {
    id: 'BLK-003',
    hash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
    action: 'bind_sensors',
    actionLabel: 'Bind Sensors',
    actor: 'Producer Admin',
    actorAddress: '0x742d35Cc6634C0532925a3b844Bc92e2d90e3c26',
    block: '12839467',
    timestamp: '2026-04-29T08:30:00Z',
    data: {
      shipmentId: 'SHP-1001',
      sensorCount: 5,
    },
  },
];

// ============ DOCUMENTS DATA ============
export const documentsData = [
  {
    id: 'DOC-001',
    name: 'Certificate of Analysis',
    type: 'pdf',
    size: '2.4 MB',
    uploadedAt: '2026-04-28T10:00:00Z',
    status: 'verified',
    hash: '0xabc123def456',
  },
  {
    id: 'DOC-002',
    name: 'Temperature Log',
    type: 'csv',
    size: '1.2 MB',
    uploadedAt: '2026-04-29T09:30:00Z',
    status: 'verified',
    hash: '0xdef456abc123',
  },
  {
    id: 'DOC-003',
    name: 'Shipping Label',
    type: 'pdf',
    size: '0.8 MB',
    uploadedAt: '2026-04-28T08:00:00Z',
    status: 'verified',
    hash: '0x789xyz012abc',
  },
];

// ============ SENSOR DATA ============
export const sensorsData = [
  {
    id: 'SENSOR-001',
    name: 'Temp Sensor Unit A',
    type: 'temperature',
    status: 'active',
    location: 'Top',
    currentReading: -70.2,
    unit: '°C',
    lastUpdate: '2026-04-29T16:45:30Z',
    batteryLevel: 92,
    signalStrength: 95,
  },
  {
    id: 'SENSOR-002',
    name: 'Temp Sensor Unit B',
    type: 'temperature',
    status: 'active',
    location: 'Middle',
    currentReading: -70.1,
    unit: '°C',
    lastUpdate: '2026-04-29T16:45:30Z',
    batteryLevel: 88,
    signalStrength: 92,
  },
  {
    id: 'SENSOR-003',
    name: 'Humidity Sensor',
    type: 'humidity',
    status: 'active',
    location: 'Bottom',
    currentReading: 35.5,
    unit: '%',
    lastUpdate: '2026-04-29T16:45:30Z',
    batteryLevel: 85,
    signalStrength: 98,
  },
  {
    id: 'SENSOR-004',
    name: 'Pressure Sensor',
    type: 'pressure',
    status: 'active',
    location: 'Side',
    currentReading: 101.3,
    unit: 'kPa',
    lastUpdate: '2026-04-29T16:45:30Z',
    batteryLevel: 90,
    signalStrength: 94,
  },
];

// ============ TEMPERATURE RULES DATA ============
export const tempRulesData = [
  {
    id: 'RULE-001',
    productType: 'mRNA Vaccine',
    minTemp: -75,
    maxTemp: -65,
    minHumidity: 20,
    maxHumidity: 50,
    timeLimit: 24, // hours
    criticalThreshold: true,
  },
  {
    id: 'RULE-002',
    productType: 'Injectable Insulin',
    minTemp: 2,
    maxTemp: 8,
    minHumidity: 30,
    maxHumidity: 60,
    timeLimit: 48,
    criticalThreshold: false,
  },
  {
    id: 'RULE-003',
    productType: 'Conventional Vaccine',
    minTemp: 2,
    maxTemp: 8,
    minHumidity: 25,
    maxHumidity: 55,
    timeLimit: 36,
    criticalThreshold: false,
  },
];

// ============ BATCH CONFIGURATION DATA ============
export const batchConfigData = [
  {
    id: 'BATCH-001',
    batchNumber: 'BATCH-2024-001',
    product: 'Pfizer BNT162b2',
    quantity: 5000,
    manufacturer: 'Pfizer Inc.',
    manufactureDate: '2026-04-20T10:00:00Z',
    expiryDate: '2026-07-20T10:00:00Z',
    storageRequirement: '-75°C to -65°C',
    certifications: ['ISO 9001', 'GxP Compliant'],
  },
  {
    id: 'BATCH-002',
    batchNumber: 'BATCH-2024-002',
    product: 'Moderna mRNA-1273',
    quantity: 3000,
    manufacturer: 'Moderna Inc.',
    manufactureDate: '2026-04-22T08:00:00Z',
    expiryDate: '2026-08-22T08:00:00Z',
    storageRequirement: '2°C to 8°C',
    certifications: ['ISO 9001', 'FDA Approved'],
  },
];

// ============ RISK ASSESSMENT DATA ============
export const riskAssessmentData = {
  overall_score: 2.3, // out of 10
  risk_level: 'Low',
  factors: [
    { name: 'Temperature Stability', score: 1, status: 'good' },
    { name: 'Route Safety', score: 2, status: 'good' },
    { name: 'Sensor Reliability', score: 1, status: 'excellent' },
    { name: 'Documentation Complete', score: 0, status: 'excellent' },
    { name: 'Weather Conditions', score: 3, status: 'moderate' },
  ],
  recommendations: [
    'Continue current monitoring protocols',
    'Weather forecast indicates potential rain, monitor for leaks',
    'All systems operating normally',
  ],
};

// ============ ROUTE PLAN DATA ============
export const routePlanData = {
  origin: 'Kalamazoo, MI',
  destination: 'NYC Hub, NY',
  distance: 640,
  distanceUnit: 'miles',
  estimatedDuration: 12,
  durationUnit: 'hours',
  waypoints: [
    { name: 'Detroit, MI', lat: 42.3314, lng: -83.0458, eta: '2026-04-30T02:00:00Z' },
    { name: 'Cleveland, OH', lat: 41.4993, lng: -81.6944, eta: '2026-04-30T06:00:00Z' },
    { name: 'Philadelphia, PA', lat: 39.9526, lng: -75.1652, eta: '2026-04-30T11:00:00Z' },
    { name: 'NYC Hub, NY', lat: 40.7128, lng: -74.0060, eta: '2026-04-30T14:00:00Z' },
  ],
  transportMode: 'refrigerated_truck',
  carrier: 'ColdChain Express',
};

// ============ ACTOR KEY SETUP DATA ============
export const actorKeySetupData = {
  actors: [
    {
      id: 'ACTOR-001',
      role: 'Producer',
      name: 'Producer Admin',
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc92e2d90e3c26',
      status: 'active',
      permissions: ['create_shipment', 'bind_sensors', 'upload_documents'],
    },
    {
      id: 'ACTOR-002',
      role: 'Quality Manager',
      name: 'John Quality',
      walletAddress: '0x3c3b3E4B3E5E3D3C3B3E4B3E5E3D3C3B',
      status: 'active',
      permissions: ['update_temp_rules', 'verify_documents'],
    },
  ],
};

// ============ EVENTS DATA ============
export const eventsData = [
  {
    id: 'EVT-001',
    timestamp: '2026-04-29T16:45:00Z',
    type: 'temperature_reading',
    message: 'Temperature reading: -70.2°C',
    shipmentId: 'SHP-1001',
    severity: 'info',
  },
  {
    id: 'EVT-002',
    timestamp: '2026-04-29T16:30:00Z',
    type: 'location_update',
    message: 'Location updated: 40.7128°N, 74.0060°W',
    shipmentId: 'SHP-1001',
    severity: 'info',
  },
  {
    id: 'EVT-003',
    timestamp: '2026-04-29T16:00:00Z',
    type: 'sensor_sync',
    message: 'All sensors synchronized successfully',
    shipmentId: 'SHP-1001',
    severity: 'info',
  },
];

export default {
  shipmentsData,
  alertsData,
  ledgerData,
  documentsData,
  sensorsData,
  tempRulesData,
  batchConfigData,
  riskAssessmentData,
  routePlanData,
  actorKeySetupData,
  eventsData,
};
