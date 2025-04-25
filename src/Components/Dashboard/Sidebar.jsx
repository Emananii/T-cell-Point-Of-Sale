import { NavLink } from "react-router-dom";
import "../../Styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">POS System</h2>
      <nav className="nav-links">
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}> Dashboard </NavLink>
        <NavLink to="/pos" activeclassname="active">POS</NavLink>
        <NavLink to="/inventory" activeclassname="active">Inventory</NavLink>
        <NavLink to="/sales" activeclassname="active">Sales</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
