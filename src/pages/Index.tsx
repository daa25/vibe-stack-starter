import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Calculator, Plane, TrendingUp, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import vibelinkHero from "@/assets/vibelink-hero.jpg";
import reapsowHero from "@/assets/reapsow-hero.jpg";
import travelquestHero from "@/assets/travelquest-hero.jpg";

const Index = () => {
  const entities = [
    {
      icon: Home,
      title: "VibeLink Property Services",
      subtitle: "Primary Entity",
      description: "Lead generation brokerage connecting Tampa Bay homeowners with vetted service professionals",
      subEntity: "NestKit - DIY enhancement kits with QR-coded video instructions",
      link: "/vibelink",
      color: "text-primary",
      image: vibelinkHero,
      stats: { leads: "127", revenue: "$18.4K", conversion: "32%" },
    },
    {
      icon: Calculator,
      title: "ReapSow-Lite",
      subtitle: "E-Commerce Analytics",
      description: "Zero-capital dropshipping with margin simulation and listing optimization tools",
      link: "/reapsow",
      color: "text-accent",
      image: reapsowHero,
      stats: { simulations: "43", stores: "12", avgMargin: "28%" },
    },
    {
      icon: Plane,
      title: "TravelQuest Hub",
      subtitle: "Affiliate Travel",
      description: "Curated sports events and travel deals with commission tracking",
      link: "/travelquest",
      color: "text-secondary-glow",
      image: travelquestHero,
      stats: { clicks: "892", bookings: "34", commission: "$2.1K" },
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Dashboard Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Multi-Entity Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage your three monetization funnels from one unified platform
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$20.5K</div>
            <p className="text-xs text-muted-foreground mt-1">+12.3% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Leads</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">182</div>
            <p className="text-xs text-muted-foreground mt-1">Across all entities</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-secondary-glow" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">31.2%</div>
            <p className="text-xs text-muted-foreground mt-1">+4.1% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Entity Management Cards */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Your Business Entities</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {entities.map((entity, index) => (
            <Card key={index} className="bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300 overflow-hidden group">
              <Link to={entity.link}>
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={entity.image} 
                    alt={entity.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                  <entity.icon className={`absolute top-3 right-3 h-8 w-8 ${entity.color} drop-shadow-lg`} />
                </div>
                <CardHeader>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {entity.subtitle}
                  </div>
                  <CardTitle className="text-xl">{entity.title}</CardTitle>
                  <CardDescription className="text-sm">{entity.description}</CardDescription>
                  {entity.subEntity && (
                    <div className="mt-2 text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                      📦 {entity.subEntity}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {Object.entries(entity.stats).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-lg font-bold">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks across your entities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/vibelink#quote" className="p-4 border border-border rounded-lg hover:bg-accent/10 transition-colors">
              <Home className="h-6 w-6 text-primary mb-2" />
              <div className="font-medium">New Lead</div>
              <div className="text-xs text-muted-foreground">VibeLink</div>
            </Link>
            <Link to="/vibelink/checkout" className="p-4 border border-border rounded-lg hover:bg-accent/10 transition-colors">
              <Home className="h-6 w-6 text-primary mb-2" />
              <div className="font-medium">Sell Kit</div>
              <div className="text-xs text-muted-foreground">NestKit</div>
            </Link>
            <Link to="/reapsow" className="p-4 border border-border rounded-lg hover:bg-accent/10 transition-colors">
              <Calculator className="h-6 w-6 text-accent mb-2" />
              <div className="font-medium">Margin Calc</div>
              <div className="text-xs text-muted-foreground">ReapSow</div>
            </Link>
            <Link to="/travelquest/subscribe" className="p-4 border border-border rounded-lg hover:bg-accent/10 transition-colors">
              <Plane className="h-6 w-6 text-secondary-glow mb-2" />
              <div className="font-medium">New Deal</div>
              <div className="text-xs text-muted-foreground">TravelQuest</div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
