import HeroBanner from "@/components/HeroBanner";
import HeroBanner from "@/components/HeroBanner";
import MenuCard from "@/components/MenuCard";
import CartDrawer from "@/components/CartDrawer";
import { menuItems } from "@/data/menuItems";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroBanner />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="font-heading text-3xl text-center text-primary mb-8">Our Menu 🍰</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </main>

      <footer className="text-center py-8 text-muted-foreground text-sm font-body space-y-2">
        <p>Made with 💕 — Sweet Treats Home Bakery</p>
        <Link to="/admin/orders" className="inline-flex items-center gap-1 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
          <Lock className="w-3 h-3" /> Admin
        </Link>
      </footer>

      <CartDrawer />
    </div>
  );
};

export default Index;
