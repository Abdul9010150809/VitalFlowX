export const inspectionQueue = [
  { id: 'INSP-3310', facility: 'NYC Hub', target: 'Batch #B-128X', type: 'Routine Temp Audit', urgancy: 'High', status: 'Pending' },
  { id: 'INSP-3311', facility: 'Boston Gen', target: 'Warehouse Bay 4', type: 'Physical Security Check', urgancy: 'Medium', status: 'In Progress' }
];

export const fraudAlerts = [
  { alertId: 'F-001', suspicion: 'Spoofed UUID Token detected', shipment: 'SHP-1002', riskLevel: 'Critical' }
];

export const validatedSensors = [
  { sensorId: 'SENS-991A', shipment: 'SHP-1001', battery: '95%', calibStatus: 'Passed', lastSync: '15 mins ago' },
  { sensorId: 'SENS-992B', shipment: 'SHP-1003', battery: '42%', calibStatus: 'Passed', lastSync: '1 hr ago' }
];
