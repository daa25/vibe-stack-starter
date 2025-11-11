import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import VibeLink from "./pages/VibeLink";
import ReapSow from "./pages/ReapSow";
import TravelQuest from "./pages/TravelQuest";
import KitCheckout from "./pages/KitCheckout";
import BookConsultation from "./pages/BookConsultation";
import TravelDeals from "./pages/TravelDeals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Index />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/vibelink" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <VibeLink />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/vibelink/checkout" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <KitCheckout />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/reapsow" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ReapSow />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/reapsow/consultation" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <BookConsultation />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/travelquest" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TravelQuest />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/travelquest/subscribe" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TravelDeals />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
