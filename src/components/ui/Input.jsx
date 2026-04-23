const Input = ({ label, type = "text", placeholder, error, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border bg-white focus:ring-2 outline-none transition-all ${
          error ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;