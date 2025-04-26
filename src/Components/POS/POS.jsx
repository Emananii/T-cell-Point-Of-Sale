import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/POS.css';
import CartView from './CartView';
import ProductView from './ProductView';

const POS = () => {
  // State declarations
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const formatted = data.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            image: product.image,
            category: product.category,
            unit: product.unit,
          }));
          setProducts(formatted);
          setFilteredProducts(formatted);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Apply search
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sort
    result.sort((a, b) => {
      if (a[sortOption] < b[sortOption]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortOption] > b[sortOption]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredProducts(result);
  }, [products, searchTerm, sortOption, sortDirection]);

  // Cart functions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      return existing
        ? prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return removeFromCart(productId);
    
    const product = products.find(p => p.id === productId);
    if (product && newQuantity > product.stock) return;
    
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const checkout = () => {
    console.log('Checkout:', cart);
    setCart([]);
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="pos-container">
      <button onClick={handleBackClick} className="back-button">
        Back to Dashboard
      </button>

      {error && <div className="error-message">{error}</div>}

      <div className="product-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        
        <div className="sort-controls">
          <select 
            value={sortOption} 
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="category">Category</option>
          </select>
          
          <button 
            onClick={toggleSortDirection} 
            className="sort-direction-btn"
          >
            {sortDirection === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="cart-section">
        <CartView
          cartItems={cart}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onCheckout={checkout}
        />
      </div>
      
      <div className="product-section">
        <ProductView
          products={filteredProducts}
          loading={loading}
          onAddToCart={addToCart}
        />
      </div>
    </div>
  );
};

export default POS;