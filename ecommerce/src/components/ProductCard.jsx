const ProductCard = ({ product, wishlist, toggleWishlist }) => {
  const isLiked = wishlist.some((item) => item.id === product.id);
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      
      {/* IMAGE */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
        />

        {/* HEART ICON */}
       <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 text-xl"
      >
        {isLiked ? "❤️" : "🤍"}
      </button>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h2 className="font-semibold text-lg">{product.name}</h2>

        <p className="text-gray-500 text-sm mb-2">
          A perfect balance of high-quality audio
        </p>

        {/* PRICE */}
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-lg text-gray-900">
            ${product.price}
          </span>

          {/* FAKE RATING */}
          <span className="text-green-500 text-sm">
            ⭐⭐⭐⭐⭐ (121)
          </span>
        </div>

        {/* BUTTON */}
        <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;