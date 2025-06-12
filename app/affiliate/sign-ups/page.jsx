"use client";

import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { DatePicker } from "antd";
import { getAllSignUps } from "@/api/fetchClient";
import CustomTable from "@/components/CustomTable";
import CustomPagination from "@/components/CustomPagination";
import styles from "./signups.module.css";

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [signupTable, setSignupTable] = useState();
  const [input, setInput] = useState();
  const [Search, setSearch] = useState();
  const [Page, setPage] = useState({ page: 1, perPage: 50 });

  const { RangePicker } = DatePicker;
  const dateFormat = ["YYYY-MM-DD"];
  const onPageChange = (page, perPage) => {
    setPage({ page: page, perPage: perPage });
  };
  useEffect(() => {
    const dateString = [];

    setIsLoading(true);
    getAllSignUps(Page, Search, dateString).then((res) => {
      setIsLoading(false);
      setSignupTable(res?.data);
    });
  }, [Page, Search]);
  const onChange = (dateString) => {
    let dateString1 = [];
    if (dateString === null) {
      dateString1 = [];
    } else {
      const date = moment(dateString[0]).format("YYYY-MM-DD");
      const date1 = moment(dateString[1]).format("YYYY-MM-DD");
      dateString1 = [date, date1];
    }

    getAllSignUps(Page, Search, dateString1).then((res) => {
      setSignupTable(res?.data);
    });
  };
  const baseCellStyle = {
    background: "#1e1e1e",
    borderRight: "1px solid #2f2f2f",
    borderLeft: "1px solid #2f2f2f",
    borderBottom: "none",
  };

  const textStyle = {
    fontSize: "14px",
    fontWeight: "400",
    color: "white",
  };

  const renderCell = (text, isDate = false) => ({
    props: { style: baseCellStyle },
    children: (
      <span className="ff-lato" style={textStyle}>
        {isDate ? moment(text).format("YYYY-MM-DD") : text}
      </span>
    ),
  });

  const columns1 = [
    {
      title: <p className="fs-s-16 fw-600 mb-0">User Name</p>,
      dataIndex: "name",
      width: "50px",
      render: (text) => renderCell(text),
    },
    {
      title: <p className="fs-s-16 fw-600 mb-0">Email ID</p>,
      dataIndex: "email",
      width: "50px",
      render: (text) => renderCell(text),
    },
    {
      title: <p className="fs-s-16 fw-600 mb-0">Affiliate Code</p>,
      dataIndex: "code",
      width: "50px",
      render: (text) => renderCell(text),
    },
    {
      title: <p className="fs-s-16 fw-600 mb-0">Affiliate Name</p>,
      dataIndex: "affilate_name",
      width: "50px",
      render: (text) => renderCell(text),
    },
    {
      title: <p className="fs-s-16 fw-600 mb-0">Registered Date</p>,
      dataIndex: "created_at",
      width: "50px",
      render: (text) => renderCell(text, true),
    },
  ];

  return (
    <div className="my-body px-30-0">
      <div className="d-flex justify-content-between">
        <div>
          <p className="fs-24-16  mb-0 fw-700">Sign ups through Affiliate </p>
          <p>
            All Details of the signups so far will be shown in the table below.{" "}
          </p>
        </div>
      </div>

      <div className="">
        <p className="d-flex justify-content-end fs-s-18 fw-700">
          Total Signups: {signupTable?.count}
        </p>
      </div>
      <div className={styles.flex_search_date_flex}>
        <input
          placeholder="Search By Name"
          value={input}
          onChange={(e) => {
            setPage({ page: 1, perPage: 50 });
            setSearch(e.target.value);
          }}
          type="text"
          className={styles.input_search}
        ></input>
        <RangePicker
          dropdownClassName={"DatePickerdropdrow-Antd-Dark"}
          className={"DatePicker-Antd-Dark"}
          format={dateFormat}
          style={{ height: "37px" }}
          onChange={onChange}
        />
      </div>
      <div className={` ${"custom-antd-head-dark"}`}>
        <CustomTable
          columns={columns1}
          loading={isLoading}
          data={signupTable?.results}
        />
        <CustomPagination
          current={Page.page}
          onChange={onPageChange}
          total={signupTable?.count}
          pageSize={Page.perPage}
        />
      </div>
    </div>
  );
}

export default Signup;
