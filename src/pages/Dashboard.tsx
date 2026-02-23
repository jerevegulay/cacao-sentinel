import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/dashboard/StatCard";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import FarmHealthChart from "@/components/dashboard/FarmHealthChart";
import RecentScans from "@/components/dashboard/RecentScans";
import FarmStatusGrid from "@/components/dashboard/FarmStatusGrid";
import { dashboardStats } from "@/lib/mock-data";
import { TreePine, Camera, Bug, HeartPulse, Radio, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const [droneStatus, setDroneStatus] = useState<"Active" | "Inactive">("Inactive");
  const [notificationCount, setNotificationCount] = useState(3);

  const handleStartScan = () => {
    setDroneStatus((prev) => (prev === "Active" ? "Inactive" : "Active"));
  };

  const handleDismissNotifications = () => {
    setNotificationCount(0);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header with drone status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Black Pod Disease monitoring overview</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Notification badge */}
            <button
              onClick={handleDismissNotifications}
              className={cn(
                "relative px-3 py-2 rounded-lg text-sm font-medium border transition-colors",
                notificationCount > 0
                  ? "bg-destructive/10 border-destructive/30 text-destructive"
                  : "bg-muted border-border text-muted-foreground"
              )}
            >
              {notificationCount > 0 ? `${notificationCount} Alerts` : "No Alerts"}
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
              )}
            </button>

            {/* Drone status indicator */}
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
              className="h-10 px-4"
              onClick={handleStartScan}
            >
              <Radio className="w-4 h-4" />
              {droneStatus === "Active" ? "Stop Scan" : "Start Scan"}
            </Button>

            <Button variant="outline" onClick={() => navigate("/monitoring")}>
              <Camera className="w-4 h-4" /> Live Feed
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Farms" value={dashboardStats.totalFarms} subtitle="Registered in Initao" icon={TreePine} trend={{ value: 8, positive: true }} />
          <StatCard title="UAV Scans" value={dashboardStats.totalScans} subtitle="This month" icon={Camera} trend={{ value: 12, positive: true }} />
          <StatCard title="Detected Cases" value={dashboardStats.detectedCases} subtitle="Active infections" icon={Bug} variant="warning" trend={{ value: 3, positive: false }} />
          <StatCard title="Farm Health" value={`${dashboardStats.healthyPercentage}%`} subtitle="Overall healthy" icon={HeartPulse} variant="primary" />
        </div>

        {/* Charts & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FarmHealthChart />
          </div>
          <AlertsPanel />
        </div>

        {/* Scans & Farm Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentScans />
          </div>
          <FarmStatusGrid />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
