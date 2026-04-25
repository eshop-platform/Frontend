<<<<<<< HEAD
import React, { useEffect, useState } from 'react';

const ApprovalQueue = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
=======
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
>>>>>>> d4cea9c8c7184f28035db3b584fb913dd2609fd0

  const fetchPendingPurchases = async () => {
    try {
      const response = await fetch('/api/purchases?status=pending', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setPurchases(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch pending purchases:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingPurchases();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const response = await fetch(`/api/purchases/${id}/${action}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        fetchPendingPurchases();
      }
    } catch (err) {
      console.error(`Failed to ${action} purchase:`, err);
    }
  };

  if (loading) return <div className="p-10 text-center text-sm text-gray-400 italic">Fetching approval queue...</div>;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Product</th>
            <th>Payment Proof</th>
            <th>Amount</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchases.length === 0 ? (
            <tr>
<<<<<<< HEAD
              <td colSpan="5" className="p-10 text-center text-gray-400">No pending approvals at the moment.</td>
            </tr>
          ) : (
            purchases.map(purchase => (
              <tr key={purchase._id}>
                <td style={{ fontWeight: '600' }}>{purchase.buyer?.username}</td>
                <td>
                  <div className="product-cell">
                    <img src={purchase.products[0]?.product?.image || 'https://via.placeholder.com/40'} alt="Product" className="product-img" />
                    <span>{purchase.products[0]?.product?.name} {purchase.products.length > 1 && `+ ${purchase.products.length - 1} more`}</span>
                  </div>
                </td>
                <td>
                  <div className="product-img" style={{ width: '60px', height: '40px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#9ca3af', fontWeight: 'bold' }}>
                    PROOF
                  </div>
                </td>
                <td style={{ fontWeight: '700' }}>${purchase.totalAmount.toLocaleString()}</td>
                <td>
                  <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                    <button onClick={() => handleAction(purchase._id, 'approve')} className="btn btn-success">Approve</button>
                    <button onClick={() => handleAction(purchase._id, 'reject')} className="btn btn-danger">Reject</button>
                    <button className="btn btn-outline">View</button>
=======
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
>>>>>>> d4cea9c8c7184f28035db3b584fb913dd2609fd0
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalQueue;
