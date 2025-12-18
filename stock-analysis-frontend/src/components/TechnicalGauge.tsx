import React from "react";

interface GaugeProps {
  rating: "Strong Buy" | "Buy" | "Neutral" | "Sell" | "Strong Sell";
  buy: number;
  sell: number;
  neutral: number;
  title: string;
}

const TechnicalGauge: React.FC<GaugeProps> = ({
  rating,
  buy,
  sell,
  neutral,
  title,
}) => {
  // Map rating to rotation angle
  const getRotation = () => {
    switch (rating) {
      case "Strong Sell":
        return -72;
      case "Sell":
        return -36;
      case "Neutral":
        return 0;
      case "Buy":
        return 36;
      case "Strong Buy":
        return 72;
      default:
        return 0;
    }
  };

  const getTextColor = (r: string) => {
    if (r.includes("Buy")) return { color: "#3b82f6" }; // blue-500
    if (r.includes("Sell")) return { color: "#f43f5e" }; // rose-500
    return { color: "#9ca3af" }; // gray-400
  };
  // Helper to create arc segments with perfect alignment
  const createSegment = (
    startAngle: number,
    endAngle: number,
    color: string
  ) => {
    const radius = 80;
    const centerX = 100;
    const centerY = 100;

    // Convert degrees to radians (subtract from 180 because SVG coordinate angles work differently)
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY - radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY - radius * Math.sin(endRad);

    return (
      <path
        d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
        fill="none"
        stroke={color}
        strokeWidth="16"
        strokeLinecap="butt"
      />
    );
  };

  return (
    <div
      className="rounded-3xl p-3 h-full relative overflow-hidden flex flex-col items-center justify-between"
      style={{
        backgroundColor: "#0f141f", // Very dark blue/black background from reference
        border: "1px solid #1f2937", // Subtle dark border
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="flex flex-col items-center justify-start h-full relative z-10 w-full">
        {/* Title */}
        <h3
          className="text-xs font-semibold text-gray-200 mb-2 uppercase tracking-wide w-full"
          style={{ textAlign: "center" }}
        >
          {title}
        </h3>

        {/* Gauge Container */}
        <div className="relative w-32 h-16 mb-2">
          <svg viewBox="0 0 200 110" className="w-full h-full">
            {/* Background Track - Darker for contrast */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#1f2937"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Perfectly Aligned Segments with 2 degree gaps */}
            {/* Strong Sell (180 -> 146) */}
            {createSegment(178, 146, "#ef4444")}
            {/* Sell (142 -> 110) */}
            {createSegment(142, 110, "#f87171")}
            {/* Neutral (106 -> 74) */}
            {createSegment(106, 74, "#9ca3af")}
            {/* Buy (70 -> 38) */}
            {createSegment(70, 38, "#60a5fa")}
            {/* Strong Buy (34 -> 2) */}
            {createSegment(34, 2, "#3b82f6")}

            {/* Needle */}
            <line
              x1="100"
              y1="100"
              x2={100 + Math.sin((getRotation() * Math.PI) / 180) * 65}
              y2={100 - Math.cos((getRotation() * Math.PI) / 180) * 65}
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 0 4px rgba(255,255,255,0.8))",
                transition: "all 0.7s ease-out",
              }}
            />

            {/* Center Pivot Point */}
            <circle
              cx="100"
              cy="100"
              r="5"
              fill="white"
              stroke="#111827"
              strokeWidth="2"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
              }}
            />
          </svg>
        </div>

        {/* Rating Text */}
        <div
          className="text-lg font-bold mb-2 w-full"
          style={{ textAlign: "center", ...getTextColor(rating) }}
        >
          {rating}
        </div>

        {/* Stats Row - Horizontal layout with border */}
        <div className="pt-2 border-t border-gray-800 w-full">
          <div
            className="flex justify-center items-start gap-4"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <div className="flex flex-col items-center">
              <div
                className="font-bold text-sm mb-1"
                style={{ color: "#f43f5e" }}
              >
                {sell}
              </div>
              <div
                className="text-[10px] uppercase tracking-wider"
                style={{ color: "#6b7280" }}
              >
                Sell
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="font-bold text-sm mb-1"
                style={{ color: "#9ca3af" }}
              >
                {neutral}
              </div>
              <div
                className="text-[10px] uppercase tracking-wider"
                style={{ color: "#6b7280" }}
              >
                Neutral
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="font-bold text-sm mb-1"
                style={{ color: "#3b82f6" }}
              >
                {buy}
              </div>
              <div
                className="text-[10px] uppercase tracking-wider"
                style={{ color: "#6b7280" }}
              >
                Buy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalGauge;
