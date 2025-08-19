import React from "react";
import { Star, X, AlertCircle } from "lucide-react";

const ComparisonTable = ({ comparedProducts, clearComparison, removeFromComparison }) => {
  if (comparedProducts.length === 0) return null;

  const allFeatureKeys = new Set();
  comparedProducts.forEach(product => {
    Object.keys(product.features).forEach(key => allFeatureKeys.add(key));
  });

  return (
    <div className="comparison-container">
      <div className="comparison-header">
        <h2>Product Comparison</h2>
        <button onClick={clearComparison} className="clear-btn">
          <X className="btn-icon" />
          <span>Clear All</span>
        </button>
      </div>
      
      <div className="table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="feature-header">Feature</th>
              {comparedProducts.map(product => (
                <th key={product.id} className="product-header-cell">
                  <div className="product-info">
                    <div className="product-image">{product.image}</div>
                    <div className="product-name-small">{product.name}</div>
                    <div className="product-brand-small">{product.brand}</div>
                    <div className="product-price-small">${product.price.toLocaleString()}</div>
                    <button
                      onClick={() => removeFromComparison(product.id)}
                      className="remove-btn"
                    >
                      <X className="btn-icon" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="rating-row">
              <td className="feature-cell">Rating</td>
              {comparedProducts.map(product => (
                <td key={product.id} className="value-cell">
                  <div className="rating-display">
                    <Star className="star-icon" />
                    <span>{product.rating}</span>
                  </div>
                </td>
              ))}
            </tr>
            {Array.from(allFeatureKeys).map(featureKey => (
              <tr key={featureKey}>
                <td className="feature-cell">
                  {featureKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </td>
                {comparedProducts.map(product => (
                  <td key={product.id} className="value-cell">
                    {product.features[featureKey] || 
                      <span className="no-data">
                        <AlertCircle className="alert-icon" />
                      </span>
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
