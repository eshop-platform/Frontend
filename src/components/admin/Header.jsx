import React from 'react';
import { Search, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="search-bar">
        <Search size={18} color="var(--text-tertiary)" />
        <input type="text" placeholder="Search orders, products, sellers, users..." />
      </div>
      
      <div className="header-actions">
        <div className="notification-icon">
          <Bell size={20} />
          <div className="notification-dot"></div>
        </div>
        
        <Link to="/profile" className="user-profile" style={{ textDecoration: 'none' }}>
          <div style={{ textAlign: 'right', marginRight: '4px' }}>
            <div style={{fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)'}}>
              {user?.username || 'Admin'}
            </div>
            <div style={{fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'capitalize', fontWeight: '500'}}>
              {user?.role || 'Staff'}
            </div>
          </div>
          <div className="avatar" style={{ 
            background: 'var(--accent-primary)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '13px',
            borderRadius: '10px'
          }}>
            {user?.username?.charAt(0).toUpperCase()}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
