import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import VariantSelector from "../components/product/VariantSelector";
import QuantityStepper from "../components/product/QuantityStepper";
import ReviewList from "../components/product/ReviewList";
import RelatedProducts from "../components/product/RelatedProducts";
import { getProductById, products } from "../data/mockProducts";

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedImage(product.images[0]);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setQuantity(1);
  }, [product]);

  const relatedProducts = useMemo(
    () => products.filter((item) => item.id !== product.id).slice(0, 4),
    [product.id],
  );

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    alert(
      `Added to cart: ${product.title} | Size: ${selectedSize} | Color: ${selectedColor} | Qty: ${quantity}`,
    );
  };

  const handleSizeChange = (size) => setSelectedSize(size);
  const handleColorChange = (color) => setSelectedColor(color);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductImageGallery
          images={product.images}
          selectedImage={selectedImage}
          onSelect={setSelectedImage}
        />

        <div className="space-y-4">
          <ProductInfo
            title={product.title}
            price={product.price}
            shortDescription={product.shortDescription}
            longDescription={product.longDescription}
          />

          <VariantSelector
            sizes={product.sizes}
            colors={product.colors}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            onSizeChange={handleSizeChange}
            onColorChange={handleColorChange}
          />

          <QuantityStepper
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <ReviewList reviews={product.reviews.slice(0, 5)} />
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}