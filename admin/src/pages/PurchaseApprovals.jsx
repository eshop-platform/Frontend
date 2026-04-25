import React, { useEffect, useState } from 'react';
import ApprovalQueue from '../components/ApprovalQueue';
import { approvePurchase, fetchPurchases, rejectPurchase } from '../../../shared/adminApi';

const PurchaseApprovals = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases('pending')
      .then(setPurchases)
      .catch(() => setPurchases([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDecision = async (id, action) => {
    const updater = action === 'approve' ? approvePurchase : rejectPurchase;
    await updater(id);
    setPurchases((current) => current.filter((item) => item._id !== id));
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="h1">Purchase Approvals</h1>
        <p className="subtitle">Review and validate purchases before finalizing transactions.</p>
      </div>

      <ApprovalQueue
        purchases={purchases}
        loading={loading}
        onApprove={(id) => handleDecision(id, 'approve')}
        onReject={(id) => handleDecision(id, 'reject')}
      />
    </div>
  );
};

export default PurchaseApprovals;
