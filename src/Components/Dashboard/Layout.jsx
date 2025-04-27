import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  const hideSidebar = location.pathname === "/pos"; // This is for hiding the Sidebar on the POS screen

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar remains fixed, only hides on certain routes */}
      {!hideSidebar && <Sidebar />}
      <main
        style={{
          flex: 1,
          padding: "2rem",
          marginLeft: !hideSidebar ? "250px" : "0", // Offset content if sidebar is visible
          transition: "margin-left 0.3s ease", // Smooth transition for margin change
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
