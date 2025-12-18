import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MarketTicker.css";

interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface IndicesResponse {
  indices: {
    [key: string]: {
      value: number;
      change: number;
      change_percentage: number;
    };
  };
}

const MarketTicker: React.FC = () => {
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketIndices = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
        const response = await axios.get<IndicesResponse>(
          `${apiUrl}/market-indices`
        );

        // Transform backend data to frontend format
        const transformedIndices: MarketIndex[] = Object.entries(
          response.data.indices
        ).map(([name, data]) => ({
          symbol: name.replace(" ", ""), // "NIFTY 50" -> "NIFTY50"
          name: name,
          price: data.value,
          change: data.change,
          changePercent: data.change_percentage,
        }));

        setIndices(transformedIndices);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching market indices:", err);
        setError("Failed to fetch market data");
        setLoading(false);

        // Fallback to mock data on error
        setIndices([
          {
            symbol: "NIFTY50",
            name: "NIFTY 50",
            price: 21850.3,
            change: 75.2,
            changePercent: 0.35,
          },
          {
            symbol: "SENSEX",
            name: "SENSEX",
            price: 72248.45,
            change: -120.5,
            changePercent: -0.17,
          },
          {
            symbol: "BANKNIFTY",
            name: "BANK NIFTY",
            price: 46250.8,
            change: 150.3,
            changePercent: 0.33,
          },
        ]);
      }
    };

    fetchMarketIndices();

    // Refresh every 60 seconds
    const interval = setInterval(fetchMarketIndices, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number): string => {
    return price.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatChange = (change: number): string => {
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="market-ticker">
        <div className="ticker-container">
          <div className="ticker-item">Loading market data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="market-ticker">
      <div className="ticker-container">
        {/* Render indices twice for seamless scrolling */}
        {indices.map((index, i) => (
          <div key={`first-${i}`} className="ticker-item">
            <span className="ticker-symbol">{index.symbol}</span>
            <span className="ticker-price">₹{formatPrice(index.price)}</span>
            <span
              className={`ticker-change ${
                index.changePercent >= 0 ? "positive" : "negative"
              }`}
            >
              {formatChange(index.changePercent)}
            </span>
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {indices.map((index, i) => (
          <div key={`second-${i}`} className="ticker-item">
            <span className="ticker-symbol">{index.symbol}</span>
            <span className="ticker-price">₹{formatPrice(index.price)}</span>
            <span
              className={`ticker-change ${
                index.changePercent >= 0 ? "positive" : "negative"
              }`}
            >
              {formatChange(index.changePercent)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketTicker;
