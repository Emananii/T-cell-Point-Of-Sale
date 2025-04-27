import React from 'react';
import '../../Styles/Card.css';

function DailyProfitCard({ salesData, productsData }) {
  const today = new Date().toISOString().split("T")[0]; // '2025-04-26'

  const profitToday = salesData
    .filter(sale => sale.timestamp && sale.timestamp.startsWith(today))
    .reduce((totalProfit, sale) => {
      return totalProfit + sale.items.reduce((saleProfit, item) => {
        const product = productsData.find(p => p.id === item.productId);
        if (!product || typeof product["purchase-price"] !== "number") return saleProfit;
        const profitPerUnit = item.priceAtSale - product["purchase-price"];
        return saleProfit + (profitPerUnit * item.quantity);
      }, 0);
    }, 0);

  return (
    <div className="dashboard-card card-profit">
      <div className="card-content">
        <h2 className="card-title">Today's Profit</h2>
        <p className="card-value">Ksh {profitToday.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default DailyProfitCard;
