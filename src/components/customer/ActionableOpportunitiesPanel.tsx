import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Mail, UserPlus, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { OpportunityItem, opportunityTypeConfig } from "@/data/kamDashboardData";
import { ContactCustomerDialog } from "./ContactCustomerDialog";
import { CreateProposalDialog } from "./CreateProposalDialog";
import { toast } from "sonner";

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
  const [expandedOpp, setExpandedOpp] = useState<string | null>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [proposalDialogOpen, setProposalDialogOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityItem | null>(null);

  if (opportunities.length === 0) {
    return null;
  }

  const handleContact = (opp: OpportunityItem) => {
    setSelectedOpportunity(opp);
    setContactDialogOpen(true);
  };

  const handleEnroll = (opp: OpportunityItem) => {
    toast.success(`Enrollment initiated for ${opp.opportunityName}`, {
      description: `${customerName} will be contacted about enrollment details.`,
    });
  };

  const handleCreateProposal = (opp: OpportunityItem) => {
    setSelectedOpportunity(opp);
    setProposalDialogOpen(true);
  };

  return (
    <>
      <Card className="p-4 border-border border-l-4 border-l-status-success">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-5 w-5 text-status-success" />
          <h3 className="font-semibold text-foreground">Opportunities</h3>
          <Badge className="bg-status-success-bg text-status-success">{opportunities.length}</Badge>
        </div>
        
        <div className="space-y-3">
          {opportunities.map((opp) => {
            const typeConfig = opportunityTypeConfig[opp.opportunityType];
            const isExpanded = expandedOpp === opp.id;

            return (
              <div key={opp.id} className="bg-muted/50 rounded-lg p-3 border border-border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`${typeConfig.bgColor} ${typeConfig.color} text-xs`}>
                        {typeConfig.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {opp.confidence}% confidence
                      </Badge>
                    </div>
                    <div className="font-medium text-foreground">{opp.opportunityName}</div>
                    <div className="text-sm text-muted-foreground mt-1">{opp.estimatedValue}</div>
                    {opp.estimatedSavings && (
                      <div className="text-sm text-status-success">{opp.estimatedSavings}</div>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedOpp(isExpanded ? null : opp.id)}
                  >
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Expanded Evidence */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Evidence</div>
                    <ul className="space-y-1 text-sm text-foreground mb-3">
                      {opp.evidence.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-muted-foreground">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => handleContact(opp)}
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => handleEnroll(opp)}
                  >
                    <UserPlus className="h-3 w-3 mr-1" />
                    Enroll
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => handleCreateProposal(opp)}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Create Proposal
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
      <CreateProposalDialog
        open={proposalDialogOpen}
        onOpenChange={setProposalDialogOpen}
        opportunity={selectedOpportunity}
        customerName={customerName}
        customerEmail={customerEmail}
      />
    </>
  );
};