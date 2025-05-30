import React from "react";
import ProtectedRoute from "../utility/client-redirect";

function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Dashboard</div>
    </ProtectedRoute>
  );
}

export default Dashboard;
