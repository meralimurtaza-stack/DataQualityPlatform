# DQ-GULF — Data Quality Platform for GCC Banking

> Built from the GCC, for the GCC.

A comprehensive data quality platform prototype designed for Omani and GCC banking institutions. Features 8 interactive screens covering enterprise DQI dashboards, Islamic banking validation, regulatory compliance tracking, and more.

## Quick Deploy to Vercel

### Option A: One-click (fastest)

1. Push this folder to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Click **Deploy** — no configuration needed

Your site will be live at `https://your-project.vercel.app`

### Option B: Vercel CLI

```bash
# Install Vercel CLI (one time)
npm i -g vercel

# From this project folder
vercel

# Follow prompts — it auto-detects Vite
```

### Option C: Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Platform Screens

| Screen | Description |
|--------|-------------|
| **Dashboard** | Enterprise DQI with real-time scores across 8 banking domains |
| **Rules Engine** | 15 detailed rules mapped to CBO, BCBS 239, IBRF, PDPL, FATF |
| **Islamic Banking** | Murabaha/Ijara/Sukuk validation, Sharia screening, Hijri calendar |
| **Regulatory** | Multi-framework compliance across 8 regulations |
| **Data Lineage** | Source-to-report flow diagram (Core Banking → DQ-GULF → Reporting) |
| **Profiling** | Field-level statistical analysis of KYC Customer Master |
| **Benchmarking** | DQI comparison across Omani banks |
| **Implementation** | 8-phase roadmap with status tracking |

## Features

- Clean SVG icon system (no emojis)
- Arabic/English language toggle
- Collapsible sidebar
- Dark theme optimised for executive presentations
- Fully responsive

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- No external component libraries — zero vendor lock-in
