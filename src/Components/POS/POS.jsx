import { useState, useEffect } from 'react';
import CartView from './CartView';
import ProductView from './ProductView';
import { Box, CircularProgress, Alert } from '@mui/material';

const POS = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/db.json');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
       
        setProducts([
          {
            id: 1,
            name: "Coca-Cola",
            price: 120,
            image: "https://via.placeholder.com/200?text=Coca-Cola",
            stock: 50
          },
          {
            id: 2,
            name: "Brown Bread",
            price: 80,
            image: "https://via.placeholder.com/200?text=Brown+Bread",
            stock: 30
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      
      const currentQuantity = existingItem ? existingItem.quantity : 0;
      if (currentQuantity >= product.stock) {
        return prevCart;
      }

      return existingItem
        ? prevCart.map(item => 
            item.id === product.id 
              ? {...item, quantity: item.quantity + 1} 
              : item
          )
        : [...prevCart, {
            ...product,
            quantity: 1,
            priceAtSale: product.price 
          }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return removeFromCart(productId);
    
    const product = products.find(p => p.id === productId);
    if (product && newQuantity > product.stock) {
      return; 
    }

    setCart(prevCart => 
      prevCart.map(item =>
        item.id === productId ? {...item, quantity: newQuantity} : item
      )
    );
  };

  const checkout = async () => {
    try {
     
      const newSale = {
        timestamp: new Date().toISOString(),
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          priceAtSale: item.priceAtSale
        })),
        total: calculateTotal()
      };

      console.log("Sale completed:", newSale);
      alert(`Sale completed! Total: ₹${calculateTotal()}`);
      setCart([]);
      
      
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Checkout failed. Please try again.");
    }
  };

  const calculateTotal = () => cart.reduce((sum, item) => sum + (item.priceAtSale * item.quantity), 0);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f5f7fa',
      p: 2,
      gap: 2
    }}>
      <CartView 
        cartItems={cart} 
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={checkout}
        total={calculateTotal()}
      />
      <ProductView 
        products={products} 
        onAddToCart={addToCart}
      />
    </Box>
  );
};

export default POS;