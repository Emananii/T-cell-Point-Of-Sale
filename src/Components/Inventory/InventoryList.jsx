import React, { useEffect, useState } from 'react';

const InventoryList = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch('https://t-cell-point-of-sale-backend.onrender.com/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`https://t-cell-point-of-sale-backend.onrender.com/products/${id}`, {
      method: 'DELETE',
    });
    fetchProducts();
  };

  const handleEdit = (id, currentQty) => {
    setEditingId(id);
    setNewQuantity(currentQty);
  };

  const handleSave = async (id) => {
    await fetch(`https://t-cell-point-of-sale-backend.onrender.com/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });
    setEditingId(null);
    fetchProducts();
  };

  return (
    <div>
      <h2>Inventory List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>
                {editingId === prod.id ? (
                  <input
                    type="number"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                  />
                ) : (
                  prod.quantity
                )}
              </td>
              <td>
                {editingId === prod.id ? (
                  <button onClick={() => handleSave(prod.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(prod.id, prod.quantity)}>Edit</button>
                )}
                <button onClick={() => handleDelete(prod.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;