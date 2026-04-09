import type { MenuItem } from "@/data/menuItems";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-float transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={512}
          height={512}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {item.category}
        </span>
        <h3 className="font-body font-bold text-lg text-foreground leading-tight">{item.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-primary">Rs. {item.price}</span>
          <Button variant="cute" size="sm" onClick={() => addToCart(item)} className="gap-1">
            <Plus className="w-4 h-4" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
