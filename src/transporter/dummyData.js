export const activeRoutes = [
  { id: 'RTE-778', vehicle: 'Truck-09B', driver: 'Alex Gomez', status: 'On Route', progress: '45%' },
  { id: 'RTE-779', vehicle: 'Van-4C', driver: 'Sarah Lee', status: 'Delayed', progress: '12%' }
];

export const liveTrackingData = [
  { timestamp: '14:22', temp: '-71.2°C', location: 'GPS 41.87,-87.62', battery: '92%' },
  { timestamp: '15:00', temp: '-70.8°C', location: 'GPS 41.90,-87.65', battery: '89%' }
];

export const incidentLogs = [
  { reportId: 'INC-20X', type: 'Sensor Sync Failure', resolving: true },
  { reportId: 'INC-21X', type: 'Mild Temp Fluctuation', resolving: false }
];
