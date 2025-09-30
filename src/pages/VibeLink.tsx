import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Home, Wrench, QrCode, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

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

  const diyKits = [
    {
      title: "Curb Appeal Starter",
      price: "$299",
      features: ["Landscape Design Guide", "Plant Selection List", "Lighting Setup"],
      qrLink: "https://example.com/curb-appeal",
    },
    {
      title: "Interior Refresh",
      price: "$399",
      features: ["Color Palette Guide", "Furniture Layout Tips", "Decor Checklist"],
      qrLink: "https://example.com/interior-refresh",
    },
    {
      title: "Full Property Makeover",
      price: "$799",
      features: ["Complete Design Plan", "Contractor Contacts", "Budget Template"],
      qrLink: "https://example.com/full-makeover",
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

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Home className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Tampa Bay Property Enhancement</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Transform Your Property
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional enhancement services & DIY kits for every budget
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Quote Form */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Get Your Free Quote</CardTitle>
              <CardDescription>Tell us about your project and we'll provide a custom quote</CardDescription>
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
                  Why Choose VibeLink?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">🏆 Tampa Bay Experts</h3>
                  <p className="text-sm text-muted-foreground">Local contractors who know the area inside and out</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">💰 Competitive Pricing</h3>
                  <p className="text-sm text-muted-foreground">Best value for your investment with transparent quotes</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">⚡ Fast Turnaround</h3>
                  <p className="text-sm text-muted-foreground">24-hour quote response, flexible scheduling</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">✅ Quality Guaranteed</h3>
                  <p className="text-sm text-muted-foreground">100% satisfaction guarantee on all projects</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* DIY Kits Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">DIY Enhancement Kits</h2>
            <p className="text-muted-foreground">Professional guides for hands-on homeowners</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {diyKits.map((kit, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300">
                <CardHeader>
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
                    <Link to={`/vibelink/checkout?kit=${kit.qrLink.split('/').pop()}`}>
                      <QrCode className="h-4 w-4 mr-2" />
                      Purchase Kit
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 VibeLink Property Enhancement. Serving Tampa Bay with pride.</p>
        </div>
      </footer>
    </div>
  );
};

export default VibeLink;
