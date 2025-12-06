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
import { Mail, Phone, Calendar, Copy, Check, User, AlertTriangle, Clock, DollarSign } from "lucide-react";

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
      return `Dear ${alert.customerName} Team,

I'm reaching out regarding your planned expansion that we've identified in our system.

Expansion Summary:
- ${alert.reason}
- Detected: ${alert.detectedAt}

Key Details:
${alert.quickFacts.map(f => `- ${f.label}: ${f.value}`).join('\n')}

Infrastructure Considerations:
${alert.evidencePoints.map(p => `- ${p}`).join('\n')}

We'd like to schedule a meeting to discuss:
1. Your expansion timeline and requirements
2. Infrastructure planning and upgrades needed
3. Service level commitments during and after expansion
4. Coordination with our engineering team

Please let me know your availability for a planning discussion.

Best regards,
Key Account Manager`;
    }

    return `Dear ${alert.customerName} Team,

I'm reaching out regarding the recent ${alert.category} event that affected your operations.

Alert Summary:
- Issue: ${alert.reason}
- Detected: ${alert.detectedAt}
- Severity: ${severityStyle.label}

We understand the impact this has had on your operations and want to ensure we're addressing your concerns promptly.

I'd like to schedule a call to discuss:
1. Root cause analysis of the recent event
2. Preventive measures being implemented
3. Service level commitments going forward

Please let me know your availability.

Best regards,
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
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3 text-status-error" />
                Event Briefing
              </Label>
              <Card className="p-3 bg-muted/50 text-sm space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                      <div className="font-medium text-foreground">20 minutes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-status-error" />
                    <div>
                      <div className="text-xs text-muted-foreground">Est. Impact</div>
                      <div className="font-medium text-status-error">$50K</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-2">
                  <div className="text-xs text-muted-foreground mb-1">What We Know</div>
                  <ul className="space-y-1 text-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      Power loss at Chestnut Street distribution center
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      Critical refrigeration systems impacted
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      Backup generators activated successfully
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      Crews dispatched, investigating root cause
                    </li>
                  </ul>
                </div>

                <div className="border-t border-border pt-2">
                  <div className="text-xs text-muted-foreground mb-1">Key Talking Points</div>
                  <ul className="space-y-1 text-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">→</span>
                      Acknowledge impact to their operations
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">→</span>
                      Confirm backup systems are holding
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">→</span>
                      Provide estimated restoration timeline
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">→</span>
                      Offer to schedule post-incident review
                    </li>
                  </ul>
                </div>
              </Card>
            </div>

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
