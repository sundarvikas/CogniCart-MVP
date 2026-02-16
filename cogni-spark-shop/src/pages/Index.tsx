import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { AIRecommendations } from "@/components/AIRecommendations";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        <AIRecommendations />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
