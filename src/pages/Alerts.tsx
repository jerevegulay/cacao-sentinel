import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { alerts as initialAlerts, type Alert } from "@/lib/mock-data";
import { Bell, CheckCircle, AlertTriangle, Info, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const severityIcon = {
  critical: AlertTriangle,
  warning: AlertTriangle,
  info: Info,
};

const severityStyle = {
  critical: "border-destructive/30 bg-destructive/5",
  warning: "border-warning/30 bg-warning/5",
  info: "border-primary/30 bg-primary/5",
};

const severityTextStyle = {
  critical: "text-destructive",
  warning: "text-warning",
  info: "text-primary",
};

const Alerts = () => {
  const [alertList, setAlertList] = useState<Alert[]>(initialAlerts);
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const toggleStatus = (id: string) => {
    setAlertList((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "resolved" ? "new" : "resolved" }
          : a
      )
    );
  };

  const filtered = alertList
    .filter((a) => filterSeverity === "all" || a.severity === filterSeverity)
    .filter((a) => filterStatus === "all" || a.status === filterStatus);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Alerts</h1>
            <p className="text-muted-foreground mt-1">{alertList.filter((a) => a.status !== "resolved").length} active alerts</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p>No alerts match your filters.</p>
            </div>
          )}
          {filtered.map((alert) => {
            const Icon = severityIcon[alert.severity];
            return (
              <div
                key={alert.id}
                className={cn(
                  "flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border transition-all",
                  alert.status === "resolved" ? "opacity-60 bg-muted/50 border-border" : severityStyle[alert.severity]
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", severityTextStyle[alert.severity])} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{alert.farmName}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.createdAt}</p>
                  </div>
                </div>
                <Button
                  variant={alert.status === "resolved" ? "outline" : "hero"}
                  size="sm"
                  className="h-10 px-4 shrink-0"
                  onClick={() => toggleStatus(alert.id)}
                >
                  <CheckCircle className="w-4 h-4" />
                  {alert.status === "resolved" ? "Reopen" : "Resolve"}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Alerts;
