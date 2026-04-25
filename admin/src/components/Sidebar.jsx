import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Tag, Users, Package, Grid, DollarSign, AlertTriangle, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div style={{ width: '28px', height: '28px', backgroundColor: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: '900' }}>A</div>
        Aurelia Market
      </div>
      
      <div className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard className="icon" />
          Dashboard Overview
        </NavLink>
        
        <NavLink to="/purchase-approvals" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <ShoppingCart className="icon" />
          Purchase Approvals
          <span className="nav-badge">5</span>
        </NavLink>
        
        <NavLink to="/product-approvals" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Tag className="icon" />
          Product Approvals
          <span className="nav-badge" style={{backgroundColor: '#fef3c7', color: '#d97706'}}>12</span>
        </NavLink>
        
        <NavLink to="/users" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Users className="icon" />
          Users Management
        </NavLink>
        
        <NavLink to="/products" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Package className="icon" />
          Products Management
        </NavLink>
        
        <NavLink to="/categories" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Grid className="icon" />
          Categories
        </NavLink>
        
        <NavLink to="/finance" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <DollarSign className="icon" />
          Financial Overview
        </NavLink>
        
        <NavLink to="/out-of-stock" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <AlertTriangle className="icon" />
          Out of Stock Alerts
          <span className="nav-badge">8</span>
        </NavLink>
      </div>
      
      <div className="sidebar-footer">
        <NavLink to="/logout" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} style={{color: 'var(--primary-color)'}}>
          <LogOut className="icon" />
          Logout
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
