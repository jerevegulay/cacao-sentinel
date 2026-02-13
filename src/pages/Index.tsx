import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Camera, Bug, Leaf, ArrowRight } from "lucide-react";
import cacaoHero from "@/assets/cacao-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={cacaoHero}
          alt="Cacao plantation aerial view"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-12 h-12 text-primary-foreground" />
            <h1 className="text-5xl lg:text-6xl font-bold text-primary-foreground tracking-tight">
              CacaoGuard
            </h1>
          </div>
          <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-2xl mb-8">
            AI-powered Black Pod Disease detection using drone imagery. Protecting cacao farms in Initao, Misamis Oriental.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="hero" size="lg" className="text-base px-8" onClick={() => navigate("/login")}>
              Get Started <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-base px-8 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground" onClick={() => navigate("/dashboard")}>
              View Demo Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Camera, title: "UAV Scanning", desc: "High-resolution drone imagery captures every detail of your cacao plantation." },
            { icon: Bug, title: "AI Detection", desc: "Machine learning models identify Black Pod Disease with up to 96% accuracy." },
            { icon: Leaf, title: "Action Plans", desc: "Get real-time alerts and treatment recommendations to protect your harvest." },
          ].map((feature) => (
            <div key={feature.title} className="text-center p-6 rounded-xl bg-card border shadow-card hover:shadow-card-hover transition-all">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
