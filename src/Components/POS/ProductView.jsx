import { Card, CardMedia, CardContent, Typography, Button, Grid,Box,Chip,Stack
  } from '@mui/material';
  import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
  
  const ProductView = ({ products, onAddToCart }) => {
    return (
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Typography variant="h4" gutterBottom sx={{ p: 2, fontWeight: 'bold' }}>
          Available Products
        </Typography>
        <Grid container spacing={3} sx={{ p: 2 }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 3
                }
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image || `https://via.placeholder.com/200?text=${product.name}`}
                  alt={product.name}
                  sx={{ objectFit: 'contain', p: 1, backgroundColor: '#fff' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.brand}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ my: 1 }}>
                    <Chip label={`$${product.price}`} color="primary" size="small" />
                    <Chip label={`Stock: ${product.stock}`} size="small" />
                    {product.category && <Chip label={product.category} size="small" variant="outlined" />}
                  </Stack>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => onAddToCart(product)}
                    disabled={product.stock <= 0}
                    sx={{
                      backgroundColor: '#1976d2',
                      '&:hover': {
                        backgroundColor: '#1565c0'
                      },
                      '&:disabled': {
                        backgroundColor: '#e0e0e0'
                      }
                    }}
                  >
                    {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  
  export default ProductView;