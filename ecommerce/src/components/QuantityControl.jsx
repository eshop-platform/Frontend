const QuantityControl = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div>
      <button onClick={onDecrease}>-</button>
      <span style={{ margin: "0 10px" }}>{quantity}</span>
      <button onClick={onIncrease}>+</button>
    </div>
  );
};

export default QuantityControl;