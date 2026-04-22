import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Logout = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--background-color)',
      fontFamily: 'var(--font-family)'
    }}>
      <div className="card" style={{ textAlign: 'center', padding: '40px', maxWidth: '400px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <CheckCircle size={48} color="var(--success-color)" />
        </div>
        <h1 className="h2" style={{ marginBottom: '12px' }}>You have been logged out</h1>
        <p className="subtitle" style={{ marginBottom: '32px' }}>
          Thank you for managing Aurelia Market today. Your session has successfully ended.
        </p>
        <button 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '12px' }}
          onClick={() => navigate('/')}
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default Logout;
