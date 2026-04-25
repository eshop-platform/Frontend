import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Shield, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1 className="page-title">My Profile</h1>
        <p className="page-subtitle">Manage your account settings and preferences</p>
      </div>

      <div className="profile-card">
        <div className="profile-hero">
          <div className="profile-avatar-large">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="profile-hero-info">
            <h2>{user.username}</h2>
            <span className="badge badge-primary">{user.role}</span>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-group">
            <div className="detail-item">
              <div className="detail-icon"><User size={20} /></div>
              <div className="detail-content">
                <label>Username</label>
                <p>{user.username}</p>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon"><Mail size={20} /></div>
              <div className="detail-content">
                <label>Email Address</label>
                <p>{user.email}</p>
              </div>
            </div>
          </div>

          <div className="detail-group">
            <div className="detail-item">
              <div className="detail-icon"><Shield size={20} /></div>
              <div className="detail-content">
                <label>Account Role</label>
                <p className="capitalize">{user.role}</p>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon"><Calendar size={20} /></div>
              <div className="detail-content">
                <label>Joined On</label>
                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .profile-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          overflow: hidden;
          max-width: 800px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .profile-hero {
          background: var(--bg-tertiary);
          padding: 40px;
          display: flex;
          align-items: center;
          gap: 30px;
          border-bottom: 1px solid var(--border-color);
        }
        .profile-avatar-large {
          width: 100px;
          height: 100px;
          background: var(--accent-primary);
          color: white;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          font-weight: 800;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .profile-hero-info h2 {
          margin: 0 0 8px 0;
          font-size: 28px;
          color: var(--text-primary);
        }
        .profile-details {
          padding: 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .detail-group {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .detail-item {
          display: flex;
          gap: 16px;
        }
        .detail-icon {
          width: 40px;
          height: 40px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
        }
        .detail-content label {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-tertiary);
          font-weight: 700;
          margin-bottom: 4px;
        }
        .detail-content p {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .capitalize { text-transform: capitalize; }
      `}} />
    </div>
  );
};

export default Profile;
