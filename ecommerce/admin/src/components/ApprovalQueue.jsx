import React from 'react';

const approvals = [
  {
    id: 1,
    user: 'Marina Valdez',
    productTitle: 'Embroidered Ivory Blouse',
    productImg: 'https://images.unsplash.com/photo-1515347619152-16b7f329d911?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    proofImg: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    amount: '$129.00'
  },
  {
    id: 2,
    user: 'Henri DuPont',
    productTitle: 'Slim-fit Navy Blazer',
    productImg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    proofImg: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    amount: '$249.00'
  },
  {
    id: 3,
    user: 'Lina Park',
    productTitle: 'Pleated Silk Skirt',
    productImg: 'https://images.unsplash.com/photo-1582142339904-2b9e7c5b6e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    proofImg: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    amount: '$89.00'
  },
  {
    id: 4,
    user: 'Cameron Lee',
    productTitle: 'Oversized Knit Sweater',
    productImg: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    proofImg: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    amount: '$159.00'
  }
];

const ApprovalQueue = () => {
  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <div className="stat-card-header" style={{ marginBottom: '20px' }}>
        <div>
          <div className="subtitle" style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Purchase Approval Queue</div>
          <div className="text-sm">Recent pending purchases requiring validation</div>
        </div>
        <div className="text-sm">Showing 4 of 23 pending</div>
      </div>

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
            {approvals.map(row => (
              <tr key={row.id}>
                <td style={{ fontWeight: '500' }}>{row.user}</td>
                <td>
                  <div className="product-cell">
                    <img src={row.productImg} alt="Product" className="product-img" />
                    <span>{row.productTitle}</span>
                  </div>
                </td>
                <td>
                  <img src={row.proofImg} alt="Proof" className="product-img" style={{ width: '60px', borderRadius: '4px' }} />
                </td>
                <td style={{ fontWeight: '500' }}>{row.amount}</td>
                <td>
                  <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                    <button className="btn btn-success" style={{ padding: '6px 12px', fontSize: '12px' }}>Approve</button>
                    <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#9d174d' }}>Reject</button>
                    <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>View</button>
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
