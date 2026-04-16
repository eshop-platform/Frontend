import { useState } from "react";

const categories = [
  { name: "Electronics", image: "https://img.icons8.com/fluency/96/laptop.png" },
  { name: "Clothes", image: "https://img.icons8.com/fluency/96/t-shirt.png" },
  { name: "Shoes", image: "https://img.icons8.com/fluency/96/sneakers.png" },
  { name: "Accessories", image: "https://img.icons8.com/fluency/96/handbag.png" },
];

const CategoryFilter = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer"
        >
          <img src={cat.image} alt={cat.name} className="w-12 h-12" />
          <div>
            <h3 className="font-semibold">{cat.name}</h3>
            <p className="text-sm text-gray-500">240 items available</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;