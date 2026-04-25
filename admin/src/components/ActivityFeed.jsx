import React from 'react';

const ActivityFeed = ({ activities = [] }) => {
  return (
    <div className="card" style={{ height: '350px', overflowY: 'auto' }}>
      <div className="stat-card-header" style={{ marginBottom: '16px' }}>
        <div>
          <div className="subtitle" style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Recent Activity</div>
          <div className="text-sm">Fresh product and purchase events from the marketplace</div>
        </div>
      </div>

      <div className="activity-list">
        {activities.length === 0 && (
          <div className="text-sm">No recent backend activity is available yet.</div>
        )}
        {activities.map((activity) => (
          <div className="activity-item" key={activity.id}>
            <div className="activity-content">
              <div className="activity-title">{activity.title}</div>
              <div className="activity-meta">{activity.meta}</div>
            </div>
            <div className="activity-status" style={{ color: activity.statusColor || 'var(--text-secondary)' }}>
              {activity.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
