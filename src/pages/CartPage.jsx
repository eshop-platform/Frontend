import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function CartPage() {
    const navigate = useNavigate();
const { isLoggedIn } = useStore();
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart
  } = useStore();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="pt-32 px-6 max-w-6xl mx-auto min-h-screen text-white bg-[#0a0a0a]">
      <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-white/50">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-xl">

                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <img src={item.image} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p>${item.price}</p>
                  </div>
                </div>

                {/* MIDDLE */}
                <div className="flex items-center gap-3">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                  <p>${item.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400"
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="mt-10 text-right">
            <h2 className="text-2xl font-bold">Total: ${total}</h2>

           <button
  onClick={() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  }}
  className="mt-4 bg-white text-black px-6 py-3 rounded-xl font-bold"
>
  Proceed to Checkout
</button>

            <button
              onClick={clearCart}
              className="ml-4 text-red-400"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}