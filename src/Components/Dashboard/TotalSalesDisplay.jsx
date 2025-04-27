import '../../Styles/Card.css'; // ✅ Use the same card.css as the others

function TotalSalesDisplay({ salesData }) {
  if (!salesData || salesData.length === 0) {
    return (
      <div className="dashboard-card card-sales">
        <h2 className="card-title">Total Sales: Ksh 0</h2>
        <p className="empty-message">No sales recorded yet.</p>
      </div>
    );
  }

  const totalSales = salesData.reduce((total, sale) => total + (sale.total || 0), 0);
  const recentSales = salesData.slice(-5).reverse(); // Get last 5, newest first

  return (
    <div className="dashboard-card card-sales">
      <h2 className="card-title">Total Sales: Ksh {totalSales.toLocaleString()}</h2>

      <h3 className="recent-sales-title">Recent Sales</h3>
      <ol className="recent-sales-list">
        {recentSales.map((sale, index) => (
          <li key={index} className="sale-item">
            <div className="sale-detail"><strong>Date:</strong> {new Date(sale.timestamp).toLocaleString()}</div>
            <div className="sale-detail">
              <strong>Products:</strong> {sale.items.map(item => item.name).join(', ')}
            </div>
            <div className="sale-detail"><strong>Total:</strong> Ksh {sale.total?.toLocaleString() || '0'}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TotalSalesDisplay;
