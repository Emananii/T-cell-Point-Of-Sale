import { useState, useEffect } from 'react';
import axios from 'axios';
import CartView from './CartView';
import ProductView from './ProductView';
import './POS.css';
import db from 'db.json';

const POS = () => {
  const [products, setProducts] = useState(db.products);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(response => {
        const formattedProducts = response.data.products
          .filter(p => p.product_name) 
          .map(product => ({
            id: product.code,
            name: product.product_name,
            price: product.product_quantity ? parseFloat(product.product_quantity) * 10 : 10, // Default price
            image: product.image_url
          }));
        setProducts(formattedProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
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