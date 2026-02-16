import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Package, Heart, Settings, LogOut, AlertTriangle } from "lucide-react";

const Profile = () => {
  const handleSave = () => {
    toast({
      title: "🚧 Feature Under Development",
      description: "Profile updates will be available soon.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Development Banner */}
          <div className="glass-card p-4 mb-8 border-primary/30 bg-primary/5 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-primary shrink-0" />
            <p className="text-sm text-foreground">
              <span className="font-medium">🚧 Under Development:</span> Please log in to view your actual profile. This is a demo page.
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            My <span className="text-gradient-primary">Profile</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6">
                {/* Avatar */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <User className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <h2 className="font-bold text-foreground">Guest User</h2>
                  <p className="text-sm text-muted-foreground">guest@cognicart.com</p>
                </div>

                {/* Quick Links */}
                <nav className="space-y-2">
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 p-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <Package className="w-5 h-5" />
                    My Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center gap-3 p-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    Wishlist
                  </Link>
                  <button className="flex items-center gap-3 p-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full">
                    <Settings className="w-5 h-5" />
                    Settings
                  </button>
                  <Link
                    to="/login"
                    className="flex items-center gap-3 p-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </Link>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Personal Information */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="firstName" placeholder="John" className="pl-11 h-12 rounded-xl bg-muted/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="h-12 rounded-xl bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="john@example.com" className="pl-11 h-12 rounded-xl bg-muted/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="phone" type="tel" placeholder="+91 9876543210" className="pl-11 h-12 rounded-xl bg-muted/50" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">Saved Address</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="address" placeholder="123 Main Street" className="pl-11 h-12 rounded-xl bg-muted/50" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Mumbai" className="h-12 rounded-xl bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="Maharashtra" className="h-12 rounded-xl bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">PIN Code</Label>
                      <Input id="pincode" placeholder="400001" className="h-12 rounded-xl bg-muted/50" />
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} className="rounded-xl">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
