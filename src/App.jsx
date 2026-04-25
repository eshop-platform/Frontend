import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ShoppingAssistant from './components/ai/ShoppingAssistant';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Faq from './pages/Faq';
import Returns from './pages/Returns';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Profile from './pages/Profile';
import PostItem from './pages/PostItem';

// Admin Imports
import AdminLayout from './components/admin/Layout';
import AdminDashboard from './components/admin/Dashboard';
import AdminPurchaseApprovals from './pages/admin/PurchaseApprovals';
import AdminProductApprovals from './pages/admin/ProductApprovals';
import AdminUsersManagement from './pages/admin/UsersManagement';
import AdminProductsManagement from './pages/admin/ProductsManagement';
import AdminCategories from './pages/admin/Categories';
import AdminFinance from './pages/admin/Finance';
import AdminOutOfStock from './pages/admin/OutOfStock';
import AdminProfile from './pages/admin/Profile';
import { useAuth } from './context/AuthContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAuthenticated } = useAuth();
  
  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return children ? children : <Outlet />;
};

const NotFound = () => (
  <div className="pt-[104px] pb-24 max-w-2xl mx-auto px-4 text-center">
    <div className="pt-20">
      <p className="text-xs text-gray-400 tracking-[0.3em] uppercase font-medium mb-4">Error</p>
      <h1 className="text-7xl font-black text-gray-950 mb-4">404</h1>
      <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="inline-flex items-center px-6 py-3 rounded-full bg-gray-950 text-white text-sm font-semibold hover:bg-gray-800 transition-colors">
        Back to Home
      </a>
    </div>
  </div>
);

const UserLayout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="flex-grow pt-[80px]">
        <Outlet />
      </main>
      <Footer />
      <ShoppingAssistant />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/post-item" element={<ProtectedRoute><PostItem /></ProtectedRoute>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="purchase-approvals" element={<AdminPurchaseApprovals />} />
          <Route path="product-approvals" element={<AdminProductApprovals />} />
          <Route path="users" element={<AdminUsersManagement />} />
          <Route path="products" element={<AdminProductsManagement />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="finance" element={<AdminFinance />} />
          <Route path="out-of-stock" element={<AdminOutOfStock />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
