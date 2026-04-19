import { useState } from "react";
import { cartItemsData } from "../data/cartData";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import EmptyCart from "../components/EmptyCart";

const CartPage = () => {
  const [cartItems, setCartItems] = useState(cartItemsData);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;

    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div>
      <h2>Cart</h2>

      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQty={updateQuantity}
          onRemove={removeItem}
        />
      ))}

      <OrderSummary cartItems={cartItems} />
    </div>
  );
};

export default CartPage;