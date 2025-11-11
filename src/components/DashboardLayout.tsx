import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { signOut, user } = useAuth();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <SidebarTrigger />
            <div className="flex-1 flex items-center justify-between">
              <h1 className="text-lg font-semibold ml-4">VibeStack Dashboard</h1>
              {user && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                  <Button variant="ghost" size="sm" onClick={signOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
