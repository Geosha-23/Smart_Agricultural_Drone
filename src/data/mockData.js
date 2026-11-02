export const initialDrones = [
  {
    id: 'Drone-01',
    model: 'AgroHexa-T80',
    status: 'Active',
    location: 'Northeast Quadrant (Row 12, Col 8)',
    x: 72, // % on map
    y: 28, // % on map
    battery: 87,
    waterLevel: 68,
    waterGallons: 34,
    speedMph: 14.2,
    altitudeFt: 45,
    task: 'Weed Cluster Targeted Spot-Spraying',
    signalDbm: -54
  },
  {
    id: 'Drone-02',
    model: 'AgroHexa-T80',
    status: 'Charging',
    location: 'Solar Docking Station A (Northwest)',
    x: 25,
    y: 22,
    battery: 42,
    waterLevel: 100,
    waterGallons: 50,
    speedMph: 0,
    altitudeFt: 0,
    task: 'Fast-Charge Cycle (Est. 28 min remaining)',
    signalDbm: -38
  },
  {
    id: 'Drone-03',
    model: 'AgroQuad-S40',
    status: 'Scheduled',
    location: 'Southwest Quadrant (Standby Pad)',
    x: 32,
    y: 75,
    battery: 95,
    waterLevel: 100,
    waterGallons: 50,
    speedMph: 0,
    altitudeFt: 0,
    task: 'Soil Moisture Scan scheduled at 15:00',
    signalDbm: -48
  }
];

export const detectedIssues = [
  {
    id: 'ISS-001',
    title: 'Thistle Cluster',
    type: 'weed',
    location: 'Northeast Quadrant - Row 12, Column 8',
    x: 75,
    y: 32,
    species: 'Canadian Thistle (Cirsium arvense)',
    area: '25 sq. meters',
    growthStage: 'Flowering - High seed risk',
    detectedAt: 'June 15, 2023 - 10:23 AM',
    severity: 'high',
    droneAssigned: 'Drone-01'
  },
  {
    id: 'ISS-002',
    title: 'Bindweed Infestation',
    type: 'weed',
    location: 'Northeast Quadrant - Row 15, Column 4',
    x: 62,
    y: 38,
    species: 'Field Bindweed (Convolvulus arvensis)',
    area: '18 sq. meters',
    growthStage: 'Early vegetative',
    detectedAt: 'June 15, 2023 - 11:05 AM',
    severity: 'medium',
    droneAssigned: null
  },
  {
    id: 'ISS-003',
    title: 'Critically Low Soil Moisture',
    type: 'moisture',
    location: 'Southwest Quadrant - Bed 4-G',
    x: 28,
    y: 82,
    species: 'Soil Deficit (< 18% volumetric)',
    area: '1.2 Acres',
    growthStage: 'Crop Stress Warning',
    detectedAt: 'Today - 08:30 AM',
    severity: 'high',
    droneAssigned: 'Drone-03'
  }
];

export const powerBreakdown = [
  { component: 'Propulsion System (Motors & ESCs)', usageKwh: 0.65, share: 54, efficiency: '94% Nominal', status: 'optimal' },
  { component: 'Ultra-HD Multispectral Camera', usageKwh: 0.28, share: 23, efficiency: '98% Nominal', status: 'optimal' },
  { component: 'LiDAR & Environmental Sensor Array', usageKwh: 0.15, share: 13, efficiency: '92% Nominal', status: 'optimal' },
  { component: 'Encrypted Radio & 5G Telemetry', usageKwh: 0.12, share: 10, efficiency: '96% Nominal', status: 'optimal' }
];

export const refillHistory = [
  { id: 1, time: 'Today, 10:15 AM', drone: 'Drone-01', mode: 'Automatic', location: 'Main Water Station', capacityChange: '25% → 100%', volume: '37.5 gal', duration: '3m 40s' },
  { id: 2, time: 'Yesterday, 04:30 PM', drone: 'Drone-02', mode: 'Manual', location: 'Secondary Station', capacityChange: '18% → 100%', volume: '41.0 gal', duration: '4m 12s' },
  { id: 3, time: 'Yesterday, 09:10 AM', drone: 'Drone-01', mode: 'Automatic', location: 'Main Water Station', capacityChange: '22% → 100%', volume: '39.0 gal', duration: '3m 50s' },
  { id: 4, time: 'June 13, 02:45 PM', drone: 'Drone-03', mode: 'Custom', location: 'Rainwater Reserve', capacityChange: '30% → 85%', volume: '27.5 gal', duration: '2m 35s' }
];

export const weatherForecastDays = [
  { day: 'Today', tempF: 78, tempC: 25.5, humidity: 45, windMph: 5, rainfallIn: 0.0, soilMoisture: 38, status: 'Clear & Sunny', icon: 'Sun' },
  { day: 'Tomorrow', tempF: 75, tempC: 23.9, humidity: 60, windMph: 7, rainfallIn: 0.2, soilMoisture: 42, status: 'Scattered Showers', icon: 'CloudRain' },
  { day: 'Day 3', tempF: 81, tempC: 27.2, humidity: 52, windMph: 6, rainfallIn: 0.0, soilMoisture: 35, status: 'Partly Cloudy', icon: 'CloudSun' },
  { day: 'Day 4', tempF: 84, tempC: 28.9, humidity: 48, windMph: 9, rainfallIn: 0.0, soilMoisture: 30, status: 'Dry & Breezy', icon: 'Wind' },
  { day: 'Day 5', tempF: 79, tempC: 26.1, humidity: 65, windMph: 8, rainfallIn: 0.4, soilMoisture: 49, status: 'Moderate Rain', icon: 'CloudRain' },
  { day: 'Day 6', tempF: 74, tempC: 23.3, humidity: 70, windMph: 4, rainfallIn: 0.1, soilMoisture: 52, status: 'Humid / Mist', icon: 'CloudDrizzle' },
  { day: 'Day 7', tempF: 77, tempC: 25.0, humidity: 55, windMph: 6, rainfallIn: 0.0, soilMoisture: 44, status: 'Sunny / Optimal', icon: 'Sun' }
];

export const sectorIrrigation = [
  { sector: 'North Sector', crop: 'Sweet Corn', moisture: 42, targetMoisture: 55, recommendedGal: 320, priority: 'Medium', lastWatered: '14 hrs ago' },
  { sector: 'South Sector', crop: 'Soybeans', moisture: 26, targetMoisture: 50, recommendedGal: 480, priority: 'High', lastWatered: '32 hrs ago' },
  { sector: 'East Sector', crop: 'Winter Wheat', moisture: 61, targetMoisture: 55, recommendedGal: 0, priority: 'Adequate', lastWatered: '6 hrs ago' },
  { sector: 'West Sector', crop: 'Alfalfa', moisture: 34, targetMoisture: 50, recommendedGal: 440, priority: 'High', lastWatered: '28 hrs ago' }
];

export const environmentalRecords = [
  { date: 'Today', tempHigh: '78°F / 25.5°C', tempLow: '68°F / 18.3°C', tempAvg: '73°F / 22.8°C', humidity: '62%', wind: '8.4 mph', rain: '0.00 in', condition: 'Optimal' },
  { date: 'Yesterday', tempHigh: '80°F / 26.7°C', tempLow: '66°F / 18.9°C', tempAvg: '73°F / 22.8°C', humidity: '58%', wind: '6.1 mph', rain: '0.00 in', condition: 'Clear' },
  { date: '2 Days Ago', tempHigh: '82°F / 27.8°C', tempLow: '65°F / 18.3°C', tempAvg: '74°F / 23.3°C', humidity: '54%', wind: '7.8 mph', rain: '0.00 in', condition: 'Clear' },
  { date: '3 Days Ago', tempHigh: '84°F / 28.9°C', tempLow: '69°F / 20.6°C', tempAvg: '76°F / 24.4°C', humidity: '68%', wind: '11.2 mph', rain: '0.15 in', condition: 'Breezy Rain' },
  { date: '4 Days Ago', tempHigh: '79°F / 26.1°C', tempLow: '67°F / 19.4°C', tempAvg: '73°F / 22.8°C', humidity: '72%', wind: '5.5 mph', rain: '0.35 in', condition: 'Overcast' },
  { date: '5 Days Ago', tempHigh: '76°F / 24.4°C', tempLow: '64°F / 17.8°C', tempAvg: '70°F / 21.1°C', humidity: '65%', wind: '4.2 mph', rain: '0.02 in', condition: 'Mild' },
  { date: '6 Days Ago', tempHigh: '75°F / 23.9°C', tempLow: '63°F / 17.2°C', tempAvg: '69°F / 20.6°C', humidity: '60%', wind: '6.0 mph', rain: '0.00 in', condition: 'Normal' }
];

export const environmentalTrends = [
  { day: 'D-6', temp: 69, humidity: 60, wind: 6.0, rain: 0.0 },
  { day: 'D-5', temp: 70, humidity: 65, wind: 4.2, rain: 0.02 },
  { day: 'D-4', temp: 73, humidity: 72, wind: 5.5, rain: 0.35 },
  { day: 'D-3', temp: 76, humidity: 68, wind: 11.2, rain: 0.15 },
  { day: 'D-2', temp: 74, humidity: 54, wind: 7.8, rain: 0.0 },
  { day: 'Yesterday', temp: 73, humidity: 58, wind: 6.1, rain: 0.0 },
  { day: 'Today', temp: 75, humidity: 62, wind: 8.4, rain: 0.0 }
];
