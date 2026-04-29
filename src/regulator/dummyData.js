export const complianceData = [
  { id: 'CMP-001', entity: 'PharmaCorp', status: 'Compliant', score: 98, lastAudit: '2026-04-20' },
  { id: 'CMP-002', entity: 'FastTrans Logistics', status: 'Under Review', score: 75, lastAudit: '2026-04-25' },
  { id: 'CMP-003', entity: 'Global Storage', status: 'Non-Compliant', score: 55, lastAudit: '2026-04-28' },
];

export const auditData = [
  { id: 'AUD-8821', facility: 'Boston Gen', inspector: 'John Doe', findings: 'Minor temp deviations', date: '2026-04-28' },
  { id: 'AUD-8822', facility: 'NYC Hub', inspector: 'Jane Smith', findings: 'No deviations', date: '2026-04-27' },
];

export const activeCases = [
  { caseId: 'CAS-991', severity: 'High', description: 'Counterfeit suspect batch in Transit', status: 'Open' },
  { caseId: 'CAS-992', severity: 'Medium', description: 'Repeated SLA breakage by FastTrans', status: 'Investigating' },
];
