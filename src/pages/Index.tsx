import { useState, useRef } from "react";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Customer360Header } from "@/components/Customer360Header";
import { InteractionPanel } from "@/components/InteractionPanel";
import { KPIDashboard } from "@/components/KPIDashboard";
import { EmptyState } from "@/components/EmptyState";
import { OverviewTab } from "@/components/tabs/OverviewTab";
import { BillsTab } from "@/components/tabs/BillsTab";
import { RatesTab } from "@/components/tabs/RatesTab";
import { PaymentsTab } from "@/components/tabs/PaymentsTab";
import { MetersTab } from "@/components/tabs/MetersTab";
import { InteractionsTab } from "@/components/tabs/InteractionsTab";
import { ProgramsTab } from "@/components/programs/ProgramsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer";
import { mockBills, mockPayments, mockInteractions, mockCases, mockRates, mockMeterReadings } from "@/data/mockData";
import { getCustomerIssues, getCustomerEligibility } from "@/data/customerEligibilityData";
import { MessageSquare, Users, Zap } from "lucide-react";

const Index = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showInteractionPanel, setShowInteractionPanel] = useState(false);
  const [mainTab, setMainTab] = useState<"intelligence" | "programs">("intelligence");
  const [customerTab, setCustomerTab] = useState("overview");
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setMainTab("intelligence");
    setCustomerTab("overview");
  };

  const handleNavigateToTab = (tab: string) => {
    setCustomerTab(tab);
    // Scroll to tabs area
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const bills = selectedCustomer ? mockBills[selectedCustomer.contractAccounts[0].id] || [] : [];
  const payments = selectedCustomer ? mockPayments[selectedCustomer.contractAccounts[0].id] || [] : [];
  const interactions = selectedCustomer ? mockInteractions[selectedCustomer.id] || [] : [];
  const cases = selectedCustomer ? mockCases[selectedCustomer.id] || [] : [];
  const rates = selectedCustomer ? mockRates[selectedCustomer.contractAccounts[0].id] || [] : [];
  const meterReadings = selectedCustomer ? mockMeterReadings[selectedCustomer.premises[0].servicePoints[0].id] || [] : [];
  
  // Get customer issues and eligibility data
  const customerIssues = selectedCustomer ? getCustomerIssues(selectedCustomer.id) : [];
  const customerEligibility = selectedCustomer ? getCustomerEligibility(selectedCustomer.id) : [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-header-bg border-b border-border/50 shadow-sm z-40">
        <div className="px-6 py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-semibold text-header-foreground tracking-tight">Gaari</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Main Navigation Tabs */}
              <div className="flex bg-muted rounded-lg p-0.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMainTab("intelligence")}
                  className={`h-7 text-xs gap-1.5 ${mainTab === "intelligence" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Users className="h-3.5 w-3.5" />
                  Customer Intelligence
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMainTab("programs")}
                  className={`h-7 text-xs gap-1.5 ${mainTab === "programs" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Zap className="h-3.5 w-3.5" />
                  Programs
                </Button>
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
          </div>
          
          {mainTab === "intelligence" && (
            <>
              <GlobalSearch onSelectCustomer={handleSelectCustomer} />
              <div className="mt-3">
                <KPIDashboard />
              </div>
            </>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        <main className={`flex-1 transition-all ${showInteractionPanel ? "mr-96" : ""}`}>
          {mainTab === "programs" ? (
            <div className="p-4">
              <ProgramsTab />
            </div>
          ) : selectedCustomer ? (
            <div className="p-4 space-y-4">
              <Customer360Header customer={selectedCustomer} bills={bills} />

              <div ref={tabsRef}>
                <Tabs value={customerTab} onValueChange={setCustomerTab} className="w-full">
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
                      <OverviewTab 
                        customer={selectedCustomer} 
                        bills={bills} 
                        interactions={interactions}
                        issues={customerIssues}
                        eligibility={customerEligibility}
                        onNavigateToTab={handleNavigateToTab}
                      />
                    </TabsContent>

                    <TabsContent value="bills">
                      <BillsTab 
                        bills={bills} 
                        customerSegment={selectedCustomer.segment}
                        customerId={selectedCustomer.id}
                        customerName={`${selectedCustomer.firstName} ${selectedCustomer.lastName}`}
                      />
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
          ) : (
            <EmptyState />
          )}
        </main>

        {showInteractionPanel && (
          <aside className="fixed right-0 top-[180px] bottom-0 z-30">
            <InteractionPanel 
              onClose={() => setShowInteractionPanel(false)}
              customerId={selectedCustomer?.id}
              customerName={selectedCustomer ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}` : undefined}
            />
          </aside>
        )}
      </div>
    </div>
  );
};

export default Index;
