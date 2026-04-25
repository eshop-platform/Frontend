import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ShoppingAssistant from './components/ai/ShoppingAssistant';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import AddProduct from './pages/AddProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Faq from './pages/Faq';
import Returns from './pages/Returns';
import PrivacyPolicy from './pages/PrivacyPolicy';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
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

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <ScrollToTop />
        <Navbar isAuthenticated={false} />
        <main className="flex-grow relative z-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/sell" element={<AddProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </main>
        <Footer />
        <ShoppingAssistant />
      </div>
    </Router>
  );
};

export default App;
