const OrderSummary = ({ cartItems }) => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.1;
  const shipping = 5;

  const total = subtotal + tax + shipping;

  return (
    <div style={{ marginTop: "20px", borderTop: "2px solid black" }}>
      <h3>Order Summary</h3>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <p>Shipping: ${shipping}</p>
      <h4>Total: ${total.toFixed(2)}</h4>
    </div>
  );
};

export default OrderSummary;