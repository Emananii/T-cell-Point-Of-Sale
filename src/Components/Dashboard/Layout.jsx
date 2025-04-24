import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  // This is for hiding the Sidebar on the POS screen
  const hideSidebar = location.pathname === "/pos";

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
