import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import './PriceTrendChart.css';

function PriceTrendChart({ currentPrice, weekHigh, weekLow }) {
  // Parse values
  const current = parseFloat(currentPrice) || 0;
  const high = parseFloat(weekHigh) || 0;
  const low = parseFloat(weekLow) || 0;

  if (!current || !high || !low) {
    return null;
  }

  const data = [
    { name: '52W Low', value: low, type: 'low' },
    { name: 'Current', value: current, type: 'current' },
    { name: '52W High', value: high, type: 'high' },
  ];

  const getBarColor = (type) => {
    switch (type) {
      case 'low': return '#ef4444'; // Red for low
      case 'current': return '#3b82f6'; // Blue for current
      case 'high': return '#10b981'; // Green for high
      default: return '#6b7280';
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].payload.name}</p>
          <p className="tooltip-value">₹{payload[0].value.toLocaleString('en-IN')}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="price-chart-section">
      <h2 className="section-title">Price Range (52 Weeks)</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.type)} />
              ))}
            </Bar>
            <ReferenceLine
              y={current}
              stroke="#3b82f6"
              strokeDasharray="3 3"
              label={{ value: 'Current Price', position: 'right' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PriceTrendChart;
