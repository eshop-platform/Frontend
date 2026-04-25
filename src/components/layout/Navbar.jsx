import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, ChevronDown, Heart, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';
import { categoryGroups } from '../../data/products';

const collectionRouteMap = {
  new: '/products?cat=new',
  sale: '/products?cat=sale',
  'best-sellers': '/products?cat=best-sellers',
  men: '/products?cat=men',
  women: '/products?cat=women'
};

const collectionLabelMap = {
  new: 'New Arrivals',
  sale: 'Sale Picks',
  'best-sellers': 'Best Sellers',
  men: "Men's",
  women: "Women's"
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [expandedMobileGroup, setExpandedMobileGroup] = useState('Shop by Category');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { currency, toggle: toggleCurrency } = useCurrency();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsCategoryOpen(false);
    setSearchFocused(false);
  }, [location.pathname, location.search]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/products?q=${encodeURIComponent(query)}` : '/products');
  };

  const handleSuggestionClick = (to) => {
    navigate(to);
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/products') {
      return location.pathname === '/products' || location.pathname.startsWith('/products/');
    }
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 isolate w-full z-[400] pointer-events-auto transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100' : 'bg-white/80 backdrop-blur-md border-b border-transparent'}`}>
      <div className="relative z-[2] bg-gray-950 text-white text-xs text-center py-2 tracking-widest font-medium">
        FREE WORLDWIDE SHIPPING ON ORDERS OVER $150
      </div>

      <div className="relative z-[2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center gap-6">
          <Link to="/" className="flex-shrink-0">
            <span className="text-xl font-black tracking-tight text-gray-950">PRIME</span>
            <span className="text-xl font-light tracking-tight text-gray-400">COMMERCE</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 flex-1 justify-end">
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-gray-950' : 'text-gray-500 hover:text-gray-950'}`}>
              Home
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCategoryOpen((current) => !current)}
                className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${isCategoryOpen ? 'text-gray-950' : 'text-gray-500 hover:text-gray-950'}`}
              >
                Categories
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoryOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsCategoryOpen(false)} />
                  <div className="absolute top-full right-0 mt-3 w-72 rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-200/60 p-4 z-20">
                    {categoryGroups.map((group) => (
                      <div key={group.title} className="mb-4 last:mb-0">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-2.5 px-1">{group.title}</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {group.items.map((item) => {
                            const label = collectionLabelMap[item] ?? item;
                            const to = collectionRouteMap[item] ?? `/products?cat=${encodeURIComponent(item)}`;
                            return (
                              <button
                                key={item}
                                type="button"
                                onClick={() => handleSuggestionClick(to)}
                                className="rounded-xl bg-gray-50 px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-950 transition-colors font-medium"
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link to="/products" className={`text-sm font-medium transition-colors ${isActive('/products') ? 'text-gray-950' : 'text-gray-500 hover:text-gray-950'}`}>
              Shop
            </Link>
            <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-gray-950' : 'text-gray-500 hover:text-gray-950'}`}>
              About
            </Link>
            {isAuthenticated && (
              <Link to="/post-item" className={`text-sm font-medium transition-colors ${isActive('/post-item') ? 'text-gray-950' : 'text-gray-500 hover:text-gray-950'}`}>
                Sell
              </Link>
            )}

            <div className="relative w-full max-w-[220px]">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => window.setTimeout(() => setSearchFocused(false), 150)}
                  placeholder="Search..."
                  className="w-full rounded-full border border-gray-200 bg-gray-50 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 focus:bg-white transition-all"
                />
              </form>
            </div>

            <button
              type="button"
              onClick={toggleCurrency}
              className="flex items-center gap-1 border border-gray-200 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-gray-950 hover:text-gray-950 transition-all"
              title="Switch currency"
            >
              <span>{currency === 'USD' ? 'USD' : 'ETB'}</span>
            </button>

            <Link to="/wishlist" className="relative p-1 text-gray-500 hover:text-gray-950 transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] rounded-full h-4 min-w-4 px-0.5 flex items-center justify-center font-bold">{wishlistCount}</span>
              )}
            </Link>
            <Link to="/cart" className="relative p-1 text-gray-500 hover:text-gray-950 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-950 text-white text-[10px] rounded-full h-4 min-w-4 px-0.5 flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </Link>
            
            {/* User Profile / Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 pl-3 py-1.5 border-l border-gray-200 text-gray-700 hover:text-gray-950 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold uppercase">
                    {user?.username?.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold max-w-[80px] truncate">{user?.username}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                    <div className="absolute top-full right-0 mt-3 w-48 rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-200/60 p-2 z-20">
                      <div className="px-3 py-2 border-b border-gray-50 mb-1">
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Account</p>
                        <p className="text-xs font-semibold text-gray-950 truncate">{user?.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
                        My Profile
                      </Link>
                      {user?.role === 'admin' && (
                        <Link 
                          to="/admin"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <Link to="/orders" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
                        Orders
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Log Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-gray-950 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center gap-3">
            <Link to="/wishlist" className="relative p-1">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] rounded-full h-4 min-w-4 px-0.5 flex items-center justify-center font-bold">{wishlistCount}</span>}
            </Link>
            <Link to="/cart" className="relative p-1">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-gray-950 text-white text-[10px] rounded-full h-4 min-w-4 px-0.5 flex items-center justify-center font-bold">{cartCount}</span>}
            </Link>
            <button type="button" onClick={() => setIsOpen((current) => !current)} className="p-1">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-8 pt-4 space-y-5 shadow-xl">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-950"
            />
          </form>
          
          {/* User info in mobile menu */}
          {isAuthenticated && (
            <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-lg">
                  {user?.username?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-950 truncate">{user?.username}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
                <button onClick={handleLogout} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
              
              {user?.role === 'admin' && (
                <Link 
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-200"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          )}

          <div className="space-y-1">
            {[
              ['/', 'Home'],
              ['/products', 'Shop All'],
              ['/about', 'About'],
              ['/wishlist', 'Wishlist'],
              ...(isAuthenticated ? [['/post-item', 'Sell Your Item']] : [])
            ].map(([path, label]) => (
              <Link key={path} to={path} onClick={() => setIsOpen(false)} className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive(path) ? 'bg-gray-100 text-gray-950' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-950'}`}>
                {label}
              </Link>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold px-3">Categories</p>
            {categoryGroups.map((group) => (
              <div key={group.title} className="rounded-xl border border-gray-100 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedMobileGroup((current) => current === group.title ? '' : group.title)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50"
                >
                  {group.title}
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobileGroup === group.title ? 'rotate-180' : ''}`} />
                </button>
                {expandedMobileGroup === group.title && (
                  <div className="p-3 flex flex-wrap gap-2">
                    {group.items.map((item) => {
                      const label = collectionLabelMap[item] ?? item;
                      const to = collectionRouteMap[item] ?? `/products?cat=${encodeURIComponent(item)}`;
                      return (
                        <button key={item} type="button" onClick={() => handleSuggestionClick(to)} className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {!isAuthenticated && (
            <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center bg-gray-950 text-white py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
              Sign In
            </Link>
          )}

          <button
            type="button"
            onClick={toggleCurrency}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-full py-3 text-sm font-semibold text-gray-700 hover:border-gray-950 transition-colors"
          >
            <span>{currency === 'USD' ? '🇺🇸 USD — US Dollar' : '🇪🇹 ETB — Ethiopian Birr'}</span>
            <span className="text-gray-400 text-xs">Switch</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
