import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  onClose?: () => void;
  autoFocus?: boolean;
}

export const SearchBar = ({ className, onClose, autoFocus }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filteredProducts = query.length > 0
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const trendingSearches = ["Headphones", "Smart Watch", "Running Shoes", "Air Fryer"];
  const recentSearches = ["Gaming Mouse", "Fitness Band"];

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setQuery("");
      setIsOpen(false);
      onClose?.();
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setQuery("");
    setIsOpen(false);
    onClose?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => 
        Math.min(prev + 1, filteredProducts.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && filteredProducts[selectedIndex]) {
        handleProductClick(filteredProducts[selectedIndex].id);
      } else {
        handleSearch(query);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      onClose?.();
    }
  };

  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className={cn("relative", className)}>
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search products, categories..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 bg-muted/50 border-border/50 focus:border-primary/50 rounded-full h-10 transition-smooth focus-ring-glow"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-2xl overflow-hidden shadow-2xl border border-border/50 z-50 animate-fade-in">
          {query.length > 0 ? (
            <>
              {filteredProducts.length > 0 ? (
                <div className="p-2">
                  <p className="text-xs text-muted-foreground px-3 py-2">Products</p>
                  {filteredProducts.map((product, index) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left",
                        selectedIndex === index
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      )}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                  ))}
                  <button
                    onClick={() => handleSearch(query)}
                    className="w-full flex items-center gap-2 p-3 text-sm text-primary hover:bg-primary/10 rounded-xl mt-1"
                  >
                    <Search className="w-4 h-4" />
                    Search for "{query}"
                  </button>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground text-sm">No products found for "{query}"</p>
                  <button
                    onClick={() => handleSearch(query)}
                    className="mt-3 text-sm text-primary hover:underline"
                  >
                    Search all products
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="p-3">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground px-3 py-2 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Recent
                  </p>
                  <div className="flex flex-wrap gap-2 px-3">
                    {recentSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => handleSearch(search)}
                        className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <p className="text-xs text-muted-foreground px-3 py-2 flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" /> Trending
                </p>
                <div className="flex flex-wrap gap-2 px-3">
                  {trendingSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => handleSearch(search)}
                      className="px-3 py-1.5 text-sm bg-primary/10 text-primary hover:bg-primary/20 rounded-full transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
