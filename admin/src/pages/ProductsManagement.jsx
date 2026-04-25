import React, { useEffect, useState } from 'react';
import { fetchAllAdminProducts, removeProduct } from '../../../shared/adminApi';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllAdminProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    await removeProduct(id);
    setProducts((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="h1">Products Management</h1>
          <p className="subtitle">Manage all marketplace listings from the live backend catalog.</p>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '24px' }}>Loading products...</td>
                </tr>
              )}
              {!loading && products.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '24px' }}>No products found.</td>
                </tr>
              )}
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td style={{ fontWeight: '500' }}>{prod.name}</td>
                  <td>{prod.category}</td>
                  <td style={{ fontWeight: '500' }}>${Number(prod.price).toFixed(2)}</td>
                  <td style={{ color: prod.stock === 0 ? 'var(--danger-color)' : 'inherit', fontWeight: prod.stock === 0 ? '700' : 'normal' }}>
                    {prod.stock}
                  </td>
                  <td>
                    <span className={`badge ${prod.status === 'approved' ? 'badge-green' : prod.status === 'pending' ? 'badge-yellow' : 'badge-red'}`}>
                      {prod.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleDelete(prod.id)}>Delete</button>
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

export default ProductsManagement;
