import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { OpportunityItem, opportunityTypeConfig } from "@/data/kamDashboardData";
import { FileText, Mail, Download, Save } from "lucide-react";

interface CreateProposalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity: OpportunityItem | null;
  customerName: string;
  customerEmail?: string;
}

export const CreateProposalDialog = ({
  open,
  onOpenChange,
  opportunity,
  customerName,
  customerEmail,
}: CreateProposalDialogProps) => {
  const [template, setTemplate] = useState("standard");
  const [deliveryMethod, setDeliveryMethod] = useState<string[]>(["email"]);
  const [additionalNotes, setAdditionalNotes] = useState("");

  if (!opportunity) return null;

  const typeConfig = opportunityTypeConfig[opportunity.opportunityType];

  const toggleDelivery = (method: string) => {
    setDeliveryMethod(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const handleGenerate = () => {
    const methods = deliveryMethod.join(", ");
    toast.success("Proposal generated successfully", {
      description: `${template.charAt(0).toUpperCase() + template.slice(1)} proposal for ${opportunity.opportunityName} will be delivered via: ${methods}`,
    });
    setTemplate("standard");
    setDeliveryMethod(["email"]);
    setAdditionalNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Create Proposal
          </DialogTitle>
          <DialogDescription>
            Generate a proposal for {customerName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Opportunity Summary */}
          <div className="bg-muted/50 rounded-lg p-3 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${typeConfig.bgColor} ${typeConfig.color} text-xs`}>
                {typeConfig.label}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {opportunity.confidence}% confidence
              </Badge>
            </div>
            <div className="font-medium text-foreground">{opportunity.opportunityName}</div>
            <div className="text-sm text-muted-foreground mt-1">{opportunity.estimatedValue}</div>
            {opportunity.estimatedSavings && (
              <div className="text-sm text-status-success">{opportunity.estimatedSavings}</div>
            )}
          </div>

          {/* Template Selection */}
          <div className="space-y-2">
            <Label>Proposal Template</Label>
            <RadioGroup value={template} onValueChange={setTemplate} className="grid grid-cols-3 gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="text-sm cursor-pointer">Standard</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="premium" id="premium" />
                <Label htmlFor="premium" className="text-sm cursor-pointer">Premium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom" className="text-sm cursor-pointer">Custom</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Key Points to Include */}
          <div className="space-y-2">
            <Label>Key Points (from evidence)</Label>
            <div className="bg-muted/30 rounded-lg p-3 border border-border text-sm space-y-1">
              {opportunity.evidence.map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span className="text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any custom messaging or notes for this proposal..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Delivery Method */}
          <div className="space-y-2">
            <Label>Delivery Method</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="email" 
                  checked={deliveryMethod.includes("email")}
                  onCheckedChange={() => toggleDelivery("email")}
                />
                <Label htmlFor="email" className="text-sm cursor-pointer flex items-center gap-1">
                  <Mail className="h-3 w-3" /> Email to customer
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="download" 
                  checked={deliveryMethod.includes("download")}
                  onCheckedChange={() => toggleDelivery("download")}
                />
                <Label htmlFor="download" className="text-sm cursor-pointer flex items-center gap-1">
                  <Download className="h-3 w-3" /> Download PDF
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="draft" 
                  checked={deliveryMethod.includes("draft")}
                  onCheckedChange={() => toggleDelivery("draft")}
                />
                <Label htmlFor="draft" className="text-sm cursor-pointer flex items-center gap-1">
                  <Save className="h-3 w-3" /> Save as draft
                </Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleGenerate} disabled={deliveryMethod.length === 0}>
            Generate Proposal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
