import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        <button onClick={() => scrollTo("hero")} className="font-display text-2xl tracking-[0.15em]">
          ATELIER
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {["collection", "try-on", "about"].map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {s === "try-on" ? "Virtual Try-On" : s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:opacity-70 transition-opacity"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-accent text-accent-foreground text-[10px] font-body rounded-full">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in-fast">
          <div className="flex flex-col items-center py-6 gap-4">
            {["collection", "try-on", "about"].map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {s === "try-on" ? "Virtual Try-On" : s}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
