import React from "react";
import { BalanceSheetData } from "../types";
import { Scale, Landmark } from "lucide-react";
import "./FinancialPosition.css";

interface FinancialPositionProps {
  balanceSheetData?: BalanceSheetData;
  debtToEquity?: string | number;
  currentRatio?: string | number;
}

interface ProgressBarProps {
  value: number;
  max: number;
  colorClass: string;
  label: string;
  amount: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  colorClass,
  label,
  amount,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-header">
        <span className="progress-label">{label}</span>
        <span className="progress-amount">{amount}</span>
      </div>
      <div className="progress-bar-bg">
        <div
          className={`progress-bar-fill ${colorClass}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const FinancialPosition: React.FC<FinancialPositionProps> = ({
  balanceSheetData,
  debtToEquity,
  currentRatio,
}) => {
  if (!balanceSheetData) return null;

  // Helper to parse currency string to number
  const parseVal = (str: string) => {
    if (!str || str === "N/A") return 0;
    const num = parseFloat(str.replace(/[^0-9.]/g, ""));
    return num || 0;
  };

  const assets = parseVal(balanceSheetData.total_assets);
  const liabilities = parseVal(balanceSheetData.total_liabilities);
  const debt = parseVal(balanceSheetData.total_debt);
  const cash = parseVal(balanceSheetData.cash_and_equivalents);

  // Use assets as the baseline for scale
  const scaleBase = assets || 1;

  return (
    <div className="financial-position">
      <h3 className="financial-position-title">
        <Scale className="title-icon" />
        Financial Position
      </h3>

      <div className="financial-position-content">
        {/* Assets vs Liabilities */}
        <div className="section">
          <ProgressBar
            value={assets}
            max={scaleBase * 1.2}
            colorClass="bar-emerald"
            label="Total Assets"
            amount={balanceSheetData.total_assets}
          />
          <ProgressBar
            value={liabilities}
            max={scaleBase * 1.2}
            colorClass="bar-rose"
            label="Total Liabilities"
            amount={balanceSheetData.total_liabilities}
          />
        </div>

        <div className="section-divider"></div>

        {/* Cash vs Debt */}
        <div className="section">
          <div className="section-header">
            <Landmark className="section-icon" />
            <span className="section-label">Liquidity</span>
          </div>
          <ProgressBar
            value={cash}
            max={Math.max(cash, debt) * 1.2}
            colorClass="bar-blue"
            label="Cash & Equivalents"
            amount={balanceSheetData.cash_and_equivalents}
          />
          <ProgressBar
            value={debt}
            max={Math.max(cash, debt) * 1.2}
            colorClass="bar-orange"
            label="Total Debt"
            amount={balanceSheetData.total_debt}
          />
        </div>
      </div>

      <div className="financial-ratios">
        <div className="ratio-item">
          <div className="ratio-label">Debt/Equity</div>
          <div className="ratio-value">{debtToEquity || "N/A"}</div>
        </div>
        <div className="ratio-item">
          <div className="ratio-label">Current Ratio</div>
          <div className="ratio-value">{currentRatio || "N/A"}</div>
        </div>
      </div>
    </div>
  );
};

export default FinancialPosition;
