import React, { useState, useMemo } from "react";
import products from "./Data";
import ProductCard from "./components/ProductCard";
import ComparisonTable from "./components/ComparisonTable";
import SearchFilter from "./components/SearchFilter";
import StatusBar from "./components/StatusBar";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [comparedProducts, setComparedProducts] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const addToComparison = (product) => {
    if (comparedProducts.length < 3 && !comparedProducts.find(p => p.id === product.id)) {
      setComparedProducts([...comparedProducts, product]);
    }
  };

  const removeFromComparison = (productId) => {
    setComparedProducts(comparedProducts.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setComparedProducts([]);
    setShowComparison(false);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Tech Product Comparison Tool</h1>
      <p className="app-subtitle">Search, filter, and compare up to 3 products</p>

  
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      <StatusBar
        comparedProducts={comparedProducts}
        setShowComparison={setShowComparison}
        clearComparison={clearComparison}
      />


      {showComparison && (
        <ComparisonTable
          comparedProducts={comparedProducts}
          clearComparison={clearComparison}
          removeFromComparison={removeFromComparison}
        />
      )}

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            comparedProducts={comparedProducts}
            addToComparison={addToComparison}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
