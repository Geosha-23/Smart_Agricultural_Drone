import React, { useState } from 'react';
import { 
  BatteryCharging, 
  Sun, 
  Zap, 
  Clock, 
  Wrench, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  Cpu,
  Radio,
  Camera,
  Activity
} from 'lucide-react';
import { powerBreakdown } from '../../data/mockData';

export default function PowerSystemView({ onTriggerToast }) {
  const [calibrating, setCalibrating] = useState(false);
  const [cleaningScheduled, setCleaningScheduled] = useState(false);
  const [ecoMode, setEcoMode] = useState(false);

  const handleCalibrate = () => {
    setCalibrating(true);
    onTriggerToast('Initiated battery cell balancing and depth calibration cycle...');
    setTimeout(() => {
      setCalibrating(false);
      onTriggerToast('Battery calibration completed successfully! Cell health at 99.4%.');
    }, 2500);
  };

  const handleScheduleCleaning = () => {
    setCleaningScheduled(true);
    onTriggerToast('Automated solar array cleaning robot scheduled for tomorrow 06:00 AM.');
  };

  const handleToggleEcoMode = () => {
    const next = !ecoMode;
    setEcoMode(next);
    onTriggerToast(next ? 'Eco Power Mode enabled: Propeller RPM capped at 85% to extend flight time by 45 mins.' : 'Eco Mode disabled: Restored standard mission performance.');
  };

  return (
    <div className="page-container">
      {/* 4 Primary Power Gauges */}
      <div className="grid-4">
        <div className="card metric-card">
          <div className="metric-top">
            <span className="metric-label">Battery Level</span>
            <div className="metric-icon-wrap" style={{ color: 'var(--accent-purple)' }}>
              <BatteryCharging size={20} />
            </div>
          </div>
          <div className="metric-value">87%</div>
          <div className="progress-track">
            <div className="progress-fill purple" style={{ width: '87%' }}></div>
          </div>
          <p className="metric-desc">High-discharge 6S LiPo Pack • 22.8V Nominal</p>
        </div>

        <div className="card metric-card">
          <div className="metric-top">
            <span className="metric-label">Solar Efficiency</span>
            <div className="metric-icon-wrap" style={{ color: 'var(--accent-green)' }}>
              <Sun size={20} />
            </div>
          </div>
          <div className="metric-value">92%</div>
          <div className="progress-track">
            <div className="progress-fill green" style={{ width: '92%' }}></div>
          </div>
          <p className="metric-desc">Monocrystalline surface wings generating 480W direct solar input</p>
        </div>

        <div className="card metric-card">
          <div className="metric-top">
            <span className="metric-label">Power Consumption</span>
            <div className="metric-icon-wrap" style={{ color: 'var(--accent-amber)' }}>
              <Zap size={20} />
            </div>
          </div>
          <div className="metric-value">{ecoMode ? '0.98 kWh' : '1.20 kWh'}</div>
          <div className="progress-track">
            <div className="progress-fill amber" style={{ width: ecoMode ? '50%' : '65%' }}></div>
          </div>
          <p className="metric-desc">{ecoMode ? 'Eco throttle active (-18% power draw)' : 'Standard nominal flight draw rate'}</p>
        </div>

        <div className="card metric-card">
          <div className="metric-top">
            <span className="metric-label">Remaining Runtime</span>
            <div className="metric-icon-wrap" style={{ color: 'var(--accent-cyan)' }}>
              <Clock size={20} />
            </div>
          </div>
          <div className="metric-value">{ecoMode ? '5.2 hrs' : '4.5 hrs'}</div>
          <div className="progress-track">
            <div className="progress-fill cyan" style={{ width: '75%' }}></div>
          </div>
          <p className="metric-desc">Sufficient for 14 additional field scan passes</p>
        </div>
      </div>

      {/* Power Breakdown Table & Eco Mode Banner */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>Power Consumption Breakdown</h3>
            <button 
              className={`tab-btn ${ecoMode ? 'active' : ''}`}
              onClick={handleToggleEcoMode}
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              {ecoMode ? '🌿 Eco Mode: Active' : '⚡ Enable Eco Mode'}
            </button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Usage (kWh)</th>
                  <th>Share</th>
                  <th>Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {powerBreakdown.map((row, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {i === 0 ? <Zap size={15} color="var(--accent-purple)" /> :
                         i === 1 ? <Camera size={15} color="var(--accent-cyan)" /> :
                         i === 2 ? <Activity size={15} color="var(--accent-green)" /> :
                                   <Radio size={15} color="var(--accent-amber)" />}
                        <span>{row.component}</span>
                      </div>
                    </td>
                    <td><span style={{ fontFamily: 'var(--font-mono)' }}>{row.usageKwh} kWh</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '60px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${row.share}%`, height: '100%', background: 'var(--accent-purple)' }}></div>
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{row.share}%</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-green">{row.efficiency}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Battery Health & Maintenance Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Battery Health Diagnostics */}
          <div className="card">
            <div className="card-header">
              <h3>Battery Diagnostics & Cell Health</h3>
              <span className="badge badge-green">Healthy</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
              <div style={{ background: 'var(--bg-card-solid)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Charge Cycles</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>12 of 500</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', marginTop: '2px' }}>97.6% Lifespan Remaining</div>
              </div>

              <div style={{ background: 'var(--bg-card-solid)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Cell Temperature</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>32.4°C</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginTop: '2px' }}>Optimal Cooling Range</div>
              </div>

              <div style={{ background: 'var(--bg-card-solid)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Voltage Stability</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>14.8V</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', marginTop: '2px' }}>±0.02V Cell Delta (Stable)</div>
              </div>

              <div style={{ background: 'var(--bg-card-solid)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Last Full Recharge</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>Yesterday 8:45 PM</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Duration: 2.5 hrs</div>
              </div>
            </div>

            <button 
              className="btn-secondary" 
              onClick={handleCalibrate} 
              disabled={calibrating}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <RefreshCw size={15} className={calibrating ? 'spin' : ''} />
              {calibrating ? 'Calibrating Battery Cells...' : 'Calibrate Battery Cells Now'}
            </button>
          </div>

          {/* Maintenance Recommendations */}
          <div className="card">
            <div className="card-header">
              <h3>Maintenance Recommendations</h3>
              <Wrench size={18} color="var(--accent-amber)" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                background: 'var(--bg-card-solid)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Solar Panel Surface Dust Cleaning</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Recommended in 5 days (Accumulated pollen: 8%)</div>
                </div>
                <button 
                  className={cleaningScheduled ? "btn-secondary" : "btn-primary"}
                  onClick={handleScheduleCleaning}
                  disabled={cleaningScheduled}
                  style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                >
                  {cleaningScheduled ? 'Scheduled ✓' : 'Schedule'}
                </button>
              </div>

              <div style={{
                background: 'var(--bg-card-solid)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Motor Propeller Pitch Inspection</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Last certified 12 days ago • Next inspection in 18 days</div>
                </div>
                <span className="badge badge-green">Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
