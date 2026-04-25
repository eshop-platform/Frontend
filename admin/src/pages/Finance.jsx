import React, { useEffect, useState } from 'react';
import SalesChart from '../components/SalesChart';
import StatCard from '../components/StatCard';
import { DollarSign, TrendingUp, CreditCard, Activity } from 'lucide-react';
import { fetchDashboardStats, fetchPurchases } from '../../../shared/adminApi';

const formatCurrency = (value) => `$${Number(value || 0).toLocaleString()}`;

const Finance = () => {
  const [stats, setStats] = useState(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchDashboardStats().catch(() => null),
      fetchPurchases().catch(() => []),
    ]).then(([statsData, purchasesData]) => {
      setStats(statsData);
      setPurchases(purchasesData);
    });
  }, []);

  const pendingPayouts = purchases
    .filter((purchase) => purchase.status === 'pending')
    .reduce((sum, purchase) => sum + Number(purchase.totalAmount || 0), 0);

  const rejectedTotal = purchases
    .filter((purchase) => purchase.status === 'rejected')
    .reduce((sum, purchase) => sum + Number(purchase.totalAmount || 0), 0);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="h1">Financial Overview</h1>
        <p className="subtitle">Detailed breakdown of platform revenue, commissions, and payouts.</p>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
        <StatCard
          title="Total Gross Revenue"
          value={formatCurrency(stats?.financials?.revenue ?? 0)}
          description="Total value of completed purchases"
          icon={<DollarSign size={20} />}
        />
        <StatCard
          title="Platform Commission"
          value={formatCurrency(stats?.financials?.commission ?? 0)}
          description="Current backend commission total"
          icon={<TrendingUp size={20} color="var(--success-color)" />}
        />
        <StatCard
          title="Pending Payouts"
          value={formatCurrency(pendingPayouts)}
          description="Pending purchases awaiting completion"
          icon={<CreditCard size={20} />}
        />
        <StatCard
          title="Rejected Volume"
          value={formatCurrency(rejectedTotal)}
          description="Rejected purchase value"
          icon={<Activity size={20} color="var(--danger-color)" />}
        />
      </div>

      <SalesChart data={(stats?.categoryDistribution || []).map((item) => ({ name: item.categoryName, count: item.count }))} />
    </div>
  );
};

export default Finance;
