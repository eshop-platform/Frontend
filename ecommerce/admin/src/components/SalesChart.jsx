import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1', uv: 4000, pv: 2400 },
  { name: '2', uv: 3000, pv: 1398 },
  { name: '3', uv: 2000, pv: 9800 },
  { name: '4', uv: 2780, pv: 3908 },
  { name: '5', uv: 1890, pv: 4800 },
  { name: '6', uv: 2390, pv: 3800 },
  { name: '7', uv: 3490, pv: 4300 },
  { name: '8', uv: 4000, pv: 2400 },
  { name: '9', uv: 3000, pv: 1398 },
  { name: '10', uv: 2000, pv: 9800 },
  { name: '11', uv: 2780, pv: 3908 },
  { name: '12', uv: 1890, pv: 4800 },
  { name: '13', uv: 2390, pv: 3800 },
  { name: '14', uv: 3490, pv: 4300 },
];

const SalesChart = () => {
  return (
    <div className="card chart-card" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
      <div className="stat-card-header">
        <div>
          <div className="subtitle" style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Sales Trend (Last 30 days)</div>
          <div className="text-sm">Daily gross revenue across platform</div>
        </div>
        <div style={{ fontWeight: '700', fontSize: '18px' }}>+12.4</div>
      </div>
      
      <div style={{ flex: 1, marginTop: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line type="monotone" dataKey="pv" stroke="#ff7300" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="uv" stroke="#ffc658" strokeWidth={3} dot={false} strokeOpacity={0.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
