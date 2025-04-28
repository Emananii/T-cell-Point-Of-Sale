import React from 'react';
import '../../Styles/Card.css';

function DailyProfitCard({ salesData, productsData }) {
  const today = new Date();
  const todayStr = today.toLocaleDateString('en-GB'); // Format: 'DD/MM/YYYY'

  const profitToday = salesData
    .filter(sale => {
      // Convert timestamp to local date string (ignore time)
      const saleDate = new Date(sale.timestamp).toLocaleDateString('en-GB');
      return saleDate === todayStr;
    })
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
