import React from 'react';
import '../../Styles/Card.css'

function DailyProfitCard({ salesData, productsData }) {
  const today = new Date().toISOString().split("T")[0]; // '2025-04-26'

  // Calculate the profit for today's sales
  const profitToday = salesData
    .filter(sale => sale.timestamp && sale.timestamp.startsWith(today)) // Filter today's sales
    .reduce((totalProfit, sale) => {
      // Calculate the profit for each item in the sale
      return totalProfit + sale.items.reduce((saleProfit, item) => {
        // Find the corresponding product in the productsData
        const product = productsData.find(p => p.id === item.productId);
        
        // If no product found or purchase-price is missing, skip this item
        if (!product || typeof product["purchase-price"] !== "number") return saleProfit;
        
        // Calculate profit per unit sold
        const profitPerUnit = item.priceAtSale - product["purchase-price"];
        const totalItemProfit = profitPerUnit * item.quantity;
        
        return saleProfit + totalItemProfit;
      }, 0);
    }, 0);

  return (
    <div className="card" style={{
      border: "1px solid #ccc",
      padding: "1rem",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9"
    }}>
      <h2>Today's Profit</h2>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        Ksh {profitToday.toFixed(2)}
      </p>
    </div>
  );
}

export default DailyProfitCard;
