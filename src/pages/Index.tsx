import { useState } from "react";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Customer360Header } from "@/components/Customer360Header";
import { InteractionPanel } from "@/components/InteractionPanel";
import { OverviewTab } from "@/components/tabs/OverviewTab";
import { BillsTab } from "@/components/tabs/BillsTab";
import { RatesTab } from "@/components/tabs/RatesTab";
import { PaymentsTab } from "@/components/tabs/PaymentsTab";
import { MetersTab } from "@/components/tabs/MetersTab";
import { InteractionsTab } from "@/components/tabs/InteractionsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer";
import { mockBills, mockPayments, mockInteractions, mockCases, mockRates, mockMeterReadings } from "@/data/mockData";
import { MessageSquare, Zap } from "lucide-react";

const Index = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showInteractionPanel, setShowInteractionPanel] = useState(false);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const bills = selectedCustomer ? mockBills[selectedCustomer.contractAccounts[0].id] || [] : [];
  const payments = selectedCustomer ? mockPayments[selectedCustomer.contractAccounts[0].id] || [] : [];
  const interactions = selectedCustomer ? mockInteractions[selectedCustomer.id] || [] : [];
  const cases = selectedCustomer ? mockCases[selectedCustomer.id] || [] : [];
  const rates = selectedCustomer ? mockRates[selectedCustomer.contractAccounts[0].id] || [] : [];
  const meterReadings = selectedCustomer ? mockMeterReadings[selectedCustomer.premises[0].servicePoints[0].id] || [] : [];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Zap className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Utility CRM</h1>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowInteractionPanel(!showInteractionPanel)}
              className={showInteractionPanel ? "bg-primary text-primary-foreground" : ""}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              {showInteractionPanel ? "Close" : "Open"} Interaction
            </Button>
          </div>
          <GlobalSearch onSelectCustomer={handleSelectCustomer} />
        </div>
      </header>

      <div className="flex">
        <main className={`flex-1 transition-all ${showInteractionPanel ? "mr-96" : ""}`}>
          <div className="p-6">
            {selectedCustomer ? (
              <div className="space-y-6">
                <Customer360Header customer={selectedCustomer} />

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="bg-muted">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="bills">Bills & Usage</TabsTrigger>
                    <TabsTrigger value="rates">Rates & Tariffs</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="meters">Meters & Readings</TabsTrigger>
                    <TabsTrigger value="interactions">Interactions</TabsTrigger>
                  </TabsList>

                  <div className="mt-6">
                    <TabsContent value="overview">
                      <OverviewTab customer={selectedCustomer} bills={bills} interactions={interactions} />
                    </TabsContent>

                    <TabsContent value="bills">
                      <BillsTab bills={bills} />
                    </TabsContent>

                    <TabsContent value="rates">
                      <RatesTab rates={rates} />
                    </TabsContent>

                    <TabsContent value="payments">
                      <PaymentsTab 
                        payments={payments} 
                        balance={selectedCustomer.contractAccounts[0].balance} 
                      />
                    </TabsContent>

                    <TabsContent value="meters">
                      <MetersTab 
                        servicePoints={selectedCustomer.premises[0].servicePoints} 
                        meterReadings={meterReadings}
                      />
                    </TabsContent>

                    <TabsContent value="interactions">
                      <InteractionsTab interactions={interactions} cases={cases} />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                  <Zap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    Welcome to Utility CRM
                  </h2>
                  <p className="text-muted-foreground max-w-md">
                    Search for a customer by name, business partner ID, account number, address, phone, or email to view their Customer 360 profile.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>

        {showInteractionPanel && (
          <aside className="fixed right-0 top-[128px] bottom-0 z-30">
            <InteractionPanel onClose={() => setShowInteractionPanel(false)} />
          </aside>
        )}
      </div>
    </div>
  );
};

export default Index;
