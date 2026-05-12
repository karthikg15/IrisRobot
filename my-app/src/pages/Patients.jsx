import React, { useState } from 'react';
import { Search, Users, AlertTriangle, Activity, Image as ImageIcon } from 'lucide-react';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const patientsList = [
    { id: 'R1', name: 'Demo_Patient', hr: 79, spo2: 96, rr: 18, bp: '115/74', emotion: 'Neutral', status: 'Stable' },
    { id: 'R2', name: 'Demo_Patient', hr: 93, spo2: 96, rr: 14, bp: '120/83', emotion: 'Neutral', status: 'Stable' },
    { id: 'R3', name: 'Demo_Patient', hr: 130, spo2: 89, rr: 27, bp: '167/96', emotion: 'Angry', status: 'ALERT' },
    { id: 'R4', name: 'Demo_Patient', hr: 127, spo2: 89, rr: 28, bp: '157/106', emotion: 'Fear', status: 'ALERT' },
    { id: 'R5', name: 'Demo_Patient', hr: 71, spo2: 99, rr: 18, bp: '126/83', emotion: 'Happy', status: 'Stable' },
  ];

  const filteredPatients = patientsList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.emotion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPatients = patientsList.length;
  const totalAlerts = patientsList.filter(p => p.status === 'ALERT').length;

  return (
    <div style={{ padding: '0 0 2rem 0' }}>
      
      {/* Header Cards section */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Patient Directory</h1>
          <p style={{ color: 'var(--text-muted)' }}>Live patient vitals, camera emotion, and current condition overview</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {/* Total Patients Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: 'white', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', padding: '10px', borderRadius: '8px' }}>
              <Users size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Total</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{totalPatients}</div>
            </div>
          </div>

          {/* Alerts Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: 'white', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '10px', borderRadius: '8px' }}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Alerts</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{totalAlerts}</div>
            </div>
          </div>

          {/* Warnings Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: 'white', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', padding: '10px', borderRadius: '8px' }}>
              <Activity size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Warnings</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        
        {/* Table Header Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Total Patients</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Search and filter patient records</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search patient, robot ID, emotion..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', background: 'white' }}
              />
            </div>
            
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', background: 'white', cursor: 'pointer' }}
            >
              <option value="All Status">All Status</option>
              <option value="Stable">Stable</option>
              <option value="ALERT">ALERT</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 700 }}>
                <th style={{ padding: '1rem 0.5rem' }}>Patient ID</th>
                <th style={{ padding: '1rem 0.5rem' }}>Patient</th>
                <th style={{ padding: '1rem 0.5rem' }}>HR</th>
                <th style={{ padding: '1rem 0.5rem' }}>SpO₂</th>
                <th style={{ padding: '1rem 0.5rem' }}>RR</th>
                <th style={{ padding: '1rem 0.5rem' }}>BP</th>
                <th style={{ padding: '1rem 0.5rem' }}>Emotion</th>
                <th style={{ padding: '1rem 0.5rem' }}>Image</th>
                <th style={{ padding: '1rem 0.5rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={index} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)', transition: 'background 0.2s', fontSize: '0.95rem' }}>
                  <td style={{ padding: '1.25rem 0.5rem', color: 'var(--primary)', fontWeight: 600 }}>{patient.id}</td>
                  <td style={{ padding: '1.25rem 0.5rem', fontWeight: 600 }}>{patient.name}</td>
                  <td style={{ padding: '1.25rem 0.5rem' }}>{patient.hr}</td>
                  <td style={{ padding: '1.25rem 0.5rem' }}>{patient.spo2}</td>
                  <td style={{ padding: '1.25rem 0.5rem' }}>{patient.rr}</td>
                  <td style={{ padding: '1.25rem 0.5rem', color: 'var(--text-muted)' }}>{patient.bp}</td>
                  <td style={{ padding: '1.25rem 0.5rem', color: 'var(--text-muted)' }}>{patient.emotion}</td>
                  <td style={{ padding: '1.25rem 0.5rem' }}>
                    <button style={{ background: 'transparent', border: '1px solid var(--border-color)', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                      <ImageIcon size={16} />
                    </button>
                  </td>
                  <td style={{ padding: '1.25rem 0.5rem' }}>
                    {patient.status === 'Stable' ? (
                      <span style={{ color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>Stable</span>
                    ) : (
                      <span style={{ color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>ALERT</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredPatients.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No patients found matching your search.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Patients;
