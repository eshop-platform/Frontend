import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

const ProductApprovals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingProducts = async () => {
    try {
      const data = await api.get('/products?status=pending');
      setProducts(data.data);
    } catch (err) {
      console.error('Failed to fetch pending products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const data = await api.patch(`/products/${id}/${action}`);
      if (data.success) {
        fetchPendingProducts();
      }
    } catch (err) {
      console.error(`Failed to ${action} product:`, err);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-400">Loading pending products...</div>;

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="h1">Product Approvals</h1>
        <p className="subtitle">Review and approve new product listings from vendors.</p>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Vendor</th>
                <th>Category</th>
                <th>Price</th>
                <th>Submitted</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-tertiary)' }}>
                    No pending products found.
                  </td>
                </tr>
              ) : products.map(row => (
                <tr key={row._id}>
                  <td>
                    <div className="product-cell" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img 
                        src={row.image} 
                        alt="Product" 
                        style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', backgroundColor: '#f3f4f6' }} 
                      />
                      <span style={{ fontWeight: '500' }}>{row.title}</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: '500' }}>{row.createdBy?.username || 'Unknown'}</td>
                  <td>{row.category?.name || 'Uncategorized'}</td>
                  <td style={{ fontWeight: '500' }}>${row.price.toLocaleString()}</td>
                  <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end', display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleAction(row._id, 'approve')}
                        className="btn btn-success" 
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleAction(row._id, 'reject')}
                        className="btn btn-danger" 
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        Reject
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

export default ProductApprovals;
