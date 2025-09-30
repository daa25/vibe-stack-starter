import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calculator, TrendingUp, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const ReapSow = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    orderAmount: "",
    supplierCost: "",
    email: "",
  });
  const [simulation, setSimulation] = useState<{
    margin: number;
    holdDays: number;
    profit: number;
  } | null>(null);

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderAmount = parseFloat(formData.orderAmount);
    const supplierCost = parseFloat(formData.supplierCost);

    if (isNaN(orderAmount) || isNaN(supplierCost) || orderAmount <= 0 || supplierCost <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid positive numbers.",
        variant: "destructive",
      });
      return;
    }

    if (supplierCost >= orderAmount) {
      toast({
        title: "Invalid Input",
        description: "Supplier cost must be less than order amount.",
        variant: "destructive",
      });
      return;
    }

    // Simulate the calculation
    const profit = orderAmount - supplierCost;
    const margin = (profit / orderAmount) * 100;
    const holdDays = Math.ceil(supplierCost / 100); // Simple formula: higher cost = longer hold

    setSimulation({
      margin: Math.round(margin * 100) / 100,
      profit: Math.round(profit * 100) / 100,
      holdDays,
    });

    toast({
      title: "Simulation Complete! 📊",
      description: "Check your results below.",
    });
  };

  const features = [
    {
      icon: "🚀",
      title: "Zero Capital Required",
      description: "Start selling without inventory investment",
    },
    {
      icon: "⚡",
      title: "Instant Setup",
      description: "Launch your store in hours, not weeks",
    },
    {
      icon: "💰",
      title: "Transparent Margins",
      description: "Know your profit before you list",
    },
    {
      icon: "🔄",
      title: "Automated Workflow",
      description: "Seamless order-to-fulfillment pipeline",
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
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
            <Calculator className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-accent">Zero-Capital E-Commerce</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            ReapSow-Lite
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build your online store without upfront inventory costs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Simulation Form */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Margin Simulator</CardTitle>
              <CardDescription>Calculate your potential profit on any product</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSimulate} className="space-y-4">
                <div>
                  <Label htmlFor="orderAmount">Order Amount ($) *</Label>
                  <Input
                    id="orderAmount"
                    type="number"
                    step="0.01"
                    value={formData.orderAmount}
                    onChange={(e) => setFormData({ ...formData, orderAmount: e.target.value })}
                    required
                    placeholder="299.99"
                  />
                </div>

                <div>
                  <Label htmlFor="supplierCost">Supplier Cost ($) *</Label>
                  <Input
                    id="supplierCost"
                    type="number"
                    step="0.01"
                    value={formData.supplierCost}
                    onChange={(e) => setFormData({ ...formData, supplierCost: e.target.value })}
                    required
                    placeholder="199.99"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>

                <Button type="submit" variant="hero" className="w-full">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Margins
                </Button>
              </form>

              {simulation && (
                <div className="mt-6 p-4 bg-secondary rounded-lg border border-border">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Your Results
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Profit Margin:</span>
                      <span className="text-2xl font-bold text-accent">{simulation.margin}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Profit Amount:</span>
                      <span className="text-2xl font-bold text-primary">${simulation.profit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Hold Days:</span>
                      <span className="text-xl font-semibold">{simulation.holdDays} days</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features */}
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. List Products</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose products from suppliers and list them in your store at your price
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">2. Customer Orders</h3>
                  <p className="text-sm text-muted-foreground">
                    When someone buys, you collect payment upfront
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">3. Order & Hold</h3>
                  <p className="text-sm text-muted-foreground">
                    Pay supplier cost, hold during brief fulfillment period
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">4. Keep the Profit</h3>
                  <p className="text-sm text-muted-foreground">
                    Margin goes straight to your bank account
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Need Help Getting Started?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  We offer a complete "No-Capital Store Starter" service to set up your entire operation.
                </p>
                <Button variant="cta" className="w-full">
                  Book Setup Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-card shadow-card text-center hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="text-4xl mb-2">{feature.icon}</div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 ReapSow-Lite. Start selling with zero capital.</p>
        </div>
      </footer>
    </div>
  );
};

export default ReapSow;
