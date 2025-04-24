import '../../Styles/TotalSalesDisplay.css';

function TotalSalesDisplay({ salesData }) {
  const totalSales = salesData.reduce((total, sale) => total + sale.total, 0);

  return (
    <div className="total-sales-container">
      <h2 className="total-sales-title">Total Sales: ${totalSales}</h2>
      <h3>Recent Sales:</h3>
      <ul>
        {salesData.slice(0, 5).map((sale) => (
          <li key={sale.id}>
            Sale ID: {sale.id} - Total: ${sale.total} - Date: {new Date(sale.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
      <div className="total-sales-footer">
        {/* You can add any footer text or other information */}
      </div>
    </div>
  );
}

export default TotalSalesDisplay;
