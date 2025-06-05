import React, { useMemo } from "react";
import CustomTable from "../CustomTable";
import { EditOutlined } from "@ant-design/icons";
import Link from "next/link";

function SuperstarTable({ tableData }) {
  const tableColumnData = [
    {
      title: "Superstar",
      apiKey: "investor_name",

      returnText: (text, record) => (
        <div className="ff-lato pointer link-hover-underline">{text}</div>
      ),
    },
    {
      title: "Action",
      apiKey: "",
      returnText: (text) => text,
    },
  ];
  const starTableData = useMemo(() => {
    const resp = tableColumnData?.map((data, i) => {
      return {
        title: <p className="fs-s-16 fw-600 mb-0">{data.title}</p>,
        dataIndex: data.apiKey,
        width: "10px",
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
                {data.title === "Action" ? (
                  <div className="flex">
                    <Link
                      href={`/superstar/edit/${record.investor_code}`}
                      state={{ data: record }}
                      className="ff-lato pointer "
                      style={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "400",
                      }}
                    >
                      <EditOutlined />
                    </Link>
                    <span
                      className="ff-lato pointer"
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "white",
                      }}
                      onClick={() => setDeleteModal(record.id)}
                    >
                      {/* <DeleteOutlined /> */}
                    </span>
                  </div>
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
    <div className="mt-40">
      <div className={`table-shadow  ${"custom-antd-head-dark"}`}>
        <CustomTable
          data={tableData}
          columns={starTableData}
          scrollable={true}
          scrollLimit={400}
        />
      </div>
    </div>
  );
}

export default SuperstarTable;
