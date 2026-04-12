import { Product } from "@/data/products";
import { Eye, ShoppingBag } from "lucide-react";

type Props = {
  product: Product;
  onQuickView: (product: Product) => void;
  index: number;
};

export default function ProductCard({ product, onQuickView, index }: Props) {
  return (
    <div
      className="group product-card-hover animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
    >
      <div className="relative overflow-hidden bg-card aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {product.tryOnAvailable && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground text-[10px] font-body tracking-[0.15em] uppercase">
            Try On
          </span>
        )}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-background/95 text-foreground text-xs tracking-[0.15em] uppercase font-body hover:bg-background transition-colors"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </button>
        </div>
      </div>
      <div className="pt-4 space-y-1">
        <h3 className="font-body text-sm tracking-wide">{product.name}</h3>
        <p className="font-body text-sm text-muted-foreground">${product.price}</p>
      </div>
    </div>
  );
}
