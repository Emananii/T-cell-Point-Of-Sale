import { Box, Typography, Button, TextField, Divider,List,ListItem,ListItemText,IconButton,Badge,Alert
  } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
  
  const CartView = ({ cartItems, onRemove, onUpdateQuantity, onCheckout, total }) => {
    return (
      <Box sx={{ 
        width: 350,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: 1,
        p: 2,
        overflow: 'auto'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Your Cart
          </Typography>
          <Badge 
            badgeContent={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
            color="primary" 
            sx={{ ml: 2 }}
          />
        </Box>
        
        {cartItems.length === 0 ? (
          <Alert severity="info" sx={{ my: 2 }}>
            Your cart is empty. Add some products!
          </Alert>
        ) : (
          <>
            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
              {cartItems.map((item) => (
                <ListItem key={item.id} sx={{ py: 1 }}>
                  <ListItemText 
                    primary={item.name} 
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          ₹{item.priceAtSale.toFixed(2)} each
                        </Typography>
                        {item.brand && ` • ${item.brand}`}
                      </>
                    }
                  />
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value || 0))}
                    inputProps={{ min: 1, max: item.stock }}
                    size="small"
                    sx={{ width: 70, mr: 1 }}
                  />
                  <IconButton 
                    color="error"
                    onClick={() => onRemove(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Subtotal:</Typography>
              <Typography variant="h6" fontWeight="bold">
                ₹{total.toFixed(2)}
              </Typography>
            </Box>
            
            <Button
              fullWidth
              variant="contained"
              color="success"
              size="large"
              startIcon={<ShoppingCartCheckoutIcon />}
              onClick={onCheckout}
              sx={{
                py: 1.5,
                backgroundColor: '#4caf50',
                '&:hover': {
                  backgroundColor: '#388e3c'
                }
              }}
            >
              Complete Purchase
            </Button>
          </>
        )}
      </Box>
    );
  };
  
  export default CartView;