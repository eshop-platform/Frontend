import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import ApprovalQueue from './ApprovalQueue';
import { ShoppingBag, Tag, Users, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';
import { api } from '../../lib/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.get('/dashboard/stats');
        setStats(data.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-10 text-center font-medium text-gray-400">Loading dashboard data...</div>;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="h1">Dashboard Overview</h1>
        <p className="subtitle">A concise look at marketplace health and moderation tasks.</p>
      </div>

      <div className="dashboard-grid">
        <StatCard 
          title="Pending Purchases"
          value={stats?.purchases?.pending || 0}
          description="Orders awaiting payment"
          icon={<ShoppingBag size={18} />}
          extraClass="stat-card-featured"
        />
        <StatCard 
          title="Pending Product Posts"
          value={stats?.products?.pending || 0}
          description="New listings awaiting review"
          icon={<Tag size={18} />}
        />
        <StatCard 
          title="Total Users"
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
          description="Products with zero inventory"
          icon={<AlertCircle size={18} color="var(--danger-color)" />}
          extraClass="border-danger"
        />
      </div>

      <div className="main-grid">
        {/* Sales Trend and Activity Feed removed as per request */}
      </div>

      <div className="card" style={{marginTop: '24px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h2 className="h2">Purchase Approval Queue</h2>
          <span className="text-xs font-semibold text-gray-400">Recent pending purchases requiring action</span>
        </div>
        <ApprovalQueue />
      </div>
    </div>
  );
};

export default Dashboard;
