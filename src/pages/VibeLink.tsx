import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Home, Wrench, QrCode, ArrowLeft, Paintbrush, Hammer, Leaf, Lightbulb, Droplets, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/vibelink-professionals.jpg";
import nestkitImage from "@/assets/nestkit-products.jpg";

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
      // This would call your backend API at localhost:5102
      // For now, we'll simulate the submission
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
    {
      icon: Paintbrush,
      title: "Interior & Exterior Painting",
      description: "Professional painters for every project size"
    },
    {
      icon: Hammer,
      title: "General Contracting",
      description: "Renovations, repairs, and remodeling experts"
    },
    {
      icon: Leaf,
      title: "Landscaping & Lawn Care",
      description: "Transform your outdoor spaces"
    },
    {
      icon: Lightbulb,
      title: "Electrical Services",
      description: "Licensed electricians for all your needs"
    },
    {
      icon: Droplets,
      title: "Plumbing Services",
      description: "Fast, reliable plumbing solutions"
    },
    {
      icon: Shield,
      title: "Property Management",
      description: "Complete property care and maintenance"
    }
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
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Hub</span>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section with Image */}
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
              Vibe Link Property Enhancement Services LLC
            </h1>
            <p className="text-xl md:text-2xl text-foreground max-w-3xl mx-auto mb-8">
              Connecting you with vetted professionals for all your home improvement needs
            </p>
            <Button size="lg" variant="cta" asChild className="text-lg px-8">
              <a href="#quote">Get Your Free Quote</a>
            </Button>
          </div>
        </div>

        {/* Services Network Section */}
        <section className="container mx-auto px-4 py-16 bg-background">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Network of Professionals</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We connect you with Tampa Bay's most reliable home service professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <service.icon className="h-10 w-10 text-primary mb-3" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Lead Generation Section */}
        <section id="quote" className="container mx-auto px-4 py-16 bg-muted/30">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Quote Form */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">Get Your Free Quote Today</CardTitle>
                <CardDescription>Connect with our network of vetted professionals - we'll match you with the perfect contractor</CardDescription>
              </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <Label htmlFor="zip">ZIP Code *</Label>
                  <Input
                    id="zip"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    required
                    placeholder="33601"
                  />
                </div>

                <div>
                  <Label htmlFor="project">Project Type *</Label>
                  <Input
                    id="project"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    required
                    placeholder="e.g., Landscaping, Painting, Renovations"
                  />
                </div>

                <div>
                  <Label htmlFor="details">Project Details</Label>
                  <Textarea
                    id="details"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Describe your project goals and any specific requirements..."
                    rows={4}
                  />
                </div>

                <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Get My Free Quote"}
                </Button>
              </form>
            </CardContent>
          </Card>

            {/* Benefits */}
            <div className="space-y-6">
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    Why Choose Vibe Link?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">🏆 Vetted Network of Professionals</h3>
                    <p className="text-sm text-muted-foreground">Only the most reliable, licensed contractors in Tampa Bay</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">💰 Competitive Pricing</h3>
                    <p className="text-sm text-muted-foreground">We negotiate the best rates from our network partners</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">⚡ Fast Matching</h3>
                    <p className="text-sm text-muted-foreground">24-hour response time - we'll connect you with the right pro fast</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">✅ Quality Guaranteed</h3>
                    <p className="text-sm text-muted-foreground">100% satisfaction guarantee backed by our reputation</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">🤝 Single Point of Contact</h3>
                    <p className="text-sm text-muted-foreground">We manage the process so you don't have to</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Nest Kit DIY Section */}
        <section className="container mx-auto px-4 py-16 bg-background">
          <div className="relative rounded-2xl overflow-hidden mb-12">
            <img 
              src={nestkitImage} 
              alt="Nest Kit DIY products"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent flex items-center">
              <div className="px-8 md:px-16 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Nest Kit</h2>
                <p className="text-xl text-muted-foreground mb-6">
                  Premium DIY kits for hands-on homeowners. Everything you need to enhance your property yourself.
                </p>
                <Button size="lg" variant="hero" asChild>
                  <a href="#nestkit-products">Shop Nest Kit</a>
                </Button>
              </div>
            </div>
          </div>

          <div id="nestkit-products" className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-2">DIY Enhancement Kits</h3>
            <p className="text-muted-foreground">Professional-grade guides and materials delivered to your door</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {nestkitProducts.map((kit, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="text-sm font-semibold text-primary mb-2">NEST KIT</div>
                  <CardTitle>{kit.title}</CardTitle>
                  <div className="text-3xl font-bold text-primary">{kit.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {kit.features.map((feature, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="cta" className="w-full" asChild>
                    <Link to={`/vibelink/checkout?kit=${kit.qrLink}`}>
                      <QrCode className="h-4 w-4 mr-2" />
                      Purchase Kit
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-semibold mb-2">Vibe Link Property Enhancement Services LLC</p>
          <p>Serving Tampa Bay with pride | Connecting homeowners with trusted professionals</p>
        </div>
      </footer>
    </div>
  );
};

export default VibeLink;
