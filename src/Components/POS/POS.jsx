import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/POS.css';
import CartView from './CartView';
import ProductView from './ProductView';

function POS() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [error, setError] = useState(null);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://t-cell-point-of-sale-backend.onrender.com/products')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const formatted = data.map((product, index) => ({
            saleId: product.id ?? `temp-${index}`,
            id: product.id, // Add this because you were referencing 'id' elsewhere
            name: product.name,
            price: product["selling-price"],
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
    const filterAndSortProducts = () => {
      let result = [...products];

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        result = result.filter(product =>
          product.name?.toLowerCase().includes(searchLower) ||
          product.category?.toLowerCase().includes(searchLower) ||
          product.id?.toString().includes(searchTerm) ||
          product.price?.toString().includes(searchTerm) ||
          product.unit?.toLowerCase().includes(searchLower)
        );
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
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
  
      if (existingProductIndex !== -1) {
        // If the product exists, update the quantity in a non-mutating way
        const updatedCart = prevCart.map((item, index) => {
          if (index === existingProductIndex) {
            // Make sure to not mutate the original state object
            const updatedProduct = { ...item };
  
            // Check if the quantity is within the stock limit before updating
            if (updatedProduct.quantity < updatedProduct.stock) {
              updatedProduct.quantity += 1; // Increment the quantity by 1
            }
  
            return updatedProduct;
          }
          return item; // Return the other items unchanged
        });
  
        return updatedCart;
      } else {
        // If the product doesn't exist in the cart, add it with a quantity of 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  
  
  

  const removeFromCart = (productId) => {
    if (isCheckoutComplete) return;
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (isCheckoutComplete) return;
    if (newQuantity < 1) return removeFromCart(productId);

    const product = products.find((p) => p.id === productId);
    if (product && newQuantity > product.stock) return;

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const checkout = async () => {
    try {
      const saleId = Date.now();
      const timestamp = new Date().toISOString();

      const saleData = {
        id: saleId,
        timestamp,
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          priceAtSale: item.price,
        })),
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        status: 'completed',
      };

      const response = await fetch('http://localhost:3000/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleData),
      });

      if (!response.ok) throw new Error('Failed to record sale');

      console.log('Sale recorded:', saleData);

      setCart([]);
      setIsCheckoutComplete(false);
      setSuccessMessage('✅ Sale completed successfully!');
      setError('');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (error) {
      console.error('Checkout error:', error);
      setError('❌ Failed to complete checkout. Please try again.');
      setSuccessMessage('');

      setTimeout(() => {
        setError('');
      }, 6000);
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
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="pos-container">
      <button onClick={handleBackClick} className="back-button">
        Back to Dashboard
      </button>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

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

        <ProductView
          products={filteredProducts}
          loading={loading}
          onAddToCart={addToCart}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}

export default POS;
