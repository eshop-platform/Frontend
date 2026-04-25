import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await api.get('/users');
      setUsers(data.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAction = async (id, action) => {
    try {
      if (action === 'delete') {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        await api.delete(`/users/${id}`);
      } else {
        await api.patch(`/users/${id}/${action}`);
      }
      fetchUsers();
    } catch (err) {
      console.error(`Failed to ${action} user:`, err);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-400">Loading users...</div>;

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="h1">Users Management</h1>
        <p className="subtitle">View and manage all registered accounts on the platform.</p>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-tertiary)' }}>
                    No users found.
                  </td>
                </tr>
              ) : users.map(user => (
                <tr key={user._id}>
                  <td style={{ fontWeight: '500' }}>{user.username}</td>
                  <td>{user.email}</td>
                  <td style={{ textTransform: 'capitalize' }}>{user.role}</td>
                  <td>
                    <span className={`badge ${user.status === 'active' ? 'badge-green' : 'badge-red'}`}>
                      {user.status || 'Active'}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end', display: 'flex', gap: '8px' }}>
                      {user.status === 'banned' ? (
                        <button 
                          onClick={() => handleAction(user._id, 'unban')}
                          className="btn btn-outline" 
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          Unban
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleAction(user._id, 'ban')}
                          className="btn btn-outline" 
                          style={{ padding: '6px 12px', fontSize: '12px', borderColor: 'var(--danger-color)', color: 'var(--danger-color)' }}
                        >
                          Ban
                        </button>
                      )}
                      <button 
                        onClick={() => handleAction(user._id, 'delete')}
                        className="btn btn-danger" 
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
