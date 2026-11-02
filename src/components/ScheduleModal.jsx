import React, { useState } from 'react';
import { X, Send, Calendar, Clock, MapPin, Droplets, Target } from 'lucide-react';

export default function ScheduleModal({ isOpen, onClose, onSchedule, drones }) {
  const [formData, setFormData] = useState({
    droneId: 'Drone-01',
    missionType: 'Targeted Spot-Spray (Weed)',
    quadrant: 'Northeast Quadrant',
    scheduledTime: '14:30',
    waterVolumeGallons: '25',
    altitudeFt: '45'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule(formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Schedule Drone Mission</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Drone Unit</label>
            <select 
              className="form-control"
              value={formData.droneId}
              onChange={(e) => setFormData({ ...formData, droneId: e.target.value })}
            >
              {drones.map(d => (
                <option key={d.id} value={d.id}>
                  {d.id} ({d.model}) — Battery: {d.battery}% | Water: {d.waterLevel}%
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Mission Type</label>
            <select 
              className="form-control"
              value={formData.missionType}
              onChange={(e) => setFormData({ ...formData, missionType: e.target.value })}
            >
              <option value="Targeted Spot-Spray (Weed)">Targeted Spot-Spray (Weed Clusters)</option>
              <option value="Field Moisture & NDVI Aerial Scan">Field Moisture & NDVI Aerial Scan</option>
              <option value="Emergency Crop Hydration">Emergency Crop Hydration</option>
              <option value="Boundary Patrol & Livestock Surveillance">Boundary Patrol & Livestock Surveillance</option>
            </select>
          </div>

          <div className="form-group">
            <label>Target Sector / Quadrant</label>
            <select 
              className="form-control"
              value={formData.quadrant}
              onChange={(e) => setFormData({ ...formData, quadrant: e.target.value })}
            >
              <option value="Northeast Quadrant">Northeast Quadrant (Rows 1-20)</option>
              <option value="Northwest Quadrant">Northwest Quadrant (Rows 21-40)</option>
              <option value="Southeast Quadrant">Southeast Quadrant (Rows 41-60)</option>
              <option value="Southwest Quadrant">Southwest Quadrant (Rows 61-80)</option>
              <option value="Full Field Sweep">Full Field Sweep (All Quadrants)</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Scheduled Launch Time</label>
              <input 
                type="time" 
                className="form-control"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Water Payload (Gal)</label>
              <input 
                type="number" 
                className="form-control"
                value={formData.waterVolumeGallons}
                onChange={(e) => setFormData({ ...formData, waterVolumeGallons: e.target.value })}
                min="5" 
                max="50"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Flight Altitude: {formData.altitudeFt} Feet AGL</label>
            <input 
              type="range" 
              min="20" 
              max="120" 
              value={formData.altitudeFt}
              onChange={(e) => setFormData({ ...formData, altitudeFt: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Send size={16} />
              Confirm & Dispatch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
