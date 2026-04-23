import { getColor } from '../../lib/colorUtils';

const VariantPicker = ({ label, options, selected, onSelect }) => {
  const isColor = label.toLowerCase() === 'color';

  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">
        {label}
        {isColor && selected && (
          <span className="ml-2 font-normal normal-case tracking-normal text-gray-400">{selected}</span>
        )}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) =>
          isColor ? (
            <button
              key={option}
              onClick={() => onSelect(option)}
              title={option}
              style={{ backgroundColor: getColor(option) }}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selected === option
                  ? 'border-gray-950 scale-110 shadow-md ring-2 ring-white ring-offset-1'
                  : 'border-transparent hover:scale-105 hover:border-gray-300'
              }`}
            />
          ) : (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`px-4 py-2 rounded-full border text-xs font-semibold transition-all ${
                selected === option
                  ? 'border-gray-950 bg-gray-950 text-white'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {option}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default VariantPicker;
