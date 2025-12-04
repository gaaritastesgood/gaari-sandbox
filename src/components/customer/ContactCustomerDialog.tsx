import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Mail, Phone, Calendar, Send, Copy, Check } from "lucide-react";
import { OpportunityItem } from "@/data/kamDashboardData";
import { toast } from "sonner";

interface ContactCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity: OpportunityItem | null;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
}

export const ContactCustomerDialog = ({ 
  open, 
  onOpenChange, 
  opportunity,
  customerName,
  customerEmail = "contact@company.com",
  customerPhone = "(555) 123-4567"
}: ContactCustomerDialogProps) => {
  const [emailBody, setEmailBody] = useState("");
  const [callNotes, setCallNotes] = useState("");
  const [copied, setCopied] = useState(false);

  if (!opportunity) return null;

  // Generate email template based on opportunity
  const emailTemplate = `Dear ${customerName.split(" ")[0] || "Customer"},

I wanted to reach out regarding an opportunity I identified that could benefit your operations.

${opportunity.opportunityName}
${opportunity.estimatedSavings ? `Estimated Savings: ${opportunity.estimatedSavings}` : ""}

Based on our analysis:
${opportunity.evidence.map(e => `• ${e}`).join("\n")}

I'd love to schedule a brief call to discuss this opportunity in more detail. Would you have 15-20 minutes available this week?

Best regards,
[Your Name]
Key Account Manager`;

  const handleSendEmail = () => {
    toast.success("Email sent successfully", {
      description: `Sent to ${customerEmail}`,
    });
    onOpenChange(false);
  };

  const handleLogCall = () => {
    toast.success("Call logged", {
      description: `Notes saved for ${customerName}`,
    });
    onOpenChange(false);
  };

  const handleScheduleMeeting = () => {
    toast.success("Meeting request sent", {
      description: `Calendar invite sent to ${customerEmail}`,
    });
    onOpenChange(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailBody || emailTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Email copied to clipboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Contact Customer</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email" className="text-xs">
              <Mail className="h-3 w-3 mr-1" />
              Email
            </TabsTrigger>
            <TabsTrigger value="call" className="text-xs">
              <Phone className="h-3 w-3 mr-1" />
              Call
            </TabsTrigger>
            <TabsTrigger value="meeting" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              Meeting
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            <Card className="p-3 bg-muted/50">
              <div className="text-sm">
                <span className="text-muted-foreground">To: </span>
                <span className="font-medium text-foreground">{customerEmail}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Subject: </span>
                <span className="font-medium text-foreground">{opportunity.opportunityName} - Opportunity Discussion</span>
              </div>
            </Card>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Message</Label>
                <Button variant="ghost" size="sm" onClick={handleCopyEmail}>
                  {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
              <Textarea
                value={emailBody || emailTemplate}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={10}
                className="font-mono text-sm"
              />
            </div>

            <Button onClick={handleSendEmail} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </TabsContent>

          <TabsContent value="call" className="space-y-4">
            <Card className="p-3 bg-muted/50">
              <div className="text-sm">
                <span className="text-muted-foreground">Customer: </span>
                <span className="font-medium text-foreground">{customerName}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Phone: </span>
                <span className="font-medium text-foreground">{customerPhone}</span>
              </div>
            </Card>

            <div className="space-y-2">
              <Label>Talking Points</Label>
              <Card className="p-3 text-sm">
                <ul className="space-y-1 text-foreground">
                  <li>• Discuss {opportunity.opportunityName}</li>
                  <li>• Highlight potential savings: {opportunity.estimatedSavings || opportunity.estimatedValue}</li>
                  <li>• Review evidence and next steps</li>
                  <li>• Schedule follow-up if interested</li>
                </ul>
              </Card>
            </div>

            <div className="space-y-2">
              <Label>Call Notes</Label>
              <Textarea
                placeholder="Log call notes here..."
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <a href={`tel:${customerPhone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
              </Button>
              <Button onClick={handleLogCall} className="flex-1">
                Log Call
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="meeting" className="space-y-4">
            <Card className="p-3 bg-muted/50">
              <div className="text-sm font-medium text-foreground">{opportunity.opportunityName}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Discussion with {customerName}
              </div>
            </Card>

            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                Schedule a meeting to discuss this opportunity in detail.
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  15 minutes
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  30 minutes
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  45 minutes
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  60 minutes
                </Button>
              </div>
            </div>

            <Button onClick={handleScheduleMeeting} className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Send Meeting Request
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
