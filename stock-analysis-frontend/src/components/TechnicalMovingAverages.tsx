import React from "react";
import { MovingAverageData } from "../types";
import "./DataGrid.css";

interface Props {
  data: {
    ma10: { simple: MovingAverageData; exponential: MovingAverageData };
    ma20: { simple: MovingAverageData; exponential: MovingAverageData };
    ma50: { simple: MovingAverageData; exponential: MovingAverageData };
    ma100: { simple: MovingAverageData; exponential: MovingAverageData };
    ma200: { simple: MovingAverageData; exponential: MovingAverageData };
  };
}

const ActionText = ({ action }: { action: string }) => {
  const color =
    action === "BUY" ? "#3b82f6" : action === "SELL" ? "#f43f5e" : "#9ca3af";
  return (
    <span style={{ fontSize: "0.625rem", fontWeight: 700, color }}>
      {action === "NEUTRAL" ? "—" : action}
    </span>
  );
};

const Row = ({
  period,
  simple,
  exponential,
}: {
  period: number;
  simple: MovingAverageData;
  exponential: MovingAverageData;
}) => (
  <div className="data-grid-row">
    <div className="data-grid-label-container" style={{ width: "60px" }}>
      <span className="data-grid-label">MA{period}</span>
    </div>
    <div
      style={{
        flex: 1,
        textAlign: "right",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <span className="data-grid-value">{simple.value.toFixed(2)}</span>
      <ActionText action={simple.action} />
    </div>
    <div
      style={{
        flex: 1,
        textAlign: "right",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <span className="data-grid-value">{exponential.value.toFixed(2)}</span>
      <ActionText action={exponential.action} />
    </div>
  </div>
);

const TechnicalMovingAverages: React.FC<Props> = ({ data }) => {
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
      <h4 className="data-grid-section-header">Moving Averages</h4>

      {/* Header Row */}
      <div
        className="data-grid-row"
        style={{ borderBottom: "1px solid rgba(31, 41, 55, 1)" }}
      >
        <div className="data-grid-label-container" style={{ width: "60px" }}>
          <span
            className="data-grid-label"
            style={{
              fontWeight: 700,
              textTransform: "uppercase",
              fontSize: "0.625rem",
            }}
          >
            Period
          </span>
        </div>
        <span
          className="data-grid-value"
          style={{
            flex: 1,
            textAlign: "right",
            fontWeight: 700,
            fontSize: "0.625rem",
            textTransform: "uppercase",
          }}
        >
          Simple
        </span>
        <span
          className="data-grid-value"
          style={{
            flex: 1,
            textAlign: "right",
            fontWeight: 700,
            fontSize: "0.625rem",
            textTransform: "uppercase",
          }}
        >
          Exponential
        </span>
      </div>

      {/* Data Rows */}
      <Row
        period={10}
        simple={data.ma10.simple}
        exponential={data.ma10.exponential}
      />
      <Row
        period={20}
        simple={data.ma20.simple}
        exponential={data.ma20.exponential}
      />
      <Row
        period={50}
        simple={data.ma50.simple}
        exponential={data.ma50.exponential}
      />
      <Row
        period={100}
        simple={data.ma100.simple}
        exponential={data.ma100.exponential}
      />
      <Row
        period={200}
        simple={data.ma200.simple}
        exponential={data.ma200.exponential}
      />
    </div>
  );
};

export default TechnicalMovingAverages;
