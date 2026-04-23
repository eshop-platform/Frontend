import React from 'react';

const activities = [
  {
    id: 1,
    title: 'Approved: Black Silk Slip',
    meta: 'by moderator: Elena Park — 14m ago',
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    status: 'Order #A1294',
    statusColor: 'var(--text-secondary)'
  },
  {
    id: 2,
    title: 'Rejected: Tan Leather Sandals',
    meta: 'by moderator: Omar Reyes — 1h ago',
    img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    status: 'Issue: Copyright',
    statusColor: 'var(--danger-color)'
  },
  {
    id: 3,
    title: 'Pending: Charcoal Wool Coat',
    meta: 'by vendor: Maison D\'Elle — 2h ago',
    img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    status: 'Awaiting review',
    statusColor: 'var(--warning-color)'
  },
  {
    id: 4,
    title: 'Seller message: Argent Atelier',
    meta: 'Response requested — 4h ago',
    img: 'https://images.unsplash.com/photo-1610438235354-a6ae5528385c?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    status: 'Message',
    statusColor: 'var(--text-secondary)'
  }
];

const ActivityFeed = () => {
  return (
    <div className="card" style={{ height: '350px', overflowY: 'auto' }}>
      <div className="stat-card-header" style={{ marginBottom: '16px' }}>
        <div>
          <div className="subtitle" style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Recent Moderator Activity</div>
          <div className="text-sm">Approvals, rejections and seller messages</div>
        </div>
        <button className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '12px' }}>View All</button>
      </div>

      <div className="activity-list">
        {activities.map(activity => (
          <div className="activity-item" key={activity.id}>
            <img src={activity.img} alt={activity.title} className="activity-img" />
            <div className="activity-content">
              <div className="activity-title">{activity.title}</div>
              <div className="activity-meta">{activity.meta}</div>
            </div>
            <div className="activity-status" style={{ color: activity.statusColor }}>
              {activity.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
