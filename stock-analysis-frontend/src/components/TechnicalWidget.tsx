import React from "react";
import { TechnicalIndicators } from "../types";
import TechnicalGauge from "./TechnicalGauge";
import TechnicalOscillators from "./TechnicalOscillators";
import TechnicalMovingAverages from "./TechnicalMovingAverages";
import "./DataGrid.css";

interface TechnicalWidgetProps {
  technicalIndicators?: TechnicalIndicators;
  currentPrice: number | string;
}

const TechnicalWidget: React.FC<TechnicalWidgetProps> = ({
  technicalIndicators,
  currentPrice,
}) => {
  if (!technicalIndicators) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No technical indicators available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Gauges Section - ABSOLUTELY FORCE HORIZONTAL */}
      <div
        className="flex flex-row flex-nowrap gap-8 w-full"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: "2rem",
        }}
      >
        <div className="flex-1 min-w-0" style={{ flex: "1 1 0" }}>
          <TechnicalGauge
            title="Summary"
            rating={technicalIndicators.overall_signal}
            buy={technicalIndicators.summary?.buy || 0}
            sell={technicalIndicators.summary?.sell || 0}
            neutral={technicalIndicators.summary?.neutral || 0}
          />
        </div>
        <div className="flex-1 min-w-0" style={{ flex: "1 1 0" }}>
          <TechnicalGauge
            title="Oscillators"
            rating={technicalIndicators.oscillators?.rating || "Neutral"}
            buy={technicalIndicators.oscillators?.buy || 0}
            sell={technicalIndicators.oscillators?.sell || 0}
            neutral={technicalIndicators.oscillators?.neutral || 0}
          />
        </div>
        <div className="flex-1 min-w-0" style={{ flex: "1 1 0" }}>
          <TechnicalGauge
            title="Moving Averages"
            rating={technicalIndicators.moving_averages?.rating || "Neutral"}
            buy={technicalIndicators.moving_averages?.buy || 0}
            sell={technicalIndicators.moving_averages?.sell || 0}
            neutral={technicalIndicators.moving_averages?.neutral || 0}
          />
        </div>
      </div>

      {/* Tables Section - Using CSS Grid like DataGrid */}
      <div
        className="data-grid-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          width: "100%",
          marginTop: "2rem",
        }}
      >
        {/* Column 1: Oscillators */}
        {technicalIndicators.oscillators && (
          <TechnicalOscillators data={technicalIndicators.oscillators} />
        )}

        {/* Column 2: Moving Averages */}
        {technicalIndicators.moving_averages && (
          <TechnicalMovingAverages data={technicalIndicators.moving_averages} />
        )}

        {/* Column 3: Pivot Points */}
        <div
          className="data-grid-card"
          style={{
            background: "rgba(17, 24, 39, 0.3)",
            border: "1px solid rgba(55, 65, 81, 0.5)",
            borderRadius: "0.5rem",
            padding: "0.25rem",
          }}
        >
          <h4 className="data-grid-section-header">Pivot Points</h4>

          {/* Header Row */}
          <div
            className="data-grid-row"
            style={{ borderBottom: "1px solid rgba(31, 41, 55, 1)" }}
          >
            <div
              className="data-grid-label-container"
              style={{ width: "80px" }}
            >
              <span className="data-grid-label">Level</span>
            </div>
            <span
              className="data-grid-value"
              style={{ flex: 1, textAlign: "center" }}
            >
              Support
            </span>
            <span
              className="data-grid-value"
              style={{ flex: 1, textAlign: "right" }}
            >
              Resistance
            </span>
          </div>

          {/* Data Rows */}
          {[0, 1, 2].map((i) => (
            <div key={i} className="data-grid-row">
              <div
                className="data-grid-label-container"
                style={{ width: "80px" }}
              >
                <span className="data-grid-label">Layer {i + 1}</span>
              </div>
              <span
                className="data-grid-value"
                style={{ flex: 1, textAlign: "center", color: "#10b981" }}
              >
                ₹{technicalIndicators.support_levels?.[i]?.toFixed(2) || "-"}
              </span>
              <span
                className="data-grid-value"
                style={{ flex: 1, textAlign: "right", color: "#f43f5e" }}
              >
                ₹{technicalIndicators.resistance_levels?.[i]?.toFixed(2) || "-"}
              </span>
            </div>
          ))}

          {/* Current Price Badge */}
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "rgba(31, 41, 55, 0.5)",
                padding: "0.25rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                color: "#9ca3af",
                fontFamily: "SF Mono, Monaco, monospace",
                border: "1px solid rgba(55, 65, 81, 0.5)",
              }}
            >
              Current: <span style={{ color: "white" }}>₹{currentPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalWidget;
