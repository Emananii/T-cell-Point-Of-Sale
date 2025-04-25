import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/POS.css';
import CartView from './CartView';
import ProductView from './ProductView';

const POS = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

 
  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data from API:", data);
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
        } else {
          console.error("Expected array from API, got:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, []);


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
    if (product && newQuantity > product.stock) {
      return; 
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const checkout = () => {
    console.log('Checkout:', cart);
    setCart([])
  };


  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="pos-container">
      <button onClick={handleBackClick} className="back-button">
        Back to Dashboard
      </button>

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
          products={products}
          loading={loading}
          onAddToCart={addToCart}
        />
      </div>
    </div>
  );
};

export default POS;
