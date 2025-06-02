import { getAdminCoupon } from "@/api/fetchClient";
import CustomDropdown from "@/components/CustomDropdown";
import CustomPagination from "@/components/CustomPagination";
import CustomTable from "@/components/CustomTable";
import { EllipsisOutlined } from "@ant-design/icons";
import { DatePicker, message } from "antd";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./Coupons.module.css";

function CouponTable({
  lightMode,
  editModal,
  setEditModal,
  seteditdata,
  editdata,
  modal,
}) {
  const { RangePicker } = DatePicker;
  const [tableData, settableData] = useState([]);
  const [Page, setPage] = useState({ page: 1, perPage: 25 });
  const [input, setinput] = useState();
  const [Search, setSearch] = useState();
  const onPageChange = (page, perPage) => {
    setPage({ page: page, perPage: perPage });
  };
  const getData = async () => {
    await getAdminCoupon(Page.page, Page.perPage, Search)
      .then((resp) => {
        settableData(resp.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, [editModal, modal, Page]);

  const deleteCouponClick = (key, record) => {
    if (key === "1") {
      deleteCoupon(record.id).then((resp) => {
        if (resp.status === 204) {
          message.success("Coupon Deleted successfully");
        }
        getData();
      });
    }
  };

  const onChangeDatePicker = (date, dateString) => {
    console.log(date, dateString);
  };
  const editCoupon = () => {
    setEditModal(true);
  };

  const menuItems = [
    {
      label: (
        <p onClick={editCoupon} className="mb-0">
          Edit
        </p>
      ),
      key: "0",
    },
    {
      label: (
        <p
          onClick={(e) => {
            e.persist();
            deleteCouponClick();
          }}
          className="mb-0"
        >
          Delete
        </p>
      ),
      key: "1",
    },
  ];
  const tableColumnData = [
    {
      title: "Coupon code",
      apiKey: "code",
      returnText: (text) => text,
    },
    {
      title: "coupon Category",
      apiKey: "couponCategory",
      returnText: (text) => text,
    },
    {
      title: "Value",
      apiKey: "value",
      returnText: (text, record) =>
        `${record?.type === "monetary" ? "₹" : ""} ${text}${
          record?.type === "percentage" ? "%" : ""
        }`,
    },
    {
      title: "Description",
      apiKey: "description",
      returnText: (text) => text,
    },
    {
      title: "Creation Date",
      apiKey: "created_at",
      returnText: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Expires",
      apiKey: "valid_until",
      returnText: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Limit Users",
      apiKey: "user_limit",
      returnText: (text, record) => `${record.coupon_used}/${text}`,
    },
    {
      title: "Status",
      apiKey: "active",
      returnText: (text) => text,
    },
    {
      title: "Visibility",
      apiKey: "visible",
      returnText: (text) => text,
    },
    {
      title: "Action",
      apiKey: "",
      returnText: (text) => text,
    },
  ];

  const couponTableData = useMemo(() => {
    const resp = tableColumnData?.map((data, i) => {
      return {
        title: <p>{data.title}</p>,
        dataIndex: data.apiKey,
        fixed: i === 0 ? "left" : "",

        width:
          data.title === "Description"
            ? "100px"
            : "100px" && data.title === "Action"
            ? "20px"
            : "30px",
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
                  color: lightMode ? "black" : "white",
                }}
              >
                {data.title === "Action" ? (
                  <CustomDropdown
                    menuOnclick={(item) => deleteCouponClick(item.key, record)}
                    menuItems={menuItems}
                    activeTrigger="click"
                    lightMode={lightMode}
                  >
                    <div
                      onClick={(e) => {
                        seteditdata((prev) => record);
                      }}
                      className="pointer "
                    >
                      <EllipsisOutlined />
                    </div>
                  </CustomDropdown>
                ) : (
                  data.returnText(text, record)
                )}
              </span>
            ),
          };
        },
      };
    });
    return resp;
  }, []);
  return (
    <div>
      <div className="flex flex-wrap mb-40">
        <input
          style={{ width: "200px", color: "white", height: "38px" }}
          placeholder="Search  By Coupon code"
          value={input}
          onChange={(e) => {
            setPage({ page: 1, perPage: 50 });
            setSearch(e.target.value);
          }}
          type="text"
          className={styles.input_search}
        ></input>
      </div>
      <div className={`table-shadow  ${"custom-antd-head-dark"}`}>
        <CustomTable data={tableData?.results} columns={couponTableData} />
        <CustomPagination
          current={Page.page}
          pageSize={Page.perPage}
          lightMode={lightMode}
          onChange={onPageChange}
          total={tableData?.count}
        />
      </div>
    </div>
  );
}

export default CouponTable;
