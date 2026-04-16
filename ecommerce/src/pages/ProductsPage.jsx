import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";
import Pagination from "../components/Pagination";


const products = [
  // ELECTRONICS (8)
  { id: 1, name: "Wireless Earbuds", price: 89, image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=400&q=80", category: "Electronics" },
  { id: 2, name: "Gaming Headset", price: 120, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80", category: "Electronics" },
  { id: 3, name: "Smart Watch", price: 150, image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80", category: "Electronics" },
  { id: 4, name: "Laptop", price: 900, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80", category: "Electronics" },
  { id: 5, name: "Tablet", price: 400, image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=400&q=80", category: "Electronics" },
  { id: 6, name: "Bluetooth Speaker", price: 70, image: "https://images.unsplash.com/photo-1583225152783-8a6b4b7fbb13?auto=format&fit=crop&w=400&q=80", category: "Electronics" },
  { id: 7, name: "Camera", price: 600, image: "https://images.unsplash.com/photo-1519183071298-a2962be96c7b?auto=format&fit=crop&w=400&q=80", category: "Electronics" },
  { id: 8, name: "Keyboard", price: 50, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80", category: "Electronics" },

  // CLOTHES (8)
  { id: 9, name: "T-Shirt", price: 25, image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80", category: "Clothes" },
  { id: 10, name: "Hoodie", price: 60, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80", category: "Clothes" },
  { id: 11, name: "Jeans", price: 80, image: "https://images.unsplash.com/photo-1583005527335-dc51f6d7a6eb?auto=format&fit=crop&w=400&q=80", category: "Clothes" },
  { id: 12, name: "Jacket", price: 120, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80", category: "Clothes" },
  { id: 13, name: "Dress", price: 90, image: "https://images.unsplash.com/photo-1520975922284-9c7c5a4f53f3?auto=format&fit=crop&w=400&q=80", category: "Clothes" },
  { id: 14, name: "Shorts", price: 40, image: "https://images.unsplash.com/photo-1593032465171-8f0b4b7f0e5d?auto=format&fit=crop&w=400&q=80", category: "Clothes" },
  { id: 15, name: "Sweater", price: 70, image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=400&q=80", category: "Clothes" },
  { id: 16, name: "Cap", price: 20, image: "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=400&q=80", category: "Clothes" },

  // SHOES (8)
  { id: 17, name: "Running Shoes", price: 120, image: "https://images.unsplash.com/photo-1528701800489-20be3c7f8a5c?auto=format&fit=crop&w=400&q=80", category: "Shoes" },
  { id: 18, name: "Sneakers", price: 140, image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80", category: "Shoes" },
  { id: 19, name: "Boots", price: 200, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80", category: "Shoes" },
  { id: 20, name: "Sandals", price: 60, image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=400&q=80", category: "Shoes" },
  { id: 21, name: "Heels", price: 150, image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=400&q=80", category: "Shoes" },
  { id: 22, name: "Flip Flops", price: 20, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80", category: "Shoes" },
  { id: 23, name: "Sports Shoes", price: 110, image: "https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?auto=format&fit=crop&w=400&q=80", category: "Shoes" },
  { id: 24, name: "Casual Shoes", price: 95, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&q=80", category: "Shoes" },
  
  // ACCESSORIES (8)
{ id: 25, name: "Backpack", price: 50, image: "https://images.unsplash.com/photo-1506629905607-45d0a88c7c05?auto=format&fit=crop&w=400&q=80", category: "Accessories" },
{ id: 26, name: "Sunglasses", price: 35, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80", category: "Accessories" },
{ id: 27, name: "Wallet", price: 45, image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=400&q=80", category: "Accessories" },
{ id: 28, name: "Belt", price: 30, image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=400&q=80", category: "Accessories" },
{ id: 29, name: "Hat", price: 20, image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=400&q=80", category: "Accessories" },
{ id: 30, name: "Scarf", price: 25, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80", category: "Accessories" },
{ id: 31, name: "Gloves", price: 18, image: "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&w=400&q=80", category: "Accessories" },
{ id: 32, name: "Key Holder", price: 12, image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=400&q=80", category: "Accessories" },

// WATCHES (8)
{ id: 33, name: "Classic Watch", price: 120, image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=400&q=80", category: "Watches" },
{ id: 34, name: "Luxury Watch", price: 450, image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=400&q=80", category: "Watches" },
{ id: 35, name: "Smart Watch", price: 200, image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80", category: "Watches" },
{ id: 36, name: "Sport Watch", price: 150, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80", category: "Watches" },
{ id: 37, name: "Digital Watch", price: 90, image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=400&q=80", category: "Watches" },
{ id: 38, name: "Minimal Watch", price: 110, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=80", category: "Watches" },
{ id: 39, name: "Leather Watch", price: 180, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80", category: "Watches" },
{ id: 40, name: "Metal Watch", price: 220, image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=400&q=80", category: "Watches" },

// BAGS (8)
{ id: 41, name: "Travel Bag", price: 130, image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=400&q=80", category: "Bags" },
{ id: 42, name: "Laptop Bag", price: 90, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80", category: "Bags" },
{ id: 43, name: "Handbag", price: 110, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80", category: "Bags" },
{ id: 44, name: "Gym Bag", price: 70, image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=400&q=80", category: "Bags" },
{ id: 45, name: "School Bag", price: 60, image: "https://images.unsplash.com/photo-1514477917009-389c76a86b68?auto=format&fit=crop&w=400&q=80", category: "Bags" },
{ id: 46, name: "Mini Bag", price: 55, image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=400&q=80", category: "Bags" },
{ id: 47, name: "Leather Bag", price: 200, image: "https://images.unsplash.com/photo-1593032465171-8f0b4b7f0e5d?auto=format&fit=crop&w=400&q=80", category: "Bags" },
{ id: 48, name: "Fashion Bag", price: 150, image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=400&q=80", category: "Bags" },

// BOOKS (3)
{ id: 49, name: "Novel Book", price: 20, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400", category: "Books" },
{ id: 50, name: "Study Book", price: 35, image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400", category: "Books" },
{ id: 51, name: "Notebook", price: 15, image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400", category: "Books" },

// VIDEO GAMES (3)
{ id: 52, name: "Gaming Controller", price: 80, image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f?w=400", category: "Video Games" },
{ id: 53, name: "Gaming Console", price: 400, image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400", category: "Video Games" },
{ id: 54, name: "VR Headset", price: 350, image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400", category: "Video Games" },

// MUSICAL INSTRUMENTS (3)
{ id: 55, name: "Guitar", price: 150, image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400", category: "Musical Instruments" },
{ id: 56, name: "Piano", price: 500, image: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?w=400", category: "Musical Instruments" },
{ id: 57, name: "Drum", price: 200, image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400", category: "Musical Instruments" },

// FURNITURE (3)
{ id: 58, name: "Sofa", price: 600, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400", category: "Furniture" },
{ id: 59, name: "Chair", price: 120, image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400", category: "Furniture" },
{ id: 60, name: "Table", price: 250, image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=400", category: "Furniture" },

// SPORT & OUTDOORS (3)
{ id: 61, name: "Basketball", price: 40, image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400", category: "Sport & Outdoors" },
{ id: 62, name: "Camping Tent", price: 180, image: "https://images.unsplash.com/photo-1504280390368-3971c0cdbfdf?w=400", category: "Sport & Outdoors" },
{ id: 63, name: "Dumbbells", price: 90, image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400", category: "Sport & Outdoors" },

// KITCHEN (3)
{ id: 64, name: "Cooking Pot", price: 50, image: "https://images.unsplash.com/photo-1584990347449-6f2b64d1c7c4?w=400", category: "Kitchen" },
{ id: 65, name: "Blender", price: 70, image: "https://images.unsplash.com/photo-1571601035754-5c927f2d7edc?w=400", category: "Kitchen" },
{ id: 66, name: "Toaster", price: 45, image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400", category: "Kitchen" },
];

// duplicate products
const allProducts = products;
const banners = [
  {
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200",
    title: "Gaming Store",
    subtitle: "Upgrade your gaming gear",
  },
  {
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200",
    title: "Kitchen Essentials",
    subtitle: "Everything under $50",
  },
  {
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200",
    title: "Toys for Kids",
    subtitle: "Fun for everyone",
  },
];

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [wishlist, setWishlist] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  }, 3000); // change every 3 seconds

  return () => clearInterval(interval);
}, []);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const filteredProducts = allProducts
  .filter((product) =>
    selectedCategory === "All"
      ? true
      : product.category === selectedCategory
  )
  .filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortOption === "low-high") return a.price - b.price;
  if (sortOption === "high-low") return b.price - a.price;
  return 0; // default
});

const toggleWishlist = (product) => {
  setWishlist((prev) => {
    const exists = prev.find((item) => item.id === product.id);

    if (exists) {
      // remove
      return prev.filter((item) => item.id !== product.id);
    } else {
      // add
      return [...prev, product];
    }
  });
};

const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);

const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  

  const categories = [
  "All",
  "Electronics",
  "Clothes",
  "Shoes",
  "Accessories",
  "Watches",
  "Bags",
  "Books",
  "Video Games",
  "Musical Instruments",
  "Furniture",
  "Sport & Outdoors",
  "Kitchen",
];

  return (
  <div className="max-w-6xl mx-auto p-6">

    {/* TITLE */}
    <h1 className="text-2xl font-bold mb-6">Products</h1>

    {/* BANNER */}
    <div className="relative rounded-2xl overflow-hidden mb-8">
      <img
  src={banners[currentBanner].image}
  className="w-full h-64 object-cover"
/>

  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8 text-white">
    <h2 className="text-3xl font-bold">
      {banners[currentBanner].title}
    </h2>
    <p className="mb-3">
      {banners[currentBanner].subtitle}
    </p>
    <button className="bg-white text-black px-4 py-2 rounded-full w-fit">
      Shop Now
    </button>
  </div>


      <img
        src="https://images.unsplash.com/photo-1518441902117-59b3b4c5c5c5?auto=format&fit=crop&w=400&q=80"
        className="w-52 hidden md:block rounded-xl"
      />
    </div>

    {/* SEARCH + SORT ROW 🔥 */}
    <div className="flex flex-col md:flex-row gap-4 mb-6">

      {/* SEARCH */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder=" Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 
          shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      {/* SORT */}
      <div className="relative w-full md:w-64">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full px-5 py-3 rounded-full border border-gray-300 shadow-sm"
        >
          <option value="default">Sort by</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
        </select>
      </div>

    </div>

    {/* CATEGORY */}
    <div className="flex gap-3 mb-8 overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-full whitespace-nowrap
            ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>

    {/* PRODUCTS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {currentProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />
      ))}
    </div>

    {/* PAGINATION */}
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
    />

    {/* 🔥 BOTTOM SECTION (NOW INSIDE MAIN DIV) */}
    <div className="mt-16">

      <h2 className="text-2xl font-bold mb-6">
        Explore More
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <div className="bg-gray-100 p-4 rounded-xl text-center hover:shadow-md transition">
          <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200" className="mx-auto mb-2 h-20"/>
          <p>Electronics</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl text-center hover:shadow-md transition">
          <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200" className="mx-auto mb-2 h-20"/>
          <p>Clothes</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl text-center hover:shadow-md transition">
          <img src="https://images.unsplash.com/photo-1528701800489-20be3c7f8a5c?w=200" className="mx-auto mb-2 h-20"/>
          <p>Shoes</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl text-center hover:shadow-md transition">
          <img src="https://images.unsplash.com/photo-1506629905607-45d0a88c7c05?w=200" className="mx-auto mb-2 h-20"/>
          <p>Accessories</p>
        </div>

      </div>

    </div>

  </div>
);
};

export default ProductsPage;