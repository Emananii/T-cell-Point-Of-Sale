import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  
  const hideSidebar = location.pathname === "/pos";// This is for hiding the Sidebar on the POS screen

  return (
    <div style={{ display: "flex" }}>
      {!hideSidebar && <Sidebar />}
      <main style={{ flex: 1, padding: "2rem" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
