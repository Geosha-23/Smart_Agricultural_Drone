import React, { useState } from 'react';
import { 
  Layers, 
  MapPin, 
  Download, 
  Calendar, 
  Compass, 
  Send, 
  AlertTriangle, 
  Crosshair, 
  Eye, 
  Radio,
  Sparkles,
  Maximize2
} from 'lucide-react';

export default function FieldMapView({ 
  drones, 
  issues, 
  onTriggerToast, 
  onOpenScheduleModal 
}) {
  const [selectedQuadrant, setSelectedQuadrant] = useState('All');
  const [activeLayers, setActiveLayers] = useState({
    drones: true,
    weeds: true,
    moisture: true,
    flightPaths: true
  });
  const [selectedEntity, setSelectedEntity] = useState(null);

  const toggleLayer = (layerKey) => {
    setActiveLayers(prev => {
      const next = { ...prev, [layerKey]: !prev[layerKey] };
      onTriggerToast(`Toggled ${layerKey} layer ${next[layerKey] ? 'ON' : 'OFF'}`);
      return next;
    });
  };

  const handleExportMap = () => {
    onTriggerToast('Field GIS GeoJSON telemetry exported successfully!');
  };

  return (
    <div className="page-container">
      {/* Control Strip & Quick Actions */}
      <div className="card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Quadrant Filter:</span>
            {['All', 'Northeast (NE)', 'Northwest (NW)', 'Southeast (SE)', 'Southwest (SW)'].map((quad) => {
              const val = quad.split(' ')[0];
              const isActive = selectedQuadrant === val;
              return (
                <button
                  key={quad}
                  className={`tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedQuadrant(val)}
                  style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                >
                  {quad}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-secondary" onClick={handleExportMap} style={{ padding: '7px 14px', fontSize: '0.82rem' }}>
              <Download size={15} />
              Export GIS
            </button>
            <button className="btn-primary" onClick={onOpenScheduleModal} style={{ padding: '7px 14px', fontSize: '0.82rem' }}>
              <Calendar size={15} />
              Schedule Drone Inspection
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Field Map Canvas */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Compass size={20} color="var(--accent-cyan)" />
            <span style={{ fontWeight: 600 }}>Interactive Satellite & Radar Telemetry Grid</span>
            <span className="badge badge-green">3 Drones Tracked</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={`tab-btn ${activeLayers.drones ? 'active' : ''}`}
              onClick={() => toggleLayer('drones')}
              style={{ fontSize: '0.78rem', padding: '4px 10px' }}
            >
              Drone Fleet
            </button>
            <button 
              className={`tab-btn ${activeLayers.weeds ? 'active' : ''}`}
              onClick={() => toggleLayer('weeds')}
              style={{ fontSize: '0.78rem', padding: '4px 10px' }}
            >
              Weed Clusters
            </button>
            <button 
              className={`tab-btn ${activeLayers.moisture ? 'active' : ''}`}
              onClick={() => toggleLayer('moisture')}
              style={{ fontSize: '0.78rem', padding: '4px 10px' }}
            >
              Soil Moisture
            </button>
            <button 
              className={`tab-btn ${activeLayers.flightPaths ? 'active' : ''}`}
              onClick={() => toggleLayer('flightPaths')}
              style={{ fontSize: '0.78rem', padding: '4px 10px' }}
            >
              Waypoints
            </button>
          </div>
        </div>

        {/* The Radar Field Screen */}
        <div className="radar-map-wrapper">
          <div className="map-grid-overlay"></div>
          <div className="radar-sweep"></div>

          {/* Quadrant Watermark Labels */}
          <div style={{ position: 'absolute', top: 20, left: 30, color: 'rgba(255,255,255,0.18)', fontWeight: 700, fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>
            NW SECTOR (Crop: Sweet Corn)
          </div>
          <div style={{ position: 'absolute', top: 20, right: 30, color: 'rgba(255,255,255,0.18)', fontWeight: 700, fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>
            NE SECTOR (Crop: Soybeans)
          </div>
          <div style={{ position: 'absolute', bottom: 20, left: 30, color: 'rgba(255,255,255,0.18)', fontWeight: 700, fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>
            SW SECTOR (Crop: Alfalfa)
          </div>
          <div style={{ position: 'absolute', bottom: 20, right: 30, color: 'rgba(255,255,255,0.18)', fontWeight: 700, fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>
            SE SECTOR (Crop: Winter Wheat)
          </div>

          {/* Center Crosshair Marker */}
          <div style={{ position: 'absolute', width: '20px', height: '20px', border: '1px solid rgba(6,182,212,0.4)', borderRadius: '50%' }}></div>

          {/* Flight Path SVG Line */}
          {activeLayers.flightPaths && (
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              <path 
                d="M 25% 22% Q 45% 15%, 72% 28%" 
                fill="none" 
                stroke="rgba(99, 74, 255, 0.45)" 
                strokeWidth="2" 
                strokeDasharray="6 6"
              />
              <path 
                d="M 72% 28% Q 78% 35%, 75% 32%" 
                fill="none" 
                stroke="rgba(244, 63, 94, 0.6)" 
                strokeWidth="2" 
                strokeDasharray="4 4"
              />
            </svg>
          )}

          {/* Drones on Map */}
          {activeLayers.drones && drones.map(drone => (
            <div 
              key={drone.id}
              className="drone-node"
              style={{ left: `${drone.x}%`, top: `${drone.y}%` }}
              onClick={() => setSelectedEntity({ type: 'drone', data: drone })}
            >
              <div className={`drone-beacon ${drone.status === 'Active' ? 'active' : drone.status === 'Charging' ? 'charging' : ''}`}>
                <Radio size={16} />
              </div>
              <span className="drone-label">
                {drone.id} ({drone.battery}%)
              </span>
            </div>
          ))}

          {/* Detected Hazard Markers */}
          {activeLayers.weeds && issues.map(iss => (
            <div 
              key={iss.id}
              className="hazard-marker"
              style={{ left: `${iss.x}%`, top: `${iss.y}%` }}
              onClick={() => setSelectedEntity({ type: 'issue', data: iss })}
              title={`${iss.title}: ${iss.location}`}
            >
              <AlertTriangle size={13} />
            </div>
          ))}

          {/* Selected Entity Popup Inspector Card */}
          {selectedEntity && (
            <div style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid var(--border-accent)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              maxWidth: '320px',
              boxShadow: 'var(--shadow-lg)',
              backdropFilter: 'blur(16px)',
              zIndex: 30,
              animation: 'slide-in 0.2s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {selectedEntity.type === 'drone' ? selectedEntity.data.id : selectedEntity.data.title}
                </strong>
                <button 
                  onClick={() => setSelectedEntity(null)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}
                >
                  ✕
                </button>
              </div>

              {selectedEntity.type === 'drone' ? (
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <p><strong>Model:</strong> {selectedEntity.data.model}</p>
                  <p><strong>Status:</strong> <span className="badge badge-green">{selectedEntity.data.status}</span></p>
                  <p><strong>Battery:</strong> {selectedEntity.data.battery}% | <strong>Water:</strong> {selectedEntity.data.waterLevel}%</p>
                  <p><strong>Altitude:</strong> {selectedEntity.data.altitudeFt} ft | <strong>Speed:</strong> {selectedEntity.data.speedMph} mph</p>
                  <p style={{ marginTop: '6px', color: 'var(--accent-cyan)' }}>{selectedEntity.data.task}</p>
                </div>
              ) : (
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <p><strong>Species:</strong> {selectedEntity.data.species}</p>
                  <p><strong>Coordinates:</strong> {selectedEntity.data.location}</p>
                  <p><strong>Affected Area:</strong> {selectedEntity.data.area}</p>
                  <p><strong>Growth Risk:</strong> {selectedEntity.data.growthStage}</p>
                  <button 
                    className="btn-danger" 
                    style={{ width: '100%', marginTop: '10px', padding: '6px', fontSize: '0.8rem', justifyContent: 'center' }}
                    onClick={() => onTriggerToast(`Dispatched spot-spray unit to ${selectedEntity.data.location}!`)}
                  >
                    Dispatch Spot-Spray
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Drones Table & Issues Split */}
      <div className="grid-2">
        {/* Active Drones Table */}
        <div className="card">
          <div className="card-header">
            <h3>Active Drones on Field Map</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>GPS lock confirmed</span>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Drone</th>
                  <th>Status</th>
                  <th>Sector Location</th>
                  <th>Battery</th>
                  <th>Water</th>
                </tr>
              </thead>
              <tbody>
                {drones.map(drone => (
                  <tr key={drone.id}>
                    <td>
                      <strong>{drone.id}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{drone.model}</div>
                    </td>
                    <td>
                      <span className={`badge ${drone.status === 'Active' ? 'badge-green' : drone.status === 'Charging' ? 'badge-cyan' : 'badge-purple'}`}>
                        {drone.status}
                      </span>
                    </td>
                    <td>{drone.location}</td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{drone.battery}%</span>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{drone.waterLevel}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detected Issues */}
        <div className="card">
          <div className="card-header">
            <h3>Detected Field Anomalies</h3>
            <span className="badge badge-rose">{issues.length} Hazards</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {issues.map(iss => (
              <div 
                key={iss.id} 
                style={{
                  background: 'var(--bg-card-solid)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <strong>{iss.title}</strong>
                    <span className={`badge ${iss.severity === 'high' ? 'badge-rose' : 'badge-amber'}`}>
                      {iss.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {iss.location}
                  </div>
                </div>
                <button 
                  className="btn-secondary" 
                  style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                  onClick={() => setSelectedEntity({ type: 'issue', data: iss })}
                >
                  Pinpoint
                </button>
              </div>
            ))}
          </div>

          <button 
            className="action-btn"
            onClick={onOpenScheduleModal}
            style={{ marginTop: '20px' }}
          >
            Schedule Drone Inspection Mission
          </button>
        </div>
      </div>
    </div>
  );
}
