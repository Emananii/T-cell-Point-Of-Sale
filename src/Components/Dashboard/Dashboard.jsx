import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TotalSalesDisplay from './TotalSalesDisplay'; // We'll create this component next

function Dashboard() {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://localhost:3000/sales');
        if (!response.ok) {
          throw new Error('Failed to fetch sales data');
        }
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSalesData();
  }, []);  

  if (loading) {
    return <div>Loading sales data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      <main style={{ flex: 1, padding: "2rem" }}>
        <h1>Welcome to the T-Cell Point Of Sale System</h1>
        <TotalSalesDisplay salesData={salesData} />
      </main>
    </div>
  );
}

export default Dashboard;
