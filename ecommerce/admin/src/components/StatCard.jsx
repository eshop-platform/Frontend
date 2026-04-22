import React from 'react';

const StatCard = ({ title, subtitle, value, description, icon, badge, extraClass = '' }) => {
  return (
    <div className={`card ${extraClass}`}>
      <div className="stat-card-header">
        <div className="subtitle">{title}</div>
        {icon && <div className="stat-icon">{icon}</div>}
        {badge && <div className={`badge ${badge.type}`}>{badge.text}</div>}
      </div>
      <div className="stat-card-value">{value}</div>
      {description && <div className="text-sm">{description}</div>}
      {subtitle && <div className="text-xs" style={{marginTop: '8px'}}>{subtitle}</div>}
    </div>
  );
};

export default StatCard;
