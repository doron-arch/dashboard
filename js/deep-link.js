// FRAME deep-linking for dashboard (Phase 6c)
// Syncs URL query params with the 3 filter-select dropdowns: timeframe, region, partner.
(function () {
  var REGION_URL_TO_LABEL = { 'Global': 'Global', 'US': 'United States', 'EU': 'Europe', 'IL': 'Israel' };
  var REGION_LABEL_TO_URL = { 'Global': 'Global', 'United States': 'US', 'Europe': 'EU', 'Israel': 'IL' };
  var PARTNER_URL_VALUES = ['Campus', 'Community', 'Research', 'Institutional'];
  var TIMEFRAME_URL_TO_LABEL = { '7d': 'Last 7 days', '30d': 'Last 30 days', 'quarter': 'This quarter' };
  var TIMEFRAME_LABEL_TO_URL = { 'Last 7 days': '7d', 'Last 30 days': '30d', 'This quarter': 'quarter' };

  function getSelects() {
    var sels = document.querySelectorAll('select.filter-select');
    return { timeframe: sels[0] || null, region: sels[1] || null, partner: sels[2] || null };
  }

  function readUrlState() {
    var p = new URLSearchParams(window.location.search);
    var rawRegion = p.get('region');
    var region = REGION_URL_TO_LABEL[rawRegion] || null;
    var rawPartner = p.get('partner');
    var partner = PARTNER_URL_VALUES.indexOf(rawPartner) !== -1 ? rawPartner : null;
    var rawTimeframe = p.get('timeframe');
    var timeframe = TIMEFRAME_URL_TO_LABEL[rawTimeframe] || null;
    return { region: region, partner: partner, timeframe: timeframe };
  }

  function writeUrlState() {
    var sels = getSelects();
    var p = new URLSearchParams();
    if (sels.timeframe && sels.timeframe.value && sels.timeframe.value !== 'Last 7 days') {
      var tfCode = TIMEFRAME_LABEL_TO_URL[sels.timeframe.value];
      if (tfCode) p.set('timeframe', tfCode);
    }
    if (sels.region && sels.region.value && sels.region.value !== 'Global') {
      var rgCode = REGION_LABEL_TO_URL[sels.region.value];
      if (rgCode) p.set('region', rgCode);
    }
    if (sels.partner && sels.partner.value && sels.partner.value !== 'All partner types') {
      if (PARTNER_URL_VALUES.indexOf(sels.partner.value) !== -1) p.set('partner', sels.partner.value);
    }
    var qs = p.toString();
    var newUrl = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
    window.history.replaceState(null, '', newUrl);
  }

  function setSelectByLabel(sel, label) {
    if (!sel || !label) return;
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value === label || sel.options[i].text === label) {
        sel.selectedIndex = i;
        return;
      }
    }
  }

  function init() {
    var state = readUrlState();
    var sels = getSelects();

    if (state.timeframe) setSelectByLabel(sels.timeframe, state.timeframe);
    if (state.region)    setSelectByLabel(sels.region, state.region);
    if (state.partner)   setSelectByLabel(sels.partner, state.partner);

    // Attach change listeners to sync URL on user changes.
    if (sels.timeframe) sels.timeframe.addEventListener('change', writeUrlState);
    if (sels.region)    sels.region.addEventListener('change', writeUrlState);
    if (sels.partner)   sels.partner.addEventListener('change', writeUrlState);

    // Clean URL of any invalid params we didn't pick up.
    writeUrlState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
