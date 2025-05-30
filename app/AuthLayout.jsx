"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";

export default function AuthLayout({ children }) {
  const [hasToken, setHasToken] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = "HHHH";
    setHasToken(!!token);
  }, [pathname]);

  if (!hasToken) {
    return <>{children}</>;
  }

  return (
    <div className="layout-container">
      <Sidebar />
      <div className="content-wrapper">
        <div className="header-container">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
