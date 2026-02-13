import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/dashboard/StatCard";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import FarmHealthChart from "@/components/dashboard/FarmHealthChart";
import RecentScans from "@/components/dashboard/RecentScans";
import FarmStatusGrid from "@/components/dashboard/FarmStatusGrid";
import { dashboardStats } from "@/lib/mock-data";
import { TreePine, Camera, Bug, HeartPulse } from "lucide-react";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Black Pod Disease monitoring overview</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Farms"
            value={dashboardStats.totalFarms}
            subtitle="Registered in Initao"
            icon={TreePine}
            trend={{ value: 8, positive: true }}
          />
          <StatCard
            title="UAV Scans"
            value={dashboardStats.totalScans}
            subtitle="This month"
            icon={Camera}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Detected Cases"
            value={dashboardStats.detectedCases}
            subtitle="Active infections"
            icon={Bug}
            variant="warning"
            trend={{ value: 3, positive: false }}
          />
          <StatCard
            title="Farm Health"
            value={`${dashboardStats.healthyPercentage}%`}
            subtitle="Overall healthy"
            icon={HeartPulse}
            variant="primary"
          />
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
