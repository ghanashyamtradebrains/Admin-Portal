"use client";

import { MoreOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CustomTable from "@/components/CustomTable";
import CustomPagination from "@/components/CustomPagination";
import styles from "./affiliate.module.css";
import { useRouter } from "next/navigation";
import numberWithCommas from "@/app/utility/numberWithCommas";
import { getAllAffiliateData } from "@/api/fetchClient";
import AdminAllAffiliateGraph from "@/components/AllAffiliate/AdminAllAffiliateGraph";

function AllAffiliate() {
  const [allAffiliate, setAllAffiliate] = useState();
  const [Page, setPage] = useState({ page: 1, perPage: 20 });
  const [input, setInput] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [Selected, setSelected] = useState();
  const navigate = useRouter();

  const timeLineData1 = [
    { label: "Revenue Generated", value: "revenue" },
    { label: "Free Users", value: "sign_ups" },
    { label: "Premium Users", value: "premium" },
    { label: "Affiliates Revenue", value: "affiliate_revenue" },
  ];

  useEffect(() => {
    setIsLoading(true);
    getAllAffiliateData(Page).then((res) => {
      setAllAffiliate(res?.data);
      setIsLoading(false);
    });
  }, [Page]);

  useEffect(() => {
    setIsLoading(true);
    const dateString = undefined;
    getAllAffiliateData(Page, input, dateString).then((res) => {
      setAllAffiliate(res?.data);
      setIsLoading(false);
    });
  }, [input]);
  const onChange = (date, dateString) => {
    getAllAffiliateData(Page, input, dateString).then((res) => {
      setAllAffiliate(res?.data);
    });
  };
  const onPageChange = (page, perPage) => {
    getAllAffiliateData(Page, input).then((res) => {
      setPage({ page: page, perPage: perPage });
      setAllAffiliate(res?.data);
    });
  };

  const getColor = (expr) => {
    if (expr === "rejected") {
      return "#F82E2E";
    } else if (expr === "approval") {
      return "#6DB8FD";
    } else if (expr === "yet to upload") {
      return "#E7AE3D";
    } else if (expr === "approved") {
      return "#00FF57";
    } else {
      return "white";
    }
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

  const renderText = (text) => ({
    props: { style: baseCellStyle },
    children: (
      <span className="ff-lato" style={textStyle}>
        {text}
      </span>
    ),
  });

  const renderClickableText = (text, record, navigate) => ({
    props: { style: baseCellStyle },
    children: (
      <span
        onClick={() => navigate.push(`${record?.full_name}/${record?.id}`)}
        className="ff-lato pointer link-hover-underline"
        style={textStyle}
      >
        {text}
      </span>
    ),
  });

  const renderWithCommas = (text) => ({
    props: { style: baseCellStyle },
    children: (
      <span className="ff-lato" style={textStyle}>
        {text && numberWithCommas(text)}
      </span>
    ),
  });

  const renderStatus = (text) => ({
    props: { style: baseCellStyle },
    children: (
      <span
        className="ff-lato Textcapitalize"
        style={{
          ...textStyle,
          color: getColor(text),
        }}
      >
        {text === "approval" ? "Uploaded" : text}
      </span>
    ),
  });

  const columns1 = (navigate) => [
    {
      title: <p className="fs-s-16 fw-600 mb-0">Affiliate Name</p>,
      dataIndex: "full_name",
      fixed: "left",
      width: "40px",
      render: (text, record) => renderClickableText(text, record, navigate),
    },
    {
      title: <p className="fs-s-16 fw-600 mb-0">Email ID</p>,
      dataIndex: "email",
      width: "50px",
      render: (text) => renderText(text),
    },
    {
      title: <p className="fs-s-16 fw-600 mb-0">Affiliate Code</p>,
      dataIndex: "code",
      width: "50px",
      render: (text) => renderWithCommas(text),
    },
    {
      title: <p className="fs-s-16 fw-600 mb-0">Register Date</p>,
      dataIndex: "created_at",
      width: "50px",
      render: (text) => renderText(moment(text).format("YYYY-MM-DD")),
    },
    {
      title: <p className="fs-s-16 fw-600 mb-0">Document Status</p>,
      dataIndex: "doc_status",
      width: "50px",
      render: (text) => renderStatus(text),
    },
  ];

  const { RangePicker } = DatePicker;

  const dateFormat = ["DD-MM-YYYY", "DD-MM-YY"];

  return (
    <div className="my-body px-30-0">
      <div className="d-flex justify-content-between">
        <div>
          <p className="fs-24-16  mb-0 fw-700">Over View</p>
          <p>
            All Details of the Affiliates will be shown in the table below.{" "}
          </p>
        </div>
      </div>

      <div className="">
        <p className="d-flex justify-content-end">
          Total Affiliates: {allAffiliate?.count}
        </p>
      </div>
      <div className={styles.flex_search_date_flex}>
        <input
          style={{ width: "17%", color: "white" }}
          placeholder="Search  Affiliate"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className={styles.input_search}
        ></input>
        <RangePicker
          dropdownClassName={"DatePickerdropdrow-Antd-Dark"}
          className={"DatePicker-Antd-Dark"}
          style={{ height: "38px" }}
          onChange={onChange}
        />
      </div>

      <div className={`custom-antd-head-dark`}>
        <CustomTable
          loading={isLoading}
          data={allAffiliate?.results}
          columns={columns1(navigate)}
        />
        <CustomPagination
          current={Page.page}
          pageSize={Page.perPage}
          onChange={onPageChange}
          total={allAffiliate?.count}
        />
      </div>

      <div>
        <AdminAllAffiliateGraph />
      </div>
    </div>
  );
}

export default AllAffiliate;
