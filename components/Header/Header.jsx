import React, { use } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  const listedName =
    pathname?.split("/").pop() === "dashboard"
      ? "Dashboard"
      : pathname?.split("/").pop() === "user-list"
      ? "User List"
      : pathname?.split("/").pop() === "premium-support"
      ? "Premium Support"
      : pathname?.split("/").pop() === "transaction"
      ? "Transaction Details"
      : pathname?.split("/").pop() === "coupons"
      ? "Coupons"
      : pathname?.split("/").pop() === "superstar"
      ? "Superstar Portfolio"
      : pathname?.split("/").pop() === "feedback"
      ? "Feedback"
      : pathname?.split("/").pop() === "notifications"
      ? "Notifications"
      : pathname?.split("/").pop() === "user-management"
      ? "User Management"
      : pathname?.split("/").pop() === "stock-details"
      ? "Stock Details"
      : pathname?.split("/").pop() === "buckets"
      ? "Buckets"
      : "Affiliate";

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.title}>{listedName}</h1>

        <div className={styles.controls}>
          <div className={styles.adminContainer}>
            {/* <Image
              src={admin}
              alt="admin"
              width={35}
              height={35}
              className={styles.adminImage}
            /> */}
            <span className={styles.name}>Ghanashyam Devadig</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
