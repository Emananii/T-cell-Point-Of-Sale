import React from 'react';
import '../../Styles/POS.css';

function CartView({ cartItems, onRemove, onUpdateQuantity, onCheckout }){
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-view">
      <h2>Your Cart {isCheckoutComplete && "(Completed)"}</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className={`cart-item ${isCheckoutComplete ? 'completed' : ''}`}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="cart-item-thumbnail"
                />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>Price: Ksh {item.price.toFixed(2)} each</p>
                  <div className="cart-item-controls">
                    <label>
                      Qty:
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="quantity-input"
                        disabled={isCheckoutComplete}
                      />
                    </label>
                    <button 
                      className="remove-btn"
                      onClick={() => onRemove(item.id)}
                      disabled={isCheckoutComplete}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="cart-item-total">
                    <strong>Total:</strong> Ksh {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Subtotal: Ksh {subtotal.toFixed(2)}</h3>
            {!isCheckoutComplete ? (
              <button 
                className="checkout-btn"
                onClick={onCheckout}
              >
                Checkout
              </button>
            ) : (
              <div className="checkout-complete">
                <p>Sale completed successfully!</p>
                <button 
                  className="new-sale-btn"
                  onClick={() => window.location.reload()}
                >
                  Start New Sale
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartView;