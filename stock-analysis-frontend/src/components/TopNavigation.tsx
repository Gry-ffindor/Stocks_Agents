import React from 'react';
import './TopNavigation.css';

interface TopNavigationProps {
  onSearch?: (symbol: string) => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim() && onSearch) {
      onSearch(searchValue.trim());
    }
  };

  return (
    <nav className="top-navigation">
      <div className="nav-container">
        {/* Brand */}
        <div className="nav-brand">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="currentColor"/>
            </svg>
          </div>
          <span className="brand-name">Stock Agent <span className="brand-highlight">Pro</span></span>
        </div>

        {/* Search */}
        <form className="nav-search" onSubmit={handleSearch}>
          <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7 12a5 5 0 100-10 5 5 0 000 10zM12 12l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search symbol (e.g., TCS, AAPL, RELIANCE)..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>

        {/* Right side indicators */}
        <div className="nav-indicators">
          <div className="nav-item markets-indicator">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h3l2-4 2 8 2-4h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Markets</span>
          </div>
          <div className="nav-item agent-status">
            <span className="status-dot"></span>
            <span>Agent Active</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
