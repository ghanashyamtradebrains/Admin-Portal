import React from "react";
import ProtectedRoute from "../utility/client-redirect";

function PremiumSupport() {
  return (
    <ProtectedRoute>
      <div>PremiumSupport</div>
    </ProtectedRoute>
  );
}

export default PremiumSupport;
