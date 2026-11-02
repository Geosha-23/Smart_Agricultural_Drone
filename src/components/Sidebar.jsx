import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  BatteryCharging, 
  Droplet, 
  CloudRain, 
  AlertTriangle, 
  Activity, 
  Cpu, 
  Radio
} from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Fleet Overview', icon: LayoutDashboard },
  { id: 'map', label: 'Field Coverage Map', icon: Map },
  { id: 'power', label: 'Power & Solar Telemetry', icon: BatteryCharging },
  { id: 'water', label: 'Water Tank & Refill', icon: Droplet },
  { id: 'irrigation', label: 'Irrigation Forecast', icon: CloudRain },
  { id: 'weeds', label: 'Weed Detection', icon: AlertTriangle },
  { id: 'environment', label: 'Environmental History', icon: Activity },
];

export default function Sidebar({ activeTab, setActiveTab, fleetStatus }) {
  const activeDronesCount = fleetStatus.filter(d => d.status === 'Active').length;
  const chargingDronesCount = fleetStatus.filter(d => d.status === 'Charging').length;
  const scheduledDronesCount = fleetStatus.filter(d => d.status === 'Scheduled').length;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand-icon">
          <Cpu size={24} />
        </div>
        <div className="brand-text">
          <h1>SmartAgriDrone</h1>
          <span><span className="pulse-dot"></span> Live Telemetry</span>
        </div>
      </div>

      <ul className="nav-list">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <li key={item.id} className={`nav-item ${isActive ? 'active' : ''}`}>
              <button onClick={() => setActiveTab(item.id)}>
                <Icon size={19} className="nav-icon" />
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer">
        <div className="fleet-health-summary">
          <div className="fleet-health-header">
            <span>Fleet Health</span>
            <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>100% Operational</span>
          </div>
          <div className="fleet-bar-container">
            <div className="fleet-bar-seg active" title="Active Drones"></div>
            <div className="fleet-bar-seg charging" title="Charging Drones"></div>
          </div>
          <div className="fleet-counts">
            <span>Active: <strong>{activeDronesCount}</strong></span>
            <span>Charging: <strong>{chargingDronesCount}</strong></span>
            <span>Standby: <strong>{scheduledDronesCount}</strong></span>
          </div>
        </div>
      </div>
    </aside>
  );
}
