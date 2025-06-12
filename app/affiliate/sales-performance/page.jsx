"use client";

import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import CustomTable from "@/components/CustomTable";
import CustomPagination from "@/components/CustomPagination";
import numberWithCommas from "@/app/utility/numberWithCommas";
import SelectOptions from "@/components/SelectionOption";
import { getOverallAffiliateSales } from "@/api/fetchClient";
import styles from "./sales.module.css";

function AdminAffiliateSalesPerforms() {
  const { RangePicker } = DatePicker;

  const [input, setInput] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const ProductSold = [
    { value: "min_earnings", label: "is greater than" },
    { value: "max_earnings", label: "is less than or equal to" },
  ];
  const Commision = [
    { value: "commision_min", label: "is greater than" },
    { value: "commision_max", label: "is less than or equal to" },
  ];
  const Revanues = [
    { value: "revenue_generated_min", label: "is greater than" },
    { value: "revenue_generated_max", label: "is less than or equal to" },
  ];
  const dateFormat = ["YYYY-MM-DD"];

  const onChange = (date, dateString) => {
    console.log(dateString, "dateString");
    setFilter({ ...Filter, maxdate: dateString[1], mindate: dateString[0] });
  };
  const [commi, setcommi] = useState();
  const [revenue, setrevenue] = useState();
  const [earnings, setearnings] = useState();
  const [Page, setPage] = useState({ page: 1, perPage: 10 });

  const [Filter, setFilter] = useState({
    maxdate: "",
    mindate: "",
    search: "",
    commi: "",
    revenue: "",
    earnings: "",
  });

  const [salesPerformance, setSalesPerformance] = useState();
  useEffect(() => {
    setIsLoading(true);
    getOverallAffiliateSales().then((Res) => {
      setSalesPerformance(Res?.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getOverallAffiliateSales(Filter, revenue, commi, earnings, Page).then(
      (Res) => {
        setSalesPerformance(Res?.data);
        setIsLoading(false);
      }
    );
  }, [Filter, Page]);
  const onPageChange = (page, perPage) => {
    setPage({ page: page, perPage: perPage });
  };

  const cellStyle = {
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

  const columns1 = [
    {
      title: <span>Affiliate Name</span>,
      dataIndex: "affiliate__user__name",
      fixed: "left",
      width: "40px",
      render(text) {
        return {
          props: { style: cellStyle },
          children: (
            <span
              className="ff-lato pointer link-hover-underline"
              style={textStyle}
            >
              {text}
            </span>
          ),
        };
      },
    },
    {
      title: <span>User Email ID</span>,
      dataIndex: "user__email",
      width: "50px",
      render(text) {
        return {
          props: { style: cellStyle },
          children: (
            <span className="ff-lato" style={textStyle}>
              {text}
            </span>
          ),
        };
      },
    },
    {
      title: <span>Plan Name</span>,
      dataIndex: "plan",
      width: "50px",
      render(text) {
        return {
          props: { style: cellStyle },
          children: (
            <span className="ff-lato" style={textStyle}>
              {text}
            </span>
          ),
        };
      },
    },
    {
      title: <span>Purchased Date</span>,
      dataIndex: "created_at",
      width: "50px",
      render(text) {
        return {
          props: { style: cellStyle },
          children: (
            <span className="ff-lato" style={textStyle}>
              {moment(text).format("YYYY-MM-DD")}
            </span>
          ),
        };
      },
    },
    {
      title: <span>Initial Amount</span>,
      dataIndex: "initial_amount",
      width: "50px",
      render(text) {
        return {
          props: { style: cellStyle },
          children: (
            <span className="ff-lato" style={textStyle}>
              {text}
            </span>
          ),
        };
      },
    },
    {
      title: <span>Coupon Code</span>,
      dataIndex: "coupon",
      width: "50px",
      render(text) {
        return {
          props: { style: cellStyle },
          children: (
            <span className="ff-lato" style={textStyle}>
              {text}
            </span>
          ),
        };
      },
    },
    {
      title: <span>Coupon Value</span>,
      dataIndex: "coupon_value",
      width: "50px",
      render(text) {
        return {
          props: { style: cellStyle },
          children: (
            <span className="ff-lato" style={textStyle}>
              {text}
            </span>
          ),
        };
      },
    },
    {
      title: <span>Final Amount</span>,
      dataIndex: "final_amount",
      width: "50px",
      render(text) {
        return {
          props: { style: cellStyle },
          children: (
            <span className="ff-lato" style={textStyle}>
              {text}
            </span>
          ),
        };
      },
    },
    {
      title: <span>Commision %</span>,
      width: "50px",
      dataIndex: "slab__commision",
      render(text) {
        return {
          props: { style: cellStyle },
          children: (
            <span className="ff-lato" style={textStyle}>
              {text && text + "%"}
            </span>
          ),
        };
      },
      filterDropdown: () => (
        <div className={styles.filterDropdown}>
          <SelectOptions
            lightMode={false}
            data={Commision}
            setSelected={setcommi}
            placeholder="Select"
            width="200px"
          />
          <input
            value={Filter?.commi}
            style={{ width: "200px", color: "gray" }}
            placeholder="Percentage"
            onChange={(e) => setFilter({ ...Filter, commi: e.target.value })}
            type="text"
            className={styles.input_search}
          />
        </div>
      ),
    },
    {
      title: <span>Revenue</span>,
      width: "50px",
      dataIndex: "earnings",
      render(text) {
        return {
          props: { style: cellStyle },
          children: (
            <span className="ff-lato" style={textStyle}>
              {text && "₹ " + numberWithCommas(text)}
            </span>
          ),
        };
      },
      filterDropdown: () => (
        <div className={styles.filterDropdown}>
          <SelectOptions
            lightMode={false}
            data={ProductSold}
            placeholder="Select"
            setSelected={setearnings}
            width="200px"
          />
          <input
            value={Filter?.earnings}
            style={{ width: "200px", color: "gray" }}
            placeholder="Price"
            onChange={(e) => setFilter({ ...Filter, earnings: e.target.value })}
            type="text"
            className={styles.input_search}
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      IndexCompany: "Demo Index",
      Points: "58,980.95",
      Change: "480.89",
      ChangePers: "2.98%",
    },
    {
      IndexCompany: "Demo Index",
      Points: "58,980.95",
      Change: "480.89",
      ChangePers: "2.98%",
    },
    {
      IndexCompany: "Demo Index",
      Points: "58,980.95",
      Change: "480.89",
      ChangePers: "2.98%",
    },
    {
      IndexCompany: "Demo Index",
      Points: "58,980.95",
      Change: "480.89",
      ChangePers: "2.98%",
    },
    {
      IndexCompany: "Demo Index",
      Points: "58,980.95",
      Change: "480.89",
      ChangePers: "2.98%",
    },
    {
      IndexCompany: "Demo Index",
      Points: "58,980.95",
      Change: "480.89",
      ChangePers: "2.98%",
    },
    {
      IndexCompany: "Demo Index",
      Points: "58,980.95",
      Change: "480.89",
      ChangePers: "2.98%",
    },
  ];
  return (
    <div className="my-body  px-30-0">
      <div>
        <p className={styles.heading}>Overall Sales Of Affiliates</p>
      </div>
      <div className={` ${"custom-antd-head-dark"}`}>
        <div className={styles.flex_search_date_flex}>
          <input
            style={{ width: "25%", color: "white" }}
            placeholder="Search  Affiliate"
            value={input}
            onChange={(e) => setFilter({ ...Filter, search: e.target.value })}
            type="text"
            className={styles.input_search}
          ></input>
          <RangePicker
            dropdownClassName={"DatePickerdropdrow-Antd-Dark"}
            className={"DatePicker-Antd-Dark"}
            style={{ height: "35px" }}
            onChange={onChange}
          />
        </div>
        <p className={styles.total_revenue}>
          Total Revenue: ₹ {numberWithCommas(salesPerformance?.total_amount)}
        </p>
        <div className={`custom-antd-head-dark`}>
          <CustomTable
            loading={isLoading}
            data={salesPerformance?.results}
            columns={columns1}
          />
          <CustomPagination
            current={Page.page}
            onChange={onPageChange}
            total={salesPerformance?.count}
            pageSize={Page.perPage}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminAffiliateSalesPerforms;
