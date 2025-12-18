import React from "react";
import { SentimentPanelsProps } from "../types";
import "./SentimentPanels.css";
import TradeSetupCard from "./TradeSetupCard";
import RiskAnalysisCard from "./RiskAnalysisCard";

const SentimentPanels: React.FC<SentimentPanelsProps> = ({
  structuredAnalysis,
}) => {
  if (!structuredAnalysis) {
    return null;
  }

  const {
    summary,
    bullish_factors = [],
    bearish_factors = [],
    trade_setup,
    recommendation = "HOLD",
    confidence_level = "MEDIUM",
    risk_analysis,
  } = structuredAnalysis;

  return (
    <div className="sentiment-section">
      {/* Smart Trade Setup Card */}
      {trade_setup && (
        <>
          <TradeSetupCard
            setup={trade_setup}
            recommendation={recommendation}
            confidenceLevel={confidence_level}
            atr={46.3}
          />
          {risk_analysis && <RiskAnalysisCard analysis={risk_analysis} />}
        </>
      )}

      {summary && (
        <div className="strategic-summary-card">
          <div className="summary-header">
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
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <h3>Strategic Agent Summary</h3>
          </div>
          <p className="summary-text">{summary}</p>
        </div>
      )}

      <div className="sentiment-panels">
        {/* Bearish Panel */}
        <div className="sentiment-panel bearish-panel">
          <div className="panel-header">
            <div className="panel-icon">📉</div>
            <h3 className="panel-title">Bearish Factors</h3>
          </div>
          <div className="panel-content">
            {bearish_factors.length > 0 ? (
              <ul className="factor-list">
                {bearish_factors.map((item: any, index) => {
                  // Defensive check: Handle if item is just a string (old format) or object
                  const factorText =
                    typeof item === "string"
                      ? item
                      : typeof item.factor === "string"
                      ? item.factor
                      : JSON.stringify(item);
                  const confidence =
                    typeof item === "object" && item.confidence
                      ? item.confidence
                      : 0;

                  return (
                    <li key={index} className="factor-item">
                      <div className="factor-text">{factorText}</div>
                      <div className="factor-confidence">
                        <span className="conf-label">Impact</span>
                        <div className="conf-bar-bg">
                          <div
                            className="conf-bar-fill bearish"
                            style={{ width: `${confidence}%` }}
                          ></div>
                        </div>
                        <span className="conf-value">{confidence}%</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="no-factors">
                No significant bearish factors identified
              </p>
            )}
          </div>
        </div>

        {/* Bullish Panel */}
        <div className="sentiment-panel bullish-panel">
          <div className="panel-header">
            <div className="panel-icon">📈</div>
            <h3 className="panel-title">Bullish Factors</h3>
          </div>
          <div className="panel-content">
            {bullish_factors.length > 0 ? (
              <ul className="factor-list">
                {bullish_factors.map((item: any, index) => {
                  // Defensive check
                  const factorText =
                    typeof item === "string"
                      ? item
                      : typeof item.factor === "string"
                      ? item.factor
                      : JSON.stringify(item);
                  const confidence =
                    typeof item === "object" && item.confidence
                      ? item.confidence
                      : 0;

                  return (
                    <li key={index} className="factor-item">
                      <div className="factor-text">{factorText}</div>
                      <div className="factor-confidence">
                        <span className="conf-label">Impact</span>
                        <div className="conf-bar-bg">
                          <div
                            className="conf-bar-fill bullish"
                            style={{ width: `${confidence}%` }}
                          ></div>
                        </div>
                        <span className="conf-value">{confidence}%</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="no-factors">
                No significant bullish factors identified
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentPanels;
