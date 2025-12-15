import React from 'react';
import './MarketDataCards.css';

function MarketDataCards({ data }) {
  const cards = [
    { label: 'Market Cap', value: data.market_cap, prefix: '₹', suffix: '' },
    { label: 'P/E Ratio', value: data.pe_ratio, prefix: '', suffix: '' },
    { label: '52W High', value: data['52_week_high'], prefix: '₹', suffix: '' },
    { label: '52W Low', value: data['52_week_low'], prefix: '₹', suffix: '' },
    { label: 'Dividend Yield', value: data.dividend_yield, prefix: '', suffix: '%' },
  ];

  const formatValue = (value) => {
    if (!value || value === 'N/A') return 'N/A';
    if (typeof value === 'number') return value.toLocaleString('en-IN');
    return value;
  };

  return (
    <div className="market-data-section">
      <h2 className="section-title">Market Data</h2>
      <div className="data-grid">
        {cards.map((card, index) => (
          <div className="data-card" key={index}>
            <div className="data-label">{card.label}</div>
            <div className="data-value">
              {card.prefix}
              {formatValue(card.value)}
              {card.value !== 'N/A' && card.suffix}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketDataCards;
