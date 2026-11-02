# 🌾 SmartAgriDrone — Intelligent Agricultural Drone Command Center

Next-generation autonomous agricultural drone fleet monitoring, real-time field coverage mapping, precision irrigation automation, power diagnostics, and AI weed detection built with **React (Vite)** and modern glassmorphism aesthetics.

---

## 🚀 Features & Modules

- **🚀 Fleet Overview (`OverviewDashboard.jsx`)**: Real-time telemetry, active drones status, weed detection alerts banner, and quick environmental indicators.
- **🗺️ Field Coverage & Radar Map (`FieldMapView.jsx`)**: Interactive 2D radar grid map with GPS coordinates, quadrant views (NE, NW, SE, SW), layer toggles (Crop NDVI, Soil Moisture, Weed Clusters, Flight Paths), and pinpoint inspectors.
- **⚡ Power & Solar Telemetry (`PowerSystemView.jsx`)**: Real-time battery levels, solar charging analytics, power consumption breakdown by subsystem (Propulsion, Cameras, Sensors, Comms), and battery health diagnostics with cell calibration.
- **💧 Water Tank & Refill Automation (`WaterRefillView.jsx`)**: Drone water payload capacity, interactive threshold sliders (min trigger & target capacity), refill mode toggles (Automatic / Manual / Custom), station selector, and operation history.
- **🌦️ Predictive Irrigation & Weather Forecast (`IrrigationForecastView.jsx`)**: 7-day predictive water consumption, weather forecasts, drone mission schedule, and crop sector demand breakdown.
- **🌿 Weed & Pest Detection Hub (`WeedDetectionView.jsx`)**: High-resolution multispectral scan analysis, Canadian Thistle & Bindweed cluster details, coordinate pinpointing, severity badges, and targeted drone spot-spraying dispatch.
- **📊 Environmental & Microclimate Analytics (`EnvironmentalHistoryView.jsx`)**: Multi-metric tabs for Temperature, Humidity, Wind Speed, and Rainfall with interactive SVG telemetry curve charts and CSV export.

---

## 🛠️ Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 📂 Project Architecture

```text
├── index.html                   # Entry HTML with Google Fonts
├── vite.config.js               # Vite configuration
├── package.json                 # Project dependencies & scripts
├── src/
│   ├── main.jsx                 # React root bootstrap
│   ├── App.jsx                  # Main application orchestrator & toast stack
│   ├── index.css                # Master aerospace glassmorphism design system
│   ├── data/
│   │   └── mockData.js          # Drone telemetry, weather & hazard data
│   └── components/
│       ├── Sidebar.jsx          # Navigation with fleet health status
│       ├── Topbar.jsx           # Live clock, telemetry chips, emergency RTL
│       ├── ScheduleModal.jsx    # Mission dispatch & flight scheduler modal
│       └── views/
│           ├── OverviewDashboard.jsx
│           ├── FieldMapView.jsx
│           ├── PowerSystemView.jsx
│           ├── WaterRefillView.jsx
│           ├── IrrigationForecastView.jsx
│           ├── WeedDetectionView.jsx
│           └── EnvironmentalHistoryView.jsx
└── legacy_static/               # Original HTML/CSS prototypes (preserved)
```
