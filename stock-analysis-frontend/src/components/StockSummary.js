import React from 'react';
import './StockSummary.css';

function StockSummary({ stockName, stockSymbol, currentPrice, recommendation }) {
  const getRecommendationColor = (rec) => {
    switch (rec?.toUpperCase()) {
      case 'BUY': return 'var(--bullish)';
      case 'SELL': return 'var(--bearish)';
      default: return 'var(--neutral)';
    }
  };

  return (
    <div className="stock-summary">
      <div className="stock-header">
        <div className="stock-title">
          <h1>{stockName}</h1>
          <span className="stock-symbol">{stockSymbol}</span>
        </div>
        <div className="stock-price">
          <span className="price-label">Current Price</span>
          <span className="price-value">₹{currentPrice || 'N/A'}</span>
        </div>
      </div>
      {recommendation && (
        <div className="recommendation-badge"
             style={{ backgroundColor: getRecommendationColor(recommendation) }}>
          {recommendation.toUpperCase()}
        </div>
      )}
    </div>
  );
}

export default StockSummary;
