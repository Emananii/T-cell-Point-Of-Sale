import { Button, TextField } from '@material-ui/core';
import './POS.css';

const CartView = ({ cartItems, onRemove, onUpdateQuantity, onCheckout }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-view">
      <h2>Your Cart</h2>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)} each</p>
                </div>
                <div className="cart-item-controls">
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                    inputProps={{ min: 1 }}
                    size="small"
                  />
                  <Button 
                    color="secondary" 
                    onClick={() => onRemove(item.id)}
                  >
                    Remove
                  </Button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
            <Button 
              variant="contained" 
              color="primary"
              onClick={onCheckout}
              fullWidth
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartView;