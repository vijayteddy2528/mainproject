
import { Star, Plus } from "lucide-react";

const ProductCard = ({ product, comparedProducts, addToComparison }) => (
  <div className="product-card">
    <div className="product-header">
      <div className="product-image">{product.image}</div>
      <div className="product-rating">
        <Star className="star-icon" />
        <span>{product.rating}</span>
      </div>
    </div>
    
    <h3 className="product-name">{product.name}</h3>
    <p className="product-brand">{product.brand}</p>
    <p className="product-category">{product.category}</p>
    
    <div className="product-price">
      ${product.price.toLocaleString()}
    </div>
    
    <div className="product-features">
      <div><strong>Display:</strong> {product.features.display}</div>
      <div><strong>Processor:</strong> {product.features.processor}</div>
      <div><strong>Storage:</strong> {product.features.storage}</div>
    </div>
    
    <button
      onClick={() => addToComparison(product)}
      disabled={comparedProducts.length >= 3 || comparedProducts.find(p => p.id === product.id)}
      className="compare-btn"
    >
      <Plus className="btn-icon" />
      <span>
        {comparedProducts.find(p => p.id === product.id) ? 'Added' : 'Compare'}
      </span>
    </button>
  </div>
);

export default ProductCard;
