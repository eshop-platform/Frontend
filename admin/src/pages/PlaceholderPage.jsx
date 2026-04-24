import React from 'react';

const PlaceholderPage = ({ title }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--text-secondary)' }}>
      <h1 className="h1" style={{ marginBottom: '16px' }}>{title}</h1>
      <p>This page is currently under construction.</p>
    </div>
  );
};

export default PlaceholderPage;
