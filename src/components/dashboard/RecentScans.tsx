import { recentScans } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Camera, TrendingUp } from "lucide-react";

const severityBadge = {
  Healthy: "bg-success/15 text-success",
  Mild: "bg-accent/15 text-accent-foreground",
  Moderate: "bg-warning/15 text-warning",
  Severe: "bg-destructive/15 text-destructive",
};

const RecentScans = () => {
  return (
    <div className="rounded-xl border bg-card shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent UAV Scans</h3>
        <Camera className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left pb-3 font-medium text-muted-foreground">Farm</th>
              <th className="text-left pb-3 font-medium text-muted-foreground">Zone</th>
              <th className="text-left pb-3 font-medium text-muted-foreground">Date</th>
              <th className="text-left pb-3 font-medium text-muted-foreground">Severity</th>
              <th className="text-left pb-3 font-medium text-muted-foreground">Confidence</th>
              <th className="text-left pb-3 font-medium text-muted-foreground">Affected</th>
            </tr>
          </thead>
          <tbody>
            {recentScans.map((scan) => (
              <tr key={scan.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-3 font-medium text-foreground">{scan.farmName}</td>
                <td className="py-3 text-muted-foreground">{scan.zoneName}</td>
                <td className="py-3 text-muted-foreground">{scan.date}</td>
                <td className="py-3">
                  <span className={cn("px-2 py-1 rounded-full text-xs font-medium", severityBadge[scan.severity])}>
                    {scan.severity}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-foreground font-medium">{scan.confidence}%</span>
                  </div>
                </td>
                <td className="py-3 text-muted-foreground">{scan.affectedArea}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentScans;
