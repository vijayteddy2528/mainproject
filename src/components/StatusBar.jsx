import React from "react";

const StatusBar = ({ comparedProducts, setShowComparison, clearComparison }) => {
  if (comparedProducts.length === 0) return null;

  return (
    <div className="status-container">
      <div className="status-wrapper">
        
        <div className="status-info">
          <span className="status-text">
            {comparedProducts.length} product(s) selected for comparison
          </span>
        </div>

        <div className="status-actions">
          <button
            className="show-comparison-btn"
            onClick={() => setShowComparison(true)}
          >
            Show Comparison
          </button>
          <button
            className="clear-all-btn"
            onClick={clearComparison}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
