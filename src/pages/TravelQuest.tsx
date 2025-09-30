import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, MapPin, Calendar, DollarSign, ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

interface Deal {
  id: string;
  title: string;
  destination: string;
  description: string;
  price: string;
  dates: string;
  category: string;
  image: string;
  features: string[];
}

const TravelQuest = () => {
  const [searchParams] = useSearchParams();
  const affBase = searchParams.get("aff") || "";
  
  const deals: Deal[] = [
    {
      id: "miami-heat",
      title: "Miami Heat VIP Experience",
      destination: "Miami, FL",
      description: "Premium seats + Hotel + City tour",
      price: "$899",
      dates: "Mar 15-17, 2025",
      category: "Sports",
      image: "🏀",
      features: ["Court-side seats", "4-star hotel", "Welcome dinner"],
    },
    {
      id: "tampa-bay-bucs",
      title: "Tampa Bay Buccaneers Package",
      destination: "Tampa, FL",
      description: "Game day + Beach resort stay",
      price: "$749",
      dates: "Oct 8-10, 2025",
      category: "Sports",
      image: "🏈",
      features: ["50-yard line seats", "Beach resort", "Team store credit"],
    },
    {
      id: "orlando-magic",
      title: "Orlando Magic Weekend",
      destination: "Orlando, FL",
      description: "Basketball + Theme parks combo",
      price: "$1,299",
      dates: "Apr 22-25, 2025",
      category: "Sports",
      image: "🎢",
      features: ["Premium seats", "Theme park tickets", "Downtown hotel"],
    },
    {
      id: "caribbean-cruise",
      title: "Caribbean Sports Cruise",
      destination: "Multiple Ports",
      description: "7-day cruise with live sports viewing",
      price: "$1,899",
      dates: "Jun 14-21, 2025",
      category: "Cruise",
      image: "🚢",
      features: ["All-inclusive", "Sports bar access", "Excursions"],
    },
    {
      id: "key-west",
      title: "Key West Sailing Adventure",
      destination: "Key West, FL",
      description: "Sunset sailing + Fishing tournament",
      price: "$599",
      dates: "May 5-8, 2025",
      category: "Adventure",
      image: "⛵",
      features: ["Private yacht", "Fishing gear", "Island hopping"],
    },
    {
      id: "nashville-nights",
      title: "Nashville Sports & Music",
      destination: "Nashville, TN",
      description: "Titans game + Live music scene",
      price: "$849",
      dates: "Sep 12-14, 2025",
      category: "Sports",
      image: "🎸",
      features: ["Stadium seats", "Broadway shows", "BBQ dinner"],
    },
  ];

  const buildAffLink = (dealId: string) => {
    if (!affBase) return "#";
    return `${affBase}${dealId}`;
  };

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
            <Plane className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-accent">Exclusive Travel Deals</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            TravelQuest Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sports events, adventures, and unforgettable experiences
          </p>
          {affBase && (
            <p className="text-sm text-muted-foreground mt-4">
              🎁 Using affiliate link - you're supporting this platform!
            </p>
          )}
        </div>

        {/* Deals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {deals.map((deal) => (
            <Card key={deal.id} className="bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300 flex flex-col">
              <CardHeader>
                <div className="text-5xl mb-3 text-center">{deal.image}</div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{deal.category}</Badge>
                  <span className="text-2xl font-bold text-primary">{deal.price}</span>
                </div>
                <CardTitle className="text-xl">{deal.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {deal.destination}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm mb-4">{deal.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4" />
                    {deal.dates}
                  </div>

                  <ul className="space-y-2 mb-6">
                    {deal.features.map((feature, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant="cta" 
                  className="w-full"
                  asChild
                >
                  <a 
                    href={buildAffLink(deal.id)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Book Now
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-card shadow-glow text-center">
          <CardHeader>
            <CardTitle className="text-3xl">Ready for Your Next Adventure?</CardTitle>
            <CardDescription className="text-lg">
              Join thousands of travelers experiencing unforgettable moments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                View All Deals
              </Button>
              <Button variant="outline" size="lg">
                Subscribe for Updates
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 TravelQuest Hub. Adventure awaits.</p>
        </div>
      </footer>
    </div>
  );
};

export default TravelQuest;
