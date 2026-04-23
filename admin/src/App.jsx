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

const LayoutWrapper = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/purchase-approvals" element={<PurchaseApprovals />} />
          <Route path="/product-approvals" element={<ProductApprovals />} />
          <Route path="/users" element={<UsersManagement />} />
          <Route path="/products" element={<ProductsManagement />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/out-of-stock" element={<OutOfStock />} />
        </Route>
        
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
