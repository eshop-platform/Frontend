const QuantityStepper = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <section>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">Quantity</h2>
      <div className="inline-flex items-center rounded-full border border-gray-300">
        <button
          type="button"
          onClick={onDecrease}
          className="rounded-l-full px-4 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="min-w-10 text-center text-base font-semibold text-gray-900">{quantity}</span>
        <button
          type="button"
          onClick={onIncrease}
          className="rounded-r-full px-4 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </section>
  );
};

export default QuantityStepper;
