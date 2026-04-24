import { useState } from 'react';

const ProductGallery = ({ images }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
              selected === idx ? 'border-blue-600' : 'border-transparent'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      
      {/* Main Image */}
      <div className="flex-1 aspect-square rounded-2xl overflow-hidden bg-gray-50">
        <img 
          src={images[selected]} 
          alt="Active product view" 
          className="w-full h-full object-cover transition-all duration-500 transform hover:scale-105"
        />
      </div>
    </div>
  );
};

export default ProductGallery;