# StockAgents Pro — Design System

## 1. Design Philosophy
The **"Dark Mode Financial"** aesthetic is engineered for high-density data consumption in low-light environments. It minimizes eye strain while using high-contrast semantic colors (Green/Red/Amber) to draw attention to critical market signals.

## 2. Core Color Palette

The application uses a semantic variable system defined in `index.css`.

### Backgrounds
| Variable | Hex | Tailwind | Usage |
| :--- | :--- | :--- | :--- |
| `--bg-app` | `#030712` | `gray-950` | The main application canvas (infinite depth). |
| `--bg-surface` | `#111827` | `gray-900` | Cards, panels, and contained sections. |
| `--bg-surface-hover` | `#1f2937` | `gray-800` | Interactive states for list items and buttons. |

### Borders
| Variable | Hex | Usage |
| :--- | :--- | :--- |
| `--border-subtle` | `#1f2937` | Separators, inner dividers. |
| `--border-strong` | `#374151` | Active inputs, card outlines, scrollbars. |

### Typography
| Variable | Hex | Usage |
| :--- | :--- | :--- |
| `--text-primary` | `#f3f4f6` | Headings, current prices, primary values. |
| `--text-secondary` | `#9ca3af` | Labels, secondary metrics, subtitles. |
| `--text-muted` | `#6b7280` | Timestamps, footnotes, non-critical data. |

### Semantic Accents (Signal Colors)
| Variable | Hex | Tailwind | Usage |
| :--- | :--- | :--- | :--- |
| `--accent-primary` | `#4f46e5` | `indigo-600` | Brand identity, primary actions, active tabs. |
| `--accent-success` | `#10b981` | `emerald-500` | Bullish signals, profit, positive % change. |
| `--accent-danger` | `#f43f5e` | `rose-500` | Bearish signals, loss, negative % change, stop-loss. |
| `--accent-warning` | `#eab308` | `yellow-500` | Neutral signals, hold recommendations, moving averages. |

---

## 3. Typography System
**Font Family:** `Inter` (Sans-serif)

| Style | Size | Weight | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Metric Huge** | `4xl` (36px) | Black (900) | Tighter | Buy/Sell Verdicts. |
| **Metric Large** | `2xl` (24px) | Bold (700) | Tight | Stock Price. |
| **Heading** | `sm` (14px) | Bold (700) | Wide | Card Headers (uppercase). |
| **Body** | `xs` (12px) | Normal (400) | Normal | News summaries, lists. |
| **Data** | `xs` (12px) | Mono | Normal | Financial tables, specific price values. |
| **Label** | `10px` | Bold (700) | Widest | Micro-labels, axis ticks, badges. |

---

## 4. UI Component Standards

### Cards & Panels
- **Background:** `bg-gray-900`
- **Border:** `1px solid border-gray-800`
- **Radius:** `rounded-xl` (12px)
- **Padding:** `p-4` or `p-6`

### Sparklines & Charts
- **Gradients:** Use vertical linear gradients (Opacity 0.2 -> 0) for area charts.
- **Stroke Width:** `2px` for main price, `1px` for indicators.
- **Grid:** `stroke="#1f2937"` (Gray 800), `dasharray="3 3"`.

### Interactive Elements
- **Buttons:**
  - Primary: `bg-indigo-600` text-white.
  - Secondary: `border border-gray-700` text-gray-400 hover:text-white.
  - Tabs: Bottom border indicators (`border-indigo-500`) for active state.

---

## 5. Utilities & Helpers

### Scrollbars
Custom "Fintech" scrollbars are defined globally in `index.css`.
- **Track:** Invisible or matches background.
- **Thumb:** `gray-700` with rounded edges.
- **Class:** Use `.custom-scrollbar` for tight spaces (lists/news feeds) to force a thinner 4px bar.

### Animations
- **Mask Fade:** Use `.mask-linear-fade` for marquee effects or scrolling tickers to fade content at the edges.

---

## 6. Implementation Notes for Developers

1. **Tailwind Config:** This theme assumes `darkMode: 'class'` and customizes the `gray` palette (specifically 950, 900, 850) in `tailwind.config.js`.
2. **Recharts:** When adding new charts, ensure the `Tooltip` component uses the custom content style:
   ```jsx
   contentStyle={{ backgroundColor: '#030712', borderColor: '#374151' }}
   ```
3. **Icons:** Use `lucide-react` with a default size of `12` or `14` for UI icons to maintain the dense, professional dashboard look.
