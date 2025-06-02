"use client";
import { getAdminTransactionDetails } from "@/api/fetchClient";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "../utility/client-redirect";
import styles from "./transaction.module.css";
import SelectOptions from "@/components/SelectionOption";
import { DatePicker } from "antd";
import CustomTable from "@/components/CustomTable";
import CustomPagination from "@/components/CustomPagination";
import numberWithCommas from "@/components/numberWithComma";

function Transaction() {
  const { RangePicker } = DatePicker;
  const dateFormat = ["YYYY-MM-DD", "YYYY-MM-DD"];
  const [dropdown, setDropdown] = useState("");
  const [Page, setPage] = useState({ page: 1, perPage: 20 });
  const [input, setInput] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [sourceFilter, setSourceFilter] = useState("");
  const [Filter, setFilter] = useState({
    maxdate: "",
    mindate: "",
    search: "",
    commi: "",
    revenue: "",
    earnings: "",
  });

  const timeLineData1 = [
    { label: "All Plans", value: " " },
    { label: "Bulls", value: "Bulls" },
    { label: "Premium", value: "Premium" },
    { label: "Sharks", value: "Sharks" },
    { label: "Premium Plus", value: "Premium Plus" },
    { label: "Whales", value: "Whales" },
    { label: "Elite", value: "Elite" },
    { label: "Life Time", value: "Lifetime" },
  ];
  const timeLineData2 = [
    { label: "All Payment Source", value: "" },

    { label: "Razorpay", value: "razorpay" },
    { label: "Mobile", value: "mobile" },
    { label: "Android", value: "android" },
    { label: "Apple", value: "apple" },
    { label: "Instamojo", value: "instamojo" },
    { label: "Coupon 100", value: "coupon100" },
  ];
  const [transactionDetails, setTransactionDetails] = useState();

  useEffect(() => {
    let timeoutId;
    const fetchData = () => {
      let dateString = [];
      const Page = { page: 1, perPage: 20 };
      setIsLoading(true);
      setPage({ page: 1, perPage: 20 });
      getAdminTransactionDetails(Page, Filter, dropdown, sourceFilter).then(
        (res) => {
          setIsLoading(false);
          setTransactionDetails(res?.data);
        }
      );
    };

    const handleSearch = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fetchData, 500);
    };
    handleSearch();
    return () => clearTimeout(timeoutId);
  }, [Filter, sourceFilter, dropdown]);

  const onPageChange = (page, perPage) => {
    let dateString = [];
    const Page = { page: page, perPage: perPage };

    setIsLoading(true);
    getAdminTransactionDetails(
      Page,
      Filter,
      dateString,
      dropdown,
      sourceFilter
    ).then((res) => {
      setIsLoading(false);
      setTransactionDetails(res?.data);
    });
    setPage({ page: page, perPage: perPage });
  };
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

  const columns1 = [
    {
      title: <p>Name </p>,
      dataIndex: "name",
      fixed: "left",
      width: "40px",
      render: (text) => renderCell(text),
    },
    {
      title: <p>Email ID</p>,
      dataIndex: "email",
      width: "50px",
      render: (text) => renderCell(text),
    },

    {
      title: <p>Purchase Date</p>,
      width: "50px",
      dataIndex: "date",
      render: (text) => renderCell(text && numberWithCommas(text)),
    },
    {
      title: <p className="fs-s-16 fw-600 mb-0">Plan amount</p>,
      width: "50px",
      dataIndex: "plan_amount",
      render: (text) => renderCell("₹" + " " + numberWithCommas(text)),
    },
    {
      title: <p className="fs-s-16 fw-600 mb-0">Plan </p>,
      width: "50px",
      dataIndex: "plan",
      render: (text) => renderCell(text),
    },
    {
      title: <p className="fs-s-16 fw-600 mb-0">Coupon id</p>,
      width: "50px",
      dataIndex: "coupon",
      render: (text) =>
        renderCell(
          (text && text?.length === 0) || text === "NA"
            ? "NA"
            : numberWithCommas(text)
        ),
    },
    {
      title: <p className="fs-s-16 fw-600 mb-0">Final amount</p>,
      width: "50px",
      dataIndex: "final_amount",
      render: (text) => renderCell("₹" + " " + numberWithCommas(text)),
    },
    {
      title: <p className="fs-s-16 fw-600 mb-0">Source</p>,
      width: "50px",
      dataIndex: "source",
      render: (text) => renderCell(text),
    },
  ];
  return (
    <ProtectedRoute>
      <div className="">
        <div className={styles.flex_search_date}>
          <input
            style={{ width: "12%", color: "white", height: "34px" }}
            placeholder="Search Name"
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
          <SelectOptions
            defaultSelect={" "}
            filter={dropdown}
            setSelected={setDropdown}
            data={timeLineData1}
            width={200}
            lightMode={false}
          />
          <SelectOptions
            defaultSelect={""}
            filter={sourceFilter}
            setSelected={setSourceFilter}
            data={timeLineData2}
            width={200}
            lightMode={false}
          />
        </div>
        <div className={` ${"custom-antd-head-dark"}`}>
          <CustomTable
            loading={isLoading}
            columns={columns1}
            data={transactionDetails?.results}
          />
          <CustomPagination
            current={Page.page}
            pageSize={Page.perPage}
            onChange={onPageChange}
            total={Math.round((transactionDetails?.count * 10) / 12)}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Transaction;
