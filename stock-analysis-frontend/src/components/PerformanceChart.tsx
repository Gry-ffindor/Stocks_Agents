import React from "react";
import { QuarterlyFinancial } from "../types";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";
import "./PerformanceChart.css";

interface PerformanceChartProps {
  quarterlyFinancials?: QuarterlyFinancial[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  quarterlyFinancials,
}) => {
  console.log("PerformanceChart received data:", quarterlyFinancials);

  // Temporary mock data for debugging
  const mockData = [
    { period: "Sep 2024", revenue: 12500, netIncome: 4200 },
    { period: "Dec 2024", revenue: 13100, netIncome: 4500 },
    { period: "Mar 2025", revenue: 13800, netIncome: 4800 },
    { period: "Jun 2025", revenue: 14200, netIncome: 5000 },
  ];

  const chartData =
    quarterlyFinancials && quarterlyFinancials.length > 0
      ? quarterlyFinancials
      : mockData;

  console.log("Using chart data:", chartData);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="performance-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              style={{ color: entry.color }}
              className="tooltip-value"
            >
              {entry.name}: ₹{entry.value.toFixed(2)}Cr
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="performance-chart">
      <div className="chart-header">
        <h3 className="chart-heading">
          <TrendingUp className="heading-icon" />
          Performance Chart
        </h3>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot revenue"></span>
            <span className="legend-label">Revenue</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot income"></span>
            <span className="legend-label">Net Income</span>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1f2937"
              vertical={false}
            />
            <XAxis
              dataKey="period"
              tick={{ fill: "#6b7280", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: "#6b7280", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) =>
                val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val
              }
              width={35}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "#6b7280", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) =>
                val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val
              }
              width={35}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "#1f2937", opacity: 0.4 }}
            />
            <Bar
              yAxisId="left"
              dataKey="revenue"
              name="Revenue"
              fill="url(#colorRevenue)"
              barSize={32}
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="netIncome"
              name="Net Income"
              stroke="#facc15"
              strokeWidth={2}
              dot={{ r: 4, fill: "#facc15", strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
