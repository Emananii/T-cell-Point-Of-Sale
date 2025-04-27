import '../../Styles/POS.css';

const ProductView = ({ products, loading, onAddToCart, searchTerm = '' }) => {
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  // Enhanced search filtering
  const filteredProducts = products.filter(product => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name?.toLowerCase().includes(searchLower) ||
      product.category?.toLowerCase().includes(searchLower) ||
      product.id?.toString().includes(searchTerm) || // Search by ID
      product.price?.toString().includes(searchTerm) // Search by price
    );
  });

  if (!filteredProducts.length) {
    return (
      <div className="product-view">
        <h2>Products</h2>
        <div className="no-results">
          <p>No products found for "{searchTerm}"</p>
          <p>Try searching by name, category, ID, or price</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-view">
      <h2>Products {searchTerm && `(Search: "${searchTerm}")`}</h2>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product?.image || 'https://via.placeholder.com/140'}
              alt={product?.name || 'Product Image'}
              className="product-image"
            />
            <div className="product-details">
              <h3>{product?.name || 'Unnamed Product'}</h3>
              <div className="product-meta">
                <p className="product-price">${product?.price ? product.price.toFixed(2) : '0.00'}</p>
                {product.category && <p className="product-category">{product.category}</p>}
                <p className="product-id">ID: {product.id}</p>
              </div>
            </div>
            <div className="product-actions">
              <button
                className="add-to-cart-button"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductView;