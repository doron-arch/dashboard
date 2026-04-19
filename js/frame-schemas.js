// FRAME ecosystem shared schemas — canonical enums and JSDoc typedefs
// Kept in sync across frame-dashboard (ESM), frame-technology-demo (globals), and dashboard (globals).
// When changing this file, bump SCHEMA_VERSION and update the other two repos.

window.FRAME_SCHEMA_VERSION = '1.0.0';

window.PLATFORMS = Object.freeze({
  X: 'X',
  TIKTOK: 'TikTok',
  INSTAGRAM: 'Instagram',
  FACEBOOK: 'Facebook',
  YOUTUBE: 'YouTube',
  TELEGRAM: 'Telegram',
});

window.SEVERITY = Object.freeze({
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
});

window.REGIONS = Object.freeze({
  IL: 'IL',
  EU: 'EU',
  US: 'US',
  GLOBAL: 'Global',
});

window.PARTNER_TYPES = Object.freeze({
  CAMPUS: 'Campus',
  COMMUNITY: 'Community',
  RESEARCH: 'Research',
  INSTITUTIONAL: 'Institutional',
});

window.NETWORKS = Object.freeze({
  PHANTOM_IR: 'PHANTOM-IR',
  CEDAR_WAVE: 'CEDAR-WAVE',
  NILE_ECHO: 'NILE-ECHO',
  EURO_MASK: 'EURO-MASK',
  SHADOW_PKT: 'SHADOW-PKT',
});

window.ORIGINS = Object.freeze({
  IRAN: 'Iran',
  LEBANON: 'Lebanon',
  PAKISTAN: 'Pakistan',
  EU_PROXIES: 'EU proxies',
});

/**
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} platform   one of PLATFORMS values
 * @property {string} severity   one of SEVERITY values
 * @property {string} region     one of REGIONS values
 * @property {string} [network]  one of NETWORKS values
 * @property {string} [origin]   one of ORIGINS values
 * @property {string} content
 * @property {string} timestamp  ISO 8601
 */

/**
 * @typedef {Object} Network
 * @property {string} id         one of NETWORKS values
 * @property {string} origin     one of ORIGINS values
 * @property {number} nodeCount
 * @property {string} severity   one of SEVERITY values
 */

/**
 * @typedef {Object} Narrative
 * @property {string} id
 * @property {string} title
 * @property {string[]} platforms   subset of PLATFORMS values
 * @property {string} severity      one of SEVERITY values
 * @property {string} region        one of REGIONS values
 */

/**
 * @typedef {Object} Partner
 * @property {string} id
 * @property {string} name
 * @property {string} type       one of PARTNER_TYPES values
 * @property {string} region     one of REGIONS values
 */
