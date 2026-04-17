import { Minus, Plus } from "lucide-react";

interface Props {
  quantity: number;
  onChange: (q: number) => void;
}

const QuantityStepper = ({ quantity, onChange }: Props) => (
  <div className="flex items-center border border-border rounded-full w-fit">
    <button
      onClick={() => onChange(Math.max(1, quantity - 1))}
      className="p-2.5 hover:bg-secondary rounded-l-full transition-colors"
    >
      <Minus size={16} />
    </button>
    <span className="w-10 text-center text-sm font-medium">{quantity}</span>
    <button
      onClick={() => onChange(quantity + 1)}
      className="p-2.5 hover:bg-secondary rounded-r-full transition-colors"
    >
      <Plus size={16} />
    </button>
  </div>
);

export default QuantityStepper;
