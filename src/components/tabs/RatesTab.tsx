import { Rate } from "@/types/customer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag } from "lucide-react";

interface RatesTabProps {
  rates: Rate[];
}

export const RatesTab = ({ rates }: RatesTabProps) => {
  return (
    <div className="space-y-4">
      {rates.map((rate) => (
        <Card key={rate.id} className="p-6 border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{rate.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" />
                Code: {rate.code}
              </div>
            </div>
            <Badge variant="outline" className="bg-status-success-bg text-status-success">
              Active
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-muted-foreground">Effective Date</div>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{new Date(rate.effectiveDate).toLocaleDateString()}</span>
              </div>
            </div>
            {rate.endDate && (
              <div>
                <div className="text-sm text-muted-foreground">End Date</div>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{new Date(rate.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="text-sm text-muted-foreground mb-2">Category</div>
            <Badge variant="outline" className="bg-secondary text-secondary-foreground">
              {rate.category}
            </Badge>
          </div>

          {rate.riders.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground mb-2">Active Riders</div>
              <div className="flex flex-wrap gap-2">
                {rate.riders.map((rider, idx) => (
                  <Badge key={idx} variant="outline" className="bg-status-info-bg text-status-info">
                    {rider}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};
