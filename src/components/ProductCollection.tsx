import { useState } from "react";
import { products, categories, Product } from "@/data/products";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

export default function ProductCollection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="collection" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading">The Collection</h2>
          <p className="font-body text-sm text-muted-foreground mt-3 tracking-wide">
            Curated essentials for the modern wardrobe
          </p>
        </div>

        {/* Category filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs tracking-[0.15em] uppercase font-body transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setSelectedProduct}
              index={i}
            />
          ))}
        </div>
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
