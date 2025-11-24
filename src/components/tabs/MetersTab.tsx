import { ServicePoint, MeterReading } from "@/types/customer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, CheckCircle } from "lucide-react";

interface MetersTabProps {
  servicePoints: ServicePoint[];
  meterReadings: MeterReading[];
}

export const MetersTab = ({ servicePoints, meterReadings }: MetersTabProps) => {
  return (
    <div className="space-y-4">
      {servicePoints.map((sp) => (
        <Card key={sp.id} className="p-6 border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Meter: {sp.meterNumber}</h3>
              <div className="text-sm text-muted-foreground">{sp.meterType}</div>
            </div>
            <Badge variant="outline" className={sp.estimatedRead ? "bg-status-warning-bg text-status-warning" : "bg-status-success-bg text-status-success"}>
              {sp.estimatedRead ? "Estimated" : "Actual Read"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-sm text-muted-foreground">Last Read Date</div>
              <div className="font-medium text-foreground">{new Date(sp.lastReadDate).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Last Reading</div>
              <div className="font-medium text-foreground">{sp.lastReading.toLocaleString()} kWh</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Reading History
            </h4>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="space-y-3">
                {meterReadings.map((reading) => (
                  <div key={reading.id} className="flex items-center justify-between pb-3 border-b border-border last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      {reading.anomaly ? (
                        <AlertTriangle className="h-4 w-4 text-status-warning" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-status-success" />
                      )}
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {new Date(reading.date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {reading.type === "actual" ? "Actual" : reading.type === "estimated" ? "Estimated" : "Customer Read"}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">{reading.reading.toLocaleString()} kWh</div>
                      <div className="text-xs text-muted-foreground">Usage: {reading.usage.toLocaleString()} kWh</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
