import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import DataTable from "@/components/DataTable";
import SeverityBadge from "@/components/SeverityBadge";
import { recentScans, type ScanResult } from "@/lib/mock-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileBarChart } from "lucide-react";

const Reports = () => {
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const filtered = severityFilter === "all"
    ? recentScans
    : recentScans.filter((s) => s.severity === severityFilter);

  const columns = [
    { key: "farmName", label: "Farm" },
    { key: "zoneName", label: "Zone" },
    { key: "date", label: "Date" },
    {
      key: "severity",
      label: "Severity",
      render: (item: ScanResult) => <SeverityBadge severity={item.severity} size="md" />,
    },
    {
      key: "confidence",
      label: "Confidence",
      render: (item: ScanResult) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${item.confidence}%` }} />
          </div>
          <span className="text-sm font-medium">{item.confidence}%</span>
        </div>
      ),
    },
    {
      key: "affectedArea",
      label: "Affected Area",
      render: (item: ScanResult) => <span>{item.affectedArea}%</span>,
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground mt-1">Disease detection reports & history</p>
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-sm text-muted-foreground shrink-0">Filter:</Label>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="Healthy">Healthy</SelectItem>
                <SelectItem value="Mild">Mild</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Severe">Severe</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(["Healthy", "Mild", "Moderate", "Severe"] as const).map((level) => {
            const count = recentScans.filter((s) => s.severity === level).length;
            return (
              <div key={level} className="rounded-xl border bg-card shadow-card p-4 text-center">
                <SeverityBadge severity={level} size="md" />
                <p className="text-2xl font-bold text-foreground mt-2">{count}</p>
                <p className="text-xs text-muted-foreground">scans</p>
              </div>
            );
          })}
        </div>

        <DataTable columns={columns} data={filtered} emptyMessage="No reports match the selected filter." />
      </div>
    </AppLayout>
  );
};

export default Reports;
