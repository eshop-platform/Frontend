import React from 'react';
import { Search, Bell } from 'lucide-react';

const Header = () => {
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
        
        <div className="user-profile">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="User profile" 
            className="avatar"
          />
          <div>
            <div style={{fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)'}}>Camille Rousseau</div>
            <div style={{fontSize: '12px', color: 'var(--text-secondary)'}}>Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
