// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [stockName, setStockName] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeStock = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/analyze', {
        stock_name: stockName
      });
      setAnalysis(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze stock');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header>
        <h1>📈 AI Stock Analysis</h1>
      </header>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter stock name (e.g., Reliance, TCS)"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && analyzeStock()}
        />
        <button onClick={analyzeStock} disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {analysis && (
        <div className="results">
          <h2>{analysis.stock_name} ({analysis.stock_symbol})</h2>
          
          <div className="market-data">
            <h3>Market Data</h3>
            <div className="data-grid">
              <div>Price: ₹{analysis.data.current_price}</div>
              <div>Market Cap: ₹{analysis.data.market_cap}</div>
              <div>P/E Ratio: {analysis.data.pe_ratio}</div>
            </div>
          </div>

          <div className="analysis-section">
            <h3>AI Analysis</h3>
            <p>{analysis.analysis}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;