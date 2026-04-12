import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { X, Minus, Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: Props) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    if (!selectedSize || !selectedColor) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="aspect-[3/4] bg-card">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 flex flex-col justify-center space-y-6">
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                {product.category}
              </p>
              <h2 className="font-display text-3xl font-light">{product.name}</h2>
              <p className="font-display text-2xl mt-2">${product.price}</p>
            </div>

            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            <div>
              <p className="font-body text-xs tracking-[0.15em] uppercase mb-3">Color</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 text-xs tracking-[0.1em] uppercase font-body border transition-colors ${
                      selectedColor === c
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="font-body text-xs tracking-[0.15em] uppercase mb-3">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-12 h-12 flex items-center justify-center text-xs font-body border transition-colors ${
                      selectedSize === s
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="font-body text-xs tracking-[0.15em] uppercase mb-3">Quantity</p>
              <div className="flex items-center border border-border w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-body text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={!selectedSize || !selectedColor}
              className="btn-fashion w-full disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
