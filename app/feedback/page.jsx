"use client";

import React, { useEffect } from "react";
import ProtectedRoute from "../utility/client-redirect";
import styles from "./feedback.module.css";
import { useState } from "react";
import CustomTable from "@/components/CustomTable";
import CustomPagination from "@/components/CustomPagination";
import { getFeedbackDataAdmin } from "@/api/fetchClient";
import moment from "moment";

function Feedback() {
  const [Page, setPage] = useState({ page: 1, perPage: 10 });
  const dateFormate = ["DD MMM YYYY"];
  const [inputSearch, setInputSearch] = useState("");
  const [tableData, setTableData] = useState([]);
  const onPageChange = (page, perPage) => {
    setPage({ page: page, perPage: perPage });
  };

  const baseCellStyle = {
    background: "#1e1e1e",
    borderRight: "1px solid #2f2f2f",
    borderLeft: "1px solid #2f2f2f",
    borderBottom: "none",
  };

  const baseTextStyle = {
    fontSize: "14px",
    fontWeight: "400",
    color: "white",
  };

  const renderCell = (
    text,
    customStyle = {},
    extraClasses = "",
    onClick = null
  ) => ({
    props: { style: baseCellStyle },
    children: (
      <span
        onClick={onClick}
        className={`ff-lato ${extraClasses} ${
          onClick ? "pointer link-hover-underline" : ""
        }`}
        style={{ ...baseTextStyle, ...customStyle }}
      >
        {text}
      </span>
    ),
  });

  const getAdminSupportTableList = async () => {
    await getFeedbackDataAdmin(inputSearch, Page?.page).then((res) => {
      setTableData(res?.data);
    });
  };

  useEffect(() => {
    getAdminSupportTableList();
  }, [inputSearch, Page]);

  const columns = [
    {
      title: <span>Email ID</span>,
      dataIndex: "email",
      fixed: "left",
      width: "40px",
      render: (text, record) => renderCell(text),
    },
    {
      title: <p>Date</p>,
      dataIndex: "created_at",
      width: "50px",
      render: (text) => renderCell(moment(text).format(dateFormate[0])),
    },
    {
      title: <p>Feedback</p>,
      dataIndex: "review",
      width: "50px",
      render: (text) => renderCell(text || ""),
    },
    {
      title: <p>Rating</p>,
      dataIndex: "rating",
      width: "30px",
      render: (text) => renderCell(text),
    },
  ];

  return (
    <ProtectedRoute>
      <div>
        <input
          style={{ width: "20%", color: "white" }}
          placeholder="Search By Email"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          type="text"
          className={styles.input_search}
        ></input>
        <div className={` ${"custom-antd-head-dark"}`}>
          <CustomTable data={tableData?.results} columns={columns} />
          <CustomPagination
            current={Page.page}
            pageSize={Page.perPage}
            onChange={onPageChange}
            total={tableData?.count}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Feedback;
