import { monthlyTrends } from "@/lib/mock-data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const FarmHealthChart = () => {
  return (
    <div className="rounded-xl border bg-card shadow-card p-5">
      <h3 className="text-lg font-semibold text-foreground mb-4">Disease Trend (6 Months)</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyTrends} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 15% 87%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(150 10% 45%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(150 10% 45%)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(40, 20%, 97%)",
                border: "1px solid hsl(40, 15%, 87%)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
            <Area type="monotone" dataKey="healthy" stackId="1" stroke="hsl(145, 55%, 38%)" fill="hsl(145, 55%, 38%)" fillOpacity={0.6} name="Healthy" />
            <Area type="monotone" dataKey="mild" stackId="1" stroke="hsl(85, 60%, 40%)" fill="hsl(85, 60%, 40%)" fillOpacity={0.6} name="Mild" />
            <Area type="monotone" dataKey="moderate" stackId="1" stroke="hsl(35, 90%, 50%)" fill="hsl(35, 90%, 50%)" fillOpacity={0.6} name="Moderate" />
            <Area type="monotone" dataKey="severe" stackId="1" stroke="hsl(0, 72%, 50%)" fill="hsl(0, 72%, 50%)" fillOpacity={0.6} name="Severe" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FarmHealthChart;
