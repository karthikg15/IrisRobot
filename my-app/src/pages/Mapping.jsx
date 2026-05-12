import React, { useState, useEffect } from 'react';
import { Map, Navigation, Wifi, ShieldAlert, Cpu } from 'lucide-react';

const Mapping = () => {
  const [robotPos, setRobotPos] = useState({ x: 50, y: 50 });
  const [obstacles, setObstacles] = useState([
    { id: 1, x: 20, y: 30, size: 10, type: 'static' }, // Bed
    { id: 2, x: 80, y: 20, size: 8, type: 'static' },  // Medical Cart
    { id: 3, x: 70, y: 70, size: 6, type: 'dynamic' }, // Detected moving object
  ]);

  // Simulate robot moving
  useEffect(() => {
    const interval = setInterval(() => {
      setRobotPos(prev => ({
        x: Math.min(90, Math.max(10, prev.x + (Math.random() * 4 - 2))),
        y: Math.min(90, Math.max(10, prev.y + (Math.random() * 4 - 2)))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Room Mapping View</h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time ultrasonic spatial mapping and obstacle detection.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        
        {/* Map visualization area */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Live Spatial Map - Room 302</h2>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', fontWeight: 500 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '50%' }}></div> Robot</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '12px', height: '12px', background: 'var(--border-color)', borderRadius: '4px' }}></div> Static Obstacle</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '12px', height: '12px', background: 'var(--warning)', borderRadius: '4px' }}></div> Dynamic Obstacle</span>
            </div>
          </div>

          <div style={{ 
            flex: 1, 
            background: 'var(--bg-main)', 
            border: '2px dashed var(--border-color)', 
            borderRadius: '12px', 
            position: 'relative',
            minHeight: '400px',
            overflow: 'hidden'
          }}>
            {/* Grid overlay */}
            <div style={{ 
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
              backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              opacity: 0.5
            }}></div>

            {/* Room Features */}
            <div style={{ position: 'absolute', top: '10%', left: '0', width: '8px', height: '80px', background: '#ccc' }}></div> {/* Door */}
            
            {/* Obstacles */}
            {obstacles.map(obs => (
              <div 
                key={obs.id}
                style={{
                  position: 'absolute',
                  left: `${obs.x}%`,
                  top: `${obs.y}%`,
                  width: `${obs.size}%`,
                  height: `${obs.size}%`,
                  background: obs.type === 'static' ? 'var(--border-color)' : 'var(--warning)',
                  borderRadius: '8px',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
              >
                {obs.type === 'static' ? 'OBSTACLE' : 'MOVING'}
              </div>
            ))}

            {/* Robot */}
            <div 
              style={{
                position: 'absolute',
                left: `${robotPos.x}%`,
                top: `${robotPos.y}%`,
                width: '32px',
                height: '32px',
                background: 'var(--primary)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 0 10px rgba(14, 165, 233, 0.2), 0 0 0 20px rgba(14, 165, 233, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                transition: 'all 2s linear'
              }}
            >
              <Navigation size={18} />
            </div>

            {/* Ultrasonic scans visualization (pulse effect around robot) */}
            <div 
              style={{
                position: 'absolute',
                left: `${robotPos.x}%`,
                top: `${robotPos.y}%`,
                width: '120px',
                height: '120px',
                border: '1px solid var(--primary)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.3,
                animation: 'pulse 2s infinite',
                pointerEvents: 'none'
              }}
            ></div>
          </div>
        </div>

        {/* Side Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Navigation Status */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={18} color="var(--primary)" />
              Navigation Status
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Current Coordinates</span>
                <span style={{ fontWeight: 600 }}>X: {robotPos.x.toFixed(1)}, Y: {robotPos.y.toFixed(1)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Movement Speed</span>
                <span style={{ fontWeight: 600 }}>0.4 m/s</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Pathing Mode</span>
                <span style={{ fontWeight: 600, color: 'var(--success)' }}>Autonomous Scan</span>
              </div>
            </div>
          </div>

          {/* Ultrasonic Sensor Data */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wifi size={18} color="var(--warning)" />
              Ultrasonic Readings
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Nearest Obstacle Distance</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--warning)' }}>1.2 meters</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Direction: Front-Right (45°)</div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <ShieldAlert size={20} />
                <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>Collision Avoidance Active</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Mapping;
