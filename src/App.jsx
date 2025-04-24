import { useState } from 'react';
import './Styles/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard.jsx';

// ✅ Real inventory components
import InventoryList from "./Components/Inventory/InventoryList.jsx";
import AddProductForm from "./Components/Inventory/AddProductForm.jsx";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(prev => !prev);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pos" element={<div>POS Page</div>} />
        <Route path="/sales" element={<div>Sales Page</div>} />
        <Route path="/inventory" element = {
            <div style={{ padding: '20px' }}>
              <h1>Inventory Management</h1>
              <AddProductForm onProductAdded={handleRefresh} />
              <InventoryList key={refresh} />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
