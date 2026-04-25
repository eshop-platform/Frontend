import React, { useEffect, useState } from 'react';
import { approveProduct, fetchProducts, rejectProduct } from '../../../shared/productApi';

const ProductApprovals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts({ status: 'pending' })
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDecision = async (id, action) => {
    const updater = action === 'approve' ? approveProduct : rejectProduct;
    await updater(id);
    setProducts((current) => current.filter((item) => item.id !== id));
  };

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
              {loading && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '24px' }}>Loading pending products...</td>
                </tr>
              )}
              {!loading && products.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '24px' }}>No pending products waiting for review.</td>
                </tr>
              )}
              {products.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="product-cell">
                      <img src={row.image} alt="Product" className="product-img" />
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: '500' }}>{row.brandName || row.sellerName || 'Seller'}</td>
                  <td>{row.category}</td>
                  <td style={{ fontWeight: '500' }}>${Number(row.price).toFixed(2)}</td>
                  <td>{row.submittedAt ? new Date(row.submittedAt).toLocaleString() : '-'}</td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      <button className="btn btn-success" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleDecision(row.id, 'approve')}>Approve</button>
                      <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleDecision(row.id, 'reject')}>Reject</button>
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
