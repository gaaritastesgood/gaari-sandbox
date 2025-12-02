import { CustomerSample } from "@/data/programsData";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Phone, CheckCircle, Flag, User, Clock, Mail, MessageSquare } from "lucide-react";

interface CustomerDetailDrawerProps {
  customer: CustomerSample | null;
  programName: string;
  onClose: () => void;
}

export const CustomerDetailDrawer = ({ customer, programName, onClose }: CustomerDetailDrawerProps) => {
  const { toast } = useToast();

  if (!customer) return null;

  const handleMarkContacted = () => {
    toast({
      title: "Marked as contacted",
      description: `${customer.name} has been marked as contacted.`,
    });
    onClose();
  };

  const handleAddToCallList = () => {
    toast({
      title: "Added to call list",
      description: `${customer.name} has been added to your call list.`,
    });
    onClose();
  };

  const handleFlagForContractor = () => {
    toast({
      title: "Flagged for contractor",
      description: `${customer.name} has been flagged for contractor outreach.`,
    });
    onClose();
  };

  return (
    <Sheet open={!!customer} onOpenChange={() => onClose()}>
      <SheetContent className="w-[400px] sm:w-[450px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {customer.name}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-5">
          {/* Score and Status */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Eligibility Score</p>
              <p className={`text-3xl font-bold ${
                customer.eligibilityScore >= 85 ? 'text-emerald-600' :
                customer.eligibilityScore >= 75 ? 'text-blue-600' : 'text-amber-600'
              }`}>
                {customer.eligibilityScore}
              </p>
            </div>
            <Badge variant={
              customer.status === 'Enrolled' ? 'default' :
              customer.status === 'Interested' ? 'secondary' :
              'outline'
            }>
              {customer.status}
            </Badge>
          </div>

          {/* Customer ID and Savings */}
          <Card className="p-3 bg-muted/50">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Customer ID</p>
                <p className="font-medium">{customer.id}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Est. Annual Savings</p>
                <p className="font-medium text-emerald-600">${customer.estimatedSavings.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          {/* Signals */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Signals Detected</p>
            <div className="flex flex-wrap gap-1.5">
              {customer.signals.map((signal, i) => (
                <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {signal}
                </span>
              ))}
            </div>
          </div>

          {/* Eligible Programs */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Eligible Programs</p>
            <div className="flex flex-wrap gap-1.5">
              {customer.eligiblePrograms.map((prog, i) => (
                <Badge 
                  key={i} 
                  variant={prog === programName ? "default" : "outline"}
                  className="text-xs"
                >
                  {prog}
                </Badge>
              ))}
            </div>
          </div>

          {/* Outreach History */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Outreach History</p>
            {customer.outreachHistory.length > 0 ? (
              <div className="space-y-2">
                {customer.outreachHistory.map((entry, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <div className="mt-0.5">
                      {entry.channel === 'Email' ? <Mail className="h-3.5 w-3.5 text-muted-foreground" /> :
                       entry.channel === 'SMS' ? <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" /> :
                       entry.channel === 'Phone' ? <Phone className="h-3.5 w-3.5 text-muted-foreground" /> :
                       <Clock className="h-3.5 w-3.5 text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground">{entry.channel} • {entry.outcome}</p>
                      <p className="text-xs text-muted-foreground">{entry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">No prior outreach</p>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-border space-y-2">
            <Button className="w-full" onClick={handleMarkContacted}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Contacted
            </Button>
            <Button variant="outline" className="w-full" onClick={handleAddToCallList}>
              <Phone className="h-4 w-4 mr-2" />
              Add to Call List
            </Button>
            <Button variant="outline" className="w-full" onClick={handleFlagForContractor}>
              <Flag className="h-4 w-4 mr-2" />
              Flag for Contractor
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
