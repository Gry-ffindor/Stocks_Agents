import React from 'react';
import './SentimentPanels.css';

function SentimentPanels({ structuredAnalysis }) {
  if (!structuredAnalysis) {
    return null;
  }

  const { summary, bullish_factors = [], bearish_factors = [] } = structuredAnalysis;

  return (
    <div className="sentiment-section">
      {summary && (
        <div className="summary-card">
          <h2 className="section-title">Analysis Summary</h2>
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
                {bearish_factors.map((factor, index) => (
                  <li key={index} className="factor-item">{factor}</li>
                ))}
              </ul>
            ) : (
              <p className="no-factors">No significant bearish factors identified</p>
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
                {bullish_factors.map((factor, index) => (
                  <li key={index} className="factor-item">{factor}</li>
                ))}
              </ul>
            ) : (
              <p className="no-factors">No significant bullish factors identified</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SentimentPanels;
