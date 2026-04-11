import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SELLER_WHATSAPP = "923150204505";
import { supabase } from "@/integrations/supabase/client";

interface OrderFormProps {
  onBack: () => void;
}

const OrderForm = ({ onBack }: OrderFormProps) => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("orders").insert({
        customer_name: form.name,
        customer_email: form.email || null,
        customer_phone: form.phone,
        delivery_address: form.address,
        notes: form.notes || null,
        items: items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
        total_price: totalPrice,
      });

      if (error) throw error;

      // Build WhatsApp message
      const orderDetails = items
        .map((i) => `${i.name} x${i.quantity} — Rs. ${i.price * i.quantity}`)
        .join("\n");
      const whatsappMsg = `🎀 New Order!\n\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}${form.notes ? `\nNotes: ${form.notes}` : ""}\n\nItems:\n${orderDetails}\n\nTotal: Rs. ${totalPrice}`;
      const whatsappUrl = `https://wa.me/${SELLER_WHATSAPP}?text=${encodeURIComponent(whatsappMsg)}`;

      setWhatsappLink(whatsappUrl);
      setSubmitted(true);
      clearCart();
    } catch (err) {
      console.error("Order error:", err);
      toast({ title: "Failed to place order. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center py-12 space-y-4">
        <p className="text-5xl">🎉</p>
        <h3 className="font-heading text-2xl text-primary">Order Placed!</h3>
        <p className="text-muted-foreground font-body">
          Your order has been received successfully. We'll get back to you soon!
        </p>
        <p className="text-sm text-muted-foreground">Thank you for your order 💕</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to cart
      </button>
      <h3 className="font-heading text-xl text-primary mb-4">Your Details 💌</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-body font-semibold text-foreground">Name *</label>
          <Input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="mt-1 rounded-xl" required />
        </div>
        <div>
          <label className="text-sm font-body font-semibold text-foreground">Email</label>
          <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your email address (optional)" className="mt-1 rounded-xl" />
        </div>
        <div>
          <label className="text-sm font-body font-semibold text-foreground">Phone *</label>
          <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Your phone number" className="mt-1 rounded-xl" required />
        </div>
        <div>
          <label className="text-sm font-body font-semibold text-foreground">Delivery Address *</label>
          <Textarea name="address" value={form.address} onChange={handleChange} placeholder="Full delivery address" className="mt-1 rounded-xl" required />
        </div>
        <div>
          <label className="text-sm font-body font-semibold text-foreground">Special Notes</label>
          <Textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any allergies or special requests?" className="mt-1 rounded-xl" />
        </div>
        <Button variant="cute" size="lg" type="submit" className="w-full text-base" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "🎀 Place Order"}
        </Button>
      </form>
    </div>
  );
};

export default OrderForm;
