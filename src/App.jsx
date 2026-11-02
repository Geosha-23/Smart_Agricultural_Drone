import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ScheduleModal from './components/ScheduleModal';
import OverviewDashboard from './components/views/OverviewDashboard';
import FieldMapView from './components/views/FieldMapView';
import PowerSystemView from './components/views/PowerSystemView';
import WaterRefillView from './components/views/WaterRefillView';
import IrrigationForecastView from './components/views/IrrigationForecastView';
import WeedDetectionView from './components/views/WeedDetectionView';
import EnvironmentalHistoryView from './components/views/EnvironmentalHistoryView';
import { initialDrones, detectedIssues } from './data/mockData';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [drones, setDrones] = useState(initialDrones);
  const [issues, setIssues] = useState(detectedIssues);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleScheduleMission = (missionData) => {
    const updated = drones.map(d => {
      if (d.id === missionData.droneId) {
        return {
          ...d,
          status: 'Active',
          task: `${missionData.missionType} in ${missionData.quadrant}`,
          location: missionData.quadrant
        };
      }
      return d;
    });
    setDrones(updated);
    addToast(`Mission Dispatched: ${missionData.droneId} launched for ${missionData.missionType}!`, 'success');
  };

  const handleEmergencyRTL = () => {
    const rtlDrones = drones.map(d => ({
      ...d,
      status: d.status === 'Active' ? 'Returning to Launch (RTL)' : d.status,
      speedMph: d.status === 'Active' ? 22.0 : 0,
      altitudeFt: d.status === 'Active' ? 60 : 0,
      task: 'EMERGENCY RTL: Navigating to nearest docking station'
    }));
    setDrones(rtlDrones);
    addToast('⚠️ EMERGENCY RTL TRIGGERED: All airborne drones commanded to return to launch pads immediately!', 'alert');
  };

  return (
    <div className="app-container">
      {/* Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        fleetStatus={drones} 
      />

      {/* Main Content Workspace */}
      <div className="main-wrapper">
        <Topbar 
          activeTab={activeTab} 
          onOpenScheduleModal={() => setIsScheduleOpen(true)}
          onEmergencyRTL={handleEmergencyRTL}
        />

        {/* Dynamic View Router */}
        {activeTab === 'overview' && (
          <OverviewDashboard 
            drones={drones}
            issues={issues}
            onNavigate={(tab) => setActiveTab(tab)}
            onTriggerToast={addToast}
            onOpenScheduleModal={() => setIsScheduleOpen(true)}
          />
        )}

        {activeTab === 'map' && (
          <FieldMapView 
            drones={drones}
            issues={issues}
            onTriggerToast={addToast}
            onOpenScheduleModal={() => setIsScheduleOpen(true)}
          />
        )}

        {activeTab === 'power' && (
          <PowerSystemView 
            onTriggerToast={addToast}
          />
        )}

        {activeTab === 'water' && (
          <WaterRefillView 
            onTriggerToast={addToast}
          />
        )}

        {activeTab === 'irrigation' && (
          <IrrigationForecastView 
            onTriggerToast={addToast}
            onOpenScheduleModal={() => setIsScheduleOpen(true)}
          />
        )}

        {activeTab === 'weeds' && (
          <WeedDetectionView 
            onTriggerToast={addToast}
          />
        )}

        {activeTab === 'environment' && (
          <EnvironmentalHistoryView 
            onTriggerToast={addToast}
          />
        )}
      </div>

      {/* Schedule Mission Modal */}
      <ScheduleModal 
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onSchedule={handleScheduleMission}
        drones={drones}
      />

      {/* Toast Notification Stack */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className="toast">
            {toast.type === 'alert' ? (
              <AlertCircle size={18} color="var(--accent-rose)" />
            ) : (
              <CheckCircle2 size={18} color="var(--accent-green)" />
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
