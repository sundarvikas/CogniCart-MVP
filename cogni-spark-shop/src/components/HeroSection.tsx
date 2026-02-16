import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-gradient-shift" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-slide-in-down hover-scale-105">
            <Sparkles className="w-4 h-4 text-primary animate-icon-spin" />
            <span className="text-sm font-medium text-primary">Powered by AI</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-in-up" style={{ animationDelay: '100ms' }}>
            <span className="text-foreground hover-text-glow transition-smooth">Smart Commerce</span>
            <br />
            <span className="text-gradient-primary animate-gradient-shift">Powered by AI</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-in-up transition-smooth" style={{ animationDelay: '200ms' }}>
            Discover millions of products with personalized recommendations. Experience the future of shopping with Cognicart's intelligent marketplace.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
            <Link to="/products">
              <Button size="lg" className="rounded-full px-8 gap-2 animate-button-glow hover-lift-sm">
                Start Shopping
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="rounded-full px-8 hover-lift-sm">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/30 animate-slide-in-up" style={{ animationDelay: '400ms' }}>
            {[
              { value: "10M+", label: "Products" },
              { value: "5M+", label: "Happy Customers" },
              { value: "99.9%", label: "Satisfaction" }
            ].map((stat, idx) => (
              <div key={idx} className="group hover-lift-sm cursor-default">
                <div className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-smooth">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-smooth">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-light">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50 animate-slide-in-down" style={{ animationIterationCount: 'infinite' }} />
        </div>
      </div>
    </section>
  );
};
