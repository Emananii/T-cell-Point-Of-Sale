import { useEffect, useState } from "react";
import TotalSalesDisplay from "./TotalSalesDisplay";
import DailyProfitCard from "./DailyProfitCard";
import ProfitPerDayChart from "./ProfitPerDayChart";

function Dashboard() {
  const [salesData, setSalesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch sales data
    fetch("https://t-cell-point-of-sale-backend.onrender.com/sales")
      .then(res => res.json())
      .then(data => {
        setSalesData(data);
        console.log("Sales data:", data);
      })
      .catch(err => console.error("Sales fetch error:", err));

    // Fetch products data
    fetch("https://t-cell-point-of-sale-backend.onrender.com/products")
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
    <div className="dashboard-card" style={styles.dashboardContainer}>
      <main style={styles.mainContent}>
        <h1 style={styles.title}>T-Cell Dashboard</h1>
        <DailyProfitCard salesData={salesData} productsData={productsData} />
        <ProfitPerDayChart salesData={salesData} productsData={productsData} />
        <TotalSalesDisplay salesData={salesData} />
      </main>
    </div>
  );
}

const styles = {
  dashboardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    backgroundColor: "#f9f9f9", // Light background for a minimal look
    borderRadius: "8px", // Rounded corners for a modern feel
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
    padding: "2rem", // Some padding around the container
    width: "100%",
    maxWidth: "1200px", // Limiting max width for a more contained design
    margin: "0 auto", // Centering the dashboard
  },
  mainContent: {
    flex: 1,
    padding: "1rem",
    backgroundColor: "#fff", // White background for content area
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Soft shadow on the content area
  },
  title: {
    fontFamily: "'Roboto', sans-serif", // Clean font choice
    fontSize: "2rem", // Larger font size for prominence
    color: "#333", // Dark color for text for readability
    marginBottom: "1.5rem", // Space below the title
  },
};

export default Dashboard;
