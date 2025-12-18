import React from "react";
import { Newspaper } from "lucide-react";
import "./NewsPanel.css";

interface NewsPanelProps {
  webSearchResults?: string;
}

interface NewsItem {
  title: string;
  content: string;
  url?: string;
}

const NewsPanel: React.FC<NewsPanelProps> = ({ webSearchResults }) => {
  // Parse news data from web search results
  const parseNews = (): NewsItem[] => {
    console.log(
      "📰 NewsPanel received webSearchResults:",
      webSearchResults ? `${webSearchResults.length} chars` : "undefined"
    );

    if (!webSearchResults) {
      console.log("❌ No webSearchResults provided");
      return [];
    }

    console.log("📰 First 200 chars:", webSearchResults.substring(0, 200));

    try {
      // Try to parse as JSON array from Tavily
      const jsonMatch = webSearchResults.match(/\[([\s\S]*)\]/);
      if (jsonMatch) {
        console.log("✅ Found JSON array, parsing...");
        const newsArray = JSON.parse(jsonMatch[0]);
        console.log(`✅ Parsed ${newsArray.length} news items`);

        const items = newsArray.slice(0, 10).map((item: any) => ({
          title: item.title || "News Update",
          content: item.content || item.snippet || "",
          url: item.url || "",
        }));
        console.log("✅ Transformed news items:", items.length);
        return items;
      }

      console.log("⚠️ No JSON array found, trying line-by-line parsing...");

      // Fallback: Split by newlines and filter meaningful content
      const lines = webSearchResults
        .split("\n")
        .filter((line) => {
          const trimmed = line.trim();
          // Filter out JSON keys, HTML tags, and empty lines
          return (
            trimmed.length > 50 &&
            !trimmed.startsWith("{") &&
            !trimmed.startsWith("[") &&
            !trimmed.startsWith("<") &&
            !trimmed.includes("<!DOCTYPE") &&
            !trimmed.includes('"title":') &&
            !trimmed.includes('"url":')
          );
        })
        .slice(0, 10);

      console.log(`⚠️ Fallback parsing found ${lines.length} lines`);

      return lines.map((line) => ({
        title: "News Update",
        content: line.trim(),
      }));
    } catch (error) {
      console.error("❌ Error parsing news:", error);
      return [];
    }
  };

  const newsItems = parseNews();

  // Empty state
  if (!webSearchResults || newsItems.length === 0) {
    return (
      <div className="news-panel">
        <div className="news-empty-state">
          <Newspaper className="empty-icon" />
          <h3>No News Available</h3>
          <p>
            We couldn't find any recent news for this stock. Try searching for a
            different stock.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-panel">
      <div className="news-header">
        <Newspaper className="header-icon" />
        <h2>Latest News & Updates</h2>
        <span className="news-count">{newsItems.length} articles</span>
      </div>

      <div className="news-list">
        {newsItems.map((item, index) => (
          <div key={index} className="news-item">
            <div className="news-bullet"></div>
            <div className="news-content">
              {item.title !== "News Update" && (
                <h4 className="news-title">{item.title}</h4>
              )}
              <p className="news-text">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPanel;
