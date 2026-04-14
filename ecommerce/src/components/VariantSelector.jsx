const VariantSelector = ({ label, options, selectedValue, onSelect }) => {
  return (
    <section>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">{label}</h2>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option === selectedValue;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-gray-300 text-gray-700 hover:border-indigo-300'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default VariantSelector;
