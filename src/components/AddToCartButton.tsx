import { ShoppingBag } from "lucide-react";

interface Props {
  onClick: () => void;
}

const AddToCartButton = ({ onClick }: Props) => (
  <button
    onClick={onClick}
    className="w-full btn-primary-shop flex items-center justify-center gap-2 text-base py-4"
  >
    <ShoppingBag size={18} />
    Add to Cart
  </button>
);

export default AddToCartButton;
