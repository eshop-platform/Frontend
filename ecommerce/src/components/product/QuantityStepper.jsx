export default function QuantityStepper({ quantity, onIncrease, onDecrease }) {
  return (
    <section className="space-y-2 rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-700">Quantity</p>
      <div className="flex w-fit items-center rounded-lg border border-gray-300">
        <button
          type="button"
          onClick={onDecrease}
          className="px-4 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="min-w-12 px-3 py-2 text-center text-base font-medium">
          {quantity}
        </span>
        <button
          type="button"
          onClick={onIncrease}
          className="px-4 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </section>
  );
}
