import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";

export const FeaturedProducts = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div className="animate-slide-in-down">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 hover-text-glow">
              Featured <span className="text-gradient-primary">Products</span>
            </h2>
            <p className="text-muted-foreground max-w-md">
              Handpicked selection of our best-selling items
            </p>
          </div>
          <Link to="/products" className="hidden sm:block animate-slide-in-up" style={{ animationDelay: "200ms" }}>
            <Button variant="ghost" className="gap-2 group">
              View All
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-primary" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <Link to="/products" className="sm:hidden block mt-8 animate-slide-in-up" style={{ animationDelay: "300ms" }}>
          <Button className="w-full rounded-full gap-2 hover-lift-sm">
            View All Products
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
};
