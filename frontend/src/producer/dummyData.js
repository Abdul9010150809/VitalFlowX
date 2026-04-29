export const shipmentsData = [
  { id: 'SHP-1001', product: 'Pfizer BNT162b2', origin: 'Kalamazoo, MI', dest: 'NYC Hub', status: 'In Transit', temp: '-70°C' },
  { id: 'SHP-1002', product: 'Moderna mRNA-1273', origin: 'Norwood, MA', dest: 'Boston Gen', status: 'Delivered', temp: '-20°C' },
  { id: 'SHP-1003', product: 'Insulin Glargine', origin: 'Indianapolis, IN', dest: 'Chicago Med', status: 'Pending', temp: '4°C' },
];

export const alertsData = [
  { id: 'ALT-501', severity: 'Critical', message: 'Temp excursion: SHP-1001 dropped below -75°C', time: '10 mins ago' },
  { id: 'ALT-502', severity: 'Warning', message: 'Route deviation: SHP-1003 delayed by traffic', time: '2 hrs ago' },
  { id: 'ALT-503', severity: 'Info', message: 'Sensor sync completed for Batch #892', time: '1 day ago' },
];

export const ledgerData = [
  { hash: '0x1a2b...3c4d', action: 'Create Shipment', actor: 'Producer Admin', block: '12839420', timestamp: '2026-04-29T08:00:00Z' },
  { hash: '0x4d5e...6f7a', action: 'Update Temp Rules', actor: 'Quality Manager', block: '12839445', timestamp: '2026-04-29T08:15:00Z' },
];
