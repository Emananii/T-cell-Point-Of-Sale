import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import '../../Styles/Card.css'; // ✅ Import your Card.css to reuse styles

function ProfitPerDayChart({ salesData, productsData }) {
  const data = useMemo(() => {
    const dailyProfit = {};
    let firstSaleDate = new Date();  // To track the first sale date

    // Collect profit data and find the first sale date
    salesData.forEach(sale => {
      if (!sale.timestamp) return;

      const saleDate = sale.timestamp.split("T")[0];
      firstSaleDate = new Date(Math.min(firstSaleDate, new Date(saleDate))); // Update first sale date if necessary

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

    // Generate dates from the first sale date to today
    const today = new Date().toISOString().split("T")[0];
    const allDates = [];
    for (let date = firstSaleDate; date <= new Date(today); date.setDate(date.getDate() + 1)) {
      allDates.push(date.toISOString().split("T")[0]);
    }

    // Create an array of formatted data, ensuring all dates are represented
    const formattedData = allDates.map(date => ({
      date,
      profit: dailyProfit[date] || 0, // Default to 0 if no sales on that day
    }));

    // Sort data by date
    formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));

    return formattedData;
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
