import React, { useState, useEffect } from 'react';
import { Radio, CalendarPlus, ShieldAlert, Wifi, Clock, Thermometer, Wind } from 'lucide-react';

const titleMap = {
  overview: { title: 'Fleet Monitoring Dashboard', subtitle: 'Real-time telemetry, battery stats, active mission alerts' },
  map: { title: 'Field Coverage & GIS Radar Map', subtitle: 'Quadrant coverage, drone tracking, sensor layer analytics' },
  power: { title: 'Drone Power System & Solar Telemetry', subtitle: 'Subsystem consumption, battery cell diagnostics, solar recharge' },
  water: { title: 'Water Tank & Automated Refill Scheduler', subtitle: 'Tank capacity management, refill thresholds, station telemetry' },
  irrigation: { title: 'Predictive Irrigation & Weather Forecast', subtitle: '7-Day moisture projections, sector demand, precipitation modeling' },
  weeds: { title: 'AI Weed & Pest Detection Hub', subtitle: 'High-resolution multispectral scan analysis & spot-spray targeting' },
  environment: { title: 'Environmental & Microclimate Analytics', subtitle: 'Historical sensor trends, temperature, humidity, wind analytics' },
};

export default function Topbar({ activeTab, onOpenScheduleModal, onEmergencyRTL }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentMeta = titleMap[activeTab] || titleMap.overview;

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-title">
          <h2>{currentMeta.title}</h2>
          <p>{currentMeta.subtitle}</p>
        </div>
      </div>

      <div className="topbar-right">
        <div className="telemetry-chip" title="Base Station 5G Telemetry">
          <Wifi size={15} color="var(--accent-green)" />
          <span>5G Link: 98%</span>
        </div>

        <div className="telemetry-chip" title="Local Field Weather">
          <Thermometer size={15} color="var(--accent-cyan)" />
          <span>78°F / 25.5°C</span>
        </div>

        <div className="telemetry-chip" title="Local System Clock">
          <Clock size={15} color="var(--text-muted)" />
          <span>{timeStr || '12:00:00'}</span>
        </div>

        <button className="btn-primary" onClick={onOpenScheduleModal}>
          <CalendarPlus size={16} />
          <span>Schedule Mission</span>
        </button>

        <button className="btn-danger" onClick={onEmergencyRTL} title="Trigger Emergency Return to Base (RTL)">
          <ShieldAlert size={16} />
          <span>Emergency RTL</span>
        </button>
      </div>
    </header>
  );
}
