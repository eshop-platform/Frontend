import React from 'react';

const users = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Vendor', status: 'Active', joined: 'Oct 12, 2025' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'Buyer', status: 'Active', joined: 'Nov 05, 2025' },
  { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Vendor', status: 'Banned', joined: 'Jan 22, 2026' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Moderator', status: 'Active', joined: 'Feb 14, 2026' },
];

const UsersManagement = () => {
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
              {users.map(user => (
                <tr key={user.id}>
                  <td style={{ fontWeight: '600' }}>{user.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.joined}</td>
                  <td>
                    <span className={`badge ${user.status === 'Active' ? 'badge-green' : 'badge-red'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>Edit</button>
                      {user.status === 'Active' && (
                        <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>Ban</button>
                      )}
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
