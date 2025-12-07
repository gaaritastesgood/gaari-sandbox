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
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { AttentionItem, categoryConfig, severityConfig } from "@/data/kamDashboardData";
import { Mail, Phone, Calendar, Copy, Check, User, AlertTriangle } from "lucide-react";

interface ContactAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alert: AttentionItem | null;
  customerEmail?: string;
  customerPhone?: string;
}

// Facility manager contact info
const facilityManagerContact = {
  name: "Marcus Chen",
  title: "Facility Manager",
  phone: "(443) 555-0187",
  email: "m.chen@giantfood.com",
  directLine: true,
};

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
  const isExpansionAlert = alert.category === "expansion";

  const generateEmailTemplate = () => {
    if (isExpansionAlert) {
      return `Hi ${facilityManagerContact.name},

I hope this message finds you well. I wanted to reach out to schedule a quick call to discuss your upcoming expansion plans.

We've been reviewing our accounts and noticed some activity that suggests you may be planning for growth. I'd love to connect to better understand your timeline and ensure we're prepared to support your needs.

Would you have 30 minutes this week or next for a brief conversation? I'm happy to work around your schedule.

Looking forward to connecting.

Best regards,
[Your Name]
Key Account Manager`;
    }

    return `Hi ${facilityManagerContact.name},

I hope you're doing well. I wanted to reach out following the recent service interruption at your facility.

First, I want to apologize for any inconvenience this may have caused your operations. I'd like to schedule a brief call to walk through what happened, answer any questions you might have, and discuss the steps we're taking to prevent similar issues going forward.

Would you have 20-30 minutes for a quick recap call this week? I'm flexible and happy to work around your availability.

Please let me know what works best for you.

Best regards,
[Your Name]
Key Account Manager`;
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
            Contact About {isExpansionAlert ? "Expansion" : "Alert"}
          </DialogTitle>
          <DialogDescription>
            Reach out to {alert.customerName} regarding this {isExpansionAlert ? "expansion" : "alert"}
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
          
          {/* Quick Facts */}
          <div className="flex flex-wrap gap-3 mt-2 text-sm">
            {alert.quickFacts.map((fact, i) => (
              <div key={i}>
                <span className="text-muted-foreground">{fact.label}: </span>
                <span className="font-medium text-foreground">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>

        <Tabs defaultValue="call" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="call" className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> Call
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> Email
            </TabsTrigger>
            <TabsTrigger value="meeting" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Meeting
            </TabsTrigger>
          </TabsList>

          <TabsContent value="call" className="space-y-3">
            {/* Facility Manager Contact */}
            <Card className="p-3 border-primary/30 bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{facilityManagerContact.name}</div>
                  <div className="text-xs text-muted-foreground">{facilityManagerContact.title}</div>
                </div>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Direct Line: </span>
                <span className="font-medium text-foreground">{facilityManagerContact.phone}</span>
              </div>
            </Card>

            {/* Event Briefing Notes */}
            <Card className="p-3 bg-muted/50 text-sm">
              <div className="flex items-center gap-1 mb-2">
                <AlertTriangle className="h-3 w-3 text-status-error" />
                <span className="font-medium text-foreground">Event Briefing</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-background rounded p-2 text-center">
                  <div className="text-xs text-muted-foreground">Duration</div>
                  <div className="font-semibold text-foreground">20 min</div>
                </div>
                <div className="bg-background rounded p-2 text-center">
                  <div className="text-xs text-muted-foreground">Est. Impact</div>
                  <div className="font-semibold text-status-error">$50K</div>
                </div>
                <div className="bg-status-success-bg rounded p-2 text-center">
                  <div className="text-xs text-muted-foreground">Est. Restore</div>
                  <div className="font-semibold text-status-success">30 min</div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mb-1">What We Know</div>
              <ul className="space-y-0.5 text-foreground text-xs">
                <li>• Power loss at Chestnut Street distribution center — 4.2 MW load affected</li>
                <li>• Critical refrigeration systems impacted — backup generators active</li>
                <li>• Cause: Equipment failure on feeder circuit 12-A</li>
                <li>• Crews on-site, replacement parts en route</li>
              </ul>
            </Card>

            <div className="space-y-2">
              <Label htmlFor="call-notes">Call Notes</Label>
              <Textarea
                id="call-notes"
                placeholder="Enter notes from your call..."
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                rows={4}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button variant="outline" asChild>
                <a href={`tel:${facilityManagerContact.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
              </Button>
              <Button onClick={handleLogCall}>Log Call</Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="email" className="space-y-3">
            <div className="text-sm text-muted-foreground">
              To: {facilityManagerContact.email}
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

          <TabsContent value="meeting" className="space-y-3">
            <div className="text-sm text-muted-foreground">
              Schedule a meeting with {alert.customerName} to discuss {isExpansionAlert ? "expansion planning" : "the alert"}.
            </div>
            <div className="bg-muted/30 rounded-lg p-3 border border-border text-sm">
              <div className="font-medium mb-2">Suggested Agenda:</div>
              <ul className="space-y-1 text-muted-foreground">
                {isExpansionAlert ? (
                  <>
                    <li>• Review expansion timeline and requirements</li>
                    <li>• Infrastructure planning and upgrades needed</li>
                    <li>• Coordination with engineering team</li>
                    <li>• Service level commitments</li>
                  </>
                ) : (
                  <>
                    <li>• Root cause analysis of recent {alert.category} event</li>
                    <li>• Preventive measures and reliability improvements</li>
                    <li>• Service level commitments and next steps</li>
                  </>
                )}
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
