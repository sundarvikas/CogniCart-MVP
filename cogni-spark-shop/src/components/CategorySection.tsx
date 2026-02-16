import { Smartphone, Shirt, Home, Dumbbell, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const categories = [
  { id: "electronics", name: "Electronics", icon: Smartphone, color: "from-blue-500/20 to-cyan-500/20", borderColor: "border-blue-500/30" },
  { id: "fashion", name: "Fashion", icon: Shirt, color: "from-pink-500/20 to-rose-500/20", borderColor: "border-pink-500/30" },
  { id: "home-kitchen", name: "Home & Kitchen", icon: Home, color: "from-amber-500/20 to-orange-500/20", borderColor: "border-amber-500/30" },
  { id: "sports-fitness", name: "Sports & Fitness", icon: Dumbbell, color: "from-green-500/20 to-emerald-500/20", borderColor: "border-green-500/30" },
  { id: "books", name: "Books", icon: BookOpen, color: "from-purple-500/20 to-violet-500/20", borderColor: "border-purple-500/30" },
];

interface CategoryCardProps {
  category: typeof categories[0];
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  const Icon = category.icon;
  
  return (
    <Link
      to={`/products?category=${category.id}`}
      className={cn(
        "group relative p-6 rounded-2xl border bg-gradient-to-br transition-all duration-300 hover-lift-sm animate-scale-in",
        category.color,
        category.borderColor
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-background/50 backdrop-blur-sm flex items-center justify-center group-hover:scale-125 group-hover:bg-primary/20 transition-transform duration-300">
          <Icon className="w-7 h-7 text-foreground group-hover:text-primary transition-colors duration-300" />
        </div>
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth">{category.name}</h3>
      </div>
    </Link>
  );
};

export const CategorySection = () => {
  return (
    <section className="py-16 md:py-20 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 animate-slide-in-down">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 hover-text-glow transition-smooth">
            Shop by <span className="text-gradient-primary">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Explore our wide range of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
