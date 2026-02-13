import { alerts } from "@/lib/mock-data";
import { AlertTriangle, Info, AlertOctagon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const severityConfig = {
  info: { icon: Info, styles: "border-l-primary bg-primary/5", iconColor: "text-primary" },
  warning: { icon: AlertTriangle, styles: "border-l-warning bg-warning/5", iconColor: "text-warning" },
  critical: { icon: AlertOctagon, styles: "border-l-destructive bg-destructive/5", iconColor: "text-destructive animate-pulse-glow" },
};

const AlertsPanel = () => {
  return (
    <div className="rounded-xl border bg-card shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-destructive/10 text-destructive">
          {alerts.filter((a) => a.status === "new").length} new
        </span>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;
          return (
            <div
              key={alert.id}
              className={cn(
                "flex gap-3 p-3 rounded-lg border-l-4 transition-colors",
                config.styles
              )}
            >
              <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", config.iconColor)} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{alert.farmName}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{alert.message}</p>
                <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {alert.createdAt}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsPanel;
