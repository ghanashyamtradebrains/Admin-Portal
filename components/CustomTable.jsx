import { Table } from "antd";
import React from "react";

function CustomTable({
  columns,
  data,
  scrollable,
  expandableData = null,
  loading = false,
  border,
  rowSelection = null,
  scrollLimit = null,
  sortDirections = ["ascend", "descend"],
  scrollY = null,
}) {
  return (
    <Table
      sortDirections={sortDirections}
      loading={loading}
      bordered={border}
      dataSource={data}
      columns={columns}
      scroll={{ x: scrollable && scrollLimit ? scrollLimit : 900, y: scrollY }}
      pagination={false}
      expandable={expandableData}
      className="y-scroll-table"
      rowClassName="table-custom"
      rowSelection={rowSelection}
    />
  );
}

export default CustomTable;
