# 🌾 Smart Agricultural Drone Monitoring Dashboard

An interactive web-based monitoring suite and control interface for autonomous agricultural drones, designed for precision farming, real-time telemetry tracking, automated irrigation, weed detection, and environmental analytics.

---

## 📌 Features & Modules

- **Drone Monitoring Hub (`d1.html`)**: Real-time overview of active drones, battery status, water levels, environmental metrics, and alert triggers.
- **Field Coverage & Mapping (`d.html`)**: Visual coverage tracking displaying monitored acreages and field grid status.
- **Power & Solar Telemetry (`d8.html`)**: Battery discharge/charge rates, solar panel capture analytics, and power efficiency graphs.
- **Water Tank & Refill Automation (`d4.html`)**: Schedule automated refill cycles and monitor reservoir capacity.
- **Weed & Pest Detection (`d3.html`)**: Cluster identification for invasive weeds (such as thistle and bindweed) with pinpoint row and column coordinates.
- **Environmental Analytics**:
  - **Temperature Trends (`d2.html`)**: Historical and real-time field temperatures.
  - **Humidity Levels (`d7.html`)**: Relative humidity monitoring for moisture optimization.
  - **Wind Speed & Atmospheric Data (`d9.html`)**: Wind speed metrics to ensure safe flight parameters.
- **Irrigation Forecasts (`d5.html`, `d6.html`)**: Predictive rainfall and soil watering schedules to conserve water.

---

## 🚀 Quick Start

No build tools or external servers required!

1. Clone the repository:
   ```bash
   git clone git@github.com:Geosha-23/Smart_Agricultural_Drone.git
   cd Smart_Agricultural_Drone
   ```
2. Open `index.html` or `d1.html` directly in your web browser.

---

## 📂 Project Structure

```text
├── index.html       # Landing redirect to primary dashboard
├── d1.html          # Main Drone Monitoring Dashboard
├── d.html           # Field Coverage & Map Dashboard
├── d2.html          # Temperature History
├── d3.html          # Weed & Pest Cluster Detection Details
├── d4.html          # Water Tank Refill Scheduler
├── d5.html          # Irrigation Forecast Overview
├── d6.html          # Extended Irrigation & Precipitation Forecast
├── d7.html          # Humidity & Moisture History
├── d8.html          # Drone Power & Battery Telemetry Dashboard
├── d9.html          # Wind Speed & Environmental History
├── style            # Master CSS styling sheet
└── script.js        # Dashboard interactive scripts
```

---

## 🛠️ Built With

- **HTML5** & **CSS3**
- **JavaScript (ES6+)**
