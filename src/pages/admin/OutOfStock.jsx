import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

const OutOfStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOutOfStock = async () => {
    try {
      // Fetch all products and filter for out of stock
      // Alternatively, we could add a backend filter ?stock=0
      const data = await api.get('/products');
      setProducts(data.data.filter(p => p.stock === 0));
    } catch (err) {
      console.error('Failed to fetch out of stock products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutOfStock();
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-400">Loading alerts...</div>;

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="h1" style={{ color: 'var(--danger-color)' }}>Out of Stock Alerts</h1>
        <p className="subtitle">Immediate attention required for these products.</p>
      </div>

      <div className="card" style={{ borderColor: 'var(--danger-color)' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Price</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--success-color)', fontWeight: '500' }}>
                    Great! All products are currently in stock.
                  </td>
                </tr>
              ) : products.map(prod => (
                <tr key={prod._id}>
                  <td>
                    <div className="product-cell" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={prod.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', opacity: '0.6' }} />
                      <div>
                        <div style={{ fontWeight: '600' }}>{prod.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>ID: {prod._id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{prod.category?.name || 'Uncategorized'}</td>
                  <td>
                    <span className="badge badge-red" style={{ padding: '4px 10px' }}>0 Available</span>
                  </td>
                  <td>${prod.price.toLocaleString()}</td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>Manage Inventory</button>
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

export default OutOfStock;
