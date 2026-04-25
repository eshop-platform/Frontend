import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const SalesChart = ({ data = [] }) => {
  const safeData = data.length > 0 ? data : [{ name: 'No Data', count: 0 }];

  return (
    <div className="card chart-card" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
      <div className="stat-card-header">
        <div>
          <div className="subtitle" style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Category Distribution</div>
          <div className="text-sm">Live product counts by category</div>
        </div>
      </div>

      <div style={{ flex: 1, marginTop: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={safeData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#ff7300" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
