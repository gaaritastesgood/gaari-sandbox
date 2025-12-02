import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Customer, Bill } from "@/types/customer";

interface IssueAdjustmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer;
  bills: Bill[];
}

const ADJUSTMENT_TYPES = [
  { value: "credit", label: "Credit" },
  { value: "debit", label: "Debit" },
  { value: "write-off", label: "Write-off" },
  { value: "late-fee-waiver", label: "Late Fee Waiver" },
  { value: "deposit-refund", label: "Deposit Refund" },
];

const REASON_CODES = [
  { value: "customer-goodwill", label: "Customer Goodwill" },
  { value: "billing-error", label: "Billing Error" },
  { value: "rate-correction", label: "Rate Correction" },
  { value: "service-issue", label: "Service Issue" },
  { value: "meter-error", label: "Meter Error" },
];

export const IssueAdjustmentDialog = ({ open, onOpenChange, customer, bills }: IssueAdjustmentDialogProps) => {
  const { toast } = useToast();
  const [adjustmentType, setAdjustmentType] = useState("");
  const [amount, setAmount] = useState("");
  const [reasonCode, setReasonCode] = useState("");
  const [relatedBill, setRelatedBill] = useState("");
  const [justification, setJustification] = useState("");
  const [requiresApproval, setRequiresApproval] = useState(false);

  const currentBalance = customer.contractAccounts[0]?.balance || 0;
  const adjustmentAmount = parseFloat(amount) || 0;
  const isCredit = adjustmentType === "credit" || adjustmentType === "late-fee-waiver" || adjustmentType === "deposit-refund" || adjustmentType === "write-off";
  const newBalance = isCredit ? currentBalance - adjustmentAmount : currentBalance + adjustmentAmount;

  useEffect(() => {
    setRequiresApproval(adjustmentAmount > 100);
  }, [adjustmentAmount]);

  const handleSubmit = () => {
    if (!adjustmentType || !amount || !reasonCode || !justification.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (requiresApproval) {
      toast({
        title: "Adjustment Submitted for Approval",
        description: `$${adjustmentAmount.toFixed(2)} adjustment requires supervisor approval.`,
      });
    } else {
      toast({
        title: "Adjustment Issued",
        description: `$${adjustmentAmount.toFixed(2)} ${adjustmentType} issued to account.`,
      });
    }

    setAdjustmentType("");
    setAmount("");
    setReasonCode("");
    setRelatedBill("");
    setJustification("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Issue Adjustment</DialogTitle>
          <DialogDescription>
            Issue a billing adjustment for {customer.firstName} {customer.lastName}'s account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adjustmentType">Adjustment Type</Label>
              <Select value={adjustmentType} onValueChange={setAdjustmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {ADJUSTMENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reasonCode">Reason Code</Label>
            <Select value={reasonCode} onValueChange={setReasonCode}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                {REASON_CODES.map((reason) => (
                  <SelectItem key={reason.value} value={reason.value}>
                    {reason.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="relatedBill">Related Bill (Optional)</Label>
            <Select value={relatedBill} onValueChange={setRelatedBill}>
              <SelectTrigger>
                <SelectValue placeholder="Select a bill" />
              </SelectTrigger>
              <SelectContent>
                {bills.map((bill) => (
                  <SelectItem key={bill.id} value={bill.id}>
                    {new Date(bill.billDate).toLocaleDateString()} - ${bill.amount.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justification">Justification (Required)</Label>
            <Textarea
              id="justification"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Provide detailed justification for this adjustment..."
              rows={3}
            />
          </div>

          <div className="bg-muted p-3 rounded-md space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current Balance:</span>
              <span className="font-medium">${currentBalance.toLocaleString()}</span>
            </div>
            {amount && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">New Balance:</span>
                <span className="font-medium">${newBalance.toLocaleString()}</span>
              </div>
            )}
          </div>

          {adjustmentAmount > 100 && (
            <div className="flex items-center space-x-2 p-3 bg-status-warning-bg border border-status-warning rounded-md">
              <Checkbox
                id="approval"
                checked={requiresApproval}
                onCheckedChange={(checked) => setRequiresApproval(checked as boolean)}
                disabled
              />
              <label htmlFor="approval" className="text-sm text-status-warning">
                Amounts over $100 require supervisor approval
              </label>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {requiresApproval ? "Submit for Approval" : "Issue Adjustment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
