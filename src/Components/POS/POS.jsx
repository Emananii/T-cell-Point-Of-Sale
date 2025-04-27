import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/POS.css';
import CartView from './CartView';
import ProductView from './ProductView';

const POS = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [error, setError] = useState(null);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const filterAndSortProducts = () => {
      let result = [...products];
      
      
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        result = result.filter(product => {
          return (
            product.name?.toLowerCase().includes(searchLower) ||
            product.category?.toLowerCase().includes(searchLower) ||
            product.id?.toString().includes(searchTerm) ||
            product.price?.toString().includes(searchTerm) ||
            product.unit?.toLowerCase().includes(searchLower)
          );
        });
      }
      
      result.sort((a, b) => {
        const valA = a[sortOption];
        const valB = b[sortOption];
        
        if (valA === undefined || valB === undefined) return 0;
        
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortDirection === 'asc' 
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      });
      
      setFilteredProducts(result);
    };

    filterAndSortProducts();
  }, [products, searchTerm, sortOption, sortDirection]);

 
  const addToCart = (product) => {
    if (isCheckoutComplete) return;
    
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
    if (isCheckoutComplete) return;
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (isCheckoutComplete) return;
    if (newQuantity < 1) return removeFromCart(productId);
    
    const product = products.find(p => p.id === productId);
    if (product && newQuantity > product.stock) return;
    
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const checkout = async () => {
    try {
      const saleData = {
        date: new Date().toISOString(),
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'completed'
      };

      const response = await fetch('http://localhost:3000/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleData)
      });

      if (!response.ok) throw new Error('Failed to record sale');

      setIsCheckoutComplete(true);
      console.log('Sale recorded:', saleData);

    } catch (error) {
      console.error('Checkout error:', error);
      setError('Failed to complete checkout. Please try again.');
    }
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
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
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, category, ID, or price..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={clearSearch}>
              ×
            </button>
          )}
        </div>
        
        <div className="sort-controls">
          <select 
            value={sortOption} 
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="category">Category</option>
            <option value="stock">Stock</option>
          </select>
          
          <button 
            onClick={toggleSortDirection} 
            className="sort-direction-btn"
            aria-label={`Sort ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
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
          isCheckoutComplete={isCheckoutComplete}
        />
      </div>
      
      <div className="product-section">
        <ProductView
          products={filteredProducts}
          loading={loading}
          onAddToCart={addToCart}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default POS;