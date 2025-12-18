import React from "react";
import { MarketData } from "../types";
import "./DataGrid.css";

interface DataGridProps {
  marketData: MarketData;
}

interface DataRow {
  label: string;
  value: string | number | null | undefined;
  subLabel?: string;
  highlight?: boolean;
}

const DataRow: React.FC<{ row: DataRow }> = ({ row }) => (
  <div className="data-grid-row">
    <div className="data-grid-label-container">
      <span className={`data-grid-label ${row.highlight ? "highlight" : ""}`}>
        {row.label}
      </span>
      {row.subLabel && (
        <span className="data-grid-sublabel">{row.subLabel}</span>
      )}
    </div>
    <span className={`data-grid-value ${row.highlight ? "highlight" : ""}`}>
      {row.value}
    </span>
  </div>
);

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <h4 className="data-grid-section-header">{title}</h4>
);

const DataGrid: React.FC<DataGridProps> = ({ marketData }) => {
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

  const formatPercent = (value: any): string => {
    if (value === "N/A" || !value) return "N/A";
    const num = typeof value === "string" ? parseFloat(value) : value;
    return `${(num * 100).toFixed(2)}%`;
  };

  const formatRatio = (value: any): string => {
    if (value === "N/A" || !value) return "N/A";
    const num = typeof value === "string" ? parseFloat(value) : value;
    return `${num.toFixed(2)}x`;
  };

  return (
    <div className="data-grid-container">
      {/* Column 1: Market Data */}
      <div className="data-grid-card">
        <SectionHeader title="Market Data" />
        <DataRow
          row={{ label: "Open", value: formatValue(marketData.current_price) }}
        />
        <DataRow
          row={{
            label: "High/Low",
            value: `${formatValue(marketData["52_week_high"])} / ${formatValue(
              marketData["52_week_low"]
            )}`,
          }}
        />
        <DataRow
          row={{
            label: "Volume",
            value: formatVolume(marketData.volume),
            subLabel: `Avg: ${formatVolume(marketData.avg_volume)}`,
            highlight: true,
          }}
        />
        <DataRow
          row={{
            label: "52W Range",
            value: `${formatValue(marketData["52_week_low"])} - ${formatValue(
              marketData["52_week_high"]
            )}`,
          }}
        />
        <DataRow
          row={{ label: "Beta (5Y)", value: formatValue(marketData.beta) }}
        />
        <DataRow
          row={{
            label: "Short Interest",
            value: formatPercent(marketData.short_interest),
          }}
        />
      </div>

      {/* Column 2: Valuation */}
      <div className="data-grid-card">
        <SectionHeader title="Valuation" />
        <DataRow
          row={{
            label: "Market Cap",
            value: marketData.market_cap || "N/A",
            highlight: true,
          }}
        />
        <DataRow
          row={{
            label: "Enterprise Value",
            value: formatValue(marketData.enterprise_value),
          }}
        />
        <DataRow
          row={{
            label: "Trailing P/E",
            value: formatRatio(marketData.pe_ratio),
          }}
        />
        <DataRow
          row={{ label: "PEG Ratio", value: formatRatio(marketData.peg_ratio) }}
        />
        <DataRow
          row={{
            label: "Price/Book",
            value: formatRatio(marketData.price_to_book),
          }}
        />
        <DataRow
          row={{
            label: "EV/EBITDA",
            value: formatRatio(marketData.ev_to_ebitda),
          }}
        />
        <DataRow
          row={{
            label: "Div Yield",
            value: formatValue(marketData.dividend_yield),
          }}
        />
      </div>

      {/* Column 3: Profitability */}
      <div className="data-grid-card">
        <SectionHeader title="Profitability" />
        <DataRow
          row={{
            label: "EPS (TTM)",
            value: "N/A",
            highlight: true,
          }}
        />
        <DataRow row={{ label: "ROE", value: formatPercent(marketData.roe) }} />
        <DataRow row={{ label: "ROA", value: formatPercent(marketData.roa) }} />
        <DataRow
          row={{
            label: "Gross Margin",
            value: formatPercent(marketData.gross_margins),
          }}
        />
        <DataRow
          row={{
            label: "Operating Margin",
            value: formatPercent(marketData.operating_margins),
          }}
        />
        <DataRow
          row={{
            label: "Net Profit Margin",
            value: formatPercent(marketData.operating_margins),
          }}
        />
      </div>

      {/* Column 4: Financial Strength */}
      <div className="data-grid-card">
        <SectionHeader title="Financial Strength" />
        <DataRow
          row={{
            label: "Total Debt/Eq",
            value: formatRatio(marketData.debt_to_equity),
          }}
        />
        <DataRow
          row={{
            label: "Current Ratio",
            value: formatRatio(marketData.current_ratio),
          }}
        />
        <DataRow
          row={{
            label: "Quick Ratio",
            value: formatRatio(marketData.quick_ratio),
          }}
        />

        <div className="data-grid-subsection">
          <span className="data-grid-subsection-label">OWNERSHIP</span>
        </div>
        <DataRow
          row={{
            label: "Institutions",
            value: formatPercent(marketData.institutional_holdings),
          }}
        />
        <DataRow
          row={{
            label: "Insiders",
            value: formatPercent(marketData.insider_holdings),
          }}
        />

        {(marketData.sector !== "N/A" || marketData.industry !== "N/A") && (
          <div className="company-info-box">
            <div className="company-info-row">
              <span className="info-label">Sector</span>
              <span className="info-value">{marketData.sector || "N/A"}</span>
            </div>
            <div className="company-info-row">
              <span className="info-label">Industry</span>
              <span className="info-value">{marketData.industry || "N/A"}</span>
            </div>
            {marketData.earnings_date && marketData.earnings_date !== "N/A" && (
              <div className="company-info-row">
                <span className="info-label">Earnings</span>
                <span className="info-value earnings-highlight">
                  {marketData.earnings_date}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataGrid;
