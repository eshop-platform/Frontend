import React from 'react';
import ApprovalQueue from '../components/ApprovalQueue';

const PurchaseApprovals = () => {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="h1">Purchase Approvals</h1>
        <p className="subtitle">Review and validate user purchase proofs before finalizing transactions.</p>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <button className="btn btn-primary">All (23)</button>
        <button className="btn btn-outline">High Value</button>
        <button className="btn btn-outline">Flagged</button>
      </div>

      <ApprovalQueue />
    </div>
  );
};

export default PurchaseApprovals;
