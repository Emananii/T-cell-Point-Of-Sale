import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import '../../Styles/Card.css'; // ✅ Import your Card.css to reuse styles

function ProfitPerDayChart({ salesData, productsData }) {
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

    formatted.sort((a, b) => new Date(a.date) - new Date(b.date));

    return formatted;
  }, [salesData, productsData]);

  return (
    <div className="dashboard-card card-chart">
      <h2 className="card-title">Profit Per Day</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="profit" 
            stroke="#4caf50" 
            strokeWidth={3} 
            dot={{ r: 4 }} 
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProfitPerDayChart;
