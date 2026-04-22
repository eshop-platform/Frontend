import React from 'react';
import SalesChart from '../components/SalesChart';
import StatCard from '../components/StatCard';
import { DollarSign, TrendingUp, CreditCard, Activity } from 'lucide-react';

const Finance = () => {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="h1">Financial Overview</h1>
        <p className="subtitle">Detailed breakdown of platform revenue, commissions, and payouts.</p>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
        <StatCard 
          title="Total Gross Revenue"
          value="$1,248,560"
          description="Total value of goods sold"
          icon={<DollarSign size={20} />}
        />
        <StatCard 
          title="Platform Commission"
          value="$62,428"
          description="5% cut from all sales"
          icon={<TrendingUp size={20} color="var(--success-color)" />}
        />
        <StatCard 
          title="Pending Payouts"
          value="$45,210"
          description="Awaiting vendor transfer"
          icon={<CreditCard size={20} />}
        />
        <StatCard 
          title="Refunds Processed"
          value="$12,045"
          description="In the last 30 days"
          icon={<Activity size={20} color="var(--danger-color)" />}
        />
      </div>

      <SalesChart />
    </div>
  );
};

export default Finance;
