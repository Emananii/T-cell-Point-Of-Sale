import { useState, useEffect } from 'react';

function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/sales')
      .then(res => res.json())
      .then(data => setSales(data));
  }, []);

  return (
    <div>
      <h2>Sales History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Items</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale.id}>
              <td>{new Date(sale.timestamp).toLocaleString()}</td>
              <td>
                <ul>
                  {sale.items.map(item => (
                    <li key={item.productId}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>Ksh {sale.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
  
export default Sales
