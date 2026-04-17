import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useCart } from "@/context/CartContext";

const SHIPPING = 12;
const TAX_RATE = 0.08;

type Step = "cart" | "shipping" | "payment" | "success";

const CartPage = () => {
  const { items, removeItem, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [shippingInfo, setShippingInfo] = useState({ name: "", address: "", city: "", zip: "" });
  const [paymentInfo, setPaymentInfo] = useState({ card: "", expiry: "", cvv: "" });

  const tax = total * TAX_RATE;
  const grandTotal = total + SHIPPING + tax;

  if (step === "success") {
    return (
      <Layout>
        <div className="container-shop py-20 text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-shop-success/10 text-shop-success mx-auto flex items-center justify-center text-2xl">
            ✓
          </div>
          <h1 className="text-3xl font-semibold">Order Confirmed!</h1>
          <p className="text-muted-foreground">Thank you for your purchase. Your order is on its way.</p>
          <Link to="/" className="inline-block btn-primary-shop mt-4">Continue Shopping</Link>
        </div>
      </Layout>
    );
  }

  if (step === "shipping") {
    return (
      <Layout>
        <div className="container-shop py-10 max-w-lg mx-auto animate-fade-in">
          <h1 className="text-2xl font-semibold mb-6">Shipping Information</h1>
          <div className="space-y-4">
            {(["name", "address", "city", "zip"] as const).map((f) => (
              <input
                key={f}
                placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                value={shippingInfo[f]}
                onChange={(e) => setShippingInfo((p) => ({ ...p, [f]: e.target.value }))}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-foreground"
              />
            ))}
            <button onClick={() => setStep("payment")} className="w-full btn-primary-shop py-4">
              Continue to Payment
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (step === "payment") {
    return (
      <Layout>
        <div className="container-shop py-10 max-w-lg mx-auto animate-fade-in">
          <h1 className="text-2xl font-semibold mb-6">Payment Information</h1>
          <div className="space-y-4">
            {(["card", "expiry", "cvv"] as const).map((f) => (
              <input
                key={f}
                placeholder={f === "card" ? "Card Number" : f === "expiry" ? "MM/YY" : "CVV"}
                value={paymentInfo[f]}
                onChange={(e) => setPaymentInfo((p) => ({ ...p, [f]: e.target.value }))}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-foreground"
              />
            ))}
            <button
              onClick={() => {
                clearCart();
                setStep("success");
              }}
              className="w-full btn-primary-shop py-4"
            >
              Place Order — ${grandTotal.toFixed(2)}
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-shop py-10">
        <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>
        {items.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link to="/shop" className="inline-block btn-primary-shop">Browse Products</Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 space-y-4">
              {items.map((item, i) => (
                <div key={i} className="flex gap-4 border-b border-border pb-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-md"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.product.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.size} / {item.color} × {item.quantity}</p>
                    <p className="text-sm font-medium mt-1">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button onClick={() => removeItem(i)} className="p-2 hover:bg-secondary rounded-md transition-colors self-start">
                    <Trash2 size={16} className="text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>

            <aside className="lg:w-80 shrink-0 bg-secondary rounded-lg p-6 h-fit space-y-3">
              <h2 className="font-semibold mb-2">Order Summary</h2>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>${SHIPPING.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-3 border-t border-border">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
              <button onClick={() => setStep("shipping")} className="w-full btn-primary-shop py-3 flex items-center justify-center gap-2 mt-2">
                Proceed to Checkout <ArrowRight size={16} />
              </button>
            </aside>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
