import React from 'react';

const products = [
  { id: 101, title: 'Classic White Sneakers', category: 'Footwear', price: '$89.99', stock: 124, status: 'Active' },
  { id: 102, title: 'Leather Crossbody Bag', category: 'Accessories', price: '$150.00', stock: 45, status: 'Active' },
  { id: 103, title: 'Vintage Band Tee', category: 'Menswear', price: '$35.00', stock: 0, status: 'Out of Stock' },
  { id: 104, title: 'Silk Scarf', category: 'Accessories', price: '$65.00', stock: 210, status: 'Active' },
];

const ProductsManagement = () => {
  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="h1">Products Management</h1>
          <p className="subtitle">Manage all active and inactive marketplace listings.</p>
        </div>
        <button className="btn btn-primary">Add New Product</button>
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
              {products.map(prod => (
                <tr key={prod.id}>
                  <td style={{ fontWeight: '500' }}>{prod.title}</td>
                  <td>{prod.category}</td>
                  <td style={{ fontWeight: '500' }}>{prod.price}</td>
                  <td style={{ color: prod.stock === 0 ? 'var(--danger-color)' : 'inherit', fontWeight: prod.stock === 0 ? '700' : 'normal' }}>
                    {prod.stock}
                  </td>
                  <td>
                    <span className={`badge ${prod.status === 'Active' ? 'badge-green' : 'badge-red'}`}>
                      {prod.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>Edit</button>
                      <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>Delete</button>
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
