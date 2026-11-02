import React, { useState } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Crosshair, 
  Download, 
  ZoomIn, 
  Send, 
  Eye, 
  Layers, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { detectedIssues } from '../../data/mockData';

export default function WeedDetectionView({ onTriggerToast }) {
  const [selectedIssueId, setSelectedIssueId] = useState('ISS-001');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isSpraying, setIsSpraying] = useState(false);
  const [resolvedIssues, setResolvedIssues] = useState([]);

  const activeIssue = detectedIssues.find(i => i.id === selectedIssueId) || detectedIssues[0];
  const isResolved = resolvedIssues.includes(activeIssue.id);

  const handleDispatchSpray = () => {
    setIsSpraying(true);
    onTriggerToast(`Targeting ${activeIssue.title} (${activeIssue.species})...`);
    
    setTimeout(() => {
      setIsSpraying(false);
      setResolvedIssues(prev => [...prev, activeIssue.id]);
      onTriggerToast(`Spot-spraying completed! 98.5% herbicide reduction achieved via micro-dose precision.`);
    }, 2500);
  };

  const handleDownloadScan = () => {
    onTriggerToast('High-resolution NDVI raw orthomosaic image downloaded (TIFF 4.2 MB)');
  };

  return (
    <div className="page-container">
      {/* Cluster Selector Tabs */}
      <div className="card" style={{ padding: '14px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Select Detection:</span>
            {detectedIssues.map(iss => {
              const isSelected = iss.id === activeIssue.id;
              const isDone = resolvedIssues.includes(iss.id);
              return (
                <button
                  key={iss.id}
                  className={`tab-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedIssueId(iss.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <AlertTriangle size={14} color={isDone ? 'var(--accent-green)' : 'var(--accent-rose)'} />
                  <span>{iss.title}</span>
                  {isDone && <span className="badge badge-green" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>Treated</span>}
                </button>
              );
            })}
          </div>

          <button className="btn-secondary" onClick={handleDownloadScan} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            <Download size={14} />
            Export Orthomosaic
          </button>
        </div>
      </div>

      {/* Hero 3 Status Cards */}
      <div className="grid-3">
        <div className="card metric-card">
          <div className="metric-top">
            <span className="metric-label">Cluster Coordinates</span>
            <MapPin size={20} color="var(--accent-purple)" />
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '6px' }}>{activeIssue.location}</div>
          <p className="metric-desc">GPS Grid: 41°23'18.4"N 88°14'09.2"W • Pinpoint RTK-GPS Accuracy</p>
        </div>

        <div className="card metric-card">
          <div className="metric-top">
            <span className="metric-label">Detection Timestamp</span>
            <Clock size={20} color="var(--accent-cyan)" />
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '6px' }}>{activeIssue.detectedAt}</div>
          <p className="metric-desc">Captured during automated dawn survey flight #FL-8402</p>
        </div>

        <div className="card metric-card">
          <div className="metric-top">
            <span className="metric-label">Threat Severity</span>
            <ShieldAlert size={20} color={isResolved ? "var(--accent-green)" : "var(--accent-rose)"} />
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '6px', color: isResolved ? 'var(--accent-green)' : 'var(--accent-rose)' }}>
            {isResolved ? 'Neutralized / Treated' : `${activeIssue.severity.toUpperCase()} RISK`}
          </div>
          <p className="metric-desc">
            {isResolved ? 'Follow-up aerial scan scheduled in 48 hours to confirm eradication.' : 'Fast seed dispersal risk if left untreated during current bloom.'}
          </p>
        </div>
      </div>

      {/* Aerial Imagery Viewer & Botanical Analysis Split */}
      <div className="grid-2">
        {/* Aerial Scan Viewer Canvas */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>High-Resolution Multispectral Imagery</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Camera: Sony 61MP RGB + RedEdge-P Sensor Array</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="btn-secondary" 
                onClick={() => setZoomLevel(prev => (prev === 1 ? 1.4 : 1))}
                style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                title="Toggle Zoom"
              >
                <ZoomIn size={15} />
                {zoomLevel > 1 ? 'Reset' : 'Zoom 2x'}
              </button>
            </div>
          </div>

          {/* Visual Canvas Representation of Aerial Crop View */}
          <div style={{
            position: 'relative',
            height: '380px',
            background: 'radial-gradient(circle at center, #1b3826 0%, #0e2216 60%, #06110a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {/* Crop row visual lines */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'repeating-linear-gradient(45deg, rgba(34, 197, 94, 0.08) 0px, rgba(34, 197, 94, 0.08) 20px, transparent 20px, transparent 40px)',
              transform: `scale(${zoomLevel})`,
              transition: 'transform 0.3s ease'
            }}></div>

            {/* AI Bounding Box on Weed Cluster */}
            <div style={{
              position: 'relative',
              width: `${160 * zoomLevel}px`,
              height: `${140 * zoomLevel}px`,
              border: isResolved ? '2px dashed var(--accent-green)' : '2px solid var(--accent-rose)',
              borderRadius: '8px',
              background: isResolved ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '6px',
              boxShadow: isResolved ? '0 0 20px rgba(16, 185, 129, 0.4)' : '0 0 20px rgba(244, 63, 94, 0.4)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                background: isResolved ? 'var(--accent-green)' : 'var(--accent-rose)',
                color: 'white',
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: '3px',
                alignSelf: 'flex-start',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Crosshair size={10} />
                {isResolved ? 'TREATED (0.0% WEED)' : 'AI CONFIDENCE: 99.2%'}
              </div>

              {/* Weed rosette visual representation */}
              <div style={{ alignSelf: 'center', color: isResolved ? '#34d399' : '#f87171', textAlign: 'center' }}>
                <Sparkles size={36} />
                <div style={{ fontSize: '0.72rem', fontWeight: 600 }}>{activeIssue.species}</div>
              </div>

              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', textAlign: 'right' }}>
                {activeIssue.area}
              </div>
            </div>

            {/* Reticle / Drone targeting overlay */}
            <div style={{ position: 'absolute', top: 16, left: 16, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)' }}>
              ALT: 45.0 FT | GSD: 0.8 CM/PX | SPECTRUM: NDVI
            </div>
          </div>
        </div>

        {/* Botanical Species & Treatment Card */}
        <div className="card">
          <div className="card-header">
            <h3>Botanical Diagnosis & Treatment</h3>
            <span className="badge badge-purple">AI Plant Pathology</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'var(--bg-card-solid)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Identified Weed Species</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '2px' }}>{activeIssue.species}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Deep, creeping root systems capable of depleting crop soil nitrates by up to 40%.
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: 'var(--bg-card-solid)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Infested Area</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{activeIssue.area}</div>
              </div>

              <div style={{ background: 'var(--bg-card-solid)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Maturity Stage</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{activeIssue.growthStage}</div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card-solid)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Prescribed Drone Treatment</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, marginTop: '4px' }}>
                Organic Targeted Micro-Dose Systemic Bio-Herbicide
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-green)', marginTop: '4px' }}>
                Precision spray nozzle: 120-micron droplets directly on weed rosettes. 0% crop collateral.
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: '10px', display: 'flex', gap: '12px' }}>
              <button 
                className="btn-danger" 
                onClick={handleDispatchSpray} 
                disabled={isSpraying || isResolved}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Crosshair size={16} />
                {isSpraying ? 'Targeting & Spraying...' : isResolved ? 'Weed Cluster Neutralized ✓' : 'Dispatch Drone Spot-Spray'}
              </button>

              <button 
                className="btn-secondary"
                onClick={() => onTriggerToast('Flagged for manual agronomic ground inspection.')}
              >
                Flag for Ground Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
