
import './Styles/App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard.jsx'
import Sales from './Components/Sales/Sales.jsx';

function App() {


  return (
    <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Placeholder routes for other pages */}
      <Route path="/pos" element={<div>POS Page</div>} />
      <Route path="/inventory" element={<div>Inventory Page</div>} />
      <Route path="/sales" element={<div>Sales Page</div>} />
    </Routes>
  </Router>
  )
}

export default App
