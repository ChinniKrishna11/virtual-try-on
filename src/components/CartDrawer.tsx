import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-display text-xl">Your Bag</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:opacity-70 transition-opacity">
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
            <p className="font-body text-sm text-muted-foreground">Your bag is empty</p>
            <button onClick={() => setIsCartOpen(false)} className="btn-fashion-outline text-xs">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div key={item.product.id + item.size + item.color} className="flex gap-4 pb-4 border-b border-border">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover"
                  />
                  <div className="flex-1 space-y-1">
                    <p className="font-body text-sm">{item.product.name}</p>
                    <p className="font-body text-xs text-muted-foreground">
                      {item.color} · {item.size}
                    </p>
                    <p className="font-body text-sm">${item.product.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 border border-border hover:bg-muted transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-body w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 border border-border hover:bg-muted transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto text-xs font-body text-muted-foreground underline hover:text-foreground"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-border space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-body text-sm tracking-[0.1em] uppercase">Total</span>
                <span className="font-display text-2xl">${totalPrice}</span>
              </div>
              <button className="btn-fashion w-full">Checkout</button>
              <p className="text-center font-body text-xs text-muted-foreground">
                Free shipping on orders over $500
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
