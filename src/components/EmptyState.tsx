import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Users, TrendingUp, Clock } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Search className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Search for a Customer</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Use the search bar above to find and view customer details, bills, interactions, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Customer 360</CardTitle>
                <CardDescription className="text-xs">Complete customer view</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Access comprehensive customer information including accounts, bills, payments, and service history.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Usage Analytics</CardTitle>
                <CardDescription className="text-xs">Track consumption</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View detailed usage patterns, billing history, and consumption trends over time.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Interaction History</CardTitle>
                <CardDescription className="text-xs">Case management</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Review all customer interactions, support cases, and communication history in one place.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
