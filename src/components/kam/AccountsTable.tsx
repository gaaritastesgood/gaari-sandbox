import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  ArrowUpDown, 
  Building2, 
  TrendingUp, 
  TrendingDown,
  Minus,
  AlertCircle,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { KAMAccount, kamAccounts } from "@/data/kamData";

interface AccountsTableProps {
  onSelectAccount: (accountId: string) => void;
}

type SortField = 'name' | 'monthlyUsageKWh' | 'annualRevenue' | 'outagesYTD' | 'opportunityScore';
type SortDirection = 'asc' | 'desc';

const getReliabilityIcon = (score: KAMAccount['reliabilityScore']) => {
  switch (score) {
    case 'good': return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    case 'warning': return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    case 'critical': return <AlertCircle className="h-4 w-4 text-red-500" />;
  }
};

const getBillingRiskBadge = (risk: KAMAccount['billingRisk']) => {
  switch (risk) {
    case 'low': return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">Low</Badge>;
    case 'medium': return <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">Medium</Badge>;
    case 'high': return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/30">High</Badge>;
  }
};

const getOpportunityBadge = (score: KAMAccount['opportunityScore']) => {
  switch (score) {
    case 'low': return <Badge variant="secondary">Low</Badge>;
    case 'medium': return <Badge className="bg-blue-500 text-white">Medium</Badge>;
    case 'high': return <Badge className="bg-emerald-500 text-white">High</Badge>;
  }
};

const getTrendIcon = (trend: KAMAccount['usageTrend']) => {
  switch (trend) {
    case 'up': return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
    case 'stable': return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
};

export const AccountsTable = ({ onSelectAccount }: AccountsTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>('annualRevenue');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [industryFilter, setIndustryFilter] = useState<string>('all');

  const industries = [...new Set(kamAccounts.map(a => a.industry))];

  const filteredAccounts = kamAccounts
    .filter(account => {
      const matchesSearch = account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.industry.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = industryFilter === 'all' || account.industry === industryFilter;
      return matchesSearch && matchesIndustry;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'monthlyUsageKWh':
          comparison = a.monthlyUsageKWh - b.monthlyUsageKWh;
          break;
        case 'annualRevenue':
          comparison = a.annualRevenue - b.annualRevenue;
          break;
        case 'outagesYTD':
          comparison = a.outagesYTD - b.outagesYTD;
          break;
        case 'opportunityScore':
          const scoreOrder = { low: 1, medium: 2, high: 3 };
          comparison = scoreOrder[a.opportunityScore] - scoreOrder[b.opportunityScore];
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <Card className="border-border">
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search accounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map(industry => (
                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">
                <Button variant="ghost" size="sm" onClick={() => handleSort('name')} className="h-8 p-0 font-semibold">
                  Account <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Industry</TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" onClick={() => handleSort('monthlyUsageKWh')} className="h-8 p-0 font-semibold">
                  Usage (kWh) <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" onClick={() => handleSort('annualRevenue')} className="h-8 p-0 font-semibold">
                  Revenue <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-center">
                <Button variant="ghost" size="sm" onClick={() => handleSort('outagesYTD')} className="h-8 p-0 font-semibold">
                  Reliability <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-center">Billing Risk</TableHead>
              <TableHead className="text-center">
                <Button variant="ghost" size="sm" onClick={() => handleSort('opportunityScore')} className="h-8 p-0 font-semibold">
                  Opportunity <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-center">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account) => (
              <TableRow 
                key={account.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onSelectAccount(account.id)}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-foreground flex items-center gap-2">
                        {account.name}
                        {account.attentionNeeded && (
                          <span className="h-2 w-2 rounded-full bg-amber-500" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">{account.meters} meters • {account.facilities} facilities</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{account.industry}</Badge>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {(account.monthlyUsageKWh / 1000).toLocaleString()}k
                </TableCell>
                <TableCell className="text-right font-mono font-medium">
                  ${(account.annualRevenue / 1000).toLocaleString()}k
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    {getReliabilityIcon(account.reliabilityScore)}
                    <span className="text-xs text-muted-foreground">{account.outagesYTD} YTD</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {getBillingRiskBadge(account.billingRisk)}
                </TableCell>
                <TableCell className="text-center">
                  {getOpportunityBadge(account.opportunityScore)}
                </TableCell>
                <TableCell className="text-center">
                  {getTrendIcon(account.usageTrend)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
