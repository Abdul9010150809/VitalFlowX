export const inboundShipments = [
  { id: 'SHP-1002', product: 'Moderna mRNA-1273', origin: 'Boston Gen', expectedFormat: 'Pallet - 50x', status: 'En Route', eta: 'Today 14:00' },
  { id: 'SHP-1005', product: 'Pfizer BNT162b2', origin: 'NYC Hub', expectedFormat: 'Box - 10x', status: 'Delayed', eta: 'Tomorrow 09:00' }
];

export const recentDeliveries = [
  { id: 'DLV-4011', shipment: 'SHP-0994', received: '2026-04-28', QAStatus: 'Passed', tempStability: '100% OK' },
  { id: 'DLV-4012', shipment: 'SHP-0988', received: '2026-04-27', QAStatus: 'Flagged', tempStability: 'Spike detected' }
];

export const localInventory = [
  { batch: 'B-128X', product: 'Insulin Glargine', qty: '450 units', exp: '2027-01-15' },
  { batch: 'B-129X', product: 'Moderna mRNA-1273', qty: '200 vials', exp: '2026-11-30' }
];
