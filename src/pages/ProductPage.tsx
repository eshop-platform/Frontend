import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductInfo from "@/components/ProductInfo";
import VariantSelector from "@/components/VariantSelector";
import QuantityStepper from "@/components/QuantityStepper";
import AddToCartButton from "@/components/AddToCartButton";
import ReviewList from "@/components/ReviewList";
import RelatedProducts from "@/components/RelatedProducts";
import { useCart } from "@/context/CartContext";
import { getProductById, products, reviews } from "@/data/mockData";

const sizes = ["S", "M", "L"];
const colors = ["Red", "Blue", "Black"];

const ProductPage = () => {
  const { id = "main" } = useParams();
  const product = getProductById(id);

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) return <Navigate to="/shop" replace />;

  const others = products.filter((p) => p.id !== product.id);
  const images = [product.image, ...others.slice(0, 3).map((p) => p.image)];

  const handleAdd = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    console.log({ product: product.name, size: selectedSize, color: selectedColor, quantity });
    toast.success("Added to cart", {
      description: `${product.name} • ${selectedSize} / ${selectedColor} × ${quantity}`,
    });
  };

  return (
    <Layout>
      <div className="container-shop py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          <ProductImageGallery images={images} />
          <div className="space-y-8">
            <ProductInfo product={product} />
            <VariantSelector
              sizes={sizes}
              colors={colors}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              onSizeChange={setSelectedSize}
              onColorChange={setSelectedColor}
            />
            <div className="flex items-center gap-6">
              <QuantityStepper quantity={quantity} onChange={setQuantity} />
            </div>
            <AddToCartButton onClick={handleAdd} />
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <ReviewList reviews={reviews} />
        </div>

        <RelatedProducts products={others} />
      </div>
    </Layout>
  );
};

export default ProductPage;
