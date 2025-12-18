import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { StockAnalysisResponse, TabType } from "./types";
import "./App.css";

// New components
import TopNavigation from "./components/TopNavigation";
import MarketTicker from "./components/MarketTicker";
import StockHeader from "./components/StockHeader";
import TabNavigation from "./components/TabNavigation";
import DataGrid from "./components/DataGrid";

// Existing components
import CandlestickChart from "./components/CandlestickChart";
import SentimentPanels from "./components/SentimentPanels";
import SentimentWidget from "./components/SentimentWidget";
import MetricCards from "./components/MetricCards";
import PerformanceChart from "./components/PerformanceChart";
import FinancialPosition from "./components/FinancialPosition";
import FinancialBarChart from "./components/FinancialBarChart";
import TechnicalWidget from "./components/TechnicalWidget";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import FinancialsPanel from "./components/FinancialsPanel";

function App() {
  const [stockName, setStockName] = useState<string>("");
  const [analysis, setAnalysis] = useState<StockAnalysisResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "sentiments" | "financials" | "technicals" | "ai-agent"
  >("overview");

  const analyzeStock = async (symbol?: string): Promise<void> => {
    const searchSymbol = symbol || stockName;
    if (!searchSymbol.trim()) return;

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
      const response = await axios.post<StockAnalysisResponse>(
        `${apiUrl}/analyze`,
        {
          stock_name: searchSymbol,
        }
      );
      setAnalysis(response.data);
      setStockName(searchSymbol);
    } catch (err) {
      console.error("Error:", err);
      let errorMessage = "Failed to analyze stock.";

      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ detail?: string }>;
        if (axiosError.response) {
          errorMessage = `Error ${axiosError.response.status}: ${
            axiosError.response.data?.detail || axiosError.message
          }`;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (symbol: string): void => {
    analyzeStock(symbol);
  };

  const handleRetry = (): void => {
    setError(null);
    analyzeStock();
  };

  // Calculate change and change percent (mock for now)
  const calculateChange = (): { change: number; changePercent: number } => {
    if (!analysis) return { change: 0, changePercent: 0 };

    const currentPrice =
      typeof analysis.data.current_price === "number"
        ? analysis.data.current_price
        : parseFloat(String(analysis.data.current_price));

    const high = analysis.data["52_week_high"] || 0;
    const low = analysis.data["52_week_low"] || 0;
    const avg = (high + low) / 2;

    const change = currentPrice - avg;
    const changePercent = avg !== 0 ? (change / avg) * 100 : 0;

    return { change, changePercent };
  };

  const { change, changePercent } = calculateChange();

  return (
    <div className="trading-platform">
      {/* Top Navigation */}
      <TopNavigation onSearch={handleSearch} />

      {/* Market Ticker */}
      <MarketTicker />

      {/* Main Content */}
      <main className="platform-content">
        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} onRetry={handleRetry} />}

        {analysis && !loading && (
          <>
            {/* Stock Header */}
            <StockHeader
              symbol={analysis.stock_symbol}
              companyName={analysis.stock_name}
              currentPrice={analysis.data.current_price}
              change={change}
              changePercent={changePercent}
            />

            {/* Metric Cards */}
            <div className="metric-cards-section">
              <MetricCards
                marketData={analysis.data}
                stockSymbol={analysis.stock_symbol}
              />
            </div>

            {/* Candlestick Chart */}
            <div className="chart-section">
              <CandlestickChart
                historicalData={analysis.historical_data}
                stockSymbol={analysis.stock_symbol}
              />
            </div>

            {/* Tab Navigation */}
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === "overview" && (
                <div className="overview-tab">
                  <div className="overview-grid">
                    <PerformanceChart
                      quarterlyFinancials={analysis.quarterly_financials}
                    />
                    <FinancialPosition
                      balanceSheetData={analysis.data.balance_sheet}
                      debtToEquity={analysis.data.debt_to_equity}
                      currentRatio={analysis.data.current_ratio}
                    />
                  </div>
                  <DataGrid marketData={analysis.data} />
                </div>
              )}

              {activeTab === "sentiments" && (
                <div className="sentiments-tab">
                  <SentimentWidget
                    newsData={analysis.data.web_search_results || "[]"}
                    stockSymbol={analysis.stock_symbol}
                  />
                </div>
              )}

              {activeTab === "financials" && (
                <div className="financials-tab">
                  <FinancialBarChart />
                  <FinancialsPanel financials={analysis.financials} />
                </div>
              )}

              {activeTab === "technicals" && (
                <div className="technicals-tab">
                  <TechnicalWidget
                    technicalIndicators={analysis.technical_indicators}
                    currentPrice={analysis.data.current_price}
                  />
                </div>
              )}

              {activeTab === "ai-agent" && (
                <div className="ai-agent-tab">
                  <SentimentPanels
                    structuredAnalysis={analysis.structured_analysis}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {!analysis && !loading && !error && (
          <div className="welcome-screen">
            <div className="welcome-content">
              <h2>Welcome to Stock Agent Pro</h2>
              <p>Search for a stock symbol to begin analysis</p>
              <div className="example-symbols">
                <span onClick={() => handleSearch("TCS")}>TCS</span>
                <span onClick={() => handleSearch("RELIANCE")}>RELIANCE</span>
                <span onClick={() => handleSearch("INFY")}>INFY</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="platform-footer">
        <p>
          Disclaimer: This analysis is for informational purposes only. Not
          financial advice.
        </p>
      </footer>
    </div>
  );
}

export default App;
