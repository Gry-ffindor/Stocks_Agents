import { useState } from "react";
import "./FinancialsPanel.css";

function FinancialsPanel({ financials }) {
  const [activeTab, setActiveTab] = useState("income_statement");

  if (!financials || Object.keys(financials).length === 0) {
    return null;
  }

  const tabs = [
    { id: "income_statement", label: "Income Statement" },
    { id: "balance_sheet", label: "Balance Sheet" },
    { id: "cash_flow", label: "Cash Flow" },
  ];

  // Helper to transform data for the table
  const getTableData = () => {
    const currentData = financials[activeTab];
    if (!currentData) return { dates: [], metrics: [] };

    // Get all dates and sort them (newest first)
    const dates = Object.keys(currentData).sort(
      (a, b) => new Date(b) - new Date(a)
    );

    // Get all unique metric names
    const allMetrics = new Set();
    dates.forEach((date) => {
      Object.keys(currentData[date] || {}).forEach((metric) =>
        allMetrics.add(metric)
      );
    });
    const metrics = Array.from(allMetrics);

    return { dates, metrics, data: currentData };
  };

  const { dates, metrics, data } = getTableData();

  const formatNumber = (num) => {
    if (num === null || num === undefined) return "-";
    if (typeof num !== "number") return num;

    // Format large numbers (Crores)
    if (Math.abs(num) >= 10000000) {
      return (num / 10000000).toFixed(2) + " Cr";
    }
    return num.toLocaleString();
  };

  return (
    <div className="financials-panel">
      <div className="financials-header">
        <h3 className="financials-title">Financial Statements</h3>
        <div className="financials-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table className="financials-table">
          <thead>
            <tr>
              <th className="metric-col">Metric</th>
              {dates.map((date) => (
                <th key={date}>{date}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric}>
                <td className="metric-name">{metric}</td>
                {dates.map((date) => (
                  <td key={`${metric}-${date}`}>
                    {formatNumber(data[date][metric])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FinancialsPanel;
