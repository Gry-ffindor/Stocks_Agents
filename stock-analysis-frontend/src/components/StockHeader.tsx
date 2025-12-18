import React from 'react';
import './StockHeader.css';

interface StockHeaderProps {
  symbol: string;
  companyName: string;
  currentPrice: number | string;
  change: number;
  changePercent: number;
}

const StockHeader: React.FC<StockHeaderProps> = ({
  symbol,
  companyName,
  currentPrice,
  change,
  changePercent
}) => {
  const isPositive = changePercent >= 0;
  const formattedPrice = typeof currentPrice === 'number' 
    ? currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : currentPrice;

  return (
    <div className="stock-header">
      <div className="stock-info">
        <h1 className="stock-symbol">{symbol}</h1>
        <p className="company-name">{companyName}</p>
      </div>
      <div className="stock-price-info">
        <div className="current-price">
          INR{formattedPrice}
        </div>
        <div className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default StockHeader;
