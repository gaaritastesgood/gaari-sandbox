import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer } from "@/types/customer";
import { mockCustomers, mockBills, mockPayments, mockInteractions, mockCases, mockRates, mockMeterReadings } from "@/data/mockData";
import { MessageSquare, ArrowLeft, Search, Home } from "lucide-react";

const Residential = () => {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showInteractionPanel, setShowInteractionPanel] = useState(false);
  const [customerTab, setCustomerTab] = useState("overview");
  const tabsRef = useRef<HTMLDivElement>(null);

  // Search form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [bpId, setBpId] = useState("");
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    const results = mockCustomers.filter((customer) => {
      const firstNameMatch = !firstName || customer.firstName.toLowerCase().includes(firstName.toLowerCase());
      const lastNameMatch = !lastName || customer.lastName.toLowerCase().includes(lastName.toLowerCase());
      const addressMatch = !address || customer.premises.some(p => 
        p.address.toLowerCase().includes(address.toLowerCase()) ||
        p.city.toLowerCase().includes(address.toLowerCase())
      );
      const bpIdMatch = !bpId || customer.businessPartnerId.toLowerCase().includes(bpId.toLowerCase());

      return firstNameMatch && lastNameMatch && addressMatch && bpIdMatch;
    });

    setSearchResults(results);
    setHasSearched(true);
  };

  const handleClearSearch = () => {
    setFirstName("");
    setLastName("");
    setAddress("");
    setBpId("");
    setSearchResults([]);
    setHasSearched(false);
    setSelectedCustomer(null);
  };

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerTab("overview");
  };

  const handleBackToSearch = () => {
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

  // Check if search criteria is sufficient (at least 2 fields filled or BP ID)
  const hasEnoughCriteria = bpId.length > 0 || 
    (firstName.length >= 2 && lastName.length >= 2) ||
    (lastName.length >= 2 && address.length >= 3) ||
    (firstName.length >= 2 && address.length >= 3);

  // Only show results dropdown if we have enough criteria and results are manageable
  const shouldShowResults = hasSearched && searchResults.length > 0 && searchResults.length <= 20 && !selectedCustomer;

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
                Residential Customer Search
              </h1>
            </div>
            <div className="flex items-center gap-3">
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
          {selectedCustomer ? (
            <div className="p-6 space-y-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToSearch}
                className="text-muted-foreground hover:text-foreground gap-1.5 -ml-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Search
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
            <div className="p-6 flex justify-center">
              <Card className="w-full max-w-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Customer Search
                  </CardTitle>
                  <CardDescription>
                    Enter customer information to search. You don't need to fill all fields - just enough to narrow down results.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="e.g., John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="e.g., Smith"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="e.g., 123 Main Street"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bpId">Business Partner ID</Label>
                    <Input
                      id="bpId"
                      placeholder="e.g., BP001"
                      value={bpId}
                      onChange={(e) => setBpId(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleSearch} className="flex-1">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="outline" onClick={handleClearSearch}>
                      Clear
                    </Button>
                  </div>

                  {/* Search Results */}
                  {hasSearched && (
                    <div className="border-t pt-4 mt-4">
                      {searchResults.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">
                          No customers found matching your criteria.
                        </p>
                      ) : searchResults.length > 20 ? (
                        <p className="text-muted-foreground text-center py-4">
                          {searchResults.length} results found. Please add more search criteria to narrow down results.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-medium text-foreground">
                              {searchResults.length} customer{searchResults.length !== 1 ? 's' : ''} found — select one to view
                            </p>
                          </div>
                          <div className="bg-card border-2 border-primary rounded-lg p-2 shadow-xl ring-4 ring-primary/20 animate-in fade-in slide-in-from-top-2 duration-300">
                            {searchResults.map((customer) => (
                              <button
                                key={customer.id}
                                onClick={() => handleSelectCustomer(customer)}
                                className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors rounded-md group"
                              >
                                <div className="font-medium text-foreground group-hover:text-primary">
                                  {customer.firstName} {customer.lastName}
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  BP: {customer.businessPartnerId} • {customer.premises[0]?.address}, {customer.premises[0]?.city}, {customer.premises[0]?.state} {customer.premises[0]?.zipCode}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
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

export default Residential;
