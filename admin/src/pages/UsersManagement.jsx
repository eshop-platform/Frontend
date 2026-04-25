import React, { useEffect, useState } from 'react';
import { banUser, fetchUsers, removeUser, unbanUser } from '../../../shared/adminApi';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  const handleStatus = async (id, nextAction) => {
    const updater = nextAction === 'ban' ? banUser : unbanUser;
    const updated = await updater(id);
    setUsers((current) => current.map((user) => user._id === id ? updated : user));
  };

  const handleDelete = async (id) => {
    await removeUser(id);
    setUsers((current) => current.filter((user) => user._id !== id));
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="h1">Users Management</h1>
        <p className="subtitle">View and manage platform users, roles, and account statuses.</p>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '24px' }}>Loading users...</td>
                </tr>
              )}
              {!loading && users.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '24px' }}>No users found.</td>
                </tr>
              )}
              {users.map((user) => (
                <tr key={user._id}>
                  <td style={{ fontWeight: '600' }}>{user.username}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
                  <td>
                    <span className={`badge ${user.status === 'active' ? 'badge-green' : 'badge-red'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      {user.status === 'active' ? (
                        <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleStatus(user._id, 'ban')}>Ban</button>
                      ) : (
                        <button className="btn btn-success" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleStatus(user._id, 'unban')}>Unban</button>
                      )}
                      <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleDelete(user._id)}>Delete</button>
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
