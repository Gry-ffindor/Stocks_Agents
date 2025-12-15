import React from 'react';
import './SearchBar.css';

function SearchBar({ stockName, setStockName, onSearch, loading }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && stockName.trim()) {
      onSearch();
    }
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter stock name or symbol (e.g., Reliance, TCS, INFY.NS)"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button
          className="search-button"
          onClick={onSearch}
          disabled={loading || !stockName.trim()}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Analyzing...
            </>
          ) : (
            'Analyze Stock'
          )}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
