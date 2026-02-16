import { Sparkles, Brain, Zap, TrendingUp } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export const AIRecommendations = () => {
  // Mock AI recommendations (just showing first 3 products)
  const recommendations = products.slice(0, 3);

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="glass-card p-6 md:p-8 mb-10 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  AI-Powered <span className="text-gradient-primary">Recommendations</span>
                </h2>
                <p className="text-muted-foreground max-w-lg">
                  Our intelligent algorithm analyzes your preferences to bring you personalized picks
                </p>
              </div>
            </div>

            {/* AI Features */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Smart Picks</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm">
                <Zap className="w-3.5 h-3.5" />
                <span>Real-time</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Trending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
