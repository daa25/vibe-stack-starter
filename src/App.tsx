import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import Index from "./pages/Index";
import VibeLink from "./pages/VibeLink";
import ReapSow from "./pages/ReapSow";
import TravelQuest from "./pages/TravelQuest";
import KitCheckout from "./pages/KitCheckout";
import BookConsultation from "./pages/BookConsultation";
import TravelDeals from "./pages/TravelDeals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vibelink" element={<VibeLink />} />
            <Route path="/vibelink/checkout" element={<KitCheckout />} />
            <Route path="/reapsow" element={<ReapSow />} />
            <Route path="/reapsow/consultation" element={<BookConsultation />} />
            <Route path="/travelquest" element={<TravelQuest />} />
            <Route path="/travelquest/subscribe" element={<TravelDeals />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
