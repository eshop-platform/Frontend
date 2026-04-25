import React, { useEffect, useState } from 'react';
import { fetchAllAdminProducts } from '../../../shared/adminApi';

const OutOfStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllAdminProducts()
      .then((items) => setProducts(items.filter((item) => Number(item.stock) === 0)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="h1">Out of Stock Alerts</h1>
        <p className="subtitle">Products with zero inventory from the live catalog.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--danger-color)' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product Title</th>
                <th>Vendor</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '24px' }}>Loading out of stock products...</td>
                </tr>
              )}
              {!loading && products.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '24px' }}>No out of stock products found.</td>
                </tr>
              )}
              {products.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: '500' }}>{item.name}</td>
                  <td>{item.brandName || item.sellerName || 'Seller'}</td>
                  <td>{item.category}</td>
                  <td style={{ color: 'var(--danger-color)', fontWeight: '600' }}>{item.stock}</td>
                  <td>
                    <span className={`badge ${item.status === 'approved' ? 'badge-green' : item.status === 'pending' ? 'badge-yellow' : 'badge-red'}`}>
                      {item.status}
                    </span>
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
