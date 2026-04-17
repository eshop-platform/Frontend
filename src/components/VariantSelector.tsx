interface Props {
  sizes: string[];
  colors: string[];
  selectedSize: string;
  selectedColor: string;
  onSizeChange: (s: string) => void;
  onColorChange: (c: string) => void;
}

const colorMap: Record<string, string> = {
  Red: "bg-red-500",
  Blue: "bg-blue-500",
  Black: "bg-foreground",
};

const VariantSelector = ({ sizes, colors, selectedSize, selectedColor, onSizeChange, onColorChange }: Props) => (
  <div className="space-y-5">
    <div>
      <p className="text-sm font-medium mb-2">Size</p>
      <div className="flex gap-2">
        {sizes.map((s) => (
          <button
            key={s}
            onClick={() => onSizeChange(s)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
              selectedSize === s
                ? "bg-foreground text-background border-foreground"
                : "border-border hover:border-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
    <div>
      <p className="text-sm font-medium mb-2">Color</p>
      <div className="flex gap-3">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => onColorChange(c)}
            className={`w-8 h-8 rounded-full ${colorMap[c] || "bg-muted"} ring-offset-2 ring-offset-background transition-all ${
              selectedColor === c ? "ring-2 ring-foreground" : ""
            }`}
            title={c}
          />
        ))}
      </div>
    </div>
  </div>
);

export default VariantSelector;
