import React, { useState } from 'react';
import InventoryList from "./Components/Inventory/InventoryList.jsx";
import AddProductForm from "./Components/Inventory/AddProductForm.jsx";


const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Inventory Management</h1>
      <AddProductForm onProductAdded={handleRefresh} />
      <InventoryList key={refresh} />
    </div>
  );
};

export default App;