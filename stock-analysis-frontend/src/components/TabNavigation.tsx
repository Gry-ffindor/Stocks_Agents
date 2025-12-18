import React from "react";
import {
  LayoutList,
  Newspaper,
  FileText,
  Activity,
  BrainCircuit,
} from "lucide-react";
import "./TabNavigation.css";

export type TabType =
  | "overview"
  | "sentiments"
  | "financials"
  | "technicals"
  | "ai-agent";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface Tab {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: Tab[] = [
    { id: "overview", label: "OVERVIEW", icon: LayoutList },
    { id: "sentiments", label: "SENTIMENTS", icon: Newspaper },
    { id: "financials", label: "FINANCIALS", icon: FileText },
    { id: "technicals", label: "TECHNICALS", icon: Activity },
    { id: "ai-agent", label: "AI AGENT", icon: BrainCircuit },
  ];

  return (
    <div className="tab-navigation">
      <div className="tab-container">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => onTabChange(tab.id)}
            >
              <IconComponent className="tab-icon" />
              <span className="tab-label">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;
