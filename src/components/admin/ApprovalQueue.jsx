import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

const ApprovalQueue = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingPurchases = async () => {
    try {
      const data = await api.get('/purchases?status=pending');
      setPurchases(data.data);
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
      const data = await api.patch(`/purchases/${id}/${action}`);
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
              <td colSpan="5" className="p-10 text-center text-gray-400">No pending approvals at the moment.</td>
            </tr>
          ) : (
            purchases.map(purchase => (
              <tr key={purchase._id}>
                <td style={{ fontWeight: '600' }}>{purchase.buyer?.username}</td>
                <td>
                  <div className="product-cell">
                    <img src={purchase.products[0]?.product?.image || 'https://via.placeholder.com/40'} alt="Product" className="product-img" />
                    <span>{purchase.products[0]?.product?.title} {purchase.products.length > 1 && `+ ${purchase.products.length - 1} more`}</span>
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
