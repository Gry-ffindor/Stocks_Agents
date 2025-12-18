# Stock Analysis Agent - Project Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Core Features](#core-features)
6. [API Documentation](#api-documentation)
7. [Agent Workflow](#agent-workflow)
8. [Installation & Setup](#installation--setup)
9. [Usage Guide](#usage-guide)
10. [Configuration](#configuration)
11. [Development Guide](#development-guide)
12. [Deployment](#deployment)
13. [Troubleshooting](#troubleshooting)
14. [Future Enhancements](#future-enhancements)

---

## 📖 Project Overview

**Stock Analysis Agent** is an AI-powered stock market analysis system specifically designed for Indian stock markets (NSE/BSE). It leverages cutting-edge AI technologies to provide comprehensive, data-driven stock analysis by combining multiple data sources including web search, financial APIs, and web scraping.

### Key Highlights

- **AI-Driven Insights**: Uses Google Gemini 2.0 Flash for natural language understanding and analysis
- **Multi-Source Intelligence**: Aggregates data from Tavily search, Yahoo Finance, and MoneyControl
- **Intelligent Workflow**: Implements LangGraph for orchestrated agent execution with tool calling
- **Modern UI**: React-based frontend with interactive charts and visual analytics
- **Production-Ready**: FastAPI backend with CORS, error handling, and scalable architecture

### Use Cases

- Quick stock analysis for investment decisions
- Real-time market position assessment
- News impact analysis on stock performance
- Financial metrics comparison
- Investment recommendation generation

---

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface (React)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Search  │  │  Charts  │  │ Metrics  │  │ Analysis │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────┬───────────────────────────────┘
                              │ HTTP/REST
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                    FastAPI Backend                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              API Endpoints (/analyze, /health)         │ │
│  └────────────────────────┬───────────────────────────────┘ │
│                           │                                  │
│  ┌────────────────────────▼───────────────────────────────┐ │
│  │              LangGraph Agent Orchestrator              │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐ │ │
│  │  │ Identify │─▶│  Search  │─▶│  Financial Analysis  │ │ │
│  │  │  Stock   │  │   News   │  │                      │ │ │
│  │  └──────────┘  └──────────┘  └──────────────────────┘ │ │
│  └────────────────────────┬───────────────────────────────┘ │
└───────────────────────────┼─────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼──────┐  ┌─────────▼───────┐  ┌───────▼────────┐
│   Tavily     │  │   Yahoo Finance │  │  MoneyControl  │
│ Web Search   │  │   (yfinance)    │  │  Web Scraper   │
└──────────────┘  └─────────────────┘  └────────────────┘
```

### Component Breakdown

#### Frontend Layer
- **React Application**: Modern, responsive UI built with React 19
- **Component-Based**: Modular components for charts, cards, and panels
- **State Management**: React hooks for local state management
- **HTTP Client**: Axios for API communication

#### Backend Layer
- **FastAPI Server**: High-performance async API framework
- **CORS Middleware**: Configurable cross-origin resource sharing
- **Request Validation**: Pydantic models for type safety
- **Error Handling**: Comprehensive exception handling with traceback logging

#### Agent Layer
- **LangGraph Workflow**: Directed graph-based agent orchestration
- **Google Gemini**: LLM for natural language processing and analysis
- **Tool System**: Pluggable tool architecture for extensibility
- **State Management**: Typed state dictionary for data flow

#### Data Sources
- **Tavily API**: Real-time web search for news and trends
- **Yahoo Finance**: Financial metrics, historical data, and company fundamentals
- **MoneyControl**: Indian market-specific data and metrics

---

## 💻 Technology Stack

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.12+ | Core programming language |
| **FastAPI** | Latest | REST API framework |
| **LangChain** | Latest | LLM integration framework |
| **LangGraph** | Latest | Agent workflow orchestration |
| **Google Gemini** | 2.0 Flash | AI model for analysis |
| **Tavily** | API v1 | Web search functionality |
| **yfinance** | Latest | Yahoo Finance data retrieval |
| **BeautifulSoup4** | 4.x | HTML parsing and web scraping |
| **Pydantic** | 2.x | Data validation |
| **python-dotenv** | Latest | Environment variable management |

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.x | UI framework |
| **Recharts** | Latest | Data visualization library |
| **Axios** | Latest | HTTP client |
| **Create React App** | Latest | Build tooling |
| **JavaScript** | ES6+ | Programming language |
| **CSS3** | - | Styling |

### Development Tools

- **Git**: Version control
- **npm**: Package management
- **uvicorn**: ASGI server for development
- **Vercel**: Frontend deployment platform
- **Render**: Backend deployment platform

---

## 📁 Project Structure

```
Stocks_Agents/
├── stock-analysis-backend/
│   ├── agent/
│   │   ├── __init__.py           # Package initialization
│   │   ├── agent.py              # LangGraph workflow definition
│   │   ├── tool.py               # Tool implementations
│   │   └── app.py                # Standalone testing script
│   ├── backend/                  # Legacy backend folder (deprecated)
│   ├── main.py                   # FastAPI application entry point
│   ├── requirements.txt          # Python dependencies
│   ├── render.yaml               # Render deployment config
│   └── .env                      # Environment variables (not in git)
│
├── stock-analysis-frontend/
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── CandlestickChart.js      # OHLC chart
│   │   │   ├── PriceTrendChart.js       # Line chart for prices
│   │   │   ├── MarketDataCards.js       # Financial metrics cards
│   │   │   ├── SentimentPanels.js       # Bullish/bearish factors
│   │   │   ├── StockSummary.js          # Analysis summary
│   │   │   ├── FinancialsPanel.js       # Balance sheet data
│   │   │   ├── SearchBar.js             # Stock search input
│   │   │   ├── LoadingSpinner.js        # Loading state
│   │   │   └── ErrorMessage.js          # Error display
│   │   ├── App.js                # Main application component
│   │   ├── index.js              # Application entry point
│   │   └── index.css             # Global styles
│   ├── package.json              # Node dependencies
│   ├── .env                      # Frontend environment variables
│   └── .env.example              # Environment template
│
├── .gitignore                    # Git ignore rules
├── vercel.json                   # Vercel deployment config
└── README.md                     # Project README
```

### Key Files Explained

#### Backend Files

**`agent/agent.py`** (190 lines)
- Defines the LangGraph workflow with 5 nodes
- Implements state management using `AgentState` TypedDict
- Contains business logic for stock identification, news search, and analysis
- Uses Google Gemini for LLM operations

**`agent/tool.py`** (185 lines)
- Implements 5 tools: `web_search`, `money_control_scrap`, `get_financial_summary`, `get_historical_data`, `get_company_financials`
- Handles data fetching from external APIs
- Includes error handling and data formatting

**`main.py`** (137 lines)
- FastAPI application with CORS configuration
- Defines `/analyze` endpoint for stock analysis
- Implements request/response models with Pydantic
- Aggregates data from agent and financial tools

#### Frontend Files

**`App.js`**
- Main React component managing application state
- Handles API calls to backend
- Manages loading, error, and success states
- Renders child components conditionally

**`components/CandlestickChart.js`**
- Displays OHLC (Open, High, Low, Close) candlestick chart
- Supports time period filtering (1M, 3M, 6M, 1Y)
- Built with Recharts library

---

## ✨ Core Features

### 1. **Stock Symbol Identification**
- Converts user-friendly stock names to NSE symbols
- Handles variations (e.g., "TCS", "Tata Consultancy Services")
- Automatically appends `.NS` suffix for NSE stocks

### 2. **Multi-Source Data Aggregation**
- **Web Search**: Latest news and market sentiment via Tavily
- **Yahoo Finance**: Real-time pricing, historical data, financial metrics
- **MoneyControl**: Indian market-specific insights (future enhancement)

### 3. **AI-Powered Analysis**
- Generates structured analysis with:
  - Executive summary
  - Bullish factors (3 data-driven points)
  - Bearish factors (3 data-driven points)
  - Investment recommendation (BUY/HOLD/SELL)
  - Confidence level (HIGH/MEDIUM/LOW)

### 4. **Interactive Visualizations**
- **Candlestick Chart**: Historical OHLC data
- **Price Trend Chart**: Closing price line chart
- **Market Data Cards**: Key metrics (Price, Market Cap, P/E, 52W High/Low)
- **Sentiment Panels**: Visual representation of bullish/bearish factors

### 5. **Financial Metrics**
- Current Price
- Market Capitalization
- P/E Ratio (Price-to-Earnings)
- Dividend Yield
- 52-Week High/Low
- Volume data

### 6. **Historical Data**
- Up to 1 year of daily OHLC data
- Filterable time periods (1M, 3M, 6M, 1Y)
- Volume analysis

### 7. **Company Financials**
- Income Statement
- Balance Sheet
- Cash Flow Statement

---

## 🔌 API Documentation

### Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://your-backend-url.com`

### Endpoints

#### 1. Analyze Stock
**Endpoint**: `POST /analyze`

**Description**: Analyze a stock using AI agent and return comprehensive data.

**Request Body**:
```json
{
  "stock_name": "TCS"
}
```

**Request Model**:
```python
class StockRequest(BaseModel):
    stock_name: str  # Stock name or symbol
```

**Response Model**:
```python
class StockResponse(BaseModel):
    stock_name: str
    stock_symbol: str
    analysis: str
    structured_analysis: dict | None
    data: dict
    historical_data: list
    financials: dict
```

**Success Response (200 OK)**:
```json
{
  "stock_name": "TCS",
  "stock_symbol": "TCS.NS",
  "analysis": "TCS is showing strong performance with robust Q2 results...",
  "structured_analysis": {
    "summary": "TCS demonstrates strong fundamentals...",
    "bullish_factors": [
      "Quarterly revenue growth of 8% YoY",
      "Strong order book worth $10.2B",
      "Increasing digital transformation contracts"
    ],
    "bearish_factors": [
      "High attrition rate of 21.3%",
      "Currency headwinds affecting margins",
      "Intense competition in cloud services"
    ],
    "recommendation": "BUY",
    "confidence_level": "HIGH"
  },
  "data": {
    "current_price": 3456.20,
    "market_cap": "₹1254321.50 Cr",
    "pe_ratio": "28.45",
    "52_week_high": 3750.00,
    "52_week_low": 3100.00,
    "dividend_yield": "2.50%"
  },
  "historical_data": [
    {
      "date": "2024-01-01",
      "open": 3400.00,
      "high": 3450.00,
      "low": 3380.00,
      "close": 3420.00,
      "volume": 2500000
    }
  ],
  "financials": {
    "income_statement": {...},
    "balance_sheet": {...},
    "cash_flow": {...}
  }
}
```

**Error Response (500 Internal Server Error)**:
```json
{
  "detail": "Error message describing the issue"
}
```

#### 2. Health Check
**Endpoint**: `GET /health`

**Description**: Check if the API is running and healthy.

**Response (200 OK)**:
```json
{
  "status": "healthy"
}
```

#### 3. Root
**Endpoint**: `GET /`

**Description**: Root endpoint with API information.

**Response (200 OK)**:
```json
{
  "message": "Stock Analysis API is running",
  "docs": "/docs"
}
```

### API Routes

The API is accessible via two route patterns for Vercel compatibility:
- Direct: `/analyze`, `/health`
- API prefix: `/api/analyze`, `/api/health`

### Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request (invalid input) |
| 500 | Internal Server Error (API failure, LLM error, etc.) |

### Rate Limiting

Currently, no rate limiting is implemented. This is a recommended future enhancement.

---

## 🔄 Agent Workflow

### Workflow Nodes

The LangGraph agent executes the following nodes in sequence:

```
START → identify_stock → news_search → tools → process_tools → financial_analysis → END
```

#### Node 1: `identify_stock`
**Purpose**: Convert stock name to NSE symbol

**Input**:
```python
{
  "stock_name": "Tata Consultancy Services"
}
```

**Process**:
- Uses Google Gemini to identify the correct NSE symbol
- Handles variations in naming conventions
- Adds `.NS` suffix for NSE stocks

**Output**:
```python
{
  "stock_symbol": "TCS.NS"
}
```

#### Node 2: `news_search`
**Purpose**: Determine which tools to call for data gathering

**Process**:
- LLM decides which tools are needed
- Generates tool call messages
- Uses `llm.bind_tools()` for tool calling

**Output**:
```python
{
  "messages": [AI tool call message]
}
```

#### Node 3: `tools` (ToolNode)
**Purpose**: Execute selected tools in parallel

**Available Tools**:
1. **`web_search()`**: Searches web for latest stock news
2. **`money_control_scrap()`**: Scrapes MoneyControl website
3. **`get_financial_summary()`**: Fetches Yahoo Finance data

**Process**:
- Executes tools based on LLM's decision
- Returns tool results as messages

**Output**:
```python
{
  "messages": [Tool result messages]
}
```

#### Node 4: `process_tools`
**Purpose**: Extract and format tool results

**Process**:
- Parses messages from tool execution
- Extracts text content
- Limits to 2000 characters per result to manage token limits

**Output**:
```python
{
  "web_search_results": "Combined search results..."
}
```

#### Node 5: `financial_analysis`
**Purpose**: Generate structured AI analysis

**Process**:
- Combines all gathered data
- Prompts Gemini for structured JSON analysis
- Parses JSON response with fallback handling
- Validates required fields

**Output**:
```python
{
  "financial_analysis": "{\"summary\": \"...\", \"bullish_factors\": [...], ...}"
}
```

### State Flow

The agent maintains a shared state dictionary throughout execution:

```python
class AgentState(TypedDict):
    stock_name: str                    # Original input
    stock_symbol: str                  # NSE symbol (e.g., TCS.NS)
    messages: Annotated[list, operator.add]  # Accumulated messages
    web_search_results: str            # Aggregated search data
    money_control_data: str            # MoneyControl scraped data
    financial_analysis: str            # Final JSON analysis
```

### Conditional Edges

The workflow uses `tools_condition` to determine if tool execution is needed:
- If LLM returns tool calls → Execute tools
- If LLM returns final response → Skip tools (not used in current flow)

---

## 🚀 Installation & Setup

### Prerequisites

- **Python**: 3.12 or higher
- **Node.js**: 14 or higher
- **npm**: 6 or higher
- **Git**: For version control
- **API Keys**: Google AI, Tavily

### Backend Setup

#### 1. Clone Repository
```bash
git clone <your-repo-url>
cd Stocks_Agents/stock-analysis-backend
```

#### 2. Create Virtual Environment (Recommended)
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

Or install manually:
```bash
pip install langchain langchain-google-genai langchain-community langgraph fastapi uvicorn python-dotenv requests beautifulsoup4 yfinance
```

#### 4. Configure Environment Variables
Create a `.env` file in `stock-analysis-backend/`:

```env
# Google AI API Key
GOOGLE_API_KEY=your_google_api_key_here

# Tavily Search API Key
TAVILY_API_KEY=your_tavily_api_key_here

# CORS Settings (optional, defaults to localhost:3000)
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

#### 5. Obtain API Keys

**Google AI Studio API Key**:
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

**Tavily API Key**:
1. Visit [Tavily](https://tavily.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Copy the key to your `.env` file

#### 6. Start Backend Server
```bash
cd stock-analysis-backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at:
- **API**: `http://localhost:8000`
- **Swagger Docs**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Frontend Setup

#### 1. Navigate to Frontend Directory
```bash
cd stock-analysis-frontend
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Environment (Optional)
Create `.env` in `stock-analysis-frontend/`:

```env
REACT_APP_API_URL=http://localhost:8000
```

#### 4. Start Development Server
```bash
npm start
```

The frontend will be available at:
- **URL**: `http://localhost:3000`
- **Auto-reload**: Enabled

### Verify Installation

1. **Backend Health Check**:
   ```bash
   curl http://localhost:8000/health
   ```
   Expected: `{"status":"healthy"}`

2. **Frontend Access**:
   - Open `http://localhost:3000` in browser
   - You should see the stock search interface

3. **End-to-End Test**:
   - Enter "TCS" in the search bar
   - Click "Analyze Stock"
   - Wait for analysis results (15-30 seconds)

---

## 📘 Usage Guide

### Basic Stock Analysis

1. **Open the Application**
   - Navigate to `http://localhost:3000`

2. **Enter Stock Name**
   - Type stock name (e.g., "TCS", "Reliance Industries", "Infosys")
   - Or enter stock symbol (e.g., "TCS.NS", "RELIANCE.NS")

3. **Analyze**
   - Click "Analyze Stock" button
   - Wait for analysis (typically 15-30 seconds)

4. **Review Results**
   - **Summary**: Executive overview of stock position
   - **Market Data**: Current price, market cap, P/E ratio
   - **Charts**: Candlestick and price trend charts
   - **Sentiment**: Bullish and bearish factors
   - **Recommendation**: Investment advice with confidence level
   - **Financials**: Company financial statements

### Understanding the Analysis

#### Recommendation Types
- **BUY**: Stock shows strong upward potential based on fundamentals and news
- **HOLD**: Stock is fairly valued, wait for better entry/exit points
- **SELL**: Stock shows weakness or overvaluation concerns

#### Confidence Levels
- **HIGH**: Strong data backing, clear trend
- **MEDIUM**: Mixed signals, moderate certainty
- **LOW**: Limited data, uncertain market conditions

### Chart Interactions

#### Candlestick Chart
- **Filter**: Click time period buttons (1M, 3M, 6M, 1Y)
- **Hover**: View exact OHLC values for each day
- **Interpret**:
  - Green candles: Closing price > opening price (bullish)
  - Red candles: Closing price < opening price (bearish)

#### Price Trend Chart
- **Hover**: View exact closing price and date
- **Trend**: Upward slope = bullish, downward = bearish

### Testing with Test Script

```bash
cd stock-analysis-backend/agent
python app.py
```

This runs a standalone test of the agent with a predefined stock ("TCS").

---

## ⚙️ Configuration

### Backend Configuration

#### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GOOGLE_API_KEY` | Yes | - | Google AI Studio API key |
| `TAVILY_API_KEY` | Yes | - | Tavily search API key |
| `ALLOWED_ORIGINS` | No | `http://localhost:3000` | CORS allowed origins (comma-separated) |

#### CORS Settings

In `main.py`:
```python
# Allow all origins (development only)
ALLOWED_ORIGINS="*"

# Allow specific origins (production)
ALLOWED_ORIGINS="https://yourdomain.com,https://www.yourdomain.com"
```

#### LLM Configuration

In `agent/agent.py`:
```python
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",  # Model version
    temperature=0,             # Deterministic output
    google_api_key=google_api_key
)
```

**Available Models**:
- `gemini-2.0-flash`: Fast, cost-effective
- `gemini-pro`: More capable, higher cost

#### Search Configuration

In `agent/tool.py`:
```python
TavilySearchResults(
    max_results=5,  # Number of search results
    api_key=os.getenv("TAVILY_API_KEY")
)
```

### Frontend Configuration

#### API Endpoint

In `src/App.js`:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
```

#### Chart Configuration

Modify chart settings in component files:
- `components/CandlestickChart.js`
- `components/PriceTrendChart.js`

---

## 🛠️ Development Guide

### Adding New Tools

#### 1. Define Tool Function
In `agent/tool.py`:
```python
def my_new_tool(stock_symbol: str):
    """
    Description of what the tool does.
    
    Args:
        stock_symbol: NSE stock symbol (e.g., TCS.NS)
    
    Returns:
        Processed data
    """
    # Implementation
    data = fetch_data(stock_symbol)
    return process_data(data)
```

#### 2. Register Tool
In `agent/agent.py`:
```python
# Add to tools list
tools = [web_search, money_control_scrap, get_financial_summary, my_new_tool]

# In ToolNode
tools_list = [web_search(), money_control_scrap, get_financial_summary, my_new_tool]
```

#### 3. Update State (if needed)
```python
class AgentState(TypedDict):
    # ... existing fields
    my_new_data: str  # Add new field
```

### Modifying Workflow

#### Add New Node
```python
def my_new_node(state: AgentState):
    """Node logic"""
    # Process state
    return {"new_field": "value"}

# Register node
workflow.add_node("my_node", my_new_node)

# Add edges
workflow.add_edge("previous_node", "my_node")
workflow.add_edge("my_node", "next_node")
```

#### Add Conditional Edge
```python
def my_condition(state: AgentState):
    """Return next node name based on state"""
    if state.get("some_field"):
        return "node_a"
    return "node_b"

workflow.add_conditional_edges("my_node", my_condition)
```

### Adding Frontend Components

#### 1. Create Component
In `src/components/MyComponent.js`:
```javascript
import React from 'react';

const MyComponent = ({ data }) => {
  return (
    <div className="my-component">
      {/* Component JSX */}
    </div>
  );
};

export default MyComponent;
```

#### 2. Import in App.js
```javascript
import MyComponent from './components/MyComponent';

function App() {
  return (
    <div>
      <MyComponent data={stockData} />
    </div>
  );
}
```

### Testing

#### Backend Unit Tests
```bash
# Run specific test
python -m pytest tests/test_agent.py

# Run all tests
python -m pytest tests/
```

#### Frontend Tests
```bash
npm test
```

### Code Style

#### Python
- Follow PEP 8
- Use type hints
- Add docstrings for functions
- Use meaningful variable names

#### JavaScript
- Use ES6+ syntax
- Prefer functional components
- Use hooks for state management
- Follow Airbnb style guide

---

## 🚢 Deployment

### Backend Deployment (Render)

#### 1. Create `render.yaml`
Already configured in the project:
```yaml
services:
  - type: web
    name: stock-analysis-backend
    env: python
    buildCommand: "pip install -r requirements.txt"
    startCommand: "uvicorn main:app --host 0.0.0.0 --port $PORT"
    envVars:
      - key: GOOGLE_API_KEY
        sync: false
      - key: TAVILY_API_KEY
        sync: false
      - key: ALLOWED_ORIGINS
        sync: false
```

#### 2. Deploy to Render
1. Create account at [Render.com](https://render.com)
2. Connect GitHub repository
3. Create new Web Service
4. Select `stock-analysis-backend` directory
5. Add environment variables in dashboard
6. Deploy

### Frontend Deployment (Vercel)

#### 1. Create `vercel.json`
Already configured:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "stock-analysis-frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/stock-analysis-frontend/$1"
    }
  ]
}
```

#### 2. Deploy to Vercel
```bash
cd stock-analysis-frontend
npm run build
vercel --prod
```

Or use Vercel GitHub integration for automatic deployments.

#### 3. Update Environment Variables
In Vercel dashboard:
- `REACT_APP_API_URL`: Your Render backend URL

### Production Checklist

- [ ] Update CORS `ALLOWED_ORIGINS` to production domains
- [ ] Set environment variables in hosting platforms
- [ ] Enable HTTPS
- [ ] Monitor API usage and costs
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure CDN for frontend assets
- [ ] Enable rate limiting
- [ ] Set up logging and monitoring

---

## 🔧 Troubleshooting

### Common Issues

#### Backend Issues

**Issue**: `ModuleNotFoundError: No module named 'langchain'`
**Solution**:
```bash
pip install -r requirements.txt
```

**Issue**: `401 Unauthorized` from Google AI
**Solution**:
- Verify `GOOGLE_API_KEY` in `.env`
- Check API key is valid at Google AI Studio
- Ensure billing is enabled if using paid features

**Issue**: `Connection refused` when calling backend
**Solution**:
- Verify backend is running: `curl http://localhost:8000/health`
- Check port 8000 is not in use
- Review CORS settings if calling from different domain

**Issue**: `Agent workflow timeout`
**Solution**:
- Check internet connection (tools require web access)
- Verify Tavily API key is valid
- Try with a different stock symbol

#### Frontend Issues

**Issue**: `npm install` fails
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Issue**: Blank page after deployment
**Solution**:
- Check browser console for errors
- Verify `REACT_APP_API_URL` environment variable
- Ensure backend is accessible from frontend domain

**Issue**: CORS errors in browser
**Solution**:
- Add frontend domain to `ALLOWED_ORIGINS` in backend `.env`
- Restart backend server after env changes

### Debugging

#### Enable Verbose Logging
In `agent/agent.py`:
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

#### View Agent State
Add print statements in nodes:
```python
def identify_stock(state: AgentState):
    print(f"Current state: {state}")
    # ... rest of function
```

#### Test Tools Individually
```python
from agent.tool import get_financial_summary

result = get_financial_summary("TCS.NS")
print(result)
```

---

## 🔮 Future Enhancements

### Planned Features

#### High Priority
1. **Historical Data Analysis**
   - Long-term trend analysis (5Y, 10Y)
   - Moving averages (50-day, 200-day)
   - Support/resistance level detection

2. **Technical Indicators**
   - RSI (Relative Strength Index)
   - MACD (Moving Average Convergence Divergence)
   - Bollinger Bands
   - Fibonacci retracement

3. **Portfolio Management**
   - User authentication (JWT)
   - Multi-stock portfolio tracking
   - P&L calculation
   - Performance vs benchmarks (NIFTY 50, SENSEX)

4. **Real-time Updates**
   - WebSocket integration for live prices
   - Price alerts and notifications
   - Real-time news feed

5. **Sentiment Analysis**
   - Twitter/X sentiment tracking
   - Reddit community sentiment
   - News sentiment scoring
   - Social media buzz metrics

#### Medium Priority
6. **Comparative Analysis**
   - Side-by-side stock comparison
   - Sector performance comparison
   - Peer group analysis

7. **Advanced Analytics**
   - ML-based price prediction (LSTM)
   - Risk assessment scores
   - Correlation analysis

8. **User Features**
   - Watchlist management
   - Custom alerts
   - Report export (PDF)
   - Email digests

9. **Data Enhancements**
   - Insider trading data
   - Block deals tracking
   - Mutual fund holdings
   - FII/DII activity

#### Low Priority
10. **International Markets**
    - US stocks (NYSE, NASDAQ)
    - Currency conversion
    - Global indices

11. **IPO Tracking**
    - Upcoming IPO calendar
    - IPO analysis
    - Grey market premium

12. **Mobile App**
    - React Native app
    - Push notifications
    - Offline mode

### Technical Improvements

- [ ] Add caching layer (Redis)
- [ ] Implement rate limiting
- [ ] Add comprehensive test suite
- [ ] Set up CI/CD pipeline
- [ ] Database integration (PostgreSQL)
- [ ] API versioning
- [ ] Implement pagination
- [ ] Add request/response compression
- [ ] Optimize LLM token usage
- [ ] Add monitoring and observability

---

## 📝 Notes

### Token Limits
- Google Gemini Flash: Generous limits, monitor usage
- Tavily: Free tier has rate limits, consider upgrading for production

### Data Source Reliability
- Yahoo Finance: Reliable but occasional downtime
- MoneyControl: Web scraping may break if site structure changes

### Legal Disclaimer
This tool is for informational purposes only. Stock analysis should not be considered financial advice. Always consult a qualified financial advisor before making investment decisions.

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review GitHub Issues
3. Check API provider status pages (Google AI, Tavily)

---

## 📄 License

This project is licensed under the MIT License.

---

**Last Updated**: December 16, 2024  
**Version**: 1.0.0  
**Author**: Mohit Kumar
