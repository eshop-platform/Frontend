import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, ShieldCheck, Truck, CreditCard, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import { api } from '../lib/api';

const Checkout = () => {
  const { state } = useLocation();
  const { cart, total } = useCart();
  const { format } = useCurrency();
  const { user } = useAuth();
  const navigate = useNavigate();

  // If we came from "Buy Now", we have a single product in state
  const directItem = state?.product || state?.item;
  
  const checkoutItems = useMemo(() => {
    if (directItem) {
      return [{
        id: directItem._id || directItem.id,
        name: directItem.title || directItem.name,
        image: directItem.image,
        price: directItem.price,
        quantity: state?.quantity || 1,
        selectedColor: state?.selectedColor,
        selectedSize: state?.selectedSize
      }];
    }
    return cart;
  }, [directItem, cart, state]);

  const checkoutTotal = useMemo(() => {
    if (directItem) {
      return (directItem.price * (state?.quantity || 1));
    }
    return total;
  }, [directItem, total, state]);

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: user?.username || '',
    email: user?.email || '',
    street: '',
    city: '',
    phone: ''
  });

  const handlePayment = async () => {
    if (!address.street || !address.city || !address.phone) {
       alert('Please fill in your shipping details');
       return;
    }

    setLoading(true);
    try {
      const payload = {
        amount: checkoutTotal,
        currency: 'ETB', // Defaulting to ETB for Chapa as per previous context
        email: address.email,
        first_name: address.fullName.split(' ')[0],
        last_name: address.fullName.split(' ')[1] || '',
        phone_number: address.phone,
        tx_ref: `tx-${Date.now()}`,
        callback_url: `${window.location.origin}/cart?payment=success`,
        return_url: `${window.location.origin}/cart?payment=success`,
        customization: {
          title: "PrimeCommerce Order",
          description: `Payment for ${checkoutItems.length} items`
        }
      };

      const response = await api.post('/chapa/initialize', payload);
      if (response.data?.checkout_url) {
        window.location.href = response.data.checkout_url;
      } else {
        throw new Error('Failed to get payment URL');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Failed to initialize payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="pt-[104px] pb-24 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Your checkout is empty</h1>
        <Link to="/products" className="text-blue-600 hover:underline">Go back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="pt-[104px] pb-24 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white border border-gray-100 hover:border-gray-900 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Secure Checkout</p>
            <h1 className="text-3xl font-black text-gray-950">Complete Your Order</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
          <div className="space-y-8">
            {/* Shipping Info */}
            <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Truck className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-950">Shipping Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">Full Name</label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({...address, fullName: e.target.value})}
                    placeholder="John Doe"
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 focus:ring-2 focus:ring-gray-950 transition-all text-sm font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">Email Address</label>
                  <input
                    type="email"
                    value={address.email}
                    onChange={(e) => setAddress({...address, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 focus:ring-2 focus:ring-gray-950 transition-all text-sm font-medium"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">Street Address</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                    placeholder="123 Luxury Lane"
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 focus:ring-2 focus:ring-gray-950 transition-all text-sm font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                    placeholder="Addis Ababa"
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 focus:ring-2 focus:ring-gray-950 transition-all text-sm font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">Phone Number</label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({...address, phone: e.target.value})}
                    placeholder="+251 912 345 678"
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 focus:ring-2 focus:ring-gray-950 transition-all text-sm font-medium"
                  />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-950">Payment Method</h2>
              </div>
              
              <div className="p-5 border-2 border-gray-950 rounded-2xl bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-white border border-gray-100 rounded-md flex items-center justify-center">
                    <span className="text-[10px] font-black text-blue-600">CHAPA</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-950">Chapa Gateway</p>
                    <p className="text-xs text-gray-500">Pay securely with local methods</p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-gray-950 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>
            </section>
          </div>

          {/* Summary Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xl shadow-gray-100/50">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBag className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-bold text-gray-950">Order Summary</h2>
              </div>

              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {checkoutItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <img src={item.image} className="w-16 h-16 rounded-xl object-cover border border-gray-50" alt={item.name} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-950 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      {item.selectedColor && <p className="text-[10px] text-gray-400 mt-0.5">{item.selectedColor} · {item.selectedSize}</p>}
                      <p className="text-sm font-bold text-gray-950 mt-1">{format(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-50 pt-6 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold text-gray-950">{format(checkoutTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-semibold text-emerald-600">Free</span>
                </div>
                <div className="border-t border-gray-50 pt-3 flex justify-between">
                  <span className="font-bold text-gray-950">Grand Total</span>
                  <span className="text-xl font-black text-gray-950">{format(checkoutTotal)}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-gray-950 text-white py-5 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Pay Now'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Secure Encrypted Transaction
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
