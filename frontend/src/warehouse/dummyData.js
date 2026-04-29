// ============ WAREHOUSE DUMMY DATA ============

export const storageZones = [
  { id: 'ZONE-A', name: 'Ultra-Cold Vault', tempRange: '-80°C to -60°C', currentTemp: '-72.1°C', capacity: 85, units: 120, status: 'operational' },
  { id: 'ZONE-B', name: 'Standard Cold Room', tempRange: '2°C to 8°C', currentTemp: '4.2°C', capacity: 62, units: 340, status: 'operational' },
  { id: 'ZONE-C', name: 'Ambient Storage', tempRange: '15°C to 25°C', currentTemp: '21.0°C', capacity: 45, units: 580, status: 'operational' },
  { id: 'ZONE-D', name: 'Quarantine Bay', tempRange: '2°C to 8°C', currentTemp: '5.8°C', capacity: 30, units: 45, status: 'restricted' },
];

export const receivedShipments = [
  { id: 'RCV-401', shipmentId: 'SHP-1001', product: 'Pfizer BNT162b2', receivedAt: '2026-04-29T10:30:00Z', zone: 'ZONE-A', qty: 5000, tempOnArrival: '-70.5°C', status: 'verified' },
  { id: 'RCV-402', shipmentId: 'SHP-1002', product: 'Moderna mRNA-1273', receivedAt: '2026-04-28T14:00:00Z', zone: 'ZONE-B', qty: 3000, tempOnArrival: '3.8°C', status: 'verified' },
  { id: 'RCV-403', shipmentId: 'SHP-1005', product: 'Insulin Glargine', receivedAt: '2026-04-29T09:15:00Z', zone: 'ZONE-B', qty: 2000, tempOnArrival: '5.1°C', status: 'pending_check' },
];

export const coldReadings = [
  { timestamp: '16:45', zoneA: -72.1, zoneB: 4.2, zoneC: 21.0, zoneD: 5.8 },
  { timestamp: '16:30', zoneA: -71.8, zoneB: 4.5, zoneC: 20.8, zoneD: 5.7 },
  { timestamp: '16:15', zoneA: -72.5, zoneB: 4.1, zoneC: 21.2, zoneD: 5.9 },
  { timestamp: '16:00', zoneA: -71.9, zoneB: 4.8, zoneC: 20.5, zoneD: 6.0 },
  { timestamp: '15:45', zoneA: -72.3, zoneB: 4.3, zoneC: 21.1, zoneD: 5.6 },
  { timestamp: '15:30', zoneA: -72.0, zoneB: 4.6, zoneC: 20.9, zoneD: 5.8 },
];

export const warehouseSensors = [
  { id: 'WS-001', zone: 'ZONE-A', type: 'Temperature', status: 'active', battery: 94, signal: 98, lastReading: '-72.1°C', lastSync: '2 min ago' },
  { id: 'WS-002', zone: 'ZONE-A', type: 'Humidity', status: 'active', battery: 89, signal: 95, lastReading: '32%', lastSync: '2 min ago' },
  { id: 'WS-003', zone: 'ZONE-B', type: 'Temperature', status: 'active', battery: 91, signal: 97, lastReading: '4.2°C', lastSync: '3 min ago' },
  { id: 'WS-004', zone: 'ZONE-B', type: 'Humidity', status: 'warning', battery: 28, signal: 82, lastReading: '48%', lastSync: '5 min ago' },
  { id: 'WS-005', zone: 'ZONE-C', type: 'Temperature', status: 'active', battery: 96, signal: 99, lastReading: '21.0°C', lastSync: '1 min ago' },
  { id: 'WS-006', zone: 'ZONE-D', type: 'Temperature', status: 'active', battery: 87, signal: 93, lastReading: '5.8°C', lastSync: '4 min ago' },
];

export const inventoryItems = [
  { batch: 'BATCH-2024-001', product: 'Pfizer BNT162b2', zone: 'ZONE-A', qty: 4800, unit: 'doses', receivedDate: '2026-04-29', expiryDate: '2026-07-20', status: 'in_stock' },
  { batch: 'BATCH-2024-002', product: 'Moderna mRNA-1273', zone: 'ZONE-B', qty: 2950, unit: 'doses', receivedDate: '2026-04-28', expiryDate: '2026-08-22', status: 'in_stock' },
  { batch: 'BATCH-2024-003', product: 'Insulin Glargine', zone: 'ZONE-B', qty: 2000, unit: 'pens', receivedDate: '2026-04-29', expiryDate: '2027-01-15', status: 'quarantine' },
  { batch: 'BATCH-2024-004', product: 'AstraZeneca COVID-19', zone: 'ZONE-B', qty: 4200, unit: 'doses', receivedDate: '2026-04-27', expiryDate: '2026-10-30', status: 'in_stock' },
];

export const slaMetrics = [
  { metric: 'Temperature Compliance', target: '99.5%', actual: '99.8%', status: 'pass' },
  { metric: 'Receiving Time (avg)', target: '<30 min', actual: '22 min', status: 'pass' },
  { metric: 'Data Uptime', target: '99.9%', actual: '99.7%', status: 'warning' },
  { metric: 'Handoff Prep Time', target: '<45 min', actual: '38 min', status: 'pass' },
  { metric: 'Incident Response', target: '<15 min', actual: '12 min', status: 'pass' },
];

export const warehouseAlerts = [
  { id: 'WA-101', severity: 'warning', message: 'Sensor WS-004 battery below 30%', zone: 'ZONE-B', timestamp: '2026-04-29T16:20:00Z', status: 'active' },
  { id: 'WA-102', severity: 'info', message: 'Scheduled maintenance for ZONE-D compressor', zone: 'ZONE-D', timestamp: '2026-04-29T14:00:00Z', status: 'acknowledged' },
  { id: 'WA-103', severity: 'critical', message: 'Data gap detected: ZONE-A sensor offline for 8 min', zone: 'ZONE-A', timestamp: '2026-04-29T12:30:00Z', status: 'resolved' },
];

export const accessLog = [
  { id: 'ACC-001', person: 'Dr. Sarah Mitchell', role: 'Warehouse Manager', zone: 'ZONE-A', action: 'Entry', timestamp: '2026-04-29T16:00:00Z', method: 'Biometric' },
  { id: 'ACC-002', person: 'Tech. James Park', role: 'Maintenance', zone: 'ZONE-D', action: 'Entry', timestamp: '2026-04-29T14:30:00Z', method: 'RFID Badge' },
  { id: 'ACC-003', person: 'Insp. John Doe', role: 'Inspector', zone: 'ZONE-B', action: 'Exit', timestamp: '2026-04-29T13:45:00Z', method: 'Biometric' },
];

export const inspectionRecords = [
  { id: 'WINSP-01', zone: 'ZONE-A', inspector: 'John Doe', date: '2026-04-29', findings: 'All parameters nominal', result: 'Pass' },
  { id: 'WINSP-02', zone: 'ZONE-B', inspector: 'Jane Smith', date: '2026-04-28', findings: 'Minor condensation on unit 3', result: 'Pass with notes' },
  { id: 'WINSP-03', zone: 'ZONE-D', inspector: 'Mike Chen', date: '2026-04-27', findings: 'Quarantine seal intact, items verified', result: 'Pass' },
];

export const dataGaps = [
  { id: 'DG-001', zone: 'ZONE-A', sensor: 'WS-001', start: '2026-04-29T12:22:00Z', end: '2026-04-29T12:30:00Z', duration: '8 min', severity: 'high', cause: 'Network outage' },
  { id: 'DG-002', zone: 'ZONE-B', sensor: 'WS-004', start: '2026-04-28T09:00:00Z', end: '2026-04-28T09:03:00Z', duration: '3 min', severity: 'low', cause: 'Battery swap' },
];

export const syncStatus = [
  { node: 'Ethereum Mainnet', status: 'synced', lastBlock: '12,839,520', latency: '120ms' },
  { node: 'IPFS Gateway', status: 'synced', lastBlock: 'N/A', latency: '85ms' },
  { node: 'Backup Node (AWS)', status: 'synced', lastBlock: '12,839,519', latency: '45ms' },
  { node: 'Edge Node (Local)', status: 'syncing', lastBlock: '12,839,515', latency: '5ms' },
];
