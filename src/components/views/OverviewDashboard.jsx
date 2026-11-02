import React from 'react';
import { 
  BatteryCharging, 
  Droplet, 
  MapPin, 
  AlertTriangle, 
  Thermometer, 
  Droplets, 
  Wind, 
  CloudRain, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Crosshair
} from 'lucide-react';

export default function OverviewDashboard({ 
  drones, 
  issues, 
  onNavigate, 
  onTriggerToast, 
  onOpenScheduleModal 
}) {
  return (
    <div className="page-container">
      {/* Top Banner Alert if any weed cluster detected */}
      {issues.length > 0 && (
        <div style={{
          background: 'linear-gradient(90deg, rgba(244, 63, 94, 0.15), rgba(244, 63, 94, 0.05))',
          border: '1px solid rgba(244, 63, 94, 0.35)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(244, 63, 94, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fb7185'
            }}>
              <AlertTriangle size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffe4e6' }}>
                Active Weed Cluster Alerts Detected (Northeast Quadrant)
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#fda4af' }}>
                Thistle and Bindweed detected in Rows 12 & 15. Targeted drone inspection recommended.
              </p>
            </div>
          </div>
          <button 
            className="btn-danger"
            onClick={() => onNavigate('weeds')}
          >
            <span>Review Weed Clusters</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Primary 4 Telemetry Metric Cards */}
      <section>
        <div className="card-header">
          <h3>Field Status & Fleet Telemetry</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Updated 2s ago</span>
        </div>

        <div className="grid-4">
          {/* Card 1: Power Status */}
          <div className="card metric-card">
            <div>
              <div className="metric-top">
                <span className="metric-label">Power Status</span>
                <div className="metric-icon-wrap" style={{ color: 'var(--accent-purple)' }}>
                  <BatteryCharging size={20} />
                </div>
              </div>
              <div className="metric-value">87%</div>
              <div className="progress-track">
                <div className="progress-fill purple" style={{ width: '87%' }}></div>
              </div>
              <p className="metric-desc">Solar charging active — 4.2 kWh collected today across field panels</p>
            </div>
            <button className="btn-secondary" onClick={() => onNavigate('power')} style={{ width: '100%', justifyContent: 'center' }}>
              Power Details
            </button>
          </div>

          {/* Card 2: Water Tank */}
          <div className="card metric-card">
            <div>
              <div className="metric-top">
                <span className="metric-label">Water Tank</span>
                <div className="metric-icon-wrap" style={{ color: 'var(--accent-cyan)' }}>
                  <Droplet size={20} />
                </div>
              </div>
              <div className="metric-value">68%</div>
              <div className="progress-track">
                <div className="progress-fill cyan" style={{ width: '68%' }}></div>
              </div>
              <p className="metric-desc">Next automated refill scheduled in 45 minutes at Main Water Station</p>
            </div>
            <button className="btn-secondary" onClick={() => onNavigate('water')} style={{ width: '100%', justifyContent: 'center' }}>
              Schedule Refill
            </button>
          </div>

          {/* Card 3: Field Coverage */}
          <div className="card metric-card">
            <div>
              <div className="metric-top">
                <span className="metric-label">Coverage</span>
                <div className="metric-icon-wrap" style={{ color: 'var(--accent-green)' }}>
                  <MapPin size={20} />
                </div>
              </div>
              <div className="metric-value">3.2 Acres</div>
              <div className="progress-track">
                <div className="progress-fill green" style={{ width: '72%' }}></div>
              </div>
              <p className="metric-desc">72% of total target crop field mapped & scanned today</p>
            </div>
            <button className="btn-secondary" onClick={() => onNavigate('map')} style={{ width: '100%', justifyContent: 'center' }}>
              View Field Map
            </button>
          </div>

          {/* Card 4: Alerts */}
          <div className="card metric-card">
            <div>
              <div className="metric-top">
                <span className="metric-label">Alerts</span>
                <div className="metric-icon-wrap" style={{ color: 'var(--accent-amber)' }}>
                  <AlertTriangle size={20} />
                </div>
              </div>
              <div className="metric-value">{issues.length} Clusters</div>
              <div className="progress-track">
                <div className="progress-fill amber" style={{ width: '60%' }}></div>
              </div>
              <p className="metric-desc">Detected in northeast sector. Spot-spraying payload calibrated.</p>
            </div>
            <button className="btn-secondary" onClick={() => onNavigate('weeds')} style={{ width: '100%', justifyContent: 'center' }}>
              View Details
            </button>
          </div>
        </div>
      </section>

      {/* Environmental Conditions Grid */}
      <section>
        <div className="card-header">
          <h3>Current Environmental Conditions</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Microclimate Sensor Array #04</span>
        </div>

        <div className="grid-4">
          <div className="card metric-card">
            <div>
              <div className="metric-top">
                <span className="metric-label">Temperature</span>
                <Thermometer size={20} color="var(--accent-purple)" />
              </div>
              <div className="metric-value" style={{ fontSize: '1.5rem' }}>78°F / 25.5°C</div>
              <p className="metric-desc">Optimal flight and spray evaporation window</p>
            </div>
            <button className="btn-secondary" onClick={() => onNavigate('environment')} style={{ width: '100%', justifyContent: 'center' }}>
              History
            </button>
          </div>

          <div className="card metric-card">
            <div>
              <div className="metric-top">
                <span className="metric-label">Humidity</span>
                <Droplets size={20} color="var(--accent-cyan)" />
              </div>
              <div className="metric-value" style={{ fontSize: '1.5rem' }}>62% RH</div>
              <p className="metric-desc">Relative humidity within ideal target range</p>
            </div>
            <button className="btn-secondary" onClick={() => onNavigate('environment')} style={{ width: '100%', justifyContent: 'center' }}>
              History
            </button>
          </div>

          <div className="card metric-card">
            <div>
              <div className="metric-top">
                <span className="metric-label">Wind Speed</span>
                <Wind size={20} color="var(--accent-green)" />
              </div>
              <div className="metric-value" style={{ fontSize: '1.5rem' }}>8 mph / 12.9 km/h</div>
              <p className="metric-desc">Low drift hazard, suitable for precision spot spraying</p>
            </div>
            <button className="btn-secondary" onClick={() => onNavigate('environment')} style={{ width: '100%', justifyContent: 'center' }}>
              History
            </button>
          </div>

          <div className="card metric-card">
            <div>
              <div className="metric-top">
                <span className="metric-label">Rainfall</span>
                <CloudRain size={20} color="var(--accent-amber)" />
              </div>
              <div className="metric-value" style={{ fontSize: '1.5rem' }}>0.2 in / 5mm</div>
              <p className="metric-desc">Expected tomorrow afternoon. Adjusting watering schedule.</p>
            </div>
            <button className="btn-secondary" onClick={() => onNavigate('irrigation')} style={{ width: '100%', justifyContent: 'center' }}>
              Forecast
            </button>
          </div>
        </div>
      </section>

      {/* Fleet Drones & Detected Alerts Split */}
      <div className="grid-2">
        {/* Active Drones Fleet */}
        <div className="card">
          <div className="card-header">
            <h3>Active Drones</h3>
            <button className="btn-secondary" onClick={onOpenScheduleModal} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
              + Launch Mission
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {drones.map(drone => (
              <div key={drone.id} style={{
                background: 'var(--bg-card-solid)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: drone.status === 'Active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(99, 74, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: drone.status === 'Active' ? 'var(--accent-green)' : 'var(--accent-purple)'
                  }}>
                    <Zap size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '0.95rem' }}>{drone.id}</strong>
                      <span className={`badge ${drone.status === 'Active' ? 'badge-green' : drone.status === 'Charging' ? 'badge-cyan' : 'badge-purple'}`}>
                        {drone.status}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{drone.location}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Battery</div>
                    <div style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{drone.battery}%</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Water</div>
                    <div style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{drone.waterLevel}%</div>
                  </div>
                  <button 
                    className="btn-secondary" 
                    onClick={() => onNavigate('map')}
                    style={{ padding: '6px 10px' }}
                    title="Track on map"
                  >
                    <Crosshair size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detected Issues Quick View */}
        <div className="card">
          <div className="card-header">
            <h3>Weed & Hazard Detections</h3>
            <button className="btn-secondary" onClick={() => onNavigate('weeds')} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
              Full Inspector
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {issues.map(iss => (
              <div key={iss.id} style={{
                background: 'var(--bg-card-solid)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 600 }}>{iss.title}</span>
                    <span className={`badge ${iss.severity === 'high' ? 'badge-rose' : 'badge-amber'}`}>
                      {iss.severity} risk
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {iss.location} • {iss.area}
                  </p>
                </div>
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    onTriggerToast(`Targeting ${iss.title} for drone spot-spray!`);
                    onNavigate('weeds');
                  }}
                  style={{ fontSize: '0.8rem' }}
                >
                  Inspect
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
