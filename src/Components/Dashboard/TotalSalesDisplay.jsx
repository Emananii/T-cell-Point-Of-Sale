import '../../Styles/TotalSalesDisplay.css';

function TotalSalesDisplay({ salesData }) {
  if (!salesData || salesData.length === 0) {
    return (
      <div className="total-sales-container">
        <h2 className="total-sales-title">Total Sales: Ksh 0</h2>
        <p>No sales recorded yet.</p>
      </div>
    );
  }

  const totalSales = salesData.reduce((total, sale) => total + (sale.total || 0), 0);

  // Get the 5 most recent sales
  const recentSales = salesData.slice(-5).reverse();

  return (
    <div className="total-sales-container">
      <h2 className="total-sales-title">Total Sales: Ksh {totalSales.toLocaleString()}</h2>

      <h3 className="recent-sales-title">Recent Sales:</h3>
      <ol className="recent-sales-list">
        {recentSales.map((sale, index) => (
          <li key={index} className="sale-item">
            <div><strong>Date:</strong> {new Date(sale.timestamp).toLocaleString()}</div>
            <div>
              <strong>Products:</strong> {sale.items.map(item => item.name).join(', ')}
            </div>
            <div><strong>Total:</strong> Ksh {sale.total?.toLocaleString() || '0'}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TotalSalesDisplay;
