import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Mail, Info } from "lucide-react";
import { OpportunityItem, opportunityTypeConfig } from "@/data/kamDashboardData";
import { ContactCustomerDialog } from "./ContactCustomerDialog";
import { OpportunityDetailDialog } from "./OpportunityDetailDialog";

interface ActionableOpportunitiesPanelProps {
  opportunities: OpportunityItem[];
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
}

export const ActionableOpportunitiesPanel = ({ 
  opportunities, 
  customerName,
  customerEmail,
  customerPhone 
}: ActionableOpportunitiesPanelProps) => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityItem | null>(null);

  if (opportunities.length === 0) {
    return null;
  }

  const handleContact = (opp: OpportunityItem) => {
    setSelectedOpportunity(opp);
    setContactDialogOpen(true);
  };

  const handleViewDetails = (opp: OpportunityItem) => {
    setSelectedOpportunity(opp);
    setDetailDialogOpen(true);
  };

  return (
    <>
      <Card className="p-4 border-border border-l-4 border-l-status-success">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-5 w-5 text-status-success" />
          <h3 className="font-semibold text-foreground">Potential Program & Service Opportunities</h3>
          <Badge className="bg-status-success-bg text-status-success">{opportunities.length}</Badge>
        </div>
        
        <div className="space-y-3">
          {opportunities.map((opp) => {
            const typeConfig = opportunityTypeConfig[opp.opportunityType];

            return (
              <div key={opp.id} className="bg-muted/50 rounded-lg p-3 border border-border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`${typeConfig.bgColor} ${typeConfig.color} text-xs`}>
                        {typeConfig.label}
                      </Badge>
                    </div>
                    <div className="font-medium text-foreground">{opp.opportunityName}</div>
                    <div className="text-sm text-muted-foreground mt-1">{opp.estimatedValue}</div>
                    {opp.estimatedSavings && (
                      <div className="text-sm text-status-success">{opp.estimatedSavings}</div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => handleViewDetails(opp)}
                  >
                    <Info className="h-3 w-3 mr-1" />
                    Info
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => handleContact(opp)}
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Dialogs */}
      <ContactCustomerDialog
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        opportunity={selectedOpportunity}
        customerName={customerName}
        customerEmail={customerEmail}
        customerPhone={customerPhone}
      />

      <OpportunityDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        opportunity={selectedOpportunity}
        customerName={customerName}
      />
    </>
  );
};