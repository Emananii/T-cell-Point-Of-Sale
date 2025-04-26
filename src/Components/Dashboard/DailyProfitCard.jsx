import React from 'react'

function DailyProfitCard({salesData, productData}) {

    const today = new Date().toISOString().split("T")[0]; // '2025-04-26'

    const profitToday = salesData
      .filter(sale => sale.timestamp && sale.timestamp.startsWith(today))
      .reduce((totalProfit, sale) => {
        return totalProfit + sale.items.reduce((saleProfit, item) => {
          const product = productsData.find(p => p.id === String(item.productId));
          if (!product) return saleProfit;
  
          const purchasePrice = product["purchase-price"];
          if (typeof purchasePrice !== "number") return saleProfit;
  
          const profitPerUnit = item.priceAtSale - purchasePrice;
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
  )
}

export default DailyProfitCard