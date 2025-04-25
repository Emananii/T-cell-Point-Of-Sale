import { useEffect, useState } from "react";

function TrendingProducts({ salesData, productsData }) {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    if (salesData.length === 0 || productsData.length === 0) return;

    const productSalesMap = {};

    salesData.forEach(sale => {
      sale.items.forEach(item => {
        productSalesMap[item.productId] = (productSalesMap[item.productId] || 0) + item.quantity;
      });
    });

    
    const sortedTrending = Object.entries(productSalesMap)
      .map(([productId, quantity]) => {
        const product = productsData.find(p => p.id === Number(productId));
        return product
          ? { ...product, quantitySold: quantity }
          : null;
      })
      .filter(Boolean)
      .sort((a, b) => b.quantitySold - a.quantitySold)
      .slice(0, 5); // This is to help us show only the Top 5

    setTrending(sortedTrending);
  }, [salesData, productsData]);

  return (
    <div className="trending-products-container">
      <h2 className="trending-products-title">Trending Products</h2>
      <ul className="trending-products-list">
        {trending.map(product => (
          <li key={product.id} className="trending-product-card">
            <img src={product.image} alt={product.name} className="product-thumbnail" />
            <div>
              <h3>{product.name}</h3>
              <p>Sold: {product.quantitySold}</p>
              <p>Price: KES {product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrendingProducts;
