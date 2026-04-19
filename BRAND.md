# FRAME Brand Specs v2.0

This document is the **canonical brand specification** for all FRAME mockups. The machine-readable counterpart is `brand.json` in this repo. Both files must be kept byte-identical across all 3 FRAME mockup repos:

- `doron-arch/dashboard` — Shared Analytics
- `doron-arch/frame-technology-demo` — Technology Demo
- `doron-arch/frame-dashboard` — Intelligence Hub

## Brand Colors (strict palette)

| Token | Hex | Usage |
|---|---|---|
| INDIGO | `#1800AD` | Primary brand, light-mode accent |
| ELECTRIC_BLUE | `#4FC3F7` | Dark-mode accent, data viz default |
| CORAL_RED | `#FF5252` | Danger, critical alerts |
| CORAL_LIGHT | `#FF8A80` | Warnings, secondary alert |
| DARK_NAVY | `#06061A` | Dark backgrounds |

No other colors may be introduced without updating this doc and `brand.json` in all 3 repos.

## Typography

- **Body**: `Inter` (fallback: system-ui, -apple-system, sans-serif)
- **Mono**: `JetBrains Mono` (fallback: ui-monospace, monospace)
- **Display**: `Bebas Neue` (for FRAME wordmarks only)

## Radii

sm=6 · md=10 · lg=14 · pill=999

## Spacing scale

xs=4 · sm=8 · md=12 · lg=20 · xl=32

## How to update

1. Change `brand.json` in **one** repo and update this `BRAND.md` accordingly.
2. Copy both files verbatim to the other 2 repos (separate PRs).
3. Only after all 3 repos are in sync, update consuming code (CSS vars, JS exports).

## Consumers

| Repo | Consumer file | Format |
|---|---|---|
| dashboard | `index.html` `<style>:root{...}` | CSS custom properties |
| frame-technology-demo | `css/tokens.css` | CSS custom properties |
| frame-dashboard | `src/frame-tokens.js` | ES module exports |

All consumers must match `brand.json` values exactly.
