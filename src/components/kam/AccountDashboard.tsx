import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Zap,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  FileText,
  Briefcase,
  MessageSquare,
  Download,
  Plus,
  ChevronRight,
  Clock,
  Gauge,
  BarChart3
} from "lucide-react";
import { AccountDetail, getAccountDetail } from "@/data/kamData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface AccountDashboardProps {
  accountId: string;
  onBack: () => void;
}

export const AccountDashboard = ({ accountId, onBack }: AccountDashboardProps) => {
  const account = getAccountDetail(accountId);
  
  if (!account) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Account not found</p>
      </div>
    );
  }

  const billChangeColor = account.yoyBillChange > 0 ? 'text-red-500' : 'text-emerald-500';
  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(142, 76%, 36%)', 'hsl(var(--muted))'];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{account.name}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline">{account.industry}</Badge>
              <span>•</span>
              <span>{account.rateSchedule}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-1" /> Call
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-1" /> Email
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" /> New Case
          </Button>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <Card className="p-3 border-border">
          <div className="text-xs text-muted-foreground mb-1">Contact</div>
          <div className="font-medium text-sm">{account.contactName}</div>
          <div className="text-xs text-muted-foreground">{account.contactPhone}</div>
        </Card>
        <Card className="p-3 border-border">
          <div className="text-xs text-muted-foreground mb-1">Meters / Facilities</div>
          <div className="font-medium text-sm">{account.meters} / {account.facilities}</div>
        </Card>
        <Card className="p-3 border-border">
          <div className="text-xs text-muted-foreground mb-1">Contract Renewal</div>
          <div className="font-medium text-sm">{new Date(account.contractRenewal).toLocaleDateString()}</div>
        </Card>
        <Card className="p-3 border-border">
          <div className="text-xs text-muted-foreground mb-1">Annual Revenue</div>
          <div className="font-medium text-sm">${(account.annualRevenue / 1000000).toFixed(2)}M</div>
        </Card>
        <Card className="p-3 border-border">
          <div className="text-xs text-muted-foreground mb-1">Load Factor</div>
          <div className="font-medium text-sm">{(account.loadFactor * 100).toFixed(0)}%</div>
        </Card>
        <Card className="p-3 border-border">
          <div className="text-xs text-muted-foreground mb-1">Peak Demand</div>
          <div className="font-medium text-sm">{account.peakDemandKW.toLocaleString()} kW</div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Billing Snapshot */}
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Billing Snapshot</h3>
            </div>
            <Button variant="ghost" size="sm">View All <ChevronRight className="h-4 w-4" /></Button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Current Bill</div>
              <div className="text-3xl font-bold">${account.currentBill.toLocaleString()}</div>
              <div className={`text-sm flex items-center gap-1 ${billChangeColor}`}>
                {account.yoyBillChange > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {account.yoyBillChange > 0 ? '+' : ''}{account.yoyBillChange}% YoY
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={account.billingHistory}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} className="text-muted-foreground" />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `$${v/1000}k`} className="text-muted-foreground" />
                  <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                  <Area type="monotone" dataKey="amount" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Cost Drivers</div>
              <div className="space-y-2">
                {account.costDrivers.map(driver => (
                  <div key={driver.category} className="flex items-center justify-between text-sm">
                    <span>{driver.category}</span>
                    <span className="font-medium">${(driver.amount / 1000).toFixed(0)}k ({driver.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Load & Usage */}
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Load & Usage</h3>
            </div>
            <Button variant="ghost" size="sm">Details <ChevronRight className="h-4 w-4" /></Button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-sm text-muted-foreground">Monthly Usage</div>
                <div className="text-xl font-bold">{(account.monthlyUsageKWh / 1000000).toFixed(2)}M kWh</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Peak Demand</div>
                <div className="text-xl font-bold">{account.peakDemandKW.toLocaleString()} kW</div>
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={account.usageHistory}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v/1000000}M`} />
                  <Tooltip formatter={(v: number) => `${(v/1000000).toFixed(2)}M kWh`} />
                  <Bar dataKey="usage" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {account.anomalies.length > 0 && (
              <div>
                <div className="text-sm text-muted-foreground mb-2">Recent Anomalies</div>
                {account.anomalies.map((anomaly, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded bg-amber-500/10 text-sm mb-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                    <div>
                      <div className="font-medium">{anomaly.type}</div>
                      <div className="text-xs text-muted-foreground">{anomaly.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Reliability */}
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Reliability</h3>
            </div>
            <Badge variant={account.reliabilityScore === 'good' ? 'outline' : 'destructive'} className={account.reliabilityScore === 'good' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' : ''}>
              {account.reliabilityScore === 'good' ? 'Good' : account.reliabilityScore === 'warning' ? 'Warning' : 'Critical'}
            </Badge>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-sm text-muted-foreground">Outages YTD</div>
                <div className="text-xl font-bold">{account.outagesYTD}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Momentary</div>
                <div className="text-xl font-bold">{account.momentaryInterruptions}</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Outage History</div>
              <div className="space-y-2">
                {account.outageHistory.map((outage, i) => (
                  <div key={i} className="flex items-center justify-between text-sm p-2 rounded bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Zap className="h-3 w-3 text-red-500" />
                      <span>{outage.date}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{outage.duration}</div>
                      <div className="text-xs text-muted-foreground">{outage.cause}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Power Quality Events</div>
              <div className="space-y-1">
                {account.powerQualityEvents.map((event, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span>{event.type}</span>
                    <Badge variant="outline">{event.count}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Programs & Opportunities */}
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Programs & Opportunities</h3>
            </div>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" /> Enroll
            </Button>
          </div>
          <div className="space-y-3">
            {account.programDetails.map((program, i) => (
              <div key={i} className={`p-3 rounded-lg border ${program.status === 'enrolled' ? 'border-emerald-500/30 bg-emerald-500/5' : program.status === 'eligible' ? 'border-blue-500/30 bg-blue-500/5' : 'border-border'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{program.name}</span>
                  <Badge variant={program.status === 'enrolled' ? 'default' : 'secondary'} className={program.status === 'enrolled' ? 'bg-emerald-500' : ''}>
                    {program.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-1">{program.evidence}</div>
                <div className="text-sm font-medium text-emerald-600">
                  Potential Savings: ${program.potentialSavings.toLocaleString()}/yr
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Cases & Projects */}
        <Card className="p-4 border-border">
          <Tabs defaultValue="cases">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="cases">Open Cases</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            
            <TabsContent value="cases" className="mt-0">
              <div className="space-y-2">
                {account.openCases.length === 0 ? (
                  <div className="text-sm text-muted-foreground text-center py-4">No open cases</div>
                ) : (
                  account.openCases.map((c) => (
                    <div key={c.id} className="p-3 rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{c.id}</span>
                        <Badge variant="outline">{c.status}</Badge>
                      </div>
                      <div className="text-sm">{c.type}</div>
                      <div className="text-xs text-muted-foreground mt-1">{c.description}</div>
                      <div className="text-xs text-muted-foreground mt-1">Created: {c.created}</div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="projects" className="mt-0">
              <div className="space-y-2">
                {account.projects.map((project) => (
                  <div key={project.id} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{project.name}</span>
                      <Badge variant={project.status === 'completed' ? 'default' : 'secondary'} className={project.status === 'in-progress' ? 'bg-blue-500 text-white' : ''}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{project.type}</div>
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className="text-emerald-600 font-medium">${project.value.toLocaleString()}</span>
                      <span className="text-muted-foreground">Expected: {project.expectedCompletion}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="notes" className="mt-0">
              <div className="space-y-2">
                {account.recentNotes.map((note, i) => (
                  <div key={i} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{note.author}</span>
                      <span className="text-xs text-muted-foreground">{note.date}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{note.content}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};
