/**
 * Replace fine-grained quasi-identifier values (e.g. "IL-North") with coarser
 * bucket labels (e.g. "IL") so small regional variants collapse into cohorts.
 */
function generalizeQuasiIdentifiers(records, fields) {
  return records.map(r => {
    const copy = Object.assign({}, r);
    fields.forEach(f => {
      const v = copy[f];
      if (typeof v === 'string' && v.indexOf('-') !== -1) {
        copy[f] = v.split('-')[0];
      }
    });
    return copy;
  });
}

/**
 * Group records by the given quasi-identifier fields and suppress any cohort
 * smaller than k. Returns { safeGroups, suppressedGroups, summary }.
 */
function enforceKThreshold(records, groupByFields, k) {
  const groups = {};
  records.forEach(r => {
    const key = groupByFields.map(f => r[f]).join('|');
    if (!groups[key]) groups[key] = { key: key, fields: {}, members: [] };
    groupByFields.forEach(f => { groups[key].fields[f] = r[f]; });
    groups[key].members.push(r);
  });

  const safeGroups = [];
  const suppressedGroups = [];
  Object.keys(groups).forEach(key => {
    const g = groups[key];
    if (g.members.length >= k) {
      safeGroups.push({ key: g.key, fields: g.fields, members: g.members, suppressed: false });
    } else {
      suppressedGroups.push({ key: g.key, fields: g.fields, size: g.members.length, suppressed: true });
    }
  });

  return {
    safeGroups: safeGroups,
    suppressedGroups: suppressedGroups,
    summary: {
      totalGroups: safeGroups.length + suppressedGroups.length,
      suppressed: suppressedGroups.length,
      kThreshold: k
    }
  };
}
