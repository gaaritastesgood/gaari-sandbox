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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { AttentionItem, categoryConfig, severityConfig } from "@/data/kamDashboardData";
import { Mail, Phone, Calendar, Copy, Check, TrendingUp, Zap } from "lucide-react";

interface ContactAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alert: AttentionItem | null;
  customerEmail?: string;
  customerPhone?: string;
}

export const ContactAlertDialog = ({
  open,
  onOpenChange,
  alert,
  customerEmail = "account.manager@company.com",
  customerPhone = "(555) 123-4567",
}: ContactAlertDialogProps) => {
  const [emailBody, setEmailBody] = useState("");
  const [callNotes, setCallNotes] = useState("");
  const [copied, setCopied] = useState(false);

  if (!alert) return null;

  const categoryStyle = categoryConfig[alert.category];
  const severityStyle = severityConfig[alert.severity];

  const generateEmailTemplate = () => {
    let template = `Dear ${alert.customerName} Team,

I'm reaching out regarding the recent ${alert.category} event that affected your operations.

Alert Summary:
- Issue: ${alert.reason}
- Detected: ${alert.detectedAt}
- Severity: ${severityStyle.label}

We understand the impact this has had on your operations and want to ensure we're addressing your concerns promptly.`;

    if (alert.projectedExpansion) {
      template += `

Regarding Your Planned Expansion:
We're aware of your ${alert.projectedExpansion.description} planned for ${alert.projectedExpansion.timeline}, which will add ${alert.projectedExpansion.additionalLoad} to your load.`;
    }

    if (alert.loadGrowthImplications) {
      template += `

Load Growth Considerations:
- Current Load: ${alert.loadGrowthImplications.currentLoad}
- Projected Load: ${alert.loadGrowthImplications.projectedLoad}
- Growth Rate: ${alert.loadGrowthImplications.growthRate}

We'd like to discuss infrastructure planning to support your growth and ensure reliability.`;
    }

    template += `

I'd like to schedule a call to discuss:
1. Root cause analysis of the recent event
2. Preventive measures being implemented
3. Infrastructure planning for your upcoming needs

Please let me know your availability.

Best regards,
Key Account Manager`;

    return template;
  };

  const handleSendEmail = () => {
    toast.success("Email sent successfully", {
      description: `Follow-up email sent to ${alert.customerName}`,
    });
    onOpenChange(false);
  };

  const handleLogCall = () => {
    toast.success("Call logged", {
      description: `Call notes saved for ${alert.customerName}`,
    });
    setCallNotes("");
    onOpenChange(false);
  };

  const handleScheduleMeeting = () => {
    toast.success("Meeting request sent", {
      description: `Calendar invite sent to ${alert.customerName}`,
    });
    onOpenChange(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailBody || generateEmailTemplate());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Email copied to clipboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact About Alert
          </DialogTitle>
          <DialogDescription>
            Reach out to {alert.customerName} regarding this alert
          </DialogDescription>
        </DialogHeader>

        {/* Alert Context */}
        <div className="bg-muted/50 rounded-lg p-3 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={`${severityStyle.bgColor} ${severityStyle.color} text-xs`}>
              {severityStyle.label}
            </Badge>
            <Badge variant="outline" className={`${categoryStyle.bgColor} ${categoryStyle.color} text-xs`}>
              {categoryStyle.label}
            </Badge>
          </div>
          <div className="font-medium text-foreground text-sm">{alert.reason}</div>
          
          {/* Expansion & Load Growth Summary */}
          {(alert.projectedExpansion || alert.loadGrowthImplications) && (
            <div className="mt-3 pt-3 border-t border-border space-y-2">
              {alert.projectedExpansion && (
                <div className="flex items-start gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-status-success mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Expansion: </span>
                    <span className="text-muted-foreground">
                      {alert.projectedExpansion.description} ({alert.projectedExpansion.timeline}) - {alert.projectedExpansion.additionalLoad}
                    </span>
                  </div>
                </div>
              )}
              {alert.loadGrowthImplications && (
                <div className="flex items-start gap-2 text-sm">
                  <Zap className="h-4 w-4 text-status-warning mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Load Growth: </span>
                    <span className="text-muted-foreground">
                      {alert.loadGrowthImplications.currentLoad} → {alert.loadGrowthImplications.projectedLoad} ({alert.loadGrowthImplications.growthRate})
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email" className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> Email
            </TabsTrigger>
            <TabsTrigger value="call" className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> Call
            </TabsTrigger>
            <TabsTrigger value="meeting" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Meeting
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-3">
            <div className="text-sm text-muted-foreground">
              To: {customerEmail}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-body">Email Body</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={handleCopyEmail}
                >
                  {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
              <Textarea
                id="email-body"
                placeholder="Email content..."
                value={emailBody || generateEmailTemplate()}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={12}
                className="text-sm"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={handleSendEmail}>Send Email</Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="call" className="space-y-3">
            <div className="text-sm">
              <span className="text-muted-foreground">Phone: </span>
              <span className="font-medium text-foreground">{customerPhone}</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="call-notes">Call Notes</Label>
              <Textarea
                id="call-notes"
                placeholder="Enter notes from your call..."
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                rows={6}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={handleLogCall}>Log Call</Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="meeting" className="space-y-3">
            <div className="text-sm text-muted-foreground">
              Schedule a meeting with {alert.customerName} to discuss the alert and expansion planning.
            </div>
            <div className="bg-muted/30 rounded-lg p-3 border border-border text-sm">
              <div className="font-medium mb-2">Suggested Agenda:</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Root cause analysis of recent {alert.category} event</li>
                <li>• Preventive measures and reliability improvements</li>
                {alert.projectedExpansion && (
                  <li>• Infrastructure planning for {alert.projectedExpansion.timeline} expansion</li>
                )}
                {alert.loadGrowthImplications && (
                  <li>• Load growth support: {alert.loadGrowthImplications.currentLoad} → {alert.loadGrowthImplications.projectedLoad}</li>
                )}
                <li>• Service level commitments and next steps</li>
              </ul>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={handleScheduleMeeting}>Send Meeting Request</Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
