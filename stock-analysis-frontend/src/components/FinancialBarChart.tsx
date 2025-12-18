import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./FinancialBarChart.css";

interface FinancialBarChartProps {
  financialData?: any; // Will use mock data for now
}

const FinancialBarChart: React.FC<FinancialBarChartProps> = ({
  financialData,
}) => {
  // Mock data - this would come from backend in production
  const mockData = [
    {
      period: "Q3 '24",
      revenue: 95000,
      grossProfit: 72000,
      operatingIncome: 45000,
      pretaxIncome: 48000,
      netIncome: 38000,
    },
    {
      period: "Q4 '24",
      revenue: 98000,
      grossProfit: 74000,
      operatingIncome: 46000,
      pretaxIncome: 50000,
      netIncome: 40000,
    },
    {
      period: "Q1 '25",
      revenue: 102000,
      grossProfit: 77000,
      operatingIncome: 48000,
      pretaxIncome: 52000,
      netIncome: 42000,
    },
  ];

  const sanitizedData = financialData || mockData;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              style={{ color: entry.color }}
              className="tooltip-value"
            >
              {entry.name}: ₹{(entry.value / 1000).toFixed(1)}k
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="financial-bar-chart">
      <h3 className="chart-title">Revenue & Income Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={sanitizedData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          barGap={2}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1f2937"
            vertical={false}
          />
          <XAxis
            dataKey="period"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={35}
            tickFormatter={(val) =>
              val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val
            }
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "#1f2937", opacity: 0.4 }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "10px", fontSize: "11px" }}
            iconType="circle"
          />

          <Bar
            dataKey="revenue"
            name="Total revenue"
            fill="#3b82f6"
            radius={[2, 2, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="grossProfit"
            name="Gross profit"
            fill="#22d3ee"
            radius={[2, 2, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="operatingIncome"
            name="Operating income"
            fill="#f97316"
            radius={[2, 2, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="pretaxIncome"
            name="Pretax income"
            fill="#a855f7"
            radius={[2, 2, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="netIncome"
            name="Net income"
            fill="#eab308"
            radius={[2, 2, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialBarChart;
