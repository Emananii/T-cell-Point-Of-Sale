import { useEffect, useState } from "react";
import TotalSalesDisplay from "./TotalSalesDisplay";
import TrendingProducts from "./TrendingProducts";
import DailyProfitCard from "./DailyProfitCard";
import ProfitPerDayChart from "./ProfitPerDayChart";

function Dashboard() {
  const [salesData, setSalesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch sales data
    fetch("http://localhost:3000/sales")
      .then(res => res.json())
      .then(data => {
        setSalesData(data)
        console.log("Sales data:", data);
      })
      .catch(err => console.error("Sales fetch error:", err));
      

    // Fetch products data
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProductsData(data))
      .catch(err => console.error("Products fetch error:", err))
      .finally(() => setIsLoading(false)); // Set loading to false when both requests are done
  }, []);

  // If data is still loading, show a loading message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <main style={{ flex: 1, padding: "2rem" }}>
        <h1>Welcome to the T-Cell Point Of Sale System</h1>
        <TotalSalesDisplay salesData={salesData} />
        <TrendingProducts salesData={salesData} productsData={productsData} />
        <DailyProfitCard salesData={salesData} productsData={productsData} />
        <ProfitPerDayChart salesData={salesData} productsData={productsData} />
      </main>
    </div>
  );
}

export default Dashboard;
