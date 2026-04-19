// Demo dataset of 8 partner organizations for the FRAME Shared Analytics hub.
// Cohorts are grouped by (region, partnerType). Two cohorts below k=3 are
// intentionally included (IL/Research, US/Institutional) so the k-anonymity
// suppression path is visibly exercised.
window.PARTNER_DATA = [
  { id: 'org_001', region: 'US', partnerType: 'Campus',        incidents: 12, medianResponseMinutes: 38, audienceReach: 1200000, narrativesTracked:  9, quarter: '2026Q1' },
  { id: 'org_002', region: 'US', partnerType: 'Campus',        incidents:  9, medianResponseMinutes: 45, audienceReach:  800000, narrativesTracked:  7, quarter: '2026Q1' },
  { id: 'org_003', region: 'US', partnerType: 'Campus',        incidents: 14, medianResponseMinutes: 41, audienceReach: 1500000, narrativesTracked: 11, quarter: '2026Q1' },
  { id: 'org_004', region: 'EU', partnerType: 'Community',     incidents:  7, medianResponseMinutes: 52, audienceReach:  600000, narrativesTracked:  5, quarter: '2026Q1' },
  { id: 'org_005', region: 'EU', partnerType: 'Community',     incidents: 11, medianResponseMinutes: 48, audienceReach:  950000, narrativesTracked:  8, quarter: '2026Q1' },
  { id: 'org_006', region: 'EU', partnerType: 'Community',     incidents:  8, medianResponseMinutes: 55, audienceReach:  720000, narrativesTracked:  6, quarter: '2026Q1' },
  { id: 'org_007', region: 'IL', partnerType: 'Research',      incidents:  5, medianResponseMinutes: 33, audienceReach:  450000, narrativesTracked:  4, quarter: '2026Q1' },
  { id: 'org_008', region: 'US', partnerType: 'Institutional', incidents:  6, medianResponseMinutes: 29, audienceReach: 1100000, narrativesTracked:  5, quarter: '2026Q1' }
];
