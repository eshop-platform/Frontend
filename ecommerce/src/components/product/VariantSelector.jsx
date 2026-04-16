export default function VariantSelector({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
}) {
  return (
    <section className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Size</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onSizeChange(size)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                selectedSize === size
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Color</p>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onColorChange(color)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                selectedColor === color
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
