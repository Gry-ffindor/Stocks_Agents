import React from "react";
import { RiskAnalysis } from "../types";
import "./RiskAnalysisCard.css";

interface Props {
  analysis: RiskAnalysis;
}

const RiskAnalysisCard: React.FC<Props> = ({ analysis }) => {
  if (!analysis) return null;

  // Derive missing metrics from available data for UI compatibility
  const getRiskLevel = (volatilityText: string) => {
    if (volatilityText.toLowerCase().includes("high")) return "High Risk";
    if (volatilityText.toLowerCase().includes("low")) return "Low Risk";
    return "Moderate Risk";
  };

  const riskLevel = getRiskLevel(analysis.volatility_assessment);

  const getRiskBadgeColor = (level: string) => {
    if (level.includes("Low")) return "risk-badge-low";
    if (level.includes("High")) return "risk-badge-high";
    return "risk-badge-moderate";
  };

  // Calculate a mock safety score based on risk level
  const safetyScore = riskLevel.includes("Low")
    ? 85
    : riskLevel.includes("High")
    ? 45
    : 65;

  return (
    <div className="risk-analysis-container">
      {/* Middle Row: Risk Analysis & Volatility */}
      <div className="risk-grid">
        {/* Risk Metrics Card */}
        <div className="risk-management-card">
          <div className="risk-card-header">
            <div className="risk-title-group">
              <svg
                className="w-5 h-5 text-emerald-400"
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
                <path d="m9 12 2 2 4-4" />
              </svg>
              <h3>Risk Management</h3>
            </div>
            <span
              className={`risk-level-badge ${getRiskBadgeColor(riskLevel)}`}
            >
              {riskLevel}
            </span>
          </div>

          <div className="risk-metrics-row">
            <div className="risk-metric">
              <span className="metric-label">Risk/Reward</span>
              <p className="metric-value">{analysis.risk_reward_t1}</p>
            </div>
            <div className="risk-metric">
              <span className="metric-label">Est. Risk</span>
              <p className="metric-value-risk">{analysis.risk_percentage}</p>
            </div>
          </div>

          <div className="safety-score-section">
            <div className="safety-header">
              <span>Safety Score</span>
              <span>{safetyScore}/100</span>
            </div>
            <div className="safety-bar-bg">
              <div
                className="safety-bar-fill"
                style={{
                  width: `${safetyScore}%`,
                  backgroundColor: riskLevel.includes("High")
                    ? "#f43f5e"
                    : "#10b981",
                }}
              ></div>
            </div>
          </div>

          <div className="volatility-section">
            <div className="volatility-header">
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
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              VOLATILITY ASSESSMENT
            </div>
            <div className="volatility-content">
              <p>"{analysis.volatility_assessment}"</p>
            </div>
          </div>
        </div>

        {/* Detailed Risks & Mitigation */}
        <div className="risk-details-card">
          <div className="risk-column">
            <div className="column-header risks">
              <svg
                className="w-4 h-4"
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
              <h4>Key Identified Risks</h4>
            </div>
            <ul className="risk-list">
              {analysis.key_risks?.map((risk: any, idx) => {
                // Defensive check: Handle if risk is object (LLM sometimes structures it)
                let riskText = risk;
                if (typeof risk === "object") {
                  riskText =
                    risk.risk ||
                    risk.explanation ||
                    risk.description ||
                    Object.values(risk).join(": ");
                }
                return (
                  <li key={idx} className="risk-item">
                    <span className="bullet risk"></span>
                    {String(riskText)}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="risk-column">
            <div className="column-header mitigation">
              <svg
                className="w-4 h-4"
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
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              <h4>Mitigation Strategies</h4>
            </div>
            <ul className="risk-list">
              {analysis.risk_mitigation?.map((strategy: any, idx) => {
                // Defensive check
                let strategyText = strategy;
                if (typeof strategy === "object") {
                  strategyText =
                    strategy.strategy ||
                    strategy.mitigation ||
                    strategy.advice ||
                    Object.values(strategy).join(": ");
                }
                return (
                  <li key={idx} className="risk-item">
                    <span className="bullet mitigation"></span>
                    {String(strategyText)}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysisCard;
