import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, X, Star, SlidersHorizontal, Search, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Update max price range based on products
  useEffect(() => {
    const calculatedMaxPrice = Math.max(...products.map(p => p.price));
    setMaxPrice(calculatedMaxPrice);
    setPriceRange([0, calculatedMaxPrice]);
  }, []);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProducts = products.filter((product) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }
    
    // Category filter - support multiple categories
    if (selectedCategories.length > 0) {
      const productCategory = product.category.toLowerCase().replace(/\s+/g, "-");
      if (!selectedCategories.includes(productCategory)) {
        return false;
      }
    }
    
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Rating filter - show products with rating >= minRating
    if (minRating > 0 && product.rating < minRating) {
      return false;
    }
    
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, maxPrice]);
    setMinRating(0);
    setSearchParams({});
  };

  const clearSearch = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {searchQuery ? (
                  <>
                    Results for "<span className="text-gradient-primary">{searchQuery}</span>"
                  </>
                ) : (
                  <>
                    All <span className="text-gradient-primary">Products</span>
                  </>
                )}
              </h1>
              <p className="text-muted-foreground">
                {sortedProducts.length} products found
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Clear Search */}
              {searchQuery && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSearch}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear search
                </Button>
              )}

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                className="md:hidden flex-1 gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48 rounded-xl">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside
              className={cn(
                "w-full md:w-64 shrink-0 transition-all duration-300 animate-slide-in-down",
                showFilters ? "block" : "hidden md:block"
              )}
            >
              <div className="glass-card p-6 sticky top-28">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                  </Button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const isSelected = selectedCategories.includes(category.id);
                      return (
                        <div key={category.id} className="flex items-center gap-2">
                          <Checkbox
                            id={category.id}
                            checked={isSelected}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategories([...selectedCategories, category.id]);
                              } else {
                                setSelectedCategories(
                                  selectedCategories.filter(id => id !== category.id)
                                );
                              }
                            }}
                          />
                          <Label
                            htmlFor={category.id}
                            className="text-sm text-muted-foreground cursor-pointer flex-1 hover:text-foreground transition-colors"
                          >
                            {category.name}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">Price Range</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={maxPrice}
                    step={100}
                    className="mb-3"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                    <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Minimum Rating</h4>
                  <div className="flex flex-col gap-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <Button
                        key={rating}
                        variant={minRating === rating ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMinRating(rating)}
                        className={cn(
                          "w-full gap-2 transition-all",
                          minRating === rating && "ring-2 ring-offset-2 ring-primary"
                        )}
                      >
                        {rating > 0 && <Star className="w-3 h-3 fill-current" />}
                        <span>{rating === 0 ? "All Ratings" : `${rating}+ Stars`}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Close button for mobile */}
                <Button
                  className="w-full mt-6 md:hidden rounded-xl"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    {searchQuery ? (
                      <Search className="w-10 h-10 text-muted-foreground" />
                    ) : (
                      <X className="w-10 h-10 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {searchQuery ? `No results for "${searchQuery}"` : "No products found"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery 
                      ? "Try different keywords or browse all products."
                      : "Try adjusting your filters to find what you're looking for."
                    }
                  </p>
                  <Button onClick={clearFilters}>
                    {searchQuery ? "View All Products" : "Clear Filters"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={cn(
            "fixed bottom-8 right-8 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 active:scale-95",
            "animate-in fade-in slide-in-from-bottom-4"
          )}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Products;
