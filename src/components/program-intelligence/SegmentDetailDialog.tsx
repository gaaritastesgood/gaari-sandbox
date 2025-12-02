import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Users, DollarSign, Target, Lightbulb, Mail, Download } from "lucide-react";
import { useState } from "react";
import { Segment, SegmentCustomer, mockSegmentCustomers } from "@/data/programMockData";
import { useToast } from "@/hooks/use-toast";

interface SegmentDetailDialogProps {
  segment: Segment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors: Record<SegmentCustomer['status'], string> = {
  'New': 'bg-primary/10 text-primary',
  'Contacted': 'bg-warning/10 text-warning',
  'Enrolled': 'bg-success/10 text-success',
  'Declined': 'bg-muted text-muted-foreground'
};

export const SegmentDetailDialog = ({ segment, open, onOpenChange }: SegmentDetailDialogProps) => {
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<SegmentCustomer | null>(null);

  if (!segment) return null;

  const customers = mockSegmentCustomers[segment.id] || [];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{segment.name}</DialogTitle>
            <DialogDescription>{segment.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-3">
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Customers</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xl font-bold">{segment.customerCount.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Not Enrolled</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Target className="h-4 w-4 text-warning" />
                    <span className="text-xl font-bold">{segment.opportunityGap.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Avg Savings</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <DollarSign className="h-4 w-4 text-success" />
                    <span className="text-xl font-bold">${segment.estimatedSavings}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Total Potential</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <DollarSign className="h-4 w-4 text-success" />
                    <span className="text-xl font-bold">${((segment.customerCount * segment.estimatedSavings) / 1000000).toFixed(1)}M</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Signals & Programs */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Key Signals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {segment.signals.map((signal, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {signal}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Linked Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {segment.linkedPrograms.map((program, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-primary/5 border-primary/20 text-primary">
                        {program}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Outreach Strategy */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-warning" />
                  Recommended Outreach Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{segment.outreachStrategy}</p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="text-xs" onClick={() => {
                    toast({ title: "Campaign Created", description: "Email campaign has been queued for this segment." });
                  }}>
                    <Mail className="h-3 w-3 mr-1" />
                    Create Email Campaign
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs" onClick={() => {
                    toast({ title: "Export Started", description: "Customer list is being exported to CSV." });
                  }}>
                    <Download className="h-3 w-3 mr-1" />
                    Export List
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sample Customers Table */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Top Customers by Score</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Name</TableHead>
                      <TableHead className="text-xs text-center">Score</TableHead>
                      <TableHead className="text-xs">Primary Signal</TableHead>
                      <TableHead className="text-xs text-right">Est. Savings</TableHead>
                      <TableHead className="text-xs">Last Outreach</TableHead>
                      <TableHead className="text-xs text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map(customer => (
                      <TableRow 
                        key={customer.id} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <TableCell className="text-sm font-medium">{customer.name}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="text-xs">{customer.score}</Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                          {customer.primarySignal}
                        </TableCell>
                        <TableCell className="text-sm text-right text-success font-medium">
                          ${customer.estimatedSavings.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {customer.lastOutreach || '—'}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={`text-[10px] ${statusColors[customer.status]}`}>
                            {customer.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Customer Drawer */}
      <Sheet open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{selectedCustomer?.name}</SheetTitle>
            <SheetDescription>Customer details from segment analysis</SheetDescription>
          </SheetHeader>
          {selectedCustomer && (
            <div className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Propensity Score</p>
                  <p className="text-2xl font-bold">{selectedCustomer.score}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Est. Annual Savings</p>
                  <p className="text-2xl font-bold text-success">${selectedCustomer.estimatedSavings.toLocaleString()}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Primary Signal</p>
                <Badge variant="secondary">{selectedCustomer.primarySignal}</Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Outreach Status</p>
                <Badge className={statusColors[selectedCustomer.status]}>{selectedCustomer.status}</Badge>
              </div>
              {selectedCustomer.lastOutreach && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Last Contact</p>
                  <p className="text-sm">{selectedCustomer.lastOutreach}</p>
                </div>
              )}
              <div className="pt-4 space-y-2">
                <Button className="w-full" size="sm" onClick={() => {
                  toast({ title: "Outreach Sent", description: `Email sent to ${selectedCustomer.name}` });
                }}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Outreach
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  View Full Profile
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
