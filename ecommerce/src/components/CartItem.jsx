import QuantityControl from "./QuantityControl";

const CartItem = ({ item, onUpdateQty, onRemove }) => {
  const lineTotal = item.price * item.quantity;

  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <img src={item.image} alt={item.title} width="80" />

      <h3>{item.title}</h3>
      <p>{item.variant}</p>
      <p>Price: ${item.price}</p>

      <QuantityControl
        quantity={item.quantity}
        onIncrease={() => onUpdateQty(item.id, item.quantity + 1)}
        onDecrease={() => onUpdateQty(item.id, item.quantity - 1)}
      />

      <p>Line Total: ${lineTotal}</p>

      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
};

export default CartItem;