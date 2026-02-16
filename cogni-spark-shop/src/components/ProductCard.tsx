import { Link } from "react-router-dom";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Product, formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart";
import { useWishlistStore } from "@/lib/wishlist";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeItem(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addItem(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const handleProductClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link
      to={`/product/${product.id}`}
      onClick={handleProductClick}
      className={cn(
        "group glass-card overflow-hidden block hover-lift",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-3"
        />
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground animate-pulse-gentle shadow-lg">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 hover-scale-110",
            isWishlisted
              ? "bg-accent text-accent-foreground shadow-md animate-heartbeat"
              : "bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-accent hover:bg-background/95"
          )}
        >
          <Heart className={cn("w-4 h-4 transition-transform", isWishlisted && "fill-current")} />
        </button>

        {/* Quick Add */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/80 to-transparent">
          <Button
            onClick={handleAddToCart}
            className="w-full rounded-full gap-2 active-press animate-slide-in-up"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 animate-fade-in">
        {/* Category */}
        <p className="text-xs text-primary font-medium mb-1 group-hover:font-semibold transition-all duration-300 group-hover:text-base">{product.category}</p>
        
        {/* Name */}
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3 transition-smooth">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3.5 h-3.5 transition-all duration-300",
                  i < Math.floor(product.rating)
                    ? "text-primary fill-primary group-hover:scale-110"
                    : "text-muted-foreground"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground group-hover:text-primary transition-smooth">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground group-hover:text-primary transition-smooth">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-xs font-semibold text-green-500 animate-pulse-gentle">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% off
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
