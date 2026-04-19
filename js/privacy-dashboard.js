(function () {
  function quantile(sortedArr, q) {
    if (!sortedArr.length) return 0;
    const pos = (sortedArr.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sortedArr[base + 1] !== undefined) {
      return sortedArr[base] + rest * (sortedArr[base + 1] - sortedArr[base]);
    }
    return sortedArr[base];
  }

  function formatReach(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1000)    return Math.round(n / 1000) + 'K';
    return String(n);
  }

  // Find a KPI card by its .kpi-label text and return its .kpi-value element.
  function kpiValueByLabel(labelText) {
    const labels = document.querySelectorAll('.kpi .kpi-label');
    for (let i = 0; i < labels.length; i++) {
      if (labels[i].textContent.trim().toUpperCase() === labelText.toUpperCase()) {
        const card = labels[i].parentElement;
        return card.querySelector('.kpi-value');
      }
    }
    return null;
  }

  // Find a bench row by its .bench-label text and return its .bench-val element.
  function benchValByLabel(labelText) {
    const labels = document.querySelectorAll('.bench-row .bench-label');
    for (let i = 0; i < labels.length; i++) {
      if (labels[i].textContent.trim().toLowerCase() === labelText.toLowerCase()) {
        return labels[i].parentElement.querySelector('.bench-val');
      }
    }
    return null;
  }

  // Find a privacy-row status element by substring match on the adjacent label.
  function privacyStatusByLabel(substr) {
    const labels = document.querySelectorAll('.privacy-row .privacy-label');
    for (let i = 0; i < labels.length; i++) {
      if (labels[i].textContent.toLowerCase().indexOf(substr.toLowerCase()) !== -1) {
        return labels[i].parentElement.querySelector('.privacy-status');
      }
    }
    return null;
  }

  function run() {
    if (!window.PARTNER_DATA) return;

    const K = 3;
    const EPSILON = 1;

    // 1) k-anonymity cohort enforcement
    const generalized = generalizeQuasiIdentifiers(window.PARTNER_DATA, ['region']);
    const kResult = enforceKThreshold(generalized, ['region', 'partnerType'], K);

    // Flatten safe members (only these contribute to released aggregates)
    const safeMembers = [];
    kResult.safeGroups.forEach(g => { g.members.forEach(m => safeMembers.push(m)); });

    // 2) DP-noisy aggregates over safe cohorts
    const noisyIncidents = addNoiseToCount(safeMembers.reduce((s, r) => s + r.incidents, 0), EPSILON);
    const noisyReach     = noisyAggregate(safeMembers, 'audienceReach', EPSILON);

    // Median response (over safe cohorts) with small DP jitter
    const responseTimes = safeMembers.map(r => r.medianResponseMinutes).sort((a, b) => a - b);
    const trueMedian    = quantile(responseTimes, 0.5);
    const trueTopQuart  = quantile(responseTimes, 0.25); // faster = better
    const noisyMedian   = Math.max(1, Math.round(trueMedian   + laplaceNoise(1 / EPSILON)));
    const noisyTopQuart = Math.max(1, Math.round(trueTopQuart + laplaceNoise(1 / EPSILON)));

    const participatingSafe = safeMembers.length;
    const totalPartners     = window.PARTNER_DATA.length;
    const freshnessPct      = Math.round((participatingSafe / totalPartners) * 100);

    // 3) Write into KPI cards
    const incEl  = kpiValueByLabel('ACTIVE INCIDENTS');
    const medEl  = kpiValueByLabel('MEDIAN RESPONSE TIME');
    const partEl = kpiValueByLabel('PARTNER PARTICIPATION');
    const freshEl= kpiValueByLabel('DATA FRESHNESS');
    if (incEl)   incEl.textContent   = String(noisyIncidents);
    if (medEl)   medEl.textContent   = noisyMedian + 'M';
    if (partEl)  partEl.textContent  = participatingSafe + '/' + totalPartners;
    if (freshEl) freshEl.textContent = freshnessPct + '%';

    // 4) Write into benchmark rows. "Your org" = first safe member's response time
    //    as a stand-in for the viewer's organization (kept stable across reloads).
    const yourOrg = safeMembers.length ? safeMembers[0].medianResponseMinutes : 0;
    const yourOrgEl    = benchValByLabel('Your org');
    const ecoMedianEl  = benchValByLabel('Ecosystem median');
    const topQuartEl   = benchValByLabel('Top quartile');
    const safeReachEl  = benchValByLabel('Safe reach index');
    if (yourOrgEl)    yourOrgEl.textContent   = yourOrg + 'm';
    if (ecoMedianEl)  ecoMedianEl.textContent = noisyMedian + 'm';
    if (topQuartEl)   topQuartEl.textContent  = noisyTopQuart + 'm';
    if (safeReachEl)  safeReachEl.textContent = formatReach(noisyReach);

    // 5) Update privacy-row statuses
    const allowedEl    = privacyStatusByLabel('Aggregate ecosystem medians');
    const suppressedEl = privacyStatusByLabel('below minimum cohort threshold');
    if (allowedEl) {
      allowedEl.textContent = 'ALLOWED \u00b7 k=' + K;
    }
    if (suppressedEl) {
      const n = kResult.summary.suppressed;
      if (n > 0) {
        suppressedEl.textContent = 'SUPPRESSED \u00b7 ' + n + ' cohort' + (n === 1 ? '' : 's');
      } else {
        suppressedEl.textContent = 'SUPPRESSED';
      }
    }

    // Summary log only — no raw data.
    console.log('[privacy-dashboard] safe cohorts:', kResult.safeGroups.length,
                'suppressed cohorts:', kResult.summary.suppressed,
                'k:', K, 'epsilon:', EPSILON);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
