import { useState } from "react";
import { OpportunityGroup, generateCustomerSamples, CustomerSample, mockPrograms } from "@/data/programsData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Mail, MessageSquare, Wrench, Globe, Copy, Sparkles, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CustomerDetailDrawer } from "./CustomerDetailDrawer";

interface OpportunityGroupDetailProps {
  group: OpportunityGroup;
  onBack: () => void;
}

const channelIcons = {
  Email: Mail,
  SMS: MessageSquare,
  Contractor: Wrench,
  Portal: Globe,
};

export const OpportunityGroupDetail = ({ group, onBack }: OpportunityGroupDetailProps) => {
  const { toast } = useToast();
  const [customers] = useState(() => generateCustomerSamples(group.id));
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerSample | null>(null);
  
  const program = mockPrograms.find(p => p.id === group.programId);
  const ChannelIcon = channelIcons[group.recommendedChannel];

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(group.messagingExample);
    toast({
      title: "Copied to clipboard",
      description: "Messaging template has been copied.",
    });
  };

  const handleGenerateOutreach = () => {
    toast({
      title: "Generating outreach copy...",
      description: "AI-powered messaging will be available shortly.",
    });
  };

  return (
    <div className="space-y-4">
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={onBack} className="gap-1 -ml-2">
        <ArrowLeft className="h-4 w-4" />
        Back to {program?.name}
      </Button>

      {/* Segment Summary */}
      <Card className="p-5 bg-card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{program?.name}</p>
            <h2 className="text-xl font-semibold text-foreground mt-1">{group.name}</h2>
          </div>
          <div className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-full">
            <ChannelIcon className="h-4 w-4" />
            {group.recommendedChannel} recommended
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Customers</p>
            <p className="text-xl font-semibold text-foreground">{group.eligibilityCount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Est. Annual Savings</p>
            <p className="text-xl font-semibold text-emerald-600">${group.estimatedAnnualSavings.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Expected Conversion</p>
            <p className="text-xl font-semibold text-primary">{group.expectedConversionMin}–{group.expectedConversionMax}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Potential Enrollments</p>
            <p className="text-xl font-semibold text-foreground">
              {Math.round(group.eligibilityCount * (group.expectedConversionMin / 100)).toLocaleString()}–
              {Math.round(group.eligibilityCount * (group.expectedConversionMax / 100)).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Why they're included</p>
          <div className="flex flex-wrap gap-2">
            {group.topSignals.map((signal, i) => (
              <span key={i} className="text-sm bg-muted text-foreground px-2.5 py-1 rounded">
                {signal}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* Messaging Recommendation */}
      <Card className="p-4 bg-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-foreground">Messaging Recommendation</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyMessage}>
              <Copy className="h-3.5 w-3.5 mr-1" />
              Copy
            </Button>
            <Button size="sm" onClick={handleGenerateOutreach}>
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Generate Outreach Copy
            </Button>
          </div>
        </div>
        <div className="bg-muted/50 p-3 rounded-lg text-sm text-foreground italic">
          "{group.messagingExample}"
        </div>
      </Card>

      {/* Customer Example Slice */}
      <Card className="p-4 bg-card">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-medium text-foreground">Customer Sample</h3>
            <p className="text-xs text-muted-foreground">Click a row to view details and take action</p>
          </div>
          <span className="text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 inline mr-1" />
            Showing {customers.length} of {group.eligibilityCount.toLocaleString()}
          </span>
        </div>

        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-xs">Customer</TableHead>
                <TableHead className="text-xs">Score</TableHead>
                <TableHead className="text-xs">Primary Signal</TableHead>
                <TableHead className="text-xs">Est. Savings</TableHead>
                <TableHead className="text-xs">Last Outreach</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map(customer => (
                <TableRow 
                  key={customer.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <TableCell className="font-medium text-sm">
                    <div>{customer.name}</div>
                    <div className="text-xs text-muted-foreground">{customer.id}</div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm font-medium ${
                      customer.eligibilityScore >= 85 ? 'text-emerald-600' :
                      customer.eligibilityScore >= 75 ? 'text-blue-600' : 'text-amber-600'
                    }`}>
                      {customer.eligibilityScore}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{customer.primarySignal}</TableCell>
                  <TableCell className="text-sm text-emerald-600">${customer.estimatedSavings.toLocaleString()}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {customer.lastOutreach || "—"}
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      customer.status === 'Enrolled' ? 'bg-emerald-100 text-emerald-700' :
                      customer.status === 'Interested' ? 'bg-blue-100 text-blue-700' :
                      customer.status === 'Contacted' ? 'bg-amber-100 text-amber-700' :
                      customer.status === 'Declined' ? 'bg-red-100 text-red-700' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {customer.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Customer Detail Drawer */}
      <CustomerDetailDrawer
        customer={selectedCustomer}
        programName={program?.name || ""}
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
};
