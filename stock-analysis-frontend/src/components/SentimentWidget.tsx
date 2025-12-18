import React from "react";
import { NewsItem, SentimentData } from "../types";
import {
  Newspaper,
  MessageCircle,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import "./SentimentWidget.css";

interface SentimentWidgetProps {
  newsData: string;
  stockSymbol: string;
}

const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => (
  <div className="news-card">
    <div className="news-card-header">
      <div className="news-meta">
        <span className="news-source">{item.source}</span>
        <span className="news-separator">•</span>
        <span className="news-date">{item.publishedAt}</span>
      </div>
      <span className={`sentiment-badge sentiment-${item.sentiment}`}>
        {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
      </span>
    </div>
    <h4 className="news-title">{item.title}</h4>
    <p className="news-summary">{item.summary}</p>
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="news-link"
    >
      <span>Read Source</span>
      <ExternalLink className="link-icon" />
    </a>
  </div>
);

const SentimentWidget: React.FC<SentimentWidgetProps> = ({ newsData }) => {
  const parseSentimentData = (): SentimentData => {
    try {
      const news: NewsItem[] = JSON.parse(newsData);

      // Calculate sentiment score
      const positiveCount = news.filter(
        (n) => n.sentiment === "positive"
      ).length;
      const negativeCount = news.filter(
        (n) => n.sentiment === "negative"
      ).length;
      const totalCount = news.length || 1;

      // Score: (positive - negative) / total, normalized to 0-100
      const rawScore = ((positiveCount - negativeCount) / totalCount) * 100;
      const overallScore = Math.max(0, Math.min(100, 50 + rawScore));

      const getSentimentLabel = (score: number): string => {
        if (score >= 70) return "Bullish";
        if (score >= 55) return "Slightly Bullish";
        if (score >= 45) return "Neutral";
        if (score >= 30) return "Slightly Bearish";
        return "Bearish";
      };

      return {
        overallScore: Math.round(overallScore),
        sentimentLabel: getSentimentLabel(overallScore),
        socialVolume: "N/A",
        newsVolume: `${news.length}`,
        news: news.slice(0, 10),
      };
    } catch (error) {
      console.error("Error parsing sentiment data:", error);
      return {
        overallScore: 50,
        sentimentLabel: "Neutral",
        socialVolume: "N/A",
        newsVolume: "0",
        news: [],
      };
    }
  };

  const data = parseSentimentData();

  const getScoreColor = (score: number): string => {
    if (score >= 70) return "score-bullish";
    if (score <= 30) return "score-bearish";
    return "score-neutral";
  };

  const getGaugeColor = (score: number): string => {
    if (score >= 60) return "#10b981"; // emerald
    if (score >= 40) return "#eab308"; // yellow
    return "#f43f5e"; // rose
  };

  return (
    <div className="sentiment-widget">
      <div className="sentiment-grid">
        {/* Left Column: Metrics & Gauge */}
        <div className="sentiment-left">
          {/* Sentiment Gauge Card */}
          <div className="gauge-card">
            <h3 className="gauge-title">Market Sentiment</h3>

            {/* Semi-Circle Gauge */}
            <div className="gauge-container">
              <div className="gauge-background"></div>
              <div
                className="gauge-fill"
                style={{
                  borderTopColor: getGaugeColor(data.overallScore),
                  borderLeftColor: getGaugeColor(data.overallScore),
                  transform: `rotate(${
                    (data.overallScore / 100) * 180 - 135
                  }deg)`,
                }}
              ></div>
              <div className="gauge-score">{data.overallScore}</div>
            </div>

            <div
              className={`sentiment-label ${getScoreColor(data.overallScore)}`}
            >
              {data.sentimentLabel}
            </div>
            <div className="sentiment-confidence">Confidence: High</div>
          </div>

          {/* Volume Metrics */}
          <div className="volume-grid">
            <div className="volume-card">
              <div className="volume-header">
                <MessageCircle className="volume-icon" />
                <span className="volume-title">Social Vol</span>
              </div>
              <div className="volume-value">{data.socialVolume}</div>
            </div>
            <div className="volume-card">
              <div className="volume-header">
                <Newspaper className="volume-icon" />
                <span className="volume-title">News Vol</span>
              </div>
              <div className="volume-value">{data.newsVolume}</div>
            </div>
          </div>
        </div>

        {/* Right Column: News Feed */}
        <div className="sentiment-right">
          <div className="news-header">
            <h3 className="news-title">
              <BarChart3 className="news-icon" />
              Relevant News & Analysis
            </h3>
            <span className="news-subtitle">
              AI Curated • {new Date().toLocaleDateString()}
            </span>
          </div>

          <div className="news-grid">
            {data.news.length > 0 ? (
              data.news.map((item, idx) => <NewsCard key={idx} item={item} />)
            ) : (
              <div className="no-news">No sentiment data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentWidget;
