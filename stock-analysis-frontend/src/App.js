import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./components/SearchBar";
import StockSummary from "./components/StockSummary";
import MarketDataCards from "./components/MarketDataCards";
import PriceTrendChart from "./components/PriceTrendChart";
import CandlestickChart from "./components/CandlestickChart";
import SentimentPanels from "./components/SentimentPanels";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import FinancialsPanel from "./components/FinancialsPanel";

function App() {
  const [stockName, setStockName] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeStock = async () => {
    if (!stockName.trim()) return;

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Use relative path for deployment, or fallback to localhost for local dev
      const apiUrl =
        process.env.NODE_ENV === "production"
          ? "/api/analyze"
          : "http://localhost:8000/analyze";
      const response = await axios.post(apiUrl, {
        stock_name: stockName,
      });
      setAnalysis(response.data);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error.response?.data?.detail ||
          "Failed to analyze stock. Please check the stock name and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    analyzeStock();
  };

  return (
    <div className="app">
      <div className="app-background"></div>

      <header className="app-header">
        <h1 className="app-title">
          <span className="title-icon">📊</span>
          AI Stock Analysis
        </h1>
        <p className="app-subtitle">
          Intelligent market insights powered by AI
        </p>
      </header>

      <main className="app-content">
        <SearchBar
          stockName={stockName}
          setStockName={setStockName}
          onSearch={analyzeStock}
          loading={loading}
        />

        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} onRetry={handleRetry} />}

        {analysis && !loading && (
          <div className="results-container">
            <StockSummary
              stockName={analysis.stock_name}
              stockSymbol={analysis.stock_symbol}
              currentPrice={analysis.data.current_price}
              recommendation={analysis.structured_analysis?.recommendation}
            />

            <MarketDataCards data={analysis.data} />

            <PriceTrendChart
              currentPrice={analysis.data.current_price}
              weekHigh={analysis.data["52_week_high"]}
              weekLow={analysis.data["52_week_low"]}
            />

            <CandlestickChart
              historicalData={analysis.historical_data}
              stockSymbol={analysis.stock_symbol}
            />
            <FinancialsPanel financials={analysis.financials} />
            <SentimentPanels
              structuredAnalysis={analysis.structured_analysis}
            />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Disclaimer: This analysis is for informational purposes only. Not
          financial advice.
        </p>
      </footer>
    </div>
  );
}

export default App;
