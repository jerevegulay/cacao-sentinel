import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import SeverityBadge from "@/components/SeverityBadge";
import FarmHealthCard from "@/components/FarmHealthCard";
import FarmerFeedbackForm, { type FeedbackEntry } from "@/components/FarmerFeedbackForm";
import { farms, recentScans } from "@/lib/mock-data";
import { Camera, Radio, Wifi, WifiOff, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Monitoring = () => {
  const [droneStatus, setDroneStatus] = useState<"Active" | "Inactive">("Inactive");
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);
  const [activityLog, setActivityLog] = useState<FeedbackEntry[]>([]);
  const [scanProgress, setScanProgress] = useState(0);

  // Simulate scan progress when drone is active
  useEffect(() => {
    if (droneStatus === "Active") {
      setScanProgress(0);
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setDroneStatus("Inactive");
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [droneStatus]);

  const handleFeedbackSubmit = (entry: FeedbackEntry) => {
    setActivityLog((prev) => [entry, ...prev]);
  };

  const selectedFarm = farms.find((f) => f.id === selectedFarmId);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Monitoring</h1>
            <p className="text-muted-foreground mt-1">Live UAV feed & farm monitoring</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border",
              droneStatus === "Active"
                ? "bg-success/10 border-success/30 text-success"
                : "bg-muted border-border text-muted-foreground"
            )}>
              {droneStatus === "Active" ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              Drone: {droneStatus}
            </div>
            <Button
              variant={droneStatus === "Active" ? "destructive" : "hero"}
              className="h-12 px-6 text-base"
              onClick={() => setDroneStatus(droneStatus === "Active" ? "Inactive" : "Active")}
            >
              <Camera className="w-5 h-5" />
              {droneStatus === "Active" ? "Stop Scan" : "Start Scan"}
            </Button>
          </div>
        </div>

        {/* UAV Live Feed Simulation */}
        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <div className="relative aspect-video bg-foreground/5 flex items-center justify-center">
            {droneStatus === "Active" ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
                <Radio className="w-16 h-16 text-success animate-pulse" />
                <p className="text-lg font-semibold text-foreground">UAV Scan In Progress</p>
                <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success rounded-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{scanProgress}% complete</p>
                <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-success font-medium">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  LIVE
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <Camera className="w-16 h-16" />
                <p className="text-lg font-medium">No Active Feed</p>
                <p className="text-sm">Press "Start Scan" to begin UAV monitoring</p>
              </div>
            )}
          </div>
        </div>

        {/* Farm selection + recent scans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Farm selector */}
          <div className="rounded-xl border bg-card shadow-card p-5">
            <h3 className="text-lg font-semibold text-foreground mb-4">Select Farm</h3>
            <div className="space-y-3">
              {farms.map((farm) => (
                <FarmHealthCard
                  key={farm.id}
                  farm={farm}
                  onClick={(f) => setSelectedFarmId(f.id === selectedFarmId ? null : f.id)}
                />
              ))}
            </div>
          </div>

          {/* Scan results for selected farm */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border bg-card shadow-card p-5">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {selectedFarm ? `Scans — ${selectedFarm.name}` : "Recent Scan Results"}
              </h3>
              <div className="space-y-3">
                {recentScans
                  .filter((s) => !selectedFarm || s.farmName === selectedFarm.name)
                  .map((scan) => (
                    <div
                      key={scan.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border bg-background"
                    >
                      <div className="flex items-center gap-3">
                        <Camera className="w-4 h-4 text-muted-foreground shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{scan.farmName} — {scan.zoneName}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" /> {scan.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <SeverityBadge severity={scan.severity} size="md" />
                        <span className="text-sm font-medium text-foreground">{scan.confidence}%</span>
                      </div>
                    </div>
                  ))}
                {selectedFarm && recentScans.filter((s) => s.farmName === selectedFarm.name).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No scans found for this farm.</p>
                )}
              </div>
            </div>

            {/* Feedback form */}
            <FarmerFeedbackForm onSubmit={handleFeedbackSubmit} />

            {/* Activity log */}
            {activityLog.length > 0 && (
              <div className="rounded-xl border bg-card shadow-card p-5">
                <h3 className="text-lg font-semibold text-foreground mb-4">Activity Log</h3>
                <div className="space-y-2">
                  {activityLog.map((entry) => (
                    <div key={entry.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border bg-background">
                      <div>
                        <p className="text-sm font-medium text-foreground">{entry.farmName}</p>
                        <p className="text-xs text-muted-foreground">{entry.submittedAt} — {entry.confirmation}</p>
                        {entry.notes && <p className="text-xs text-muted-foreground mt-1 italic">"{entry.notes}"</p>}
                      </div>
                      <span className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0",
                        entry.treatmentStatus === "treated" ? "bg-success/15 text-success" :
                        entry.treatmentStatus === "in-progress" ? "bg-warning/15 text-warning" :
                        "bg-destructive/15 text-destructive"
                      )}>
                        {entry.treatmentStatus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Monitoring;
