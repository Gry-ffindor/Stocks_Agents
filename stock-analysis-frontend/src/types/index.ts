// Type definitions for the Stock Analysis Frontend

// ============================================
// API Response Types
// ============================================

export interface StockAnalysisResponse {
  stock_name: string;
  stock_symbol: string;
  analysis: string;
  structured_analysis: StructuredAnalysis | null;
  data: MarketData;
  historical_data: HistoricalDataPoint[];
  financials: Financials;
  quarterly_financials?: QuarterlyFinancial[];
  technical_indicators?: TechnicalIndicators;
}

export interface MarketData {
  current_price: number | string;
  market_cap: string | null;
  pe_ratio: string | null;
  "52_week_high": number | null;
  "52_week_low": number | null;
  dividend_yield: string | null;
  web_search_results?: string;
  volume?: number | string;
  enterprise_value?: number | string;
  avg_volume?: number | string;
  price_to_book?: number | string;
  // New fields for 4-column layout
  beta?: number | string;
  short_interest?: number | string;
  peg_ratio?: number | string;
  ev_to_ebitda?: number | string;
  gross_margins?: number | string;
  operating_margins?: number | string;
  roa?: number | string;
  roe?: number | string;
  debt_to_equity?: number | string;
  current_ratio?: number | string;
  quick_ratio?: number | string;
  institutional_holdings?: number | string;
  insider_holdings?: number | string;
  sector?: string;
  industry?: string;
  earnings_date?: string;
  balance_sheet?: BalanceSheetData;
}

export interface NewsItem {
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  sentiment: "positive" | "negative" | "neutral";
  url: string;
}

export interface SentimentData {
  overallScore: number;
  sentimentLabel: string;
  socialVolume: string;
  newsVolume: string;
  news: NewsItem[];
}

export interface QuarterlyFinancial {
  period: string;
  revenue: number;
  netIncome: number;
}

export interface BalanceSheetData {
  total_assets: string;
  total_liabilities: string;
  total_debt: string;
  cash_and_equivalents: string;
}

export interface TechIndicator {
  value: number;
  action: "BUY" | "SELL" | "NEUTRAL";
}

export interface MovingAverageData {
  value: number;
  action: "BUY" | "SELL" | "NEUTRAL";
}

export interface TechnicalIndicators {
  overall_signal: "Strong Buy" | "Buy" | "Neutral" | "Sell" | "Strong Sell";
  signal_strength: string;
  summary: {
    buy: number;
    sell: number;
    neutral: number;
  };
  oscillators: {
    rating: "Strong Buy" | "Buy" | "Neutral" | "Sell" | "Strong Sell";
    buy: number;
    sell: number;
    neutral: number;
    rsi: TechIndicator;
    stoch: TechIndicator;
    cci: TechIndicator;
    macd: TechIndicator;
    adx: TechIndicator;
    momentum: TechIndicator;
  };
  moving_averages: {
    rating: "Strong Buy" | "Buy" | "Neutral" | "Sell" | "Strong Sell";
    buy: number;
    sell: number;
    neutral: number;
    ma10: { simple: MovingAverageData; exponential: MovingAverageData };
    ma20: { simple: MovingAverageData; exponential: MovingAverageData };
    ma50: { simple: MovingAverageData; exponential: MovingAverageData };
    ma100: { simple: MovingAverageData; exponential: MovingAverageData };
    ma200: { simple: MovingAverageData; exponential: MovingAverageData };
  };
  support_levels: number[];
  resistance_levels: number[];
}

export interface TradeSetup {
  signal: "BULLISH" | "BEARISH" | "NEUTRAL";
  entry_zone: string;
  target_1: string;
  target_2: string;
  stop_loss: string;
  timeframe: string;
  reasoning: string;
  risk_reward?: string;
  target_logic?: string;
}

export interface RiskAnalysis {
  risk_percentage: string;
  risk_reward_t1: string;
  risk_reward_t2: string;
  volatility_assessment: string;
  key_risks: string[];
  risk_mitigation: string[];
}

export interface SentimentFactor {
  factor: string;
  confidence: number;
}

export interface StructuredAnalysis {
  summary: string;
  bullish_factors: SentimentFactor[];
  bearish_factors: SentimentFactor[];
  recommendation: "BUY" | "HOLD" | "SELL";
  confidence_level: "HIGH" | "MEDIUM" | "LOW";
  trade_setup?: TradeSetup;
  risk_analysis?: RiskAnalysis;
}

export interface HistoricalDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Financials {
  income_statement: Record<string, any>;
  balance_sheet: Record<string, any>;
  cash_flow: Record<string, any>;
}

// ============================================
// Component Props Types
// ============================================

export interface SearchBarProps {
  stockName: string;
  setStockName: (name: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export interface StockSummaryProps {
  stockName: string;
  stockSymbol: string;
  currentPrice: number | string;
  recommendation?: "BUY" | "HOLD" | "SELL";
}

export interface MarketDataCardsProps {
  data: MarketData;
}

export interface PriceTrendChartProps {
  currentPrice: number | string;
  weekHigh: number | null;
  weekLow: number | null;
}

export interface CandlestickChartProps {
  historicalData: HistoricalDataPoint[];
  stockSymbol: string;
}

export interface SentimentPanelsProps {
  structuredAnalysis: StructuredAnalysis | null;
}

export interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export interface FinancialsPanelProps {
  financials: Financials;
}

// ============================================
// Utility Types
// ============================================

export type TimePeriod = "1D" | "1M" | "3M" | "6M" | "1Y";

export interface PeriodOption {
  value: TimePeriod;
  label: string;
}

export interface DataCard {
  label: string;
  value: string;
}

// ============================================
// Tab Navigation Types
// ============================================

export type TabType =
  | "overview"
  | "sentiments"
  | "financials"
  | "technicals"
  | "ai-agent";

// ============================================
// Enhanced Stock Data Types
// ============================================

export interface StockHeaderData {
  symbol: string;
  companyName: string;
  currentPrice: number | string;
  change: number;
  changePercent: number;
}
