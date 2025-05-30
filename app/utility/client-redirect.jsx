// components/ProtectedRoute.jsx
"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = "HHHH";

    if (!token) {
      router.replace("/");
    }
  }, [router]);

  return <>{children}</>;
}
