"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoute from "../utility/client-redirect";
import CustomTable from "@/components/CustomTable";
import CustomPagination from "@/components/CustomPagination";
import { getAdminPremiumSupport } from "@/api/fetchClient";
import { DatePicker } from "antd";
import moment from "moment";
import styles from "./premium.module.css";

function PremiumSupport() {
  const [tableData, setTableData] = useState([]);
  const [Filter, setFilter] = useState({
    maxdate: "",
    mindate: "",
    search: "",
  });
  const [Page, setPage] = useState({ page: 1, perPage: 10 });
  const dateFormate = ["DD MMM YYYY"];
  const [input, setinput] = useState();

  const getColor = (expr) => {
    if (expr === "new") {
      return "#F82E2E";
    } else if (expr === "Closed") {
      return "#6DB8FD";
    } else if (expr === "open") {
      return "#E7AE3D";
    } else if (expr === "closed") {
      return "#00FF57";
    } else {
      return "white";
    }
  };

  const getAdminSupportTableList = async () => {
    await getAdminPremiumSupport(Filter, Page).then((res) => {
      setTableData(res?.data);
    });
  };

  useEffect(() => {
    getAdminSupportTableList();
  }, [Filter, Page]);

  const { RangePicker } = DatePicker;
  const onChange = (dateString) => {
    if (dateString === null) {
      setFilter();
    } else {
      setFilter({
        ...Filter,
        mindate: moment(dateString[0]).format("YYYY-MM-DD"),
        maxdate: moment(dateString[1]).format("YYYY-MM-DD"),
      });
    }
  };
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

  const columns = [
    {
      title: <span>User Name</span>,
      dataIndex: "name",
      fixed: "left",
      width: "40px",
      render: (text, record) =>
        renderCell(text, {}, "", () => navigate(`${1}`, { state: record })),
    },
    {
      title: <p>Email ID</p>,
      dataIndex: "email",
      width: "50px",
      render: (text) => renderCell(text),
    },
    {
      title: <p>Message</p>,
      dataIndex: "message",
      width: "50px",
      render: (text) => renderCell(text || ""),
    },
    {
      title: <p>Date</p>,
      dataIndex: "created_at",
      width: "50px",
      render: (text) => renderCell(moment(text).format(dateFormate[0])),
    },
    {
      title: <p>Status</p>,
      dataIndex: "status",
      width: "50px",
      render: (text) =>
        renderCell(
          text === "open" ? "Open" : text,
          { color: getColor(text) },
          "Textcapitalize"
        ),
    },
    {
      title: <p>Action</p>,
      dataIndex: "",
      width: "50px",
      render: (_, data) =>
        renderCell(
          data?.status !== "closed" ? (
            <div
              onClick={() => {
                setModalIsOpen({ state: true, id: data.id });
                console.log("clicked", data);
              }}
              className="pointer"
            >
              Close Query
            </div>
          ) : (
            "Already Closed"
          ),
          { color: getColor(data?.status) },
          "Textcapitalize"
        ),
    },
  ];

  return (
    <ProtectedRoute>
      <div className="">
        <div className={styles.flex_search_date}>
          <input
            style={{ width: "20%", color: "white" }}
            placeholder="Search By Email"
            value={input}
            onChange={(e) => setFilter({ ...Filter, search: e.target.value })}
            type="text"
            className={styles.input_search}
          ></input>
          <RangePicker
            dropdownClassName={"DatePickerdropdrow-Antd-Dark"}
            className={"DatePicker-Antd-Dark"}
            onChange={onChange}
          />
        </div>
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

export default PremiumSupport;
