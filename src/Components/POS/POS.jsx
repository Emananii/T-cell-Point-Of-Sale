import { useState, useEffect } from 'react';
import CartView from './CartView';
import ProductView from './ProductView';
import './POS.css';

const POS = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
   
    fetch('/db.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      
        setProducts([
          {
            id: 1,
            name: "Sample Product",
            price: 19.99,
            image: "https://via.placeholder.com/200"
          }
        ]);
      });
  }, []);

  
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      }
      return [...prevCart, {...product, quantity: 1}];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item =>
        item.id === productId
          ? {...item, quantity: newQuantity}
          : item
      )
    );
  };

  const checkout = () => {
    console.log("Checking out:", cart);
    setCart([]);
  };

  return (
    <div className="pos-container">
      <CartView 
        cartItems={cart} 
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={checkout}
      />
      <ProductView 
        products={products} 
        loading={loading}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default POS;