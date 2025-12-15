import React from 'react';
import './MarketDataCards.css';

function MarketDataCards({ data }) {
  const formatValue = (value, prefix = '', suffix = '') => {
    if (!value || value === 'N/A' || value === null || value === undefined) {
      return 'N/A';
    }

    // If already formatted as string (like "123.45 Cr" or "2.5%"), return as is
    if (typeof value === 'string') {
      return value;
    }

    // If number, format with prefix/suffix
    if (typeof value === 'number') {
      return `${prefix}${value.toLocaleString('en-IN')}${suffix}`;
    }

    return value;
  };

  const cards = [
    { label: 'Market Cap', value: formatValue(data.market_cap, '₹') },
    { label: 'P/E Ratio', value: formatValue(data.pe_ratio) },
    { label: '52W High', value: formatValue(data['52_week_high'], '₹') },
    { label: '52W Low', value: formatValue(data['52_week_low'], '₹') },
    { label: 'Dividend Yield', value: formatValue(data.dividend_yield) },
  ];

  return (
    <div className="market-data-section">
      <h2 className="section-title">Market Data</h2>
      <div className="data-grid">
        {cards.map((card, index) => (
          <div className="data-card" key={index}>
            <div className="data-label">{card.label}</div>
            <div className="data-value">{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketDataCards;
