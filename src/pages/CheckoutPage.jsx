import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    // Simulate order success
    clearCart();
    navigate('/success');
  };

  return (
    <div className="pt-32 px-6 max-w-4xl mx-auto text-white min-h-screen bg-[#0a0a0a]">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      {/* FORM */}
      <div className="space-y-4">
        <input
          placeholder="Full Name"
          className="w-full p-3 bg-white/10 rounded"
          onChange={(e) => setForm({...form, name: e.target.value})}
        />

        <input
          placeholder="Address"
          className="w-full p-3 bg-white/10 rounded"
          onChange={(e) => setForm({...form, address: e.target.value})}
        />

        <input
          placeholder="Phone"
          className="w-full p-3 bg-white/10 rounded"
          onChange={(e) => setForm({...form, phone: e.target.value})}
        />
      </div>

      {/* ORDER SUMMARY */}
      <div className="mt-10">
        <h2 className="text-2xl mb-4">Order Summary</h2>

        {cart.map(item => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}

        <h3 className="text-xl mt-4">Total: ${total}</h3>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleOrder}
        className="mt-8 bg-green-500 px-6 py-3 rounded font-bold"
      >
        Place Order
      </button>
    </div>
  );
}