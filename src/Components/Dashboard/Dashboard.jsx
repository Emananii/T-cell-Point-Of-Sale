import { useEffect, useState } from "react";
import TotalSalesDisplay from "./TotalSalesDisplay";
import TrendingProducts from "./TrendingProducts";
import DailyProfitCard from "./DailyProfitCard";

function Dashboard() {
  const [salesData, setSalesData] = useState([]);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/sales")
      .then(res => res.json())
      .then(data => setSalesData(data))
      .catch(err => console.error("Sales fetch error:", err));

    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProductsData(data))
      .catch(err => console.error("Products fetch error:", err));
  }, []);

  return (
    <div className="dashboard-container" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <main style={{ flex: 1, padding: "2rem" }}>
        <h1>Welcome to the T-Cell Point Of Sale System</h1>
        <TotalSalesDisplay salesData={salesData} />
        <TrendingProducts salesData={salesData} productsData={productsData} />
        <DailyProfitCard salesData={salesData} productsData={productsData} />
      </main>
    </div>
  );
}

export default Dashboard;
