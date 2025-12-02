import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Customer, Bill } from "@/types/customer";

interface EmailBillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer;
  bills: Bill[];
}

export const EmailBillDialog = ({ open, onOpenChange, customer, bills }: EmailBillDialogProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState(customer.email);
  const [selectedBill, setSelectedBill] = useState("");
  const [includeStatement, setIncludeStatement] = useState(true);
  const [includePaymentLink, setIncludePaymentLink] = useState(true);
  const [includeRateInfo, setIncludeRateInfo] = useState(false);
  const [additionalMessage, setAdditionalMessage] = useState("");

  const handleSubmit = () => {
    if (!email || !selectedBill) {
      toast({
        title: "Missing Information",
        description: "Please enter an email and select a bill.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bill Emailed",
      description: `Bill emailed to ${email}.`,
    });

    setAdditionalMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Email Bill</DialogTitle>
          <DialogDescription>
            Send a bill to {customer.firstName} {customer.lastName}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bill">Select Bill</Label>
            <Select value={selectedBill} onValueChange={setSelectedBill}>
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

          <div className="space-y-3">
            <Label>Include with Email</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="statement"
                checked={includeStatement}
                onCheckedChange={(checked) => setIncludeStatement(checked as boolean)}
              />
              <label htmlFor="statement" className="text-sm">Statement Summary</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="paymentLink"
                checked={includePaymentLink}
                onCheckedChange={(checked) => setIncludePaymentLink(checked as boolean)}
              />
              <label htmlFor="paymentLink" className="text-sm">Payment Link</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rateInfo"
                checked={includeRateInfo}
                onCheckedChange={(checked) => setIncludeRateInfo(checked as boolean)}
              />
              <label htmlFor="rateInfo" className="text-sm">Rate Information</label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Message (Optional)</Label>
            <Textarea
              id="message"
              value={additionalMessage}
              onChange={(e) => setAdditionalMessage(e.target.value)}
              placeholder="Add a personalized note..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Send Email</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
