import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Tag, Users, Package, Grid, DollarSign, AlertTriangle, LogOut } from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.get('/dashboard/stats');
        setStats(data.data);
      } catch (err) {
        console.error('Failed to fetch sidebar stats:', err);
      }
    };
    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div style={{ width: '28px', height: '28px', backgroundColor: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: '900' }}>A</div>
        Aurelia Market
      </div>
      
      <div className="sidebar-nav">
        <NavLink to="/admin" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard className="icon" />
          Dashboard Overview
        </NavLink>
        
        <NavLink to="/admin/purchase-approvals" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <ShoppingCart className="icon" />
          Purchase Approvals
          {stats?.purchases?.pending > 0 && <span className="nav-badge">{stats.purchases.pending}</span>}
        </NavLink>
        
        <NavLink to="/admin/product-approvals" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Tag className="icon" />
          Product Approvals
          {stats?.products?.pending > 0 && <span className="nav-badge" style={{backgroundColor: '#fef3c7', color: '#d97706'}}>{stats.products.pending}</span>}
        </NavLink>
        
        <NavLink to="/admin/users" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Users className="icon" />
          Users Management
        </NavLink>
        
        <NavLink to="/admin/products" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Package className="icon" />
          Products Management
        </NavLink>
        
        <NavLink to="/admin/categories" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Grid className="icon" />
          Categories
        </NavLink>
        
        <NavLink to="/admin/finance" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <DollarSign className="icon" />
          Financial Overview
        </NavLink>
        
        <NavLink to="/admin/out-of-stock" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <AlertTriangle className="icon" />
          Out of Stock Alerts
          {stats?.products?.outOfStock > 0 && <span className="nav-badge">{stats.products.outOfStock}</span>}
        </NavLink>
      </div>
      
      <div className="sidebar-footer">
        <button onClick={logout} className="nav-item" style={{color: 'var(--primary-color)', width: '100%', textAlign: 'left'}}>
          <LogOut className="icon" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
