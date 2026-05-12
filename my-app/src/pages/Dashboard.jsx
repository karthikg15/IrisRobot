import React, { useState, useEffect } from 'react';
import { Heart, Thermometer, Activity, Wind, TrendingUp, TrendingDown, User, FileText, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [selectedPatientId, setSelectedPatientId] = useState('P-1001');

  // Mock Patient Data
  const patients = [
    { id: 'P-1001', name: 'John Doe', age: 45, room: '302', condition: 'Post-Surgery Recovery', admission: 'Oct 10, 2023', status: 'Stable' },
    { id: 'P-1002', name: 'Sarah Smith', age: 62, room: '305', condition: 'Pneumonia', admission: 'Oct 12, 2023', status: 'Improving' },
    { id: 'P-1003', name: 'Michael Johnson', age: 28, room: '308', condition: 'Cardiac Observation', admission: 'Oct 14, 2023', status: 'Critical' },
    { id: 'P-1004', name: 'Emily Davis', age: 51, room: '310', condition: 'Asthma Exacerbation', admission: 'Oct 15, 2023', status: 'Stable' },
  ];

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  // Mock realtime data
  const [data, setData] = useState([
    { time: '10:00', heartRate: 72, temp: 98.6, spo2: 98, respRate: 16 },
    { time: '10:05', heartRate: 75, temp: 98.7, spo2: 97, respRate: 17 },
    { time: '10:10', heartRate: 74, temp: 98.6, spo2: 98, respRate: 16 },
    { time: '10:15', heartRate: 78, temp: 98.8, spo2: 96, respRate: 18 },
    { time: '10:20', heartRate: 73, temp: 98.6, spo2: 97, respRate: 16 },
    { time: '10:25', heartRate: 76, temp: 98.7, spo2: 98, respRate: 17 },
    { time: '10:30', heartRate: 75, temp: 98.6, spo2: 98, respRate: 16 },
  ]);

  const [currentMetrics, setCurrentMetrics] = useState({
    heartRate: 75,
    temp: 98.6,
    spo2: 98,
    movement: 'Resting',
    respRate: 16
  });

  // Reset metrics slightly when patient changes to simulate different live data
  useEffect(() => {
    setCurrentMetrics({
      heartRate: 70 + Math.floor(Math.random() * 20),
      temp: +(98.0 + Math.random()).toFixed(1),
      spo2: 95 + Math.floor(Math.random() * 5),
      movement: selectedPatient?.status === 'Critical' ? 'Restless' : 'Resting',
      respRate: 14 + Math.floor(Math.random() * 6)
    });
  }, [selectedPatientId]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetrics(prev => ({
        ...prev,
        heartRate: prev.heartRate + (Math.floor(Math.random() * 5) - 2),
        temp: +(prev.temp + (Math.random() * 0.2 - 0.1)).toFixed(1),
        spo2: Math.min(100, Math.max(90, prev.spo2 + (Math.floor(Math.random() * 3) - 1))),
        respRate: Math.max(12, Math.min(25, prev.respRate + (Math.floor(Math.random() * 3) - 1)))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Live Patient Monitoring</h1>
          <p style={{ color: 'var(--text-muted)' }}>Real-time sensor data and vitals overview.</p>
        </div>
        
        {/* Patient Dropdown Menu */}
        <select 
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
          style={{ 
            padding: '10px 16px', 
            background: 'var(--bg-panel)', 
            border: '1px solid var(--border-color)', 
            color: 'var(--text-main)', 
            borderRadius: '8px', 
            outline: 'none', 
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: 'var(--glass-shadow)'
          }}
        >
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.name} (Room {p.room})</option>
          ))}
        </select>
      </div>

      {/* Patient Information Card */}
      {selectedPatient && (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderRight: '1px solid var(--border-color)', paddingRight: '2rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <User size={32} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{selectedPatient.name}</h2>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Patient ID: {selectedPatient.id} • Age: {selectedPatient.age}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '3rem', flex: 1, alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={14} /> Diagnosis / Condition
              </p>
              <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>{selectedPatient.condition}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} /> Admission Date
              </p>
              <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>{selectedPatient.admission}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={14} /> Status
              </p>
              <p style={{ 
                fontWeight: 600, 
                fontSize: '1.1rem', 
                color: selectedPatient.status === 'Critical' ? 'var(--danger)' : selectedPatient.status === 'Improving' ? 'var(--success)' : 'var(--primary)' 
              }}>
                {selectedPatient.status}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-grid">
        {/* Heart Rate Card */}
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Heart Rate</span>
            <div className="metric-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
              <Heart size={20} />
            </div>
          </div>
          <div className="metric-value">
            {currentMetrics.heartRate} <span className="metric-unit">BPM</span>
          </div>
          <div className="metric-trend trend-up">
            <TrendingUp size={16} />
            <span>+2 BPM from avg</span>
          </div>
        </div>

        {/* Temperature Card */}
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Body Temperature</span>
            <div className="metric-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
              <Thermometer size={20} />
            </div>
          </div>
          <div className="metric-value">
            {currentMetrics.temp} <span className="metric-unit">°F</span>
          </div>
          <div className="metric-trend trend-neutral">
            <span>Normal range</span>
          </div>
        </div>

        {/* SpO2 Card */}
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Oxygen Saturation</span>
            <div className="metric-icon" style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)' }}>
              <Wind size={20} />
            </div>
          </div>
          <div className="metric-value">
            {currentMetrics.spo2} <span className="metric-unit">%</span>
          </div>
          <div className="metric-trend trend-down">
            <TrendingDown size={16} />
            <span>Stable</span>
          </div>
        </div>

        {/* Movement Card */}
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Patient Status</span>
            <div className="metric-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
              <Activity size={20} />
            </div>
          </div>
          <div className="metric-value" style={{ fontSize: '1.5rem' }}>
            {currentMetrics.movement}
          </div>
          <div className="metric-trend trend-neutral">
            <span>Last moved 10m ago</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        {/* Heart Rate Chart */}
        <div className="glass-panel chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Heart Rate Trends</h3>
            <select style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '6px 12px', borderRadius: '8px', outline: 'none', fontWeight: 500 }}>
              <option>Last Hour</option>
              <option>Last 6 Hours</option>
            </select>
          </div>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--danger)' }}
                />
                <Line type="monotone" dataKey="heartRate" stroke="var(--danger)" strokeWidth={3} dot={{ fill: 'var(--danger)', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SpO2 Chart */}
        <div className="glass-panel chart-card">
          <div className="chart-header">
            <h3 className="chart-title">SpO2 Levels</h3>
          </div>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={[90, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--primary)' }}
                />
                <Line type="monotone" dataKey="spo2" stroke="var(--primary)" strokeWidth={3} dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Respiratory Rate Chart */}
        <div className="glass-panel chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Respiratory Rate</h3>
          </div>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={[10, 30]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--secondary)' }}
                />
                <Line type="monotone" dataKey="respRate" stroke="var(--secondary)" strokeWidth={3} dot={{ fill: 'var(--secondary)', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Status Section */}
        <div className="glass-panel chart-card">
          <h3 className="chart-title">Live Sensor Feed</h3>
          <div className="status-list" style={{ marginTop: '0.5rem' }}>
            <div className="status-item">
              <div className="status-item-icon">
                <Activity size={20} />
              </div>
              <div className="status-item-info">
                <h4>Ultrasonic Sensor</h4>
                <p>Clear - No Obstacles (2.5m)</p>
              </div>
            </div>
            
            <div className="status-item">
              <div className="status-item-icon" style={{ color: 'var(--warning)', background: 'rgba(245, 158, 11, 0.1)' }}>
                <Wind size={20} />
              </div>
              <div className="status-item-info">
                <h4>Air Quality (Gas)</h4>
                <p>Normal - Good Ventilation</p>
              </div>
            </div>

            <div className="status-item">
              <div className="status-item-icon" style={{ color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)' }}>
                <Thermometer size={20} />
              </div>
              <div className="status-item-info">
                <h4>IR Sensor</h4>
                <p>Patient Present in Bed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
