import { useState } from 'react';

const ProductImageGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <section>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <img
          src={selectedImage}
          alt={`${productName} view`}
          className="h-80 w-full object-cover"
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((image, index) => {
          const isActive = image === selectedImage;

          return (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`overflow-hidden rounded-lg border transition ${
                isActive ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img src={image} alt={`${productName} thumbnail ${index + 1}`} className="h-20 w-full object-cover" />
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ProductImageGallery;
