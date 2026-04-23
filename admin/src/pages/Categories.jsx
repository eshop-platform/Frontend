import React from 'react';

const categories = [
  { id: 1, name: 'Womenswear', activeListings: 14332, revenue: '$450K', trending: '+12%' },
  { id: 2, name: 'Menswear', activeListings: 9890, revenue: '$320K', trending: '+8%' },
  { id: 3, name: 'Accessories', activeListings: 6143, revenue: '$150K', trending: '-2%' },
  { id: 4, name: 'Footwear', activeListings: 3763, revenue: '$200K', trending: '+15%' },
];

const Categories = () => {
  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="h1">Categories Overview</h1>
          <p className="subtitle">High-level view of marketplace categories and their performance.</p>
        </div>
        <button className="btn btn-primary">Create Category</button>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Active Listings</th>
                <th>Gross Revenue</th>
                <th>Trend (30 days)</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id}>
                  <td style={{ fontWeight: '600' }}>{cat.name}</td>
                  <td>{cat.activeListings.toLocaleString()}</td>
                  <td style={{ fontWeight: '500' }}>{cat.revenue}</td>
                  <td style={{ color: cat.trending.startsWith('+') ? 'var(--success-color)' : 'var(--danger-color)' }}>
                    {cat.trending}
                  </td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>Edit</button>
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

export default Categories;
