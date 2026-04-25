<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, { useEffect, useMemo, useState } from 'react';
>>>>>>> d4cea9c8c7184f28035db3b584fb913dd2609fd0
import StatCard from './StatCard';
import SalesChart from './SalesChart';
import ActivityFeed from './ActivityFeed';
import ApprovalQueue from './ApprovalQueue';
<<<<<<< HEAD
import { ShoppingBag, Tag, Users, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-10 text-center font-medium text-gray-400">Loading dashboard data...</div>;
=======
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
>>>>>>> d4cea9c8c7184f28035db3b584fb913dd2609fd0

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="h1">Dashboard Overview</h1>
        <p className="subtitle">A concise look at marketplace health and moderation tasks.</p>
      </div>

      <div className="dashboard-grid">
        <StatCard
          title="Pending Purchases"
<<<<<<< HEAD
          value={stats?.purchases?.pending || 0}
          description="Orders awaiting payment"
          icon={<ShoppingBag size={18} />}
          extraClass="stat-card-featured"
=======
          value={loading ? '...' : String(stats?.purchases?.pending ?? pendingPurchases.length)}
          description="Orders awaiting review"
          icon={<ShoppingBag size={20} />}
>>>>>>> d4cea9c8c7184f28035db3b584fb913dd2609fd0
        />
        <StatCard
          title="Pending Product Posts"
<<<<<<< HEAD
          value={stats?.products?.pending || 0}
          description="New listings awaiting review"
          icon={<Tag size={18} />}
=======
          value={loading ? '...' : String(stats?.products?.pending ?? 0)}
          description="New listings awaiting review"
          icon={<Tag size={20} />}
>>>>>>> d4cea9c8c7184f28035db3b584fb913dd2609fd0
        />
        <StatCard
          title="Total Users"
<<<<<<< HEAD
          value={stats?.users?.total?.toLocaleString() || 0}
          subtitle={<div style={{display:'flex', gap:'12px'}}>
            <span>Active: <strong style={{color: 'var(--text-primary)'}}>{stats?.users?.active || 0}</strong></span>
            <span>Banned: <strong style={{color: 'var(--danger-color)'}}>{stats?.users?.banned || 0}</strong></span>
          </div>}
          icon={<Users size={18} />}
        />
        
        <StatCard 
          title="Marketplace Products"
          value={stats?.products?.total?.toLocaleString() || 0}
          description="Active listings across categories"
          icon={<ShoppingBag size={18} />}
        />
        <StatCard 
          title="Products by Category"
          value=""
          description={
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '8px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'conic-gradient(#000 0% 42%, #4b5563 42% 71%, #9ca3af 71% 89%, #f3f4f6 89% 100%)' }}></div>
              <div className="text-xs" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {stats?.categoryDistribution?.slice(0, 4).map(cat => (
                  <div key={cat.categoryName}>{cat.categoryName}: {cat.count}</div>
                )) || <div>No data</div>}
              </div>
            </div>
          }
        />
        <StatCard 
          title="Revenue"
          value={`$${stats?.financials?.revenue?.toLocaleString() || 0}`}
          subtitle={<>Platform commission (5%): <strong style={{color: 'var(--text-primary)'}}>${stats?.financials?.commission?.toLocaleString() || 0}</strong></>}
          icon={<DollarSign size={18} />}
        />

        <StatCard 
          title="Out of Stock Alerts"
          value={<span style={{ color: 'var(--danger-color)' }}>{stats?.products?.outOfStock || 0}</span>}
=======
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
>>>>>>> d4cea9c8c7184f28035db3b584fb913dd2609fd0
          description="Products with zero inventory"
          icon={<AlertCircle size={18} color="var(--danger-color)" />}
          extraClass="border-danger"
        />
      </div>

      <div className="main-grid">
        <SalesChart data={categoryData} />
        <ActivityFeed activities={activity} />
      </div>

<<<<<<< HEAD
      <div className="card" style={{marginTop: '24px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h2 className="h2">Purchase Approval Queue</h2>
          <span className="text-xs font-semibold text-gray-400">Recent pending purchases requiring action</span>
        </div>
        <ApprovalQueue />
      </div>
=======
      <ApprovalQueue
        purchases={pendingPurchases.slice(0, 5)}
        loading={loading}
        onApprove={(id) => handlePurchaseDecision(id, 'approve')}
        onReject={(id) => handlePurchaseDecision(id, 'reject')}
      />
>>>>>>> d4cea9c8c7184f28035db3b584fb913dd2609fd0
    </div>
  );
};

export default Dashboard;
