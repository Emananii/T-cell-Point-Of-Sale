import React, { useState } from 'react';
import '../../Styles/Inventory.css';

const AddProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('');
  const [image, setImage] = useState('');
  const [discount, setDiscount] = useState('');
  const [dateAdded, setDateAdded] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      purchasePrice: parseFloat(purchasePrice),
      sellingPrice: parseFloat(sellingPrice),
      stock: parseInt(stock),
      category,
      unit,
      image,
      discount: parseFloat(discount),
      dateAdded,
    };

    await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    // Clear form
    setName('');
    setPurchasePrice('');
    setSellingPrice('');
    setStock('');
    setCategory('');
    setUnit('');
    setImage('');
    setDiscount('');
    setDateAdded('');

    if (onProductAdded) onProductAdded();
  };

  return (
    <div className="add-product-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Purchase Price"
          value={purchasePrice}
          required
          onChange={(e) => setPurchasePrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Selling Price"
          value={sellingPrice}
          required
          onChange={(e) => setSellingPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={stock}
          required
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Unit (e.g., ml, kg, pcs)"
          value={unit}
          required
          onChange={(e) => setUnit(e.target.value)}
        />
        <input
          type="url"
          placeholder="Image URL"
          value={image}
          required
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          placeholder="Discount (%)"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date Added"
          value={dateAdded}
          required
          onChange={(e) => setDateAdded(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
