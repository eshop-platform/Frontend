import { useState } from "react";

interface Props {
  images: string[];
}

const ProductImageGallery = ({ images }: Props) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square overflow-hidden rounded-lg bg-secondary">
        <img
          src={images[selected]}
          alt="Product"
          className="w-full h-full object-cover"
          width={800}
          height={800}
        />
      </div>
      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
              selected === i ? "border-foreground" : "border-transparent"
            }`}
          >
            <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
