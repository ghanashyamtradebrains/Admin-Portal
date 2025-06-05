"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import cookie from "js-cookie";

export default function AuthLayout({ children }) {
  const [hasToken, setHasToken] = useState(false);
  const pathname = usePathname();
  const accessToken = cookie.get("ptl_access_token");

  useEffect(() => {
    setHasToken(!!accessToken);
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
