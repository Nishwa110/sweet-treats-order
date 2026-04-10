import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Loader2, ArrowLeft, Package, Phone, MapPin, Clock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string;
  delivery_address: string;
  notes: string | null;
  items: OrderItem[];
  total_price: number;
  status: string;
  created_at: string;
}

const AdminOrders = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: fnError } = await supabase.functions.invoke("get-orders", {
        body: { password },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      setOrders(data.orders || []);
      setAuthenticated(true);
    } catch (err: any) {
      setError(err.message || "Wrong password");
    } finally {
      setLoading(false);
    }
  };

  const refreshOrders = async () => {
    setLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("get-orders", {
        body: { password },
      });
      if (fnError) throw fnError;
      setOrders(data.orders || []);
    } catch {
      setError("Failed to refresh");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-heading text-2xl text-primary">Admin Access</h1>
            <p className="text-sm text-muted-foreground font-body">Enter your admin password to view orders</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl text-center"
              required
            />
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
            <Button variant="cute" size="lg" type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "🔓 View Orders"}
            </Button>
          </form>
          <Link to="/" className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl text-primary">Orders 📦</h1>
            <p className="text-sm text-muted-foreground font-body">{orders.length} order{orders.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={refreshOrders} disabled={loading} className="rounded-xl">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "🔄 Refresh"}
            </Button>
            <Link to="/">
              <Button variant="outline" size="sm" className="rounded-xl">
                <ArrowLeft className="w-4 h-4 mr-1" /> Store
              </Button>
            </Link>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-body font-semibold">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-card rounded-2xl p-4 sm:p-5 border border-border shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-body font-bold text-foreground text-lg">{order.customer_name}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {order.customer_phone}</span>
                      {order.customer_email && (
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {order.customer_email}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="capitalize rounded-full">{order.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" /> {formatDate(order.created_at)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{order.delivery_address}</span>
                </div>

                {order.notes && (
                  <p className="text-sm text-muted-foreground italic mb-3">📝 {order.notes}</p>
                )}

                <div className="bg-background/50 rounded-xl p-3 space-y-1.5">
                  {(order.items as OrderItem[]).map((item, i) => (
                    <div key={i} className="flex justify-between text-sm font-body">
                      <span className="text-foreground">{item.name} × {item.quantity}</span>
                      <span className="text-muted-foreground font-semibold">Rs. {item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                    <span>Total</span>
                    <span className="text-primary">Rs. {order.total_price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
