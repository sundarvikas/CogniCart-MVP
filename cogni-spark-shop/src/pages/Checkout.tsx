import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { CreditCard, Truck, MapPin, ShoppingBag, ArrowLeft, AlertTriangle } from "lucide-react";

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice > 999 ? 0 : 99;
  const finalTotal = totalPrice + deliveryFee;

  const handlePlaceOrder = () => {
    toast({
      title: "🚧 Feature Under Development",
      description: "Order placement will be available soon. Thank you for your patience!",
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 md:pt-28 pb-16">
          <div className="container mx-auto px-4 text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some products to checkout.</p>
            <Link to="/products">
              <Button className="rounded-full">Shop Now</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          {/* Development Banner */}
          <div className="glass-card p-4 mb-8 border-primary/30 bg-primary/5 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-primary shrink-0" />
            <p className="text-sm text-foreground">
              <span className="font-medium">🚧 Under Development:</span> This checkout is for demo purposes only. Payment processing will be available soon.
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            <span className="text-gradient-primary">Checkout</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Address */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Shipping Address</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="h-12 rounded-xl bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="h-12 rounded-xl bg-muted/50" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main Street" className="h-12 rounded-xl bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Mumbai" className="h-12 rounded-xl bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input id="pincode" placeholder="400001" className="h-12 rounded-xl bg-muted/50" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+91 9876543210" className="h-12 rounded-xl bg-muted/50" />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Payment Method</h2>
                </div>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    <Label
                      htmlFor="card"
                      className="flex items-center gap-4 p-4 rounded-xl border border-border cursor-pointer hover:border-primary/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                    >
                      <RadioGroupItem value="card" id="card" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Credit / Debit Card</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                      </div>
                    </Label>

                    <Label
                      htmlFor="upi"
                      className="flex items-center gap-4 p-4 rounded-xl border border-border cursor-pointer hover:border-primary/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                    >
                      <RadioGroupItem value="upi" id="upi" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">UPI</p>
                        <p className="text-sm text-muted-foreground">GPay, PhonePe, Paytm</p>
                      </div>
                    </Label>

                    <Label
                      htmlFor="cod"
                      className="flex items-center gap-4 p-4 rounded-xl border border-border cursor-pointer hover:border-primary/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                    >
                      <RadioGroupItem value="cod" id="cod" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Cash on Delivery</p>
                        <p className="text-sm text-muted-foreground">Pay when you receive</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-28">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-medium text-foreground">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-border mb-6">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border mb-6">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">
                    {formatPrice(finalTotal)}
                  </span>
                </div>

                <Button
                  className="w-full rounded-xl h-12 gap-2"
                  onClick={handlePlaceOrder}
                >
                  <Truck className="w-5 h-5" />
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
