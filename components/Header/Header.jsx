import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.title}>Dashboard</h1>

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
