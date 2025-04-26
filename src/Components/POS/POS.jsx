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
            price: product["selling-price"],//changed db.json to have selling-price rather than just price
            purchasePrice: product["purchase-price"],
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
    let result = [...products];
    
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    result.sort((a, b) => {
      if (a[sortOption] < b[sortOption]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortOption] > b[sortOption]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredProducts(result);
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
      // Generate a unique sale ID (could be a UUID or any other method)
      const saleId = '1dba'; // You can generate this dynamically as per your needs
      
      // Format the timestamp to match the desired format
      const timestamp = new Date().toISOString(); // No need to remove milliseconds here, as your format is fine
  
      // Prepare the sale data to match the required format
      const saleData = {
        id: saleId,  // Unique sale ID
        timestamp: timestamp,  // Use 'timestamp' field
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          stock: item.stock,  // Add stock info
          image: item.image,  // Add image info
          category: item.category,
          unit: item.unit,  // Add unit info
          quantity: item.quantity
        })),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'completed',
      };
  
      // Make the POST request to save the sale
      const response = await fetch('http://localhost:3000/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleData),
      });
  
      if (!response.ok) throw new Error('Failed to record sale');
  
      // Mark checkout as complete and clear the cart
      setIsCheckoutComplete(true);
      setCart([]);
  
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
          isCheckoutComplete={isCheckoutComplete}
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