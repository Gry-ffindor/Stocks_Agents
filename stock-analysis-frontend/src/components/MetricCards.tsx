import React from "react";
import { MarketData } from "../types";
import "./MetricCards.css";

interface MetricCardsProps {
  marketData: MarketData;
  stockSymbol: string;
}

interface MetricCardData {
  label: string;
  value: string | number;
  highlight?: boolean;
}

const MetricCards: React.FC<MetricCardsProps> = ({
  marketData,
  stockSymbol,
}) => {
  const formatValue = (value: any): string => {
    if (value === null || value === undefined || value === "N/A") {
      return "N/A";
    }
    if (typeof value === "string") {
      return value;
    }
    if (typeof value === "number") {
      return value.toLocaleString("en-IN");
    }
    return String(value);
  };

  const formatVolume = (volume: any): string => {
    if (volume === "N/A" || !volume) return "N/A";
    const num =
      typeof volume === "string"
        ? parseFloat(volume.replace(/,/g, ""))
        : volume;
    if (num >= 10000000) return `${(num / 10000000).toFixed(2)}Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(2)}L`;
    return formatValue(num);
  };

  const cards: MetricCardData[] = [
    { label: "OPEN", value: formatValue(marketData.current_price) },
    { label: "HIGH", value: formatValue(marketData["52_week_high"]) },
    { label: "LOW", value: formatValue(marketData["52_week_low"]) },
    { label: "PREV CLOSE", value: formatValue(marketData.current_price) },
    {
      label: "VOLUME",
      value: formatVolume(marketData.volume),
      highlight: true,
    },
    { label: "MARKET CAP", value: marketData.market_cap || "N/A" },
    { label: "P/E RATIO", value: formatValue(marketData.pe_ratio) },
  ];

  return (
    <div className="metric-cards-container">
      {cards.map((card, index) => (
        <div key={index} className="metric-card">
          <div className="metric-label">{card.label}</div>
          <div className={`metric-value ${card.highlight ? "highlight" : ""}`}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricCards;
