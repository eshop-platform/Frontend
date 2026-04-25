import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PurchaseApprovals from './pages/PurchaseApprovals';
import ProductApprovals from './pages/ProductApprovals';
import UsersManagement from './pages/UsersManagement';
import ProductsManagement from './pages/ProductsManagement';
import Categories from './pages/Categories';
import Finance from './pages/Finance';
import OutOfStock from './pages/OutOfStock';
import Logout from './pages/Logout';

import { AuthProvider, useAuth } from './context/AuthContext';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>Authenticating...</div>
        <p>Verifying your administrative session</p>
      </div>
    </div>
  );

  if (!isAuthenticated || user?.role !== 'admin') {
    window.location.href = 'http://localhost:5173/login';
    return null;
  }
  return children;
};

const LayoutWrapper = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute><LayoutWrapper /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/purchase-approvals" element={<PurchaseApprovals />} />
            <Route path="/product-approvals" element={<ProductApprovals />} />
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/products" element={<ProductsManagement />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/out-of-stock" element={<OutOfStock />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
