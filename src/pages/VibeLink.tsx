import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Home, Wrench, QrCode, Paintbrush, Hammer, Leaf, Lightbulb, Droplets, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { AIChat } from "@/components/AIChat";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import heroImage from "@/assets/vibelink-professionals.jpg";
import nestkitImage from "@/assets/nestkit-products-expanded.jpg";
import servicesShowcase from "@/assets/vibelink-services-showcase.jpg";
import propertyBefore from "@/assets/property-before.jpg";
import propertyAfter from "@/assets/property-after.jpg";

const VibeLink = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    zip: "",
    project: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Quote Request Submitted! 🎉",
        description: "We'll contact you within 24 hours with your custom quote.",
      });

      setFormData({
        name: "",
        phone: "",
        zip: "",
        project: "",
        details: "",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { icon: Paintbrush, title: "Interior & Exterior Painting", description: "Professional painters for every project size" },
    { icon: Hammer, title: "General Contracting", description: "Renovations, repairs, and remodeling experts" },
    { icon: Leaf, title: "Landscaping & Lawn Care", description: "Transform your outdoor spaces" },
    { icon: Lightbulb, title: "Electrical Services", description: "Licensed electricians for all your needs" },
    { icon: Droplets, title: "Plumbing Services", description: "Fast, reliable plumbing solutions" },
    { icon: Shield, title: "Property Management", description: "Complete property care and maintenance" }
  ];

  const nestkitProducts = [
    {
      title: "Curb Appeal Starter Kit",
      price: "$299",
      features: ["Landscape Design Guide", "Plant Selection List", "Lighting Setup Instructions", "Video Tutorials"],
      qrLink: "curb-appeal",
    },
    {
      title: "Interior Refresh Kit",
      price: "$399",
      features: ["Color Palette Guide", "Furniture Layout Plans", "Decor Shopping List", "Step-by-Step Videos"],
      qrLink: "interior-refresh",
    },
    {
      title: "Full Property Makeover Kit",
      price: "$799",
      features: ["Complete Design Plan", "Budget Templates", "Contractor Checklist", "Premium Support"],
      qrLink: "full-makeover",
    },
    {
      title: "Smart Home Upgrade Kit",
      price: "$599",
      features: ["IoT Device Guide", "Installation Videos", "Automation Setup", "Security System Plan"],
      qrLink: "smart-home",
    },
    {
      title: "Outdoor Living Kit",
      price: "$499",
      features: ["Patio Design Plans", "Outdoor Kitchen Guide", "Fire Pit Instructions", "Lighting Designs"],
      qrLink: "outdoor-living",
    },
    {
      title: "Energy Efficiency Kit",
      price: "$449",
      features: ["Insulation Guide", "Window Treatment Plans", "HVAC Optimization", "Solar Panel Basics"],
      qrLink: "energy-efficiency",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <div className="relative h-[600px] bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
          <img 
            src={heroImage} 
            alt="Professional home improvement contractors"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
          
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Home className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Tampa Bay's Trusted Service Network</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Vibe Link Property Enhancement
            </h1>
            <p className="text-xl md:text-2xl text-foreground max-w-3xl mx-auto mb-8">
              AI-powered contractor matching for all your home improvement needs
            </p>
            <Button size="lg" variant="cta" asChild className="text-lg px-8">
              <a href="#ai-estimator">Try AI Project Estimator</a>
            </Button>
          </div>
        </div>

        {/* Before/After Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See The Transformation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from our network of trusted professionals
            </p>
          </div>
          <BeforeAfterSlider 
            beforeImage={propertyBefore}
            afterImage={propertyAfter}
            beforeAlt="Property before renovation"
            afterAlt="Property after renovation"
          />
        </section>

        {/* AI Estimator Section */}
        <section id="ai-estimator" className="container mx-auto px-4 py-16 bg-muted/30">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Technology</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Estimator & Contractor Matching</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get instant estimates and matched with the perfect contractor using AI
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <AIChat
              businessEntity="vibelink"
              conversationType="estimator"
              systemPrompt="You are a home improvement expert AI assistant for Vibe Link. Help users estimate project costs, suggest contractors, and provide renovation advice. Ask about project scope, budget, timeline. Provide realistic cost estimates for Tampa Bay market."
              placeholder="Describe your project... (e.g., 'I need to repaint my 2000 sq ft home')"
            />
          </div>
        </section>

        {/* Services Network */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Network of Professionals</h2>
            <p className="text-lg text-muted-foreground">Tampa Bay's most reliable home service professionals</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden mb-12">
            <img src={servicesShowcase} alt="Services" className="w-full h-[500px] object-cover" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <service.icon className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quote Form */}
        <section id="quote" className="container mx-auto px-4 py-16 bg-muted/30">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Get Your Free Quote</CardTitle>
                <CardDescription>Connect with vetted professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code *</Label>
                    <Input id="zip" value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor="project">Project Type *</Label>
                    <Input id="project" value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor="details">Details</Label>
                    <Textarea id="details" value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} rows={4} />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Get Free Quote"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Why Choose Us?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">🤖 AI-Powered Matching</h3>
                  <p className="text-sm text-muted-foreground">Smart contractor matching</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">🏆 Vetted Network</h3>
                  <p className="text-sm text-muted-foreground">Licensed contractors only</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">💰 Best Rates</h3>
                  <p className="text-sm text-muted-foreground">Competitive pricing</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">⚡ Fast Service</h3>
                  <p className="text-sm text-muted-foreground">24-hour response</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* NestKit */}
        <section className="container mx-auto px-4 py-16">
          <div className="relative rounded-2xl overflow-hidden mb-12">
            <img src={nestkitImage} alt="NestKit" className="w-full h-[400px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-transparent flex items-center">
              <div className="px-8 max-w-2xl">
                <h2 className="text-4xl font-bold mb-4">Nest Kit</h2>
                <p className="text-xl text-muted-foreground mb-6">
                  DIY kits with AI guidance - like IKEA on crack! QR-coded video instructions included.
                </p>
                <Button size="lg" asChild>
                  <a href="#kits">Shop Kits</a>
                </Button>
              </div>
            </div>
          </div>

          <div id="kits" className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-2">DIY Enhancement Kits</h3>
            <p className="text-muted-foreground">Professional guides with video tutorials</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {nestkitProducts.map((kit, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="text-sm font-semibold text-primary">NEST KIT</div>
                  <CardTitle>{kit.title}</CardTitle>
                  <div className="text-3xl font-bold text-primary">{kit.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {kit.features.map((f, i) => (
                      <li key={i} className="text-sm flex items-center gap-2">
                        <span>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" asChild>
                    <Link to={`/vibelink/checkout?kit=${kit.qrLink}`}>
                      <QrCode className="h-4 w-4 mr-2" />
                      Purchase
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-semibold">Vibe Link Property Enhancement Services LLC</p>
          <p>AI-Powered Property Enhancement | Tampa Bay</p>
        </div>
      </footer>
    </div>
  );
};

export default VibeLink;
