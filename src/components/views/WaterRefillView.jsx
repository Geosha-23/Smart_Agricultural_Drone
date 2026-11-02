import React, { useState } from 'react';
import { 
  Droplet, 
  Clock, 
  MapPin, 
  CloudRain, 
  Sliders, 
  Check, 
  Save, 
  RotateCcw,
  Sparkles,
  Play
} from 'lucide-react';
import { refillHistory } from '../../data/mockData';

export default function WaterRefillView({ onTriggerToast }) {
  const [mode, setMode] = useState('Automatic');
  const [minThreshold, setMinThreshold] = useState(25);
  const [targetFill, setTargetFill] = useState(100);
  const [location, setLocation] = useState('Main Water Station (Northwest)');
  const [source, setSource] = useState('Rainwater Collection Tank');
  const [scheduledTime, setScheduledTime] = useState('Today @ 2:45 PM (in 45 minutes)');
  const [priority, setPriority] = useState('Normal');
  const [historyList, setHistoryList] = useState(refillHistory);
  const [isRefilling, setIsRefilling] = useState(false);
  const [currentGallons, setCurrentGallons] = useState(34);
  const [currentPercent, setCurrentPercent] = useState(68);

  const handleSave = () => {
    onTriggerToast(`Refill settings saved: Trigger at ${minThreshold}%, Fill to ${targetFill}%, Mode: ${mode}`);
  };

  const handleInstantRefill = () => {
    setIsRefilling(true);
    onTriggerToast('Drone-01 docking with Main Water Station for high-speed refill...');
    
    setTimeout(() => {
      setCurrentGallons(50);
      setCurrentPercent(100);
      setIsRefilling(false);
      const newEntry = {
        id: Date.now(),
        time: 'Just now',
        drone: 'Drone-01',
        mode: mode,
        location: location.split(' ')[0] + ' Station',
        capacityChange: `${currentPercent}% → 100%`,
        volume: `${(50 - currentGallons).toFixed(1)} gal`,
        duration: '1m 20s'
      };
      setHistoryList([newEntry, ...historyList]);
      onTriggerToast('Refill complete! Drone-01 reservoir replenished to 100% (50 gallons).');
    }, 2000);
  };

  return (
    <div className="page-container">
      {/* Current Capacity Hero Card */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(20, 27, 45, 0.9), rgba(6, 182, 212, 0.1))',
        border: '1px solid rgba(6, 182, 212, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)' }}>
                <Droplet size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Drone-01 Liquid Payload Tank</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Precision Spot-Spray & Crop Hydration Reservoir</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '16px' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {currentPercent}%
              </span>
              <span style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                {currentGallons} Gallons Remaining (Capacity: 50 Gal)
              </span>
            </div>

            <div className="progress-track" style={{ width: '100%', maxWidth: '500px', height: '10px', marginTop: '10px' }}>
              <div className="progress-fill cyan" style={{ width: `${currentPercent}%` }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              className="btn-primary" 
              onClick={handleInstantRefill}
              disabled={isRefilling || currentPercent >= 100}
              style={{ background: 'linear-gradient(135deg, #0891b2, #06b6d4)' }}
            >
              <Play size={16} />
              {isRefilling ? 'Refilling in Progress...' : 'Trigger Fast Refill Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Refill Mode & Config Tabs */}
      <div className="card">
        <div className="card-header">
          <h3>Refill Automation Configuration</h3>
          <div className="tabs-header" style={{ paddingBottom: 0, border: 'none' }}>
            {['Automatic', 'Manual', 'Custom'].map(m => (
              <button
                key={m}
                className={`tab-btn ${mode === m ? 'active' : ''}`}
                onClick={() => {
                  setMode(m);
                  onTriggerToast(`Switched refill automation mode to ${m}`);
                }}
              >
                {m} Mode
              </button>
            ))}
          </div>
        </div>

        {/* 3 Parameter Cards */}
        <div className="grid-3" style={{ marginTop: '14px' }}>
          <div className="card" style={{ background: 'var(--bg-card-solid)' }}>
            <div className="metric-top">
              <span className="metric-label">Next Scheduled Refill</span>
              <Clock size={18} color="var(--accent-cyan)" />
            </div>
            <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '6px' }}>{scheduledTime}</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Calculated based on planned weed spray sorties
            </p>
          </div>

          <div className="card" style={{ background: 'var(--bg-card-solid)' }}>
            <div className="metric-top">
              <span className="metric-label">Refill Station</span>
              <MapPin size={18} color="var(--accent-green)" />
            </div>
            <select 
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ marginTop: '8px' }}
            >
              <option value="Main Water Station (Northwest)">Main Water Station (Northwest)</option>
              <option value="Secondary Station (East Field)">Secondary Station (East Field)</option>
              <option value="Mobile Refill Rover #02">Mobile Refill Rover #02</option>
            </select>
          </div>

          <div className="card" style={{ background: 'var(--bg-card-solid)' }}>
            <div className="metric-top">
              <span className="metric-label">Water Supply Source</span>
              <CloudRain size={18} color="var(--accent-purple)" />
            </div>
            <select 
              className="form-control"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              style={{ marginTop: '8px' }}
            >
              <option value="Rainwater Collection Tank">Rainwater Collection Tank (Filtered)</option>
              <option value="Solar Powered Well Pump #01">Solar Powered Well Pump #01</option>
              <option value="Agricultural Canal Reserve">Agricultural Canal Reserve</option>
            </select>
          </div>
        </div>

        {/* Threshold Sliders */}
        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ background: 'var(--bg-card-solid)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Minimum Capacity Before Auto-Refill Trigger</label>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)' }}>{minThreshold}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="50" 
              value={minThreshold} 
              onChange={(e) => setMinThreshold(Number(e.target.value))} 
            />
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Drone automatically navigates back to base when liquid dips below {minThreshold}%
            </p>
          </div>

          <div style={{ background: 'var(--bg-card-solid)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Target Fill Capacity</label>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-green)' }}>{targetFill}%</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="100" 
              value={targetFill} 
              onChange={(e) => setTargetFill(Number(e.target.value))} 
            />
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Fills up to {targetFill}% ({((50 * targetFill) / 100).toFixed(0)} gallons) to optimize flight weight
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
          <button className="btn-secondary" onClick={() => onTriggerToast('Configuration reset to factory defaults')}>
            <RotateCcw size={15} />
            Reset
          </button>
          <button className="btn-primary" onClick={handleSave}>
            <Save size={15} />
            Save Configuration
          </button>
        </div>
      </div>

      {/* Refill History Table */}
      <div className="card">
        <div className="card-header">
          <h3>Refill Operation History</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Logged across all stations</span>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Drone Unit</th>
                <th>Mode</th>
                <th>Station Location</th>
                <th>Capacity Delta</th>
                <th>Volume Filled</th>
                <th>Fill Duration</th>
              </tr>
            </thead>
            <tbody>
              {historyList.map(item => (
                <tr key={item.id}>
                  <td><strong>{item.time}</strong></td>
                  <td>{item.drone}</td>
                  <td>
                    <span className={`badge ${item.mode === 'Automatic' ? 'badge-green' : item.mode === 'Manual' ? 'badge-cyan' : 'badge-purple'}`}>
                      {item.mode}
                    </span>
                  </td>
                  <td>{item.location}</td>
                  <td><span style={{ fontFamily: 'var(--font-mono)' }}>{item.capacityChange}</span></td>
                  <td><strong style={{ color: 'var(--accent-cyan)' }}>{item.volume}</strong></td>
                  <td>{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
