import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from './Components/Dashboard/Layout.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import InventoryTabs from "./Components/Inventory/InventoryTabs.jsx"; // <-- new import
import Sales from "./Components/Sales/Sales.jsx";
import POS from "./Components/POS/POS.jsx";
import { useState } from 'react';
import './Styles/App.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(prev => !prev);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/inventory" element={<InventoryTabs onProductAdded={handleRefresh} refresh={refresh} />} />
        </Route>

        <Route path="/pos" element={<POS />} />
      </Routes>
    </Router>
  );
}

export default App;
