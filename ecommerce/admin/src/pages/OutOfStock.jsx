import React from 'react';

const outOfStockItems = [
  { id: 1, title: 'Vintage Band Tee', vendor: 'Retro Threads', daysEmpty: 5, actionRequired: 'Notify Vendor' },
  { id: 2, title: 'Ceramic Vase', vendor: 'Home Goods Co', daysEmpty: 12, actionRequired: 'Delist Product' },
  { id: 3, title: 'Wireless Earbuds', vendor: 'Tech Haven', daysEmpty: 1, actionRequired: 'Notify Vendor' },
  { id: 4, title: 'Yoga Mat', vendor: 'FitLife', daysEmpty: 30, actionRequired: 'Delist Product' },
];

const OutOfStock = () => {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="h1">Out of Stock Alerts</h1>
        <p className="subtitle">Products with zero inventory that require attention.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--danger-color)' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product Title</th>
                <th>Vendor</th>
                <th>Days Out of Stock</th>
                <th>Suggested Action</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {outOfStockItems.map(item => (
                <tr key={item.id}>
                  <td style={{ fontWeight: '500' }}>{item.title}</td>
                  <td>{item.vendor}</td>
                  <td style={{ color: item.daysEmpty > 7 ? 'var(--danger-color)' : 'inherit', fontWeight: '600' }}>
                    {item.daysEmpty} days
                  </td>
                  <td>
                    <span className={`badge ${item.actionRequired === 'Delist Product' ? 'badge-red' : 'badge-yellow'}`}>
                      {item.actionRequired}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>Contact Vendor</button>
                      {item.actionRequired === 'Delist Product' && (
                        <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>Delist</button>
                      )}
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
