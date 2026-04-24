import React from 'react';

const products = [
  { id: 1, vendor: 'Maison D\'Elle', productTitle: 'Charcoal Wool Coat', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80', price: '$299.00', category: 'Womenswear', submitted: '2h ago' },
  { id: 2, vendor: 'Urban Threads', productTitle: 'Distressed Denim Jacket', img: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80', price: '$145.00', category: 'Menswear', submitted: '4h ago' },
  { id: 3, vendor: 'Lumina Jewelry', productTitle: 'Gold Hoop Earrings', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80', price: '$85.00', category: 'Accessories', submitted: '5h ago' },
];

const ProductApprovals = () => {
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
              {products.map(row => (
                <tr key={row.id}>
                  <td>
                    <div className="product-cell">
                      <img src={row.img} alt="Product" className="product-img" />
                      <span>{row.productTitle}</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: '500' }}>{row.vendor}</td>
                  <td>{row.category}</td>
                  <td style={{ fontWeight: '500' }}>{row.price}</td>
                  <td>{row.submitted}</td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      <button className="btn btn-success" style={{ padding: '6px 12px', fontSize: '12px' }}>Approve</button>
                      <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>Reject</button>
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
