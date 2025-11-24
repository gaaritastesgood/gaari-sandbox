import { useState } from "react";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Customer360Header } from "@/components/Customer360Header";
import { InteractionPanel } from "@/components/InteractionPanel";
import { KPIDashboard } from "@/components/KPIDashboard";
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
import { MessageSquare } from "lucide-react";

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
      <header className="bg-header-bg border-b border-border/50 shadow-sm sticky top-0 z-40">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-semibold text-header-foreground tracking-tight">Gaari</h1>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowInteractionPanel(!showInteractionPanel)}
              className={showInteractionPanel ? "bg-primary text-primary-foreground border-primary" : "bg-header-bg text-header-foreground border-border/50 hover:bg-header-bg/80"}
            >
              <MessageSquare className="h-4 w-4 mr-1.5" />
              {showInteractionPanel ? "Close" : "Open"} Interaction
            </Button>
          </div>
          <GlobalSearch onSelectCustomer={handleSelectCustomer} />
          <div className="mt-4">
            <KPIDashboard />
          </div>
        </div>
      </header>

      <div className="flex">
        <main className={`flex-1 transition-all ${showInteractionPanel ? "mr-96" : ""}`}>
          {selectedCustomer && (
            <div className="p-6">
              <div className="space-y-6">
                <Customer360Header customer={selectedCustomer} />

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="bg-muted h-9 p-1">
                    <TabsTrigger value="overview" className="text-xs h-7">Overview</TabsTrigger>
                    <TabsTrigger value="bills" className="text-xs h-7">Bills & Usage</TabsTrigger>
                    <TabsTrigger value="rates" className="text-xs h-7">Rates & Tariffs</TabsTrigger>
                    <TabsTrigger value="payments" className="text-xs h-7">Payments</TabsTrigger>
                    <TabsTrigger value="meters" className="text-xs h-7">Meters & Readings</TabsTrigger>
                    <TabsTrigger value="interactions" className="text-xs h-7">Interactions</TabsTrigger>
                  </TabsList>

                  <div className="mt-4">
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
            </div>
          )}
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
