import React, { useState } from 'react';
import { 
  Activity, 
  Thermometer, 
  Droplets, 
  Wind, 
  CloudRain, 
  Download, 
  Printer, 
  Calendar,
  TrendingUp,
  FileText
} from 'lucide-react';
import { environmentalRecords, environmentalTrends } from '../../data/mockData';

export default function EnvironmentalHistoryView({ onTriggerToast }) {
  const [activeMetric, setActiveMetric] = useState('temperature');
  const [dateRange, setDateRange] = useState('7 Days');

  const metricConfigs = {
    temperature: {
      label: 'Air Temperature',
      unit: '°F',
      avg: '75.2°F / 24.0°C',
      high: '84.0°F / 28.9°C',
      low: '62.8°F / 17.1°C',
      range: '21.2°F / 11.8°C',
      color: '#634aff',
      key: 'temp'
    },
    humidity: {
      label: 'Relative Humidity',
      unit: '%',
      avg: '62.4%',
      high: '72.0%',
      low: '54.0%',
      range: '18.0%',
      color: '#06b6d4',
      key: 'humidity'
    },
    wind: {
      label: 'Wind Velocity',
      unit: 'mph',
      avg: '7.0 mph',
      high: '11.2 mph',
      low: '4.2 mph',
      range: '7.0 mph',
      color: '#10b981',
      key: 'wind'
    },
    rain: {
      label: 'Precipitation',
      unit: 'in',
      avg: '0.07 in',
      high: '0.35 in',
      low: '0.00 in',
      range: '0.35 in',
      color: '#f59e0b',
      key: 'rain'
    }
  };

  const currentConfig = metricConfigs[activeMetric];

  // SVG Chart points calculation
  const values = environmentalTrends.map(t => t[currentConfig.key]);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const valRange = maxVal - minVal || 1;

  const chartHeight = 180;
  const chartWidth = 700;
  const paddingX = 40;
  const paddingY = 25;

  const points = values.map((val, idx) => {
    const x = paddingX + (idx / (values.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - ((val - minVal) / valRange) * (chartHeight - paddingY * 2);
    return { x, y, val, label: environmentalTrends[idx].day };
  });

  const svgPathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const handleExportCSV = () => {
    const headers = 'Date,High,Low,Average,Humidity,Wind,Rainfall,Condition\n';
    const rows = environmentalRecords.map(r => 
      `"${r.date}","${r.tempHigh}","${r.tempLow}","${r.tempAvg}","${r.humidity}","${r.wind}","${r.rain}","${r.condition}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SmartAgriDrone_Environmental_Data_${activeMetric}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    onTriggerToast(`Exported ${activeMetric} environmental records as CSV!`);
  };

  return (
    <div className="page-container">
      {/* Metric Selector Tabs & Action Bar */}
      <div className="card" style={{ padding: '14px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div className="tabs-header" style={{ paddingBottom: 0, border: 'none' }}>
            <button
              className={`tab-btn ${activeMetric === 'temperature' ? 'active' : ''}`}
              onClick={() => setActiveMetric('temperature')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Thermometer size={16} />
              <span>Temperature</span>
            </button>
            <button
              className={`tab-btn ${activeMetric === 'humidity' ? 'active' : ''}`}
              onClick={() => setActiveMetric('humidity')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Droplets size={16} />
              <span>Relative Humidity</span>
            </button>
            <button
              className={`tab-btn ${activeMetric === 'wind' ? 'active' : ''}`}
              onClick={() => setActiveMetric('wind')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Wind size={16} />
              <span>Wind Speed</span>
            </button>
            <button
              className={`tab-btn ${activeMetric === 'rain' ? 'active' : ''}`}
              onClick={() => setActiveMetric('rain')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <CloudRain size={16} />
              <span>Precipitation</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-secondary" onClick={() => onTriggerToast('Switching date range to 30 Days...')} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
              <Calendar size={14} />
              {dateRange} Range
            </button>
            <button className="btn-primary" onClick={handleExportCSV} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
              <Download size={14} />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid-4">
        <div className="card metric-card">
          <div className="metric-top">
            <span className="metric-label">Period Average</span>
            <Activity size={18} color={currentConfig.color} />
          </div>
          <div className="metric-value">{currentConfig.avg}</div>
          <p className="metric-desc">Steady mean across micro-sensor grid #01 through #08</p>
        </div>

        <div className="card metric-card">
          <div className="metric-top">
            <span className="metric-label">Period Maximum</span>
            <TrendingUp size={18} color="var(--accent-rose)" />
          </div>
          <div className="metric-value">{currentConfig.high}</div>
          <p className="metric-desc">Peak sensor spike registered during solar noon</p>
        </div>

        <div className="card metric-card">
          <div className="metric-top">
            <span className="metric-label">Period Minimum</span>
            <TrendingUp size={18} color="var(--accent-green)" style={{ transform: 'rotate(180deg)' }} />
          </div>
          <div className="metric-value">{currentConfig.low}</div>
          <p className="metric-desc">Lowest overnight trough registered at 04:30 AM</p>
        </div>

        <div className="card metric-card">
          <div className="metric-top">
            <span className="metric-label">Delta / Range</span>
            <Thermometer size={18} color="var(--accent-cyan)" />
          </div>
          <div className="metric-value">{currentConfig.range}</div>
          <p className="metric-desc">Diurnal variance within normal healthy agricultural parameters</p>
        </div>
      </div>

      {/* Interactive SVG Trend Chart */}
      <div className="card">
        <div className="card-header">
          <h3>
            <TrendingUp size={18} color={currentConfig.color} />
            <span>7-Day {currentConfig.label} Telemetry Curve</span>
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hover points to inspect readings</span>
        </div>

        <div style={{ width: '100%', overflowX: 'auto' }}>
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: '220px', minWidth: '500px' }}>
            {/* Grid horizontal lines */}
            <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
            <line x1={paddingX} y1={chartHeight / 2} x2={chartWidth - paddingX} y2={chartHeight / 2} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
            <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="rgba(255,255,255,0.06)" />

            {/* Gradient Area under curve */}
            <defs>
              <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={currentConfig.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={currentConfig.color} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d={`${svgPathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`}
              fill="url(#curveGrad)"
            />

            {/* Main Spline / Line */}
            <path
              d={svgPathD}
              fill="none"
              stroke={currentConfig.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Points */}
            {points.map((pt, i) => (
              <g key={i}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="6"
                  fill="var(--bg-primary)"
                  stroke={currentConfig.color}
                  strokeWidth="3"
                  style={{ cursor: 'pointer', transition: 'r 0.2s' }}
                />
                {/* Value Text */}
                <text
                  x={pt.x}
                  y={pt.y - 12}
                  textAnchor="middle"
                  fill="var(--text-primary)"
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fontWeight="600"
                >
                  {pt.val}{currentConfig.unit}
                </text>
                {/* Date Label */}
                <text
                  x={pt.x}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  fill="var(--text-muted)"
                  fontSize="11"
                  fontFamily="var(--font-main)"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Daily Records Table */}
      <div className="card">
        <div className="card-header">
          <h3>Daily Microclimate Log Summary</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Calibrated against local weather station</span>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>High Temp</th>
                <th>Low Temp</th>
                <th>Daily Average</th>
                <th>Relative Humidity</th>
                <th>Wind Velocity</th>
                <th>Precipitation</th>
                <th>Crop Spray Condition</th>
              </tr>
            </thead>
            <tbody>
              {environmentalRecords.map((rec, i) => (
                <tr key={i}>
                  <td><strong>{rec.date}</strong></td>
                  <td><span style={{ color: 'var(--accent-rose)' }}>{rec.tempHigh}</span></td>
                  <td><span style={{ color: 'var(--accent-cyan)' }}>{rec.tempLow}</span></td>
                  <td><span style={{ fontWeight: 600 }}>{rec.tempAvg}</span></td>
                  <td>{rec.humidity}</td>
                  <td>{rec.wind}</td>
                  <td>{rec.rain}</td>
                  <td>
                    <span className={`badge ${rec.condition.includes('Clear') || rec.condition.includes('Optimal') ? 'badge-green' : 'badge-amber'}`}>
                      {rec.condition}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
