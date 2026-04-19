# FRAME Shared Analytics

> Privacy-preserving cross-partner analytics dashboard for the FRAME platform.

**🔗 Live demo:** https://doron-arch.github.io/dashboard/

## Overview

Shared Analytics aggregates anonymized signal across FRAME partner organizations (Campus, Community, Research, Institutional) and presents it through a privacy-first dashboard. All metrics are produced under k-anonymity and differential-privacy constraints — no individual-level data is ever exposed.

## Screenshots

> _TODO: add screenshots to `docs/screenshots/` and uncomment the lines below._

<!--
![Overview](docs/screenshots/overview.png)
![Privacy controls](docs/screenshots/privacy.png)
![Deep-linked state](docs/screenshots/deep-link.png)
-->

## Deep-linking

The dashboard state can be shared via URL query parameters:

| Param       | Values                                           | Example                    |
| ----------- | ------------------------------------------------ | -------------------------- |
| `region`    | `Global`, `US`, `EU`, `IL`                       | `?region=IL`               |
| `partner`   | `Campus`, `Community`, `Research`, `Institutional` | `?partner=Campus`        |
| `timeframe` | `7d`, `30d`, `quarter`                           | `?timeframe=30d`           |

Combine freely: `?region=EU&partner=Research&timeframe=quarter`. Invalid or unknown params are stripped from the URL automatically.

## Tech stack

- Vanilla JavaScript (no build step)
- HTML + CSS (custom design tokens)
- GitHub Pages hosting
- Shared schemas via `js/frame-schemas.js` (globals, single source of truth across FRAME repos)

## Local development

```bash
git clone https://github.com/doron-arch/dashboard.git
cd dashboard
# any static file server works, e.g.:
python3 -m http.server 8000
# open http://localhost:8000
```

## Project structure

```
.
├── index.html
├── css/
├── js/
│   ├── frame-schemas.js       # shared enums + typedefs
│   ├── privacy-dashboard.js   # main dashboard logic
│   ├── privacy/               # k-anonymity, differential-privacy modules
│   ├── demo-data.js
│   └── deep-link.js           # URL query-param sync (Phase 6c)
└── docs/screenshots/          # (TODO)
```
