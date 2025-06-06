"use client";

import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import Link from "next/link";
import { getAllStockDetails } from "@/api/fetchClient";
import CustomTable from "@/components/CustomTable";
import styles from "./stock.module.css";
import { useRouter } from "next/navigation";

function StockDetail() {
  const [TableData, setTableData] = useState([]);
  const [input, setInput] = useState();
  const router = useRouter();

  useEffect(() => {
    getAllStockDetails(input).then((res) => {
      setTableData(res?.data);
    });
  }, [input]);
  const handleEditClick = (id) => {
    router.push(`/admin/stockdetails/edit/${id}`);
  };

  const columnData = [
    {
      title: <p>S.no </p>,
      key: "index",
      fixed: "left",
      width: "40px",
      render(text, record, index) {
        return {
          props: {
            style: {
              background: "#1e1e1e",
              borderRight: "1px solid #2f2f2f",
              borderLeft: "1px solid #2f2f2f",
              borderBottom: "none",
            },
          },
          children: (
            <span
              style={{
                fontSize: "14px",
                fontWeight: "400",
                color: "white",
              }}
            >
              {index + 1}
            </span>
          ),
        };
      },
    },
    {
      title: <p>Stock Name</p>,
      dataIndex: "company_name",
      width: "50px",
      render(text, record) {
        return {
          props: {
            style: {
              background: "#1e1e1e",
              borderRight: "1px solid #2f2f2f",
              borderLeft: "1px solid #2f2f2f",
              borderBottom: "none",
            },
          },
          children: (
            <span
              style={{
                fontSize: "14px",
                fontWeight: "400",
                color: "white",
              }}
            >
              {text}
            </span>
          ),
        };
      },
    },

    {
      title: <p> Action</p>,
      width: "30px",
      dataIndex: "",
      render(text, record) {
        return {
          props: {
            style: {
              background: "#1e1e1e",
              borderRight: "1px solid #2f2f2f",
              borderLeft: "1px solid #2f2f2f",
              borderBottom: "none",
            },
          },

          children: (
            <span
              style={{
                fontSize: "14px",
                fontWeight: "400",
                color: "white",
              }}
            >
              <div
                hr
                onClick={() => {
                  handleEditClick(record.FINCODE);
                  router.push(`/stock-details`);
                }}
              >
                <EditOutlined />
              </div>
            </span>
          ),
        };
      },
    },
  ];
  return (
    <div className="my-body px-30-0">
      <div className={styles.flex_search_button}>
        <input
          style={{ width: "20%", color: "white" }}
          placeholder="Search by Stock"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input_search}
        ></input>
        <Link href={"/stock-details/create"}>
          <button className={styles.button}>Add Stock </button>
        </Link>
      </div>

      <div className={`${styles.table} ${"custom-antd-head-dark"}`}>
        <CustomTable columns={columnData} data={TableData} />
      </div>
    </div>
  );
}

export default StockDetail;
