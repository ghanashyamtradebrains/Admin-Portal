"use client";

import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
  getAdminAffiliatePayoutDetails,
  updateAffiliatePayoutStatus,
} from "@/api/fetchClient";
import numberWithCommas from "@/app/utility/numberWithCommas";
import { redGreenColorPicker } from "@/app/utility/redGreenColorPicker";
import CustomTable from "@/components/CustomTable";
import SelectOptions from "@/components/SelectionOption";
import styles from "./payout.module.css";

function AdminAffiliatePayout() {
  const [PayoutDetails, setPayoutDetails] = useState();
  useEffect(() => {
    getAdminAffiliatePayoutDetails().then((res) => {
      setPayoutDetails(res?.data);
    });
  }, []);
  const [id, setId] = useState();
  const updateTable = () => {
    getAdminAffiliatePayoutDetails().then((res) => {
      setPayoutDetails(res?.data);
    });
  };
  const timeLineData1 = [
    { label: "Paid", value: "paid" },
    { label: "Outstanding", value: "outstanding" },
  ];
  const [setSelected, setSetSelected] = useState();

  const onUpdate = () => {
    updateAffiliatePayoutStatus(id, setSelected).then((res) => {
      setModal1(false);

      updateTable();
    });
  };
  const [Modal1, setModal1] = useState(false);

  const baseCellStyle = {
    background: "#3B3F4F",
    borderRight: "1px solid #545E78",
    borderLeft: "1px solid #545E78",
    borderBottom: "none",
  };

  const baseTextStyle = {
    fontSize: "14px",
    fontWeight: "400",
    color: "white",
  };

  const columns1 = [
    {
      title: <p>Affiliate Name</p>,
      dataIndex: "name",
      fixed: "left",
      width: "40px",
      render: (text) => ({
        props: { style: baseCellStyle },
        children: (
          <span
            className="ff-lato pointer link-hover-underline"
            style={baseTextStyle}
          >
            {text}
          </span>
        ),
      }),
    },
    {
      title: <p>Month</p>,
      dataIndex: "date",
      width: "50px",
      render: (text) => ({
        props: { style: baseCellStyle },
        children: (
          <span className="ff-lato" style={baseTextStyle}>
            {text}
          </span>
        ),
      }),
    },
    {
      title: <p>Commision %</p>,
      dataIndex: "slab",
      width: "50px",
      render: (text) => ({
        props: { style: baseCellStyle },
        children: (
          <span className="ff-lato" style={baseTextStyle}>
            {text}
          </span>
        ),
      }),
    },
    {
      title: <p>Earnings</p>,
      dataIndex: "revenue_earned",
      width: "50px",
      render: (text) => ({
        props: { style: baseCellStyle },
        children: (
          <span className="ff-lato" style={baseTextStyle}>
            {text && numberWithCommas(text)}
          </span>
        ),
      }),
    },
    {
      title: <p>Status</p>,
      dataIndex: "status",
      width: "50px",
      render: (text) => ({
        props: { style: baseCellStyle },
        children: (
          <span
            className="ff-lato Textcapitalize"
            style={{
              ...baseTextStyle,
              color:
                text === "paid" ? redGreenColorPicker(10, false) : "#1774FF",
            }}
          >
            {text}
          </span>
        ),
      }),
    },
    {
      title: <p>Action</p>,
      dataIndex: "ChangePers",
      width: "50px",
      render: (text, record) => ({
        props: { style: baseCellStyle },
        children: (
          <span
            onClick={() => {
              setModal1(true);
              setId(record?.id);
            }}
            className="ff-lato d-flex align-items-center justify-content-center pointer"
            style={baseTextStyle}
          >
            <EditOutlined />
          </span>
        ),
      }),
    },
  ];

  return (
    <div className="w-100 my-body  px-30-0 ">
      <p className={styles.heading}>Overall Affiliate Payout</p>
      <div className={`table-shadow mt-30 ${"custom-antd-head-dark"}`}>
        <CustomTable data={PayoutDetails?.results} columns={columns1} />
      </div>
      <Modal
        title={
          <p className={`fs-s-16 mb-0 fw-600 ${"text-white"}`}>
            Update Details
          </p>
        }
        style={{ width: "320px" }}
        width={"320px"}
        visible={Modal1}
        centered
        wrapClassName={"modelClassname"}
        onCancel={() => {
          setModal1(false);
        }}
        footer={[
          <div className="d-flex justify-content-end ">
            <button
              key="submit"
              type="primary"
              style={{ width: "120px" }}
              onClick={() => onUpdate()}
              className={`  br-5  pointer fw-500 btn-bg-primary text-white p-5`}
            >
              Update
            </button>
          </div>,
        ]}
      >
        <p className="mb-0">
          <SelectOptions
            className="w-100"
            setSelected={setSetSelected}
            data={timeLineData1}
            width={250}
          />
        </p>
      </Modal>
    </div>
  );
}

export default AdminAffiliatePayout;
