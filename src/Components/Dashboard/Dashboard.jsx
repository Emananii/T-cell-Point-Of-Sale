import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem" }}>
        <h1>Welcome to the Dashboard</h1>
      </main>
    </div>
  );
}

export default Dashboard;
