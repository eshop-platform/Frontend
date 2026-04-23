import React from 'react';
import StatCard from './StatCard';
import SalesChart from './SalesChart';
import ActivityFeed from './ActivityFeed';
import ApprovalQueue from './ApprovalQueue';
import { ShoppingBag, Tag, Users, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="h1">Dashboard Overview</h1>
        <p className="subtitle">A concise look at marketplace health and moderation tasks.</p>
      </div>

      <div className="dashboard-grid">
        <StatCard 
          title="Pending Purchases"
          value="23"
          description="Orders awaiting payment"
          icon={<ShoppingBag size={20} />}
          badge={null}
        />
        <StatCard 
          title="Pending Product Posts"
          value="12"
          description="New listings awaiting review"
          icon={<Tag size={20} />}
          badge={null}
        />
        <StatCard 
          title="Total Users"
          value="18,342"
          subtitle={<>Active: <strong style={{color: 'var(--text-primary)'}}>17,890</strong> &nbsp; Banned: <strong style={{color: 'var(--danger-color)'}}>452</strong></>}
          icon={null}
          badge={null}
        />
        <StatCard 
          title="Revenue"
          value="$1,248,560"
          subtitle={<>Platform commission (5%): <strong style={{color: 'var(--text-primary)'}}>$62,428</strong></>}
          icon={null}
          badge={null}
        />
        <StatCard 
          title="Marketplace Products"
          value="34,128"
          description="Active listings across categories"
          icon={<ShoppingBag size={20} />}
        />
        <StatCard 
          title="Products by Category"
          value=""
          description={
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'conic-gradient(#f59e0b 0% 42%, #3b82f6 42% 71%, #10b981 71% 89%, #f43f5e 89% 100%)' }}></div>
              <div className="text-xs" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>Womenswear: 42%</div>
                <div>Menswear: 29%</div>
                <div>Accessories: 18%</div>
                <div>Footwear: 11%</div>
              </div>
            </div>
          }
        />
        <StatCard 
          title="Out of Stock Alerts"
          value={<span style={{ color: 'var(--danger-color)' }}>8</span>}
          description="Products with zero inventory"
          icon={<AlertCircle size={20} color="var(--danger-color)" />}
        />
      </div>

      <div className="main-grid">
        <SalesChart />
        <ActivityFeed />
      </div>

      <ApprovalQueue />
    </div>
  );
};

export default Dashboard;
