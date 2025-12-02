import { useState } from "react";
import { Segment, mockSegments } from "@/data/programMockData";
import { SegmentCard } from "./SegmentCard";
import { SegmentDetailDialog } from "./SegmentDetailDialog";
import { Users, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const OpportunityGroups = () => {
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);

  const totalCustomers = mockSegments.reduce((sum, s) => sum + s.customerCount, 0);
  const totalGap = mockSegments.reduce((sum, s) => sum + s.opportunityGap, 0);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Customer Opportunity Groups</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] gap-1">
            <Users className="h-3 w-3" />
            {totalCustomers.toLocaleString()} Total Customers
          </Badge>
          <Badge variant="outline" className="text-[10px] gap-1 border-warning/20 text-warning">
            <Target className="h-3 w-3" />
            {totalGap.toLocaleString()} Not Enrolled
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {mockSegments.map(segment => (
          <SegmentCard 
            key={segment.id} 
            segment={segment} 
            onViewSegment={setSelectedSegment}
          />
        ))}
      </div>

      <SegmentDetailDialog
        segment={selectedSegment}
        open={!!selectedSegment}
        onOpenChange={(open) => !open && setSelectedSegment(null)}
      />
    </section>
  );
};
