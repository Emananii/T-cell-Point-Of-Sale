import { Card, CardMedia, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import './POS.css';

const ProductView = ({ products, loading, onAddToCart }) => {
  return (
    <div className="product-view">
      <h2>Products</h2>
      
      {loading ? (
        <div className="loading-spinner">
          <CircularProgress />
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <Card key={product.id} className="product-card">
              <CardMedia
                component="img"
                height="140"
                image={product.image || 'https://via.placeholder.com/140'}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <div className="product-actions">
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => onAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductView;