import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import PurchaseModal from '../components/ui/PurchaseModal';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState({ type: 'idle', message: '' });
  const { format } = useCurrency();
  const { toast } = useToast();

  const handleRemove = (lineId, name) => {
    removeFromCart(lineId);
    toast(`${name} removed from cart`, 'info');
  };

  const checkoutProduct = useMemo(() => {
    if (cart.length === 0) return null;
    return {
      id: 'cart-checkout',
      name: `PrimeCommerce Order (${cart.length} item${cart.length === 1 ? '' : 's'})`,
      price: total.toFixed(2),
      image: cart[0].image,
      category: 'Order',
      selectedColor: null,
      selectedSize: null
    };
  }, [cart, total]);

  useEffect(() => {
    const txRef = searchParams.get('tx_ref');
    const payment = searchParams.get('payment');
    if (!txRef || payment !== 'success') return;

    const verify = async () => {
      setPaymentStatus({ type: 'info', message: 'Verifying your payment…' });
      try {
        const res = await fetch(`/api/chapa/verify/${encodeURIComponent(txRef)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message ?? 'Unable to verify payment.');
        const status = data.chapa?.data?.status ?? data.chapa?.status ?? 'unknown';
        setPaymentStatus({
          type: status === 'success' ? 'success' : 'warning',
          message: status === 'success'
            ? `Payment verified — reference ${txRef}.`
            : `Chapa returned status: ${status}. Confirm before fulfillment.`
        });
      } catch (err) {
        setPaymentStatus({ type: 'error', message: err.message ?? 'Unable to verify payment.' });
      }
    };
    verify();
  }, [searchParams]);

  const statusStyles = {
    error: 'bg-rose-50 text-rose-700 border border-rose-100',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100',
    info: 'bg-blue-50 text-blue-700 border border-blue-100'
  };

  return (
    <div className="pt-[104px] pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pt-8 mb-10">
        <p className="text-xs text-gray-400 tracking-[0.25em] uppercase font-medium mb-2">Review</p>
        <h1 className="text-4xl font-bold text-gray-950 tracking-tight">Your Bag</h1>
      </div>

      {paymentStatus.message && (
        <div className={`mb-8 rounded-xl px-5 py-4 text-sm font-medium ${statusStyles[paymentStatus.type] ?? statusStyles.info}`}>
          {paymentStatus.message}
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-center py-24 rounded-2xl bg-gray-50 border border-gray-100">
          <ShoppingBag className="w-12 h-12 mx-auto text-gray-200 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your bag is empty</h2>
          <p className="text-gray-500 text-sm mb-8">Add some items to get started.</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-gray-950 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.lineId} className="flex items-center gap-5 p-5 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors">
                <Link to={`/products/${item.id}`} className="flex-shrink-0">
                  <img src={item.image} className="w-20 h-20 object-cover rounded-xl" alt={item.name} />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item.id}`}>
                    <h3 className="font-semibold text-gray-900 text-sm truncate hover:text-gray-600 transition-colors">{item.name}</h3>
                  </Link>
                  <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                  {(item.selectedColor || item.selectedSize) && (
                    <p className="text-xs text-gray-500 mt-1">
                      {[item.selectedColor, item.selectedSize].filter(Boolean).join(' · ')}
                    </p>
                  )}
                  <p className="font-bold text-gray-950 text-sm mt-2">{format(item.price * item.quantity)}</p>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1.5">
                  <button onClick={() => updateQuantity(item.lineId, -1)} className="text-gray-400 hover:text-gray-950 transition-colors p-0.5">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-semibold text-sm w-5 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.lineId, 1)} className="text-gray-400 hover:text-gray-950 transition-colors p-0.5">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button onClick={() => handleRemove(item.lineId, item.name)} className="text-gray-300 hover:text-rose-500 transition-colors p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-2xl p-7 h-fit border border-gray-100">
            <h2 className="text-lg font-bold text-gray-950 mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal ({cart.reduce((a, i) => a + i.quantity, 0)} items)</span>
                <span className="font-semibold">{format(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-semibold text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax</span>
                <span className="font-semibold text-gray-500">Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6 flex justify-between">
              <span className="font-bold text-gray-950">Total</span>
              <span className="font-bold text-gray-950 text-lg">{format(total)}</span>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-gray-950 text-white py-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
            >
              Checkout with Chapa <ArrowRight className="w-4 h-4" />
            </button>
            <Link to="/products" className="block text-center text-xs text-gray-400 hover:text-gray-700 transition-colors mt-4">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}

      <PurchaseModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} product={checkoutProduct} />
    </div>
  );
};

export default Cart;
