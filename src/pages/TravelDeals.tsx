import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Bell, Mail, Gift, Sparkles } from "lucide-react";

const TravelDeals = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Welcome to TravelQuest! 🎉",
        description: "You'll receive exclusive deals and updates straight to your inbox.",
      });

      setFormData({ email: "", name: "" });
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: "🎯",
      title: "Exclusive Deals",
      description: "Early access to limited-time offers",
    },
    {
      icon: "🏆",
      title: "VIP Events",
      description: "Premium sports packages & experiences",
    },
    {
      icon: "💰",
      title: "Special Discounts",
      description: "Subscriber-only pricing on select trips",
    },
    {
      icon: "📅",
      title: "Event Alerts",
      description: "Be first to know about upcoming games",
    },
  ];

  const upcomingDeals = [
    {
      title: "Super Bowl Package",
      date: "Coming Soon",
      discount: "Save up to $500",
    },
    {
      title: "NBA Finals Experience",
      date: "June 2025",
      discount: "Early bird pricing",
    },
    {
      title: "World Series Travel",
      date: "October 2025",
      discount: "VIP packages available",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/travelquest" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to TravelQuest</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
            <Bell className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-accent">VIP Updates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Never Miss a Deal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our exclusive community and get the best travel deals delivered to your inbox
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card shadow-glow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  Subscribe for Exclusive Access
                </CardTitle>
                <CardDescription>
                  Get insider deals, early booking access, and special discounts
                </CardDescription>
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
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="john@example.com"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Subscribing..." : "Get Exclusive Deals"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By subscribing, you agree to receive promotional emails. Unsubscribe anytime.
                  </p>
                </form>

                <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-start gap-3">
                    <Gift className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-accent mb-1">Welcome Bonus!</p>
                      <p className="text-sm text-muted-foreground">
                        New subscribers get 10% off their first booking
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  What You Get
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-xl">{benefit.icon}</span>
                    <div>
                      <h3 className="font-semibold text-sm">{benefit.title}</h3>
                      <p className="text-xs text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl">Coming Soon</CardTitle>
            <CardDescription>Upcoming deals our subscribers will get first</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {upcomingDeals.map((deal, index) => (
                <div key={index} className="p-4 bg-secondary rounded-lg border border-border">
                  <h3 className="font-semibold mb-2">{deal.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{deal.date}</p>
                  <p className="text-sm text-accent font-medium">{deal.discount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <Link to="/travelquest">
            <Button variant="outline" size="lg">
              Browse Current Deals
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default TravelDeals;
