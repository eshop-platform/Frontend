import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import StatCard from '../../components/admin/StatCard';
import { DollarSign, TrendingUp, ArrowDownRight } from 'lucide-react';

const Finance = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ revenue: 0, commission: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [purchasesData, statsData] = await Promise.all([
          api.get('/purchases?status=completed'),
          api.get('/dashboard/stats')
        ]);
        setPurchases(purchasesData.data);
        setStats({
          revenue: statsData.data.financials.revenue,
          commission: statsData.data.financials.commission
        });
      } catch (err) {
        console.error('Failed to fetch financial data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-400">Loading financial data...</div>;

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="h1">Financial Overview</h1>
        <p className="subtitle">Track platform revenue, commissions, and transaction history.</p>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
        <StatCard 
          title="Total Gross Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          description="Total value of all completed orders"
          icon={<DollarSign size={18} />}
          extraClass="stat-card-featured"
        />
        <StatCard 
          title="Platform Earnings"
          value={`$${stats.commission.toLocaleString()}`}
          description="Total commission collected (5%)"
          icon={<TrendingUp size={18} />}
        />
        <StatCard 
          title="Net Payouts"
          value={`$${(stats.revenue - stats.commission).toLocaleString()}`}
          description="Funds distributed to vendors"
          icon={<ArrowDownRight size={18} />}
        />
      </div>

      <div className="card">
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="h2">Transaction History</h2>
          <span className="badge badge-green">Completed Payments</span>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Buyer</th>
                <th>Total Amount</th>
                <th>Commission</th>
                <th>Date</th>
                <th style={{ textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {purchases.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-tertiary)' }}>
                    No completed transactions found.
                  </td>
                </tr>
              ) : purchases.map(row => (
                <tr key={row._id}>
                  <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{row._id}</td>
                  <td style={{ fontWeight: '500' }}>{row.buyer?.username || 'Unknown'}</td>
                  <td style={{ fontWeight: '600' }}>${row.totalAmount.toLocaleString()}</td>
                  <td style={{ color: 'var(--success-color)' }}>${row.commission?.toLocaleString() || (row.totalAmount * 0.05).toFixed(2)}</td>
                  <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                  <td style={{ textAlign: 'right' }}>
                    <span className="badge badge-green">Completed</span>
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

export default Finance;
