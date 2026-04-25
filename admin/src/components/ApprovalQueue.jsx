import React from 'react';

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

const ApprovalQueue = ({ purchases = [], loading = false, onApprove, onReject }) => {
  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <div className="stat-card-header" style={{ marginBottom: '20px' }}>
        <div>
          <div className="subtitle" style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Purchase Approval Queue</div>
          <div className="text-sm">Recent pending purchases requiring validation</div>
        </div>
        <div className="text-sm">Showing {purchases.length} pending</div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Buyer</th>
              <th>Products</th>
              <th>Created</th>
              <th>Amount</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '24px' }}>Loading purchases...</td>
              </tr>
            )}
            {!loading && purchases.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '24px' }}>No pending purchases right now.</td>
              </tr>
            )}
            {purchases.map((row) => (
              <tr key={row._id}>
                <td style={{ fontWeight: '500' }}>
                  {row.buyer?.username || row.buyer?.email || 'Unknown buyer'}
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {(row.products || []).slice(0, 2).map((entry) => (
                      <span key={entry._id || entry.product?._id}>
                        {entry.product?.name || 'Product'} x {entry.quantity}
                      </span>
                    ))}
                    {(row.products || []).length > 2 && (
                      <span className="text-sm">+{row.products.length - 2} more</span>
                    )}
                  </div>
                </td>
                <td>{row.createdAt ? new Date(row.createdAt).toLocaleString() : '-'}</td>
                <td style={{ fontWeight: '500' }}>{formatCurrency(row.totalAmount)}</td>
                <td>
                  <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                    <button className="btn btn-success" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => onApprove?.(row._id)}>Approve</button>
                    <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#9d174d' }} onClick={() => onReject?.(row._id)}>Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovalQueue;
