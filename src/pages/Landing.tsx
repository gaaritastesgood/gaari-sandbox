import { useNavigate } from "react-router-dom";
import { Building2, Home } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-header-bg border-b border-border/50 shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-xl font-semibold text-header-foreground tracking-tight">
            Gaari Customer Intelligence
          </h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-3xl w-full space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Welcome</h2>
            <p className="text-muted-foreground">Select your workspace to get started</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              className="cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
              onClick={() => navigate("/large-accounts")}
            >
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Large Account Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Dashboard with portfolio KPIs, alerts, opportunities, and program management for key accounts
                </CardDescription>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
              onClick={() => navigate("/residential")}
            >
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Residential</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Search and manage individual residential customer accounts
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
