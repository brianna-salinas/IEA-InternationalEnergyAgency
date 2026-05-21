# IEA Energy Monitoring Platform

<p align="center">
  <img src="https://img.logo.dev/iea.org?token=pk_XE_XBDKdRaGuZ8ro3WCxIQ&size=139&retina=true" alt="IEA Logo" height="80"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Angular_Material-19-757575?style=for-the-badge&logo=material-design&logoColor=white" />
  <img src="https://img.shields.io/badge/i18n-EN%20%7C%20ES-4CAF50?style=for-the-badge" />
</p>

---

## Description

Web application for the **International Energy Agency (IEA)** to manage and monitor energy indicators across international Energy Monitoring Centers.

Energy analysts can register Energy Report Items per regional operator and energy type, and review them on a real-time dashboard. Country data is auto-resolved from the [DummyJSON API](https://dummyjson.com) and matched against Energy Monitoring Centers stored in a local json-server backend.

---

## Features

| View | Route | Description |
|------|-------|-------------|
| **Home** | `/home` | Dashboard displaying all registered Energy Report Items in a responsive two-column grid |
| **New Energy Report** | `/energy-reports/new` | Form to register a new report — auto-resolves country data and Energy Monitoring Center |
| **Page Not Found** | `/**` | Displays the attempted route with a return-to-home button |

- **i18n** — Full English and Spanish support via `@ngx-translate/core`
- **Language Switcher** — Toggle EN / ES from the toolbar at any time
- **Responsive Design** — Adapts layout for mobile, tablet, and desktop viewports
- **Angular Signals** — Reactive state management without RxJS overhead

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| [Angular](https://angular.dev) | 19 | Front-end framework |
| [Angular Material](https://material.angular.io) | 19 | UI component library |
| [TypeScript](https://www.typescriptlang.org) | 5.7 | Language |
| [@ngx-translate/core](https://github.com/ngx-translate/core) | 16 | Internationalization (i18n) |
| [json-server](https://github.com/typicode/json-server) | 0.17.4 | Local fake REST API |
| [DummyJSON](https://dummyjson.com) | — | External API for regional operator data |

---

## Architecture

The project follows **Domain-Driven Design (DDD)** with a layered architecture organized by bounded context:

```
src/app/
├── shared/                  # Cross-cutting concerns
│   ├── presentation/
│   │   └── components/
│   │       ├── toolbar/     # Main navigation toolbar
│   │       └── language-switcher/
│   └── store/
│       └── language.store.ts  # Global language state (Angular Signals)
│
├── monitoring/              # Bounded context: energy monitoring
│   ├── domain/model/        # EnergyReportItem, EnergyCenter
│   ├── application/         # MonitoringFacade, MonitoringStore
│   ├── infrastructure/      # EnergyReportService, EnergyCenterService
│   └── presentation/
│       ├── views/           # HomeView, NewReportView, PageNotFoundView
│       └── components/      # ReportSummaryCard
│
└── energy/                  # Bounded context: regional operators
    ├── domain/model/        # RegionalOperator
    ├── application/         # RegionalOperatorService
    └── infrastructure/      # RegionalOperatorAssembler
```

**Design patterns applied:** Facade · Store (Angular Signals) · Assembler · API/Endpoint · Repository

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- npm `>= 9`
- Angular CLI `>= 19` — install globally if needed:

```bash
npm install -g @angular/cli
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/iea-energy-monitoring.git
cd iea-energy-monitoring

# 2. Install dependencies
npm install
```

### Running locally

Both servers must run simultaneously. Open **two terminals**:

**Terminal 1 — Fake REST API (json-server)**
```bash
npm run server
# API available at http://localhost:3000
# Endpoints:
#   GET  /energy-monitoring-centers
#   GET  /energy-report-items
#   POST /energy-report-items
```

**Terminal 2 — Angular dev server**
```bash
npm start
# App available at http://localhost:4200
```

### Available scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Angular dev server at `localhost:4200` |
| `npm run server` | Start json-server at `localhost:3000` |
| `npm run build` | Build for production (output: `dist/`) |
| `npm test` | Run unit tests via Karma |
| `npm run watch` | Build in watch mode (development) |

---

## Internationalization

Translation files are located in `public/assets/i18n/`:

| File | Language |
|------|----------|
| `en.json` | English |
| `es.json` | Spanish |

To add a new language, create a new JSON file in that folder and register the locale in `app.config.ts`.

---

## API Reference (json-server)

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/energy-monitoring-centers` | List all monitoring centers |
| `GET` | `/energy-report-items` | List all energy report items |
| `POST` | `/energy-report-items` | Create a new energy report item |

Seed data is defined in `server/db.json`.

---

## 👤 Author

**Brianna Salinas Guzman**
- Course: Desarrollo de Aplicaciones Open Source (1ASI0729) — 2026-10

---

## 📄 License

This project was developed for academic purposes as part of the Open Source Application Development course.
