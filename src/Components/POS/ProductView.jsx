import '../../Styles/POS.css';

const ProductView = ({ products, loading, onAddToCart }) => {
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (!products?.length) {
    return <p>No products available.</p>;
  }

  return (
    <div className="product-view">
      <h2>Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product?.image || 'https://via.placeholder.com/140'}
              alt={product?.name || 'Product Image'}
              className="product-image"
            />
            <div className="product-details">
              <h3>{product?.name || 'Unnamed Product'}</h3>
              <p>${product?.price ? product.price.toFixed(2) : '0.00'}</p>
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
