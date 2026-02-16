import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sparkles, Users, Globe, Zap, Target, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">About Cognicart</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Revolutionizing <span className="text-gradient-primary">E-Commerce</span> with AI
            </h1>
            <p className="text-lg text-muted-foreground">
              We're building the future of online shopping with intelligent recommendations, seamless experiences, and technology that understands you.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: "10M+", label: "Products", icon: Globe },
              { value: "5M+", label: "Customers", icon: Users },
              { value: "99.9%", label: "Uptime", icon: Zap },
              { value: "4.8★", label: "Rating", icon: Award },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="glass-card p-8 md:p-12 text-center max-w-4xl mx-auto">
            <Target className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground text-lg">
              To make smart shopping accessible to everyone through AI-powered personalization, delivering the right products to the right people at the right time.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
