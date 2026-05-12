import React, { useState } from 'react';
import { AlertTriangle, Clock, HeartPulse, Activity, WifiOff, Thermometer, User, MapPin } from 'lucide-react';
import './Alerts.css';

const Alerts = () => {
  const [filter, setFilter] = useState('All');

  const alertsData = [
    {
      id: 1,
      type: 'critical',
      title: 'Abnormal Heart Rate Detected',
      description: 'Patient heart rate spiked to 135 BPM and has remained elevated for over 3 minutes. Immediate intervention recommended.',
      time: 'Just now',
      patientName: 'John Doe',
      roomNumber: '302',
      icon: <HeartPulse size={24} />,
      status: 'active'
    },
    {
      id: 2,
      type: 'critical',
      title: 'Fall Detection Warning',
      description: 'Sudden downward movement detected by ultrasonic sensors. Patient may have fallen near the bed.',
      time: '5 minutes ago',
      patientName: 'Michael Johnson',
      roomNumber: '308',
      icon: <Activity size={24} />,
      status: 'active'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Elevated Temperature',
      description: 'Patient body temperature recorded at 101.2°F. Continuous monitoring initiated.',
      time: '15 minutes ago',
      patientName: 'Emily Davis',
      roomNumber: '310',
      icon: <Thermometer size={24} />,
      status: 'acknowledged'
    },
    {
      id: 4,
      type: 'critical',
      title: 'No Movement Detected',
      description: 'No significant movement detected for an extended period. Please verify patient status.',
      time: '1 hour ago',
      patientName: 'Sarah Smith',
      roomNumber: '305',
      icon: <Activity size={24} />,
      status: 'acknowledged'
    },
    {
      id: 5,
      type: 'warning',
      title: 'Robot Connection Unstable',
      description: 'Temporary loss of connection with IRIS robot for 12 seconds. Reconnected successfully.',
      time: '2 hours ago',
      patientName: 'John Doe',
      roomNumber: '302',
      icon: <WifiOff size={24} />,
      status: 'resolved'
    }
  ];

  const filteredAlerts = alertsData.filter(alert => {
    if (filter === 'All') return true;
    if (filter === 'Critical') return alert.type === 'critical';
    if (filter === 'Active') return alert.status === 'active';
    return true;
  });

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Emergency Alert System</h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time critical notifications and system warnings.</p>
      </div>

      <div className="alert-filters">
        <button 
          className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
          onClick={() => setFilter('All')}
        >
          All Alerts
        </button>
        <button 
          className={`filter-btn critical ${filter === 'Critical' ? 'active' : ''}`}
          onClick={() => setFilter('Critical')}
        >
          Critical Only
        </button>
        <button 
          className={`filter-btn ${filter === 'Active' ? 'active' : ''}`}
          onClick={() => setFilter('Active')}
        >
          Active / Unresolved
        </button>
      </div>

      <div className="alerts-list">
        {filteredAlerts.map(alert => (
          <div key={alert.id} className={`glass-panel alert-card ${alert.type}`}>
            <div className="alert-icon-wrapper">
              {alert.icon}
            </div>
            
            <div className="alert-content">
              <div className="alert-header">
                <h3 className="alert-title">{alert.title}</h3>
                <span className="alert-time">
                  <Clock size={14} />
                  {alert.time}
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <User size={14} color="var(--primary)" />
                  {alert.patientName}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} color="var(--warning)" />
                  Room {alert.roomNumber}
                </span>
              </div>

              <p className="alert-description">{alert.description}</p>
              
              <div className="alert-actions">
                {alert.status === 'active' && (
                  <button className="alert-btn btn-danger">Respond Immediately</button>
                )}
                {alert.status !== 'resolved' && (
                  <button className="alert-btn btn-outline">Acknowledge</button>
                )}
                <button className="alert-btn btn-outline">View Details</button>
              </div>
            </div>
            
            {alert.type === 'critical' && alert.status === 'active' && (
              <div style={{ alignSelf: 'center', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                <AlertTriangle size={20} />
                Requires Action
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
