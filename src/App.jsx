import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from './Components/Dashboard/Layout.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import InventoryList from "./Components/Inventory/InventoryList.jsx";
import AddProductForm from "./Components/Inventory/AddProductForm.jsx";
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
        
        {/* Routes wrapped in the shared layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales" element={<div>Sales Page</div>} />
          <Route path="/inventory" element={
            <div>
              <h1>Inventory Management</h1>
              <AddProductForm onProductAdded={handleRefresh} />
              <InventoryList key={refresh} />
            </div>
          } />
        </Route>

        {/* POS is rendered alone without the layout */}
        <Route path="/pos" element={<div>POS Page (no sidebar)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
