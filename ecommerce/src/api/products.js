export const fetchProducts = async () => {
  // Simulate a small delay for realism
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
  { id: 1, name: "Silk Evening Gown", price: 299, category: "cloth", tag: "New Arrival", image: "..." },
  { id: 2, name: "Leather Stiletto", price: 150, category: "shoes", tag: "Best Seller", image: "..." },
  { id: 3, name: "Gold Chain Handbag", price: 450, category: "bags", tag: "New Arrival", image: "..." },
  { id: 4, name: "Midnight Oud Parfum", price: 120, category: "perfumes", tag: "Exclusive", image: "..." },
];
};