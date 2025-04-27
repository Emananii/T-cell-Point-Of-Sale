import React, { useState } from "react";
import InventoryList from "./InventoryList";
import AddProductForm from "./AddProductForm";

const InventoryTabs = ({ onProductAdded, refresh }) => {
  // State to manage which tab is active
  const [activeTab, setActiveTab] = useState("list");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h1>Inventory Management</h1>

      {/* Tab Navigation */}
      <div className="tab-nav">
        <button 
          onClick={() => handleTabChange("list")} 
          className={activeTab === "list" ? "active-tab" : ""}
        >
          Inventory List
        </button>
        <button 
          onClick={() => handleTabChange("add")} 
          className={activeTab === "add" ? "active-tab" : ""}
        >
          Add Product
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "list" && <InventoryList key={refresh} />}
      {activeTab === "add" && <AddProductForm onProductAdded={onProductAdded} />}
    </div>
  );
};

export default InventoryTabs;
