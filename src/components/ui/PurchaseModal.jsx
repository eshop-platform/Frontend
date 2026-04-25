import { useMemo, useState, useEffect } from 'react';
import { LoaderCircle, ShieldCheck, X, Lock } from 'lucide-react';
import { generateTxRef } from '../../lib/chapa';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';

const USD_TO_ETB = 130;

const PurchaseModal = ({ isOpen, onClose, product }) => {
  const { user } = useAuth();
  const [customer, setCustomer] = useState({ 
    firstName: user?.username?.split(' ')[0] || '', 
    lastName: user?.username?.split(' ')[1] || '', 
    email: user?.email || '', 
    phone: '' 
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isLaunching, setIsLaunching] = useState(false);

  const { currency, format } = useCurrency();

  useEffect(() => {
    if (user) {
      setCustomer(prev => ({
        ...prev,
        firstName: user.username.split(' ')[0] || '',
        lastName: user.username.split(' ')[1] || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  // Chapa always charges in ETB — prices in data are already in ETB
  const etbAmount = useMemo(() => {
    if (!product) return '0';
    const price = Number(product.price);
    // If currency is USD, prices are stored as ETB so convert back; otherwise use directly
    return String(currency === 'USD' ? Math.round(price * USD_TO_ETB) : price);
  }, [product, currency]);

  const displayAmount = useMemo(() => {
    if (!product) return '';
    return format(product.price);
  }, [product, format]);

  if (!isOpen || !product) return null;

  const handleChange = (field, value) => setCustomer((c) => ({ ...c, [field]: value }));

  const handleClose = () => {
    setStatus({ type: 'idle', message: '' });
    setIsLaunching(false);
    onClose();
  };

  const launchCheckout = async (e) => {
    e.preventDefault();
    if (!customer.firstName || !customer.lastName || !customer.email) {
      setStatus({ type: 'error', message: 'First name, last name, and email are required.' });
      return;
    }

    const txRef = generateTxRef();
    setIsLaunching(true);
    setStatus({ type: 'info', message: 'Preparing secure checkout…' });

    try {
      const res = await api.post('/chapa/initialize', { 
        txRef, 
        amount: etbAmount, 
        firstName: customer.firstName, 
        lastName: customer.lastName, 
        email: customer.email, 
        phone: customer.phone, 
        productName: product.name,
        productId: product.id !== 'cart-checkout' ? (product._id || product.id) : null,
        products: product.products || null
      });
      
      if (!res.checkoutUrl) throw new Error('Chapa did not return a checkout URL.');
      setStatus({ type: 'success', message: 'Redirecting to Chapa…' });
      window.location.assign(res.checkoutUrl);
    } catch (err) {

      setStatus({ type: 'error', message: err.message ?? 'Unable to start checkout.' });
      setIsLaunching(false);
    }
  };


  const statusStyles = {
    error: 'bg-rose-50 text-rose-700 border border-rose-100',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    info: 'bg-blue-50 text-blue-700 border border-blue-100'
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white w-full sm:rounded-2xl sm:max-w-lg max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-950">Secure Checkout</h2>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Powered by Chapa
            </p>
          </div>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Product summary */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <img src={product.image} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" alt={product.name} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate">{product.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
            </div>
            <p className="font-bold text-gray-950 flex-shrink-0">{displayAmount}</p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={launchCheckout}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">First Name</label>
                <input
                  type="text"
                  value={customer.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  placeholder="Jane"
                  className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-950 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Last Name</label>
                <input
                  type="text"
                  value={customer.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  placeholder="Doe"
                  className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-950 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                value={customer.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="jane@example.com"
                className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-950 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Phone <span className="text-gray-400 normal-case font-normal">(optional)</span></label>
              <input
                type="tel"
                value={customer.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+251 9XX XXX XXX"
                className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-950 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLaunching}
              className="w-full bg-gray-950 text-white py-4 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {isLaunching && <LoaderCircle className="w-4 h-4 animate-spin" />}
              {isLaunching ? 'Preparing…' : 'Continue to Chapa'}
            </button>
          </form>

          {/* Trust note */}
          <div className="flex gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <ShieldCheck className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 leading-relaxed">
              Payment is processed securely via Chapa. Verify the transaction before fulfilling any order.
            </p>
          </div>

          {status.message && (
            <div className={`rounded-xl px-4 py-3 text-sm font-medium ${statusStyles[status.type] ?? 'bg-gray-50 text-gray-700 border border-gray-100'}`}>
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
