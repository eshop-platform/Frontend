const SortDropdown = () => {
  return (
    <select className="border p-2 rounded mb-3">
      <option>Sort by</option>
      <option>Price: Low → High</option>
      <option>Price: High → Low</option>
    </select>
  );
};

export default SortDropdown;