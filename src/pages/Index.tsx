import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Calculator, Plane, ArrowRight, Zap, DollarSign, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import vibelinkHero from "@/assets/vibelink-hero.jpg";
import reapsowHero from "@/assets/reapsow-hero.jpg";
import travelquestHero from "@/assets/travelquest-hero.jpg";

const Index = () => {
  const funnels = [
    {
      icon: Home,
      title: "VibeLink",
      subtitle: "Property Enhancement",
      description: "Lead generation for Tampa Bay home services + DIY enhancement kits",
      model: "Lead Broker + Product Sales",
      link: "/vibelink",
      color: "text-primary",
      ports: "Ports: 5101-5102",
      image: vibelinkHero,
    },
    {
      icon: Calculator,
      title: "ReapSow-Lite",
      subtitle: "Zero-Capital E-Commerce",
      description: "Simulate margins, optimize listings, and launch stores without inventory",
      model: "Service Setup + Future Stripe Connect",
      link: "/reapsow",
      color: "text-accent",
      ports: "Port: 5201",
      image: reapsowHero,
    },
    {
      icon: Plane,
      title: "TravelQuest Hub",
      subtitle: "Affiliate Travel Platform",
      description: "Curated sports events and travel deals with affiliate commission tracking",
      model: "Affiliate Click-outs",
      link: "/travelquest",
      color: "text-secondary-glow",
      ports: "Port: 5301",
      image: travelquestHero,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Windows-First",
      description: "PowerShell scripts, local Node/Express, Visual Studio ready",
    },
    {
      icon: DollarSign,
      title: "Cash Now",
      description: "Three proven monetization models ready to deploy",
    },
    {
      icon: Rocket,
      title: "Ship Fast",
      description: "One-command setup, GitHub Pages deployment included",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            VibeStack
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Three monetization funnels in one starter kit. Windows-friendly, locally runnable, deploy-ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="#funnels">
                Explore Funnels
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/yourusername/vibe-stack" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Quick Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-card shadow-card text-center">
              <CardHeader>
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Funnels Section */}
      <section id="funnels" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Three Funnels, Infinite Potential</h2>
          <p className="text-xl text-muted-foreground">Choose your monetization path or run them all</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {funnels.map((funnel, index) => (
            <Card key={index} className="bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={funnel.image} 
                  alt={`${funnel.title} - ${funnel.subtitle}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <funnel.icon className={`absolute top-4 right-4 h-10 w-10 ${funnel.color} drop-shadow-lg`} />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{funnel.title}</CardTitle>
                <CardDescription className="text-base font-medium">{funnel.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{funnel.description}</p>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-semibold">Model:</span>
                    <span className="text-muted-foreground ml-2">{funnel.model}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {funnel.ports}
                  </div>
                </div>

                <Button variant="cta" className="w-full" asChild>
                  <Link to={funnel.link}>
                    Launch {funnel.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Setup Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-card shadow-glow">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">Ready to Launch?</CardTitle>
            <CardDescription className="text-lg">Get up and running in minutes with our automated setup</CardDescription>
          </CardHeader>
          <CardContent className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="bg-secondary rounded-lg p-4 font-mono text-sm">
                <div className="text-muted-foreground mb-2"># Clone the repository</div>
                <div className="text-foreground">git clone https://github.com/yourusername/vibe-stack.git</div>
              </div>

              <div className="bg-secondary rounded-lg p-4 font-mono text-sm">
                <div className="text-muted-foreground mb-2"># Run all funnels</div>
                <div className="text-foreground">./start_all.ps1</div>
              </div>

              <div className="bg-secondary rounded-lg p-4 font-mono text-sm">
                <div className="text-muted-foreground mb-2"># Deploy to GitHub Pages</div>
                <div className="text-foreground">./deploy_github_pages.ps1 -Owner "yourname" -Repo "vibe-stack"</div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button variant="hero" size="lg">
                View Full Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              VibeStack
            </h3>
            <p className="text-muted-foreground mb-6">
              Ship plug-and-play funnels. Prioritize cash now, polish later.
            </p>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
            <p className="text-sm text-muted-foreground mt-8">
              © 2025 VibeStack. Built for builders.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
