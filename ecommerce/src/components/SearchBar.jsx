const SearchBar = () => {
  return (
    <input
      type="text"
      placeholder="Search products..."
      className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default SearchBar;