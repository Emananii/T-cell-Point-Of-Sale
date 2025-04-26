import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function ProfitPerDayChart({ salesData, productsData }){
  const data = useMemo(() => {
    const dailyProfit = {};

    salesData.forEach(sale => {
      if (!sale.timestamp) return;

      const saleDate = sale.timestamp.split("T")[0];

      if (!dailyProfit[saleDate]) dailyProfit[saleDate] = 0;

      sale.items.forEach(item => {
        const product = productsData.find(p => String(p.id) === String(item.productId));
        if (product) {
          const purchasePrice = product["purchase-price"];
          const profitPerItem = (item.priceAtSale - purchasePrice) * item.quantity;
          dailyProfit[saleDate] += profitPerItem;
        }
      });
    });

    
    const formatted = Object.keys(dailyProfit).map(date => ({
      date,
      profit: dailyProfit[date]
    }));

    // Sort by date ascending
    formatted.sort((a, b) => new Date(a.date) - new Date(b.date));

    return formatted;
  }, [salesData, productsData]);

  return (
    <div className="card" style={{
      border: "1px solid #ccc",
      padding: "1rem",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      height: "400px"
    }}>
      <h2>Profit Per Day</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="profit" stroke="#8884d8" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitPerDayChart;
