"use client";

import React, { useEffect, useState } from "react";
import styles from "./superstar.module.css";
import { getAdminSuperStar } from "@/api/fetchClient";
import CustomTable from "@/components/CustomTable";
import SuperstarTable from "@/components/Superstar/SuperstarTable";
import Link from "next/link";

function Superstar() {
  const [searchInput, setSearchInput] = useState(null);
  const [superstarData, setSuperstarData] = useState([]);
  const getData = async () => {
    await getAdminSuperStar(searchInput).then((resp) => {
      setSuperstarData(resp.data);
    });
  };

  useEffect(() => {
    getData();
  }, [searchInput]);

  return (
    <div>
      {" "}
      <div className={styles.flex_search_create}>
        <input
          style={{ width: "20%", color: "white", height: "34px" }}
          placeholder="Search Name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          className={styles.input_search}
        ></input>
      </div>
      <div>
        <SuperstarTable tableData={superstarData} />
      </div>
    </div>
  );
}

export default Superstar;
