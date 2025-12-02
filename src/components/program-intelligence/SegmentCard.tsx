import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Target, ChevronRight } from "lucide-react";
import { Segment } from "@/data/programMockData";

interface SegmentCardProps {
  segment: Segment;
  onViewSegment: (segment: Segment) => void;
}

export const SegmentCard = ({ segment, onViewSegment }: SegmentCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => onViewSegment(segment)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-sm text-foreground leading-tight">{segment.name}</h3>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{segment.customerCount.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {segment.signals.slice(0, 3).map((signal, idx) => (
            <Badge key={idx} variant="secondary" className="text-[10px] px-1.5 py-0">
              {signal}
            </Badge>
          ))}
        </div>

        <div className="mb-3">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Linked Programs</p>
          <div className="flex flex-wrap gap-1">
            {segment.linkedPrograms.map((program, idx) => (
              <Badge key={idx} variant="outline" className="text-[10px] px-1.5 py-0 bg-primary/5 border-primary/20 text-primary">
                {program}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1">
            <Target className="h-3 w-3 text-warning" />
            <span className="text-xs text-muted-foreground">
              {segment.opportunityGap.toLocaleString()} not enrolled
            </span>
          </div>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            View <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
