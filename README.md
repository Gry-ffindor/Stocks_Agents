# Stock Analysis Agent

An AI-powered stock analysis system that leverages LangGraph, OpenAI GPT-4, and web scraping to provide comprehensive stock market insights for Indian markets.

## Features

- **AI-Powered Analysis**: Uses GPT-4 to generate comprehensive stock analysis
- **Multi-Source Data**: Combines web search results and Money Control data
- **LangGraph Workflow**: Implements a sophisticated agent workflow with tool calling
- **Real-time Search**: Integrates Tavily search for latest stock news
- **Web Scraping**: Scrapes Money Control for detailed stock metrics
- **REST API**: FastAPI backend with CORS support
- **React Frontend**: Modern UI with interactive charts using Recharts

## Tech Stack

### Backend
- **LangGraph**: Agent orchestration and workflow management
- **LangChain**: LLM integration and tool calling
- **OpenAI GPT-4**: Natural language processing and analysis
- **FastAPI**: High-performance API framework
- **Tavily**: Web search API
- **BeautifulSoup4**: Web scraping
- **Python 3.12+**

### Frontend
- **React 19**: UI framework
- **Recharts**: Data visualization
- **Axios**: HTTP client
- **Create React App**: Build tooling

## Project Structure

```
Stocks_Agents/
├── agent/
│   ├── __init__.py
│   ├── agent.py          # LangGraph workflow and nodes
│   ├── app.py            # Test runner
│   └── tool.py           # Tool definitions (search, scraper)
├── backend/
│   └── main.py           # FastAPI server
├── stock-analysis-frontend/
│   ├── src/
│   │   ├── App.js        # React main component
│   │   └── ...
│   └── package.json
├── .env                  # Environment variables (not in git)
├── .gitignore
└── README.md
```

## Installation

### Prerequisites
- Python 3.12+
- Node.js 14+
- npm or yarn

### Backend Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Stocks_Agents
```

2. Install Python dependencies:
```bash
pip install langchain langchain-openai langchain-community langgraph fastapi uvicorn python-dotenv requests beautifulsoup4
```

3. Create `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

4. Start the FastAPI backend:
```bash
cd backend
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Install frontend dependencies:
```bash
cd stock-analysis-frontend
npm install
```

2. Start the React development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## API Keys

You'll need to obtain the following API keys:

- **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/api-keys)
- **Tavily API Key**: Get from [Tavily](https://tavily.com)

## Usage

### Using the Web Interface

1. Open `http://localhost:3000` in your browser
2. Enter a stock name or symbol (e.g., "TCS", "Reliance Industries")
3. Click "Analyze Stock"
4. View the comprehensive analysis including:
   - Current market position
   - Recent news impact
   - Investment recommendation with disclaimer

### Using the API

**Endpoint**: `POST /analyze`

**Request Body**:
```json
{
  "stock_name": "TCS"
}
```

**Response**:
```json
{
  "stock_name": "TCS",
  "stock_symbol": "TCS.NS",
  "analysis": "Detailed analysis text...",
  "data": {
    "web_search_results": "...",
    "money_control_data": "..."
  }
}
```

**Health Check**: `GET /health`

### Running Tests

```bash
cd agent
python app.py
```

## Agent Workflow

The LangGraph agent follows this workflow:

1. **Identify Stock**: Converts stock name to symbol
2. **News Search**: LLM decides which tools to call
3. **Tool Execution**: Executes web search and scraping tools
4. **Process Results**: Extracts and formats tool results
5. **Financial Analysis**: Generates comprehensive analysis using GPT-4

## Configuration

### Backend Configuration
- **Host**: `127.0.0.1`
- **Port**: `8000`
- **CORS**: Enabled for `http://localhost:3000`

### Frontend Configuration
- **API Base URL**: `http://localhost:8000`
- **Port**: `3000`

## Development

### Adding New Tools

Add new tools in `agent/tool.py`:

```python
def new_tool(param: str):
    """Tool description"""
    # Implementation
    return result
```

Then register in `agent/agent.py`:
```python
tools_list = [web_search(), money_control_scrap, get_financial_summary, new_tool]
```

### Modifying the Workflow

Edit `agent/agent.py` to add new nodes or modify edges:

```python
workflow.add_node("new_node", new_node_function)
workflow.add_edge("previous_node", "new_node")
```

## Known Issues

- Money Control scraper may need updates if website structure changes
- Token limits apply based on OpenAI plan (30,000 TPM for basic tier)
- Web search limited to 5 results per query

## Future Enhancements

- [ ] Support for international stock markets
- [ ] Historical data analysis and trends
- [ ] Portfolio tracking and management
- [ ] Email alerts for price changes
- [ ] Technical indicators (RSI, MACD, etc.)
- [ ] Sentiment analysis from social media
- [ ] Export reports to PDF

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Disclaimer

**Important**: This tool is for informational purposes only. The stock analysis and recommendations provided by this system should not be considered as financial advice. Always consult with a qualified financial advisor before making investment decisions. The developers are not responsible for any financial losses incurred based on the analysis provided by this tool.

## Acknowledgments

- Built with [LangGraph](https://github.com/langchain-ai/langgraph)
- Powered by [OpenAI GPT-4](https://openai.com)
- Search by [Tavily](https://tavily.com)
- Data from [Money Control](https://www.moneycontrol.com)

---

Made with ❤️ using AI-powered development tools
