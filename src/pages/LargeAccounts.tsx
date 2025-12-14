import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Customer360Header } from "@/components/Customer360Header";
import { InteractionPanel } from "@/components/InteractionPanel";
import { KAMDashboard } from "@/components/dashboard/KAMDashboard";
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
import { mockCustomers, mockBills, mockPayments, mockInteractions, mockCases, mockRates, mockMeterReadings } from "@/data/mockData";
import { getCustomerIssues, getCustomerEligibility } from "@/data/customerEligibilityData";
import { MessageSquare, Users, Zap, ArrowLeft, Home } from "lucide-react";
import { toast } from "sonner";

const LargeAccounts = () => {
  const navigate = useNavigate();
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

  const handleNavigateToCustomer = (customerId: string) => {
    const customer = mockCustomers.find(c => c.id === customerId);
    if (customer) {
      setSelectedCustomer(customer);
      setMainTab("intelligence");
      setCustomerTab("overview");
    } else {
      toast.info("Demo Mode", {
        description: "Navigating to sample customer profile"
      });
      if (mockCustomers.length > 0) {
        setSelectedCustomer(mockCustomers[0]);
        setMainTab("intelligence");
        setCustomerTab("overview");
      }
    }
  };

  const handleBackToDashboard = () => {
    setSelectedCustomer(null);
  };

  const handleNavigateToTab = (tab: string) => {
    setCustomerTab(tab);
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const bills = selectedCustomer ? mockBills[selectedCustomer.contractAccounts[0].id] || [] : [];
  const payments = selectedCustomer ? mockPayments[selectedCustomer.contractAccounts[0].id] || [] : [];
  const interactions = selectedCustomer ? mockInteractions[selectedCustomer.id] || [] : [];
  const cases = selectedCustomer ? mockCases[selectedCustomer.id] || [] : [];
  const rates = selectedCustomer ? mockRates[selectedCustomer.contractAccounts[0].id] || [] : [];
  const meterReadings = selectedCustomer ? mockMeterReadings[selectedCustomer.premises[0].servicePoints[0].id] || [] : [];
  
  const customerIssues = selectedCustomer ? getCustomerIssues(selectedCustomer.id) : [];
  const customerEligibility = selectedCustomer ? getCustomerEligibility(selectedCustomer.id) : [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-header-bg border-b border-border/50 shadow-sm z-40">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-header-foreground/70 hover:text-header-foreground gap-1.5 -ml-2"
              >
                <Home className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-semibold text-header-foreground tracking-tight">
                Large Account Management
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-muted/20 rounded-lg p-0.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMainTab("intelligence")}
                  className={`h-8 text-sm gap-1.5 ${mainTab === "intelligence" ? "bg-background shadow-sm text-foreground" : "text-header-foreground/70 hover:text-header-foreground hover:bg-muted/30"}`}
                >
                  <Users className="h-4 w-4" />
                  Customer Intelligence
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMainTab("programs")}
                  className={`h-8 text-sm gap-1.5 ${mainTab === "programs" ? "bg-background shadow-sm text-foreground" : "text-header-foreground/70 hover:text-header-foreground hover:bg-muted/30"}`}
                >
                  <Zap className="h-4 w-4" />
                  Programs
                </Button>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowInteractionPanel(!showInteractionPanel)}
                className={showInteractionPanel ? "bg-primary text-primary-foreground border-primary" : "bg-header-bg text-header-foreground border-header-foreground/30 hover:bg-header-bg/80"}
              >
                <MessageSquare className="h-4 w-4 mr-1.5" />
                {showInteractionPanel ? "Close" : "Open"} Interaction
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <main className={`flex-1 transition-all ${showInteractionPanel ? "mr-96" : ""}`}>
          {mainTab === "programs" ? (
            <div className="p-6">
              <ProgramsTab />
            </div>
          ) : selectedCustomer ? (
            <div className="p-6 space-y-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToDashboard}
                className="text-muted-foreground hover:text-foreground gap-1.5 -ml-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>

              <Customer360Header customer={selectedCustomer} bills={bills} />

              <div ref={tabsRef}>
                <Tabs value={customerTab} onValueChange={setCustomerTab} className="w-full">
                  <TabsList className="bg-muted h-10 p-1">
                    <TabsTrigger value="overview" className="text-sm h-8">Overview</TabsTrigger>
                    <TabsTrigger value="bills" className="text-sm h-8">Bills & Usage</TabsTrigger>
                    <TabsTrigger value="rates" className="text-sm h-8">Rates & Tariffs</TabsTrigger>
                    <TabsTrigger value="payments" className="text-sm h-8">Payments</TabsTrigger>
                    <TabsTrigger value="meters" className="text-sm h-8">Meters & Readings</TabsTrigger>
                    <TabsTrigger value="interactions" className="text-sm h-8">Interactions</TabsTrigger>
                  </TabsList>

                  <div className="mt-4">
                    <TabsContent value="overview">
                      <OverviewTab 
                        customer={selectedCustomer} 
                        bills={bills} 
                        interactions={interactions}
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
            <div className="p-6">
              <KAMDashboard 
                onSelectCustomer={handleSelectCustomer}
                onNavigateToCustomer={handleNavigateToCustomer}
              />
            </div>
          )}
        </main>

        {showInteractionPanel && (
          <aside className="fixed right-0 top-[72px] bottom-0 z-30">
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

export default LargeAccounts;
