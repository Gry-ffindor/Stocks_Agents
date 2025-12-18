import React from "react";
import { TechIndicator } from "../types";
import "./DataGrid.css";

interface Props {
  data: {
    rsi: TechIndicator;
    stoch: TechIndicator;
    cci: TechIndicator;
    macd: TechIndicator;
    adx: TechIndicator;
    momentum: TechIndicator;
  };
}

const ActionLabel = ({ action }: { action: string }) => {
  const color =
    action === "BUY" ? "#3b82f6" : action === "SELL" ? "#f43f5e" : "#9ca3af";
  return (
    <span style={{ fontSize: "0.625rem", fontWeight: 700, color }}>
      {action === "NEUTRAL" ? "—" : action}
    </span>
  );
};

const Row = ({
  name,
  value,
  action,
}: {
  name: string;
  value: number;
  action: string;
}) => (
  <div className="data-grid-row">
    <div className="data-grid-label-container" style={{ flex: 1 }}>
      <span className="data-grid-label">{name}</span>
    </div>
    <span
      className="data-grid-value"
      style={{ minWidth: "80px", textAlign: "right" }}
    >
      {value.toFixed(2)}
    </span>
    <div style={{ minWidth: "40px", textAlign: "right" }}>
      <ActionLabel action={action} />
    </div>
  </div>
);

const TechnicalOscillators: React.FC<Props> = ({ data }) => {
  return (
    <div
      className="data-grid-card"
      style={{
        background: "rgba(17, 24, 39, 0.3)",
        border: "1px solid rgba(55, 65, 81, 0.5)",
        borderRadius: "0.5rem",
        padding: "0.25rem",
      }}
    >
      <h4 className="data-grid-section-header">Oscillators</h4>

      {/* Header Row */}
      <div
        className="data-grid-row"
        style={{ borderBottom: "1px solid rgba(31, 41, 55, 1)" }}
      >
        <div className="data-grid-label-container" style={{ flex: 1 }}>
          <span
            className="data-grid-label"
            style={{
              fontWeight: 700,
              textTransform: "uppercase",
              fontSize: "0.625rem",
            }}
          >
            Name
          </span>
        </div>
        <span
          className="data-grid-value"
          style={{
            minWidth: "80px",
            textAlign: "right",
            fontWeight: 700,
            fontSize: "0.625rem",
            textTransform: "uppercase",
          }}
        >
          Value
        </span>
        <span
          style={{
            minWidth: "40px",
            textAlign: "right",
            fontWeight: 700,
            fontSize: "0.625rem",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
          }}
        >
          Action
        </span>
      </div>

      {/* Data Rows */}
      <Row name="RSI (14)" value={data.rsi.value} action={data.rsi.action} />
      <Row
        name="Stoch %K (14, 3, 3)"
        value={data.stoch.value}
        action={data.stoch.action}
      />
      <Row name="CCI (20)" value={data.cci.value} action={data.cci.action} />
      <Row name="ADX (14)" value={data.adx.value} action={data.adx.action} />
      <Row
        name="Awesome Osc"
        value={data.momentum.value}
        action={data.momentum.action}
      />
      <Row
        name="MACD (12, 26)"
        value={data.macd.value}
        action={data.macd.action}
      />
    </div>
  );
};

export default TechnicalOscillators;
