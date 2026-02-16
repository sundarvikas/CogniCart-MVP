import { Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

function SellerNavbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-0 border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-gradient-primary">
              CogniCart Seller
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`transition-all duration-300 ${
                isActive('/')
                  ? 'text-primary font-semibold'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/addProduct"
              className={`transition-all duration-300 ${
                isActive('/addProduct')
                  ? 'text-primary font-semibold'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              Add Product
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default SellerNavbar;
