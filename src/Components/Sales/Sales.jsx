import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Sales() {
  const [sales, setSales] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5173/sales')
      .then(res => res.json())
      .then(data => {
        setSales(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching sales:', err);
        setLoading(false);
      });
  }, []);

  const sortedSales = [...sales].sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();
    return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
  });

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const exportToCSV = (sales) => {
    const header = ['Date', 'Items', 'Total'];
    const rows = sales.map(sale => {
      const date = new Date(sale.timestamp).toLocaleString();
      const items = sale.items.map(item => `${item.name} x ${item.quantity}`).join('; ');
      return [date, `"${items}"`, sale.total];
    });

    const csvContent = [header, ...rows]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sales_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = (sales) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Sales Report', 14, 22);
    doc.setFontSize(12);

    const tableColumn = ['Date', 'Items', 'Total'];
    const tableRows = sales.map(sale => {
      const date = new Date(sale.timestamp).toLocaleString();
      const items = sale.items.map(item => `${item.name} x ${item.quantity}`).join('; ');
      return [date, items, `Ksh ${sale.total.toLocaleString()}`];
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('sales_report.pdf');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Sales History</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => exportToCSV(sortedSales)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Download CSV
        </button>
        <button
          onClick={() => exportToPDF(sortedSales)}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          Download PDF
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-purple-200 text-purple-800">
              <tr>
                <th
                  className="py-3 px-4 text-left cursor-pointer hover:underline"
                  onClick={toggleSortOrder}
                >
                  Date {sortOrder === 'asc' ? '↑' : '↓'}
                </th>
                <th className="py-3 px-4 text-left">Items</th>
                <th className="py-3 px-4 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {sortedSales.map(sale => (
                <tr key={sale.id} className="border-t hover:bg-purple-50">
                  <td className="py-3 px-4">
                    {new Date(sale.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <ul className="list-disc list-inside text-sm">
                      {sale.items.map(item => (
                        <li key={item.productId}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3 px-4 font-medium text-right text-green-700">
                    Ksh {sale.total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Sales
