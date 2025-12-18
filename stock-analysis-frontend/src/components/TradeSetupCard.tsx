import React from "react";
import { TradeSetup } from "../types";
import "./TradeSetupCard.css";

interface Props {
  setup: TradeSetup;
  recommendation?: "BUY" | "SELL" | "HOLD";
  confidenceLevel?: "HIGH" | "MEDIUM" | "LOW";
  atr?: number;
}

const TradeSetupCard: React.FC<Props> = ({
  setup,
  recommendation = "HOLD",
  confidenceLevel = "MEDIUM",
  atr = 0,
}) => {
  const isBullish = setup.signal === "BULLISH";

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "BUY":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "SELL":
        return "bg-rose-500/20 text-rose-400 border-rose-500/30";
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    }
  };

  return (
    <div className="trade-setup-wrapper">
      {/* Agent Verdict - Left Sidebar */}
      <div className="agent-verdict-card">
        <div className="verdict-header">
          <svg
            className="w-5 h-5 text-indigo-400"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
          </svg>
          <h3 className="verdict-title">Agent Verdict</h3>
        </div>

        <div className="verdict-recommendation">
          <span className="verdict-label">Recommendation</span>
          <div
            className={`recommendation-badge ${getRecommendationColor(
              recommendation
            )}`}
          >
            {recommendation}
          </div>
        </div>

        <div className="verdict-details">
          <div className="confidence-row">
            <span className="confidence-label">Confidence</span>
            <span
              className={`confidence-value ${
                confidenceLevel === "HIGH"
                  ? "text-emerald-400"
                  : confidenceLevel === "MEDIUM"
                  ? "text-yellow-400"
                  : "text-gray-400"
              }`}
            >
              {confidenceLevel}
            </span>
          </div>
          <div className="confidence-bar-container">
            <div
              className={`confidence-bar ${
                confidenceLevel === "HIGH"
                  ? "confidence-high"
                  : confidenceLevel === "MEDIUM"
                  ? "confidence-medium"
                  : "confidence-low"
              }`}
            ></div>
          </div>
          <div className="atr-row">
            <span className="atr-label">
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              ATR (14)
            </span>
            <span className="atr-value">{atr.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Actionable Trade Setup - Main Panel */}
      <div className={`trade-setup-panel ${isBullish ? "bullish" : "bearish"}`}>
        <div className="trade-setup-panel-header">
          <div className="panel-title-group">
            <svg
              className="w-5 h-5 text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <h3 className="panel-title">Actionable Trade Setup</h3>
          </div>
          <div className="timeframe-badge-wrapper">
            <svg
              className="w-3.5 h-3.5 text-indigo-300"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="timeframe-text">
              {setup.timeframe || "Swing Trade"}
            </span>
          </div>
        </div>

        <div className="trade-details-grid">
          {/* Entry Zone */}
          <div className="trade-detail-item entry-zone">
            <div className="detail-label entry-label">
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="8 12 12 16 16 12" />
                <line x1="12" y1="8" x2="12" y2="16" />
              </svg>
              Entry Zone
            </div>
            <div className="detail-value-box entry-box">
              <p className="detail-value">{setup.entry_zone}</p>
            </div>
          </div>

          {/* Target Prices */}
          <div className="trade-detail-item targets">
            <div className="detail-label target-label">
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
              Target Prices
            </div>
            <div className="targets-flex">
              <div className="target-box">
                <span className="target-num">T1</span>
                <p className="target-price">{setup.target_1}</p>
              </div>
              <div className="target-box">
                <span className="target-num">T2</span>
                <p className="target-price">{setup.target_2}</p>
              </div>
            </div>
          </div>

          {/* Stop Loss */}
          <div className="trade-detail-item stop-loss">
            <div className="detail-label stop-label">
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12h6" />
              </svg>
              Stop Loss
            </div>
            <div className="detail-value-box stop-box">
              <p className="detail-value stop-value">{setup.stop_loss}</p>
            </div>
          </div>
        </div>

        {/* "Why?" Engine - Target Logic */}
        {setup.target_logic && (
          <div className="logic-section">
            <div className="logic-header">
              <span className="logic-icon">🧠</span>
              <h4 className="logic-title">The Logic ("Why?" Engine)</h4>
            </div>
            <p className="logic-text">{setup.target_logic}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeSetupCard;
