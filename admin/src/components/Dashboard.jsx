import React, { useEffect, useMemo, useState } from 'react';
import StatCard from './StatCard';
import SalesChart from './SalesChart';
import ActivityFeed from './ActivityFeed';
import ApprovalQueue from './ApprovalQueue';
import { ShoppingBag, Tag, Users, AlertCircle } from 'lucide-react';
import { approvePurchase, fetchDashboardStats, fetchPurchases, rejectPurchase } from '../../../shared/adminApi';

const formatCurrency = (value) => `$${Number(value || 0).toLocaleString()}`;

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [pendingPurchases, setPendingPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchDashboardStats().catch(() => null),
      fetchPurchases('pending').catch(() => []),
    ]).then(([statsData, purchases]) => {
      setStats(statsData);
      setPendingPurchases(purchases);
      setLoading(false);
    });
  }, []);

  const activity = useMemo(() => {
    const purchaseItems = pendingPurchases.slice(0, 4).map((purchase) => ({
      id: purchase._id,
      title: `Pending purchase from ${purchase.buyer?.username || purchase.buyer?.email || 'buyer'}`,
      meta: purchase.createdAt ? new Date(purchase.createdAt).toLocaleString() : 'Recently created',
      status: formatCurrency(purchase.totalAmount),
      statusColor: 'var(--warning-color)',
    }));

    return purchaseItems;
  }, [pendingPurchases]);

  const categoryData = (stats?.categoryDistribution || []).map((item) => ({
    name: item.categoryName,
    count: item.count,
  }));

  const handlePurchaseDecision = async (id, action) => {
    const updater = action === 'approve' ? approvePurchase : rejectPurchase;
    await updater(id);
    setPendingPurchases((current) => current.filter((item) => item._id !== id));
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="h1">Dashboard Overview</h1>
        <p className="subtitle">A concise look at marketplace health and moderation tasks.</p>
      </div>

      <div className="dashboard-grid">
        <StatCard
          title="Pending Purchases"
          value={loading ? '...' : String(stats?.purchases?.pending ?? pendingPurchases.length)}
          description="Orders awaiting review"
          icon={<ShoppingBag size={20} />}
        />
        <StatCard
          title="Pending Product Posts"
          value={loading ? '...' : String(stats?.products?.pending ?? 0)}
          description="New listings awaiting review"
          icon={<Tag size={20} />}
        />
        <StatCard
          title="Total Users"
          value={loading ? '...' : String(stats?.users?.total ?? 0)}
          subtitle={<>Active: <strong style={{ color: 'var(--text-primary)' }}>{stats?.users?.active ?? 0}</strong> &nbsp; Banned: <strong style={{ color: 'var(--danger-color)' }}>{stats?.users?.banned ?? 0}</strong></>}
          icon={<Users size={20} />}
        />
        <StatCard
          title="Revenue"
          value={loading ? '...' : formatCurrency(stats?.financials?.revenue ?? 0)}
          subtitle={<>Platform commission: <strong style={{ color: 'var(--text-primary)' }}>{formatCurrency(stats?.financials?.commission ?? 0)}</strong></>}
        />
        <StatCard
          title="Marketplace Products"
          value={loading ? '...' : String(stats?.products?.total ?? 0)}
          description="Listings tracked by the backend"
          icon={<ShoppingBag size={20} />}
        />
        <StatCard
          title="Out of Stock Alerts"
          value={loading ? '...' : <span style={{ color: 'var(--danger-color)' }}>{stats?.products?.outOfStock ?? 0}</span>}
          description="Products with zero inventory"
          icon={<AlertCircle size={20} color="var(--danger-color)" />}
        />
      </div>

      <div className="main-grid">
        <SalesChart data={categoryData} />
        <ActivityFeed activities={activity} />
      </div>

      <ApprovalQueue
        purchases={pendingPurchases.slice(0, 5)}
        loading={loading}
        onApprove={(id) => handlePurchaseDecision(id, 'approve')}
        onReject={(id) => handlePurchaseDecision(id, 'reject')}
      />
    </div>
  );
};

export default Dashboard;
