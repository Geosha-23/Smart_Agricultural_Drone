import React, { useState } from 'react';
import { 
  CloudRain, 
  Droplet, 
  Calendar, 
  Send, 
  Sun, 
  CloudSun, 
  Wind, 
  CloudDrizzle, 
  Download,
  CheckCircle,
  Play
} from 'lucide-react';
import { weatherForecastDays, sectorIrrigation } from '../../data/mockData';

export default function IrrigationForecastView({ onTriggerToast, onOpenScheduleModal }) {
  const [selectedSector, setSelectedSector] = useState('All');
  const [forecastPeriod, setForecastPeriod] = useState('Next 7 Days');
  const [sectors, setSectors] = useState(sectorIrrigation);

  const filteredSectors = selectedSector === 'All' 
    ? sectors 
    : sectors.filter(s => s.sector.toLowerCase().includes(selectedSector.toLowerCase()));

  const handleWaterSector = (sectorName) => {
    setSectors(prev => prev.map(s => {
      if (s.sector === sectorName) {
        return { ...s, moisture: s.targetMoisture, recommendedGal: 0, priority: 'Adequate', lastWatered: 'Just now' };
      }
      return s;
    }));
    onTriggerToast(`Dispatched autonomous drone irrigation flight for ${sectorName}!`);
  };

  const handleExportData = () => {
    onTriggerToast('7-Day Irrigation & Precipitation Forecast model exported as CSV!');
  };

  return (
    <div className="page-container">
      {/* 3 Overview Metric Cards */}
      <div className="grid-3">
        <div className="card metric-card">
          <div className="metric-top">
            <span className="metric-label">Forecast Period</span>
            <Calendar size={20} color="var(--accent-purple)" />
          </div>
          <div className="metric-value" style={{ fontSize: '1.45rem' }}>{forecastPeriod}</div>
          <p className="metric-desc">Dynamic predictive model driven by live soil moisture telemetry and regional Doppler radar.</p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button className="btn-secondary" onClick={() => onTriggerToast('Period switched to 14-Day Extended Model')} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
              Change Period
            </button>
            <button className="btn-secondary" onClick={handleExportData} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
              <Download size={14} />
              Export Data
            </button>
          </div>
        </div>

        <div className="card metric-card">
          <div className="metric-top">
            <span className="metric-label">Projected Water Usage</span>
            <Droplet size={20} color="var(--accent-cyan)" />
          </div>
          <div className="metric-value">1,240 Gallons</div>
          <div className="progress-track">
            <div className="progress-fill cyan" style={{ width: '62%' }}></div>
          </div>
          <p className="metric-desc">Saves 38% water compared to broadcast sprinklers via drone pinpoint root targeting.</p>
        </div>

        <div className="card metric-card">
          <div className="metric-top">
            <span className="metric-label">Scheduled Drone Sorties</span>
            <CloudRain size={20} color="var(--accent-green)" />
          </div>
          <div className="metric-value">18 Missions</div>
          <div className="progress-track">
            <div className="progress-fill green" style={{ width: '45%' }}></div>
          </div>
          <p className="metric-desc">Autonomous night & dawn flights planned to avoid evaporation loss.</p>
          <button className="btn-primary" onClick={onOpenScheduleModal} style={{ width: '100%', justifyContent: 'center', marginTop: '10px', fontSize: '0.8rem' }}>
            Adjust Mission Schedule
          </button>
        </div>
      </div>

      {/* 7-Day Weather & Precipitation Carousel / Strip */}
      <div className="card">
        <div className="card-header">
          <h3>7-Day Agronomic Weather & Rain Forecast</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Doppler Sensor Grid Feed</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', overflowX: 'auto' }}>
          {weatherForecastDays.map((item, index) => (
            <div key={index} style={{
              background: index === 0 ? 'linear-gradient(180deg, rgba(99, 74, 255, 0.15), rgba(99, 74, 255, 0.05))' : 'var(--bg-card-solid)',
              border: index === 0 ? '1px solid var(--accent-purple)' : '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 12px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: index === 0 ? 'var(--accent-purple)' : 'var(--text-muted)' }}>
                {item.day}
              </span>
              
              <div style={{ color: index === 0 ? 'var(--accent-cyan)' : 'var(--accent-green)' }}>
                {item.icon === 'Sun' ? <Sun size={24} /> :
                 item.icon === 'CloudSun' ? <CloudSun size={24} /> :
                 item.icon === 'Wind' ? <Wind size={24} /> :
                 item.icon === 'CloudDrizzle' ? <CloudDrizzle size={24} /> :
                 <CloudRain size={24} />}
              </div>

              <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                {item.tempF}°F
              </div>

              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Rain: <strong>{item.rainfallIn}"</strong>
              </div>

              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Soil: {item.soilMoisture}%
              </div>

              <span className={`badge ${item.rainfallIn > 0.1 ? 'badge-cyan' : 'badge-green'}`} style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                {item.rainfallIn > 0 ? `${item.rainfallIn}" Rain` : 'Dry'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Field Sector Irrigation Needs Table */}
      <div className="card">
        <div className="card-header">
          <h3>Field Irrigation Demand by Crop Sector</h3>
          <div className="tabs-header" style={{ paddingBottom: 0, border: 'none' }}>
            {['All', 'North', 'South', 'East', 'West'].map(sec => (
              <button
                key={sec}
                className={`tab-btn ${selectedSector === sec ? 'active' : ''}`}
                onClick={() => setSelectedSector(sec)}
              >
                {sec === 'All' ? 'All Fields' : `${sec} Sector`}
              </button>
            ))}
          </div>
        </div>

        <div className="table-container" style={{ marginTop: '16px' }}>
          <table>
            <thead>
              <tr>
                <th>Field Sector</th>
                <th>Crop Type</th>
                <th>Current Soil Moisture</th>
                <th>Target Threshold</th>
                <th>Recommended Water</th>
                <th>Urgency Level</th>
                <th>Last Watered</th>
                <th>Quick Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSectors.map((sec, i) => (
                <tr key={i}>
                  <td><strong>{sec.sector}</strong></td>
                  <td>{sec.crop}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '80px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${sec.moisture}%`,
                          height: '100%',
                          background: sec.moisture < 30 ? 'var(--accent-rose)' : sec.moisture < 45 ? 'var(--accent-amber)' : 'var(--accent-green)'
                        }}></div>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{sec.moisture}%</span>
                    </div>
                  </td>
                  <td><span style={{ fontFamily: 'var(--font-mono)' }}>{sec.targetMoisture}%</span></td>
                  <td>
                    <span style={{ color: sec.recommendedGal > 0 ? 'var(--accent-cyan)' : 'var(--text-muted)', fontWeight: 600 }}>
                      {sec.recommendedGal > 0 ? `${sec.recommendedGal} Gal` : '0 Gal (Optimal)'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${sec.priority === 'High' ? 'badge-rose' : sec.priority === 'Medium' ? 'badge-amber' : 'badge-green'}`}>
                      {sec.priority}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{sec.lastWatered}</td>
                  <td>
                    {sec.recommendedGal > 0 ? (
                      <button 
                        className="btn-primary" 
                        onClick={() => handleWaterSector(sec.sector)}
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        <Play size={13} />
                        Dispatch Drone
                      </button>
                    ) : (
                      <span style={{ color: 'var(--accent-green)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem' }}>
                        <CheckCircle size={15} />
                        Satisfied
                      </span>
                    )}
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
