import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import '../../Styles/Card.css'; 

function ProfitPerDayChart({ salesData, productsData }) {
  const data = useMemo(() => {
    const dailyProfit = {};
    let firstSaleDate = new Date();

    
    salesData.forEach(sale => {
      if (!sale.timestamp) return;

      // Converting the timestamp to a local date (since the sales data uses UTC)
      const saleDate = new Date(sale.timestamp).toLocaleDateString();
      firstSaleDate = new Date(Math.min(firstSaleDate, new Date(saleDate))); 
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);  
    const todayDateString = today.toLocaleDateString(); // Get today's local date format

  
    if (!dailyProfit[todayDateString]) {
      dailyProfit[todayDateString] = 0;  // Set profit for today to 0 if no sales
    }

    // Generate all dates from first sale to today
    const allDates = [];
    for (let date = firstSaleDate; date <= today; date.setDate(date.getDate() + 1)) {
      allDates.push(date.toLocaleDateString()); // Store as local date string (e.g., "4/27/2025")
    }

  
    const formattedData = allDates.map(date => ({
      date,
      profit: dailyProfit[date] || 0,
    }));

    
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
