import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import OrderForm from "./OrderForm";

const CartDrawer = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();
  const [showForm, setShowForm] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="cute" size="lg" className="fixed bottom-6 right-6 z-50 gap-2 px-6 shadow-float">
          <ShoppingCart className="w-5 h-5" />
          Cart {totalItems > 0 && <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">{totalItems}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-heading text-2xl text-foreground">Your Cart 🛒</SheetTitle>
        </SheetHeader>

        {showForm ? (
          <OrderForm onBack={() => setShowForm(false)} />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-4xl mb-3">🧁</p>
                  <p className="font-body font-semibold">Your cart is empty!</p>
                  <p className="text-sm">Add some yummy treats~</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 bg-card rounded-xl p-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-bold text-sm text-foreground truncate">{item.name}</p>
                      <p className="text-sm text-primary font-semibold">Rs. {item.price * item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-bold text-sm text-foreground">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-body font-bold text-foreground">Total</span>
                  <span className="text-xl font-bold text-primary">Rs. {totalPrice}</span>
                </div>
                <Button variant="cute" size="lg" className="w-full text-base" onClick={() => setShowForm(true)}>
                  🎀 Place Order
                </Button>
              </div>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
