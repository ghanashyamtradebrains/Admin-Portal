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

  const columns = [
    {
      title: <span className="">User Name</span>,
      dataIndex: "name",
      fixed: "left",
      width: "40px",
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
              onClick={() => navigate(`${1}`, { state: record })}
              className="ff-lato pointer link-hover-underline"
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
      title: <p className="">Email ID</p>,
      dataIndex: "email",
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
              className="ff-lato "
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
      title: <p className="">Message</p>,
      width: "50px",
      dataIndex: "message",
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
              className="ff-lato"
              style={{
                color: "white",

                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              {text && text}
            </span>
          ),
        };
      },
    },
    {
      title: <p className="">Date</p>,
      width: "50px",
      dataIndex: "created_at",
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
              className="ff-lato"
              style={{
                color: "white",

                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              {moment(text).format(dateFormate[0])}
            </span>
          ),
        };
      },
    },
    {
      title: <p className="">Status</p>,
      width: "50px",
      dataIndex: "status",
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
              className="ff-lato Textcapitalize"
              style={{
                color: getColor(text),

                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              {text && text === "open" ? "Open" : text}
            </span>
          ),
        };
      },
    },
    {
      title: <p className="">Action</p>,
      width: "50px",
      dataIndex: "",
      render(text, data) {
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
              className="ff-lato Textcapitalize"
              style={{
                color: getColor(text),

                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              {data?.status !== "closed" ? (
                <div
                  onClick={() => {
                    setModalIsOpen({ state: true, id: data.id });
                    console.log("clicked", data);
                  }}
                  className="pointer "
                >
                  Close Query
                </div>
              ) : (
                <div>Already Closed</div>
              )}
            </span>
          ),
        };
      },
    },
  ];

  return (
    <ProtectedRoute>
      <div className="">
        <div className={`table-shadow mt-30 ${"custom-antd-head-dark"}`}>
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
