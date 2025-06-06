"use client";

import React, { useEffect, useState } from "react";
import { Form } from "antd";
import StockDetailsForm from "@/components/StockDetails/StockDetailsForm";

function AddStockDetails() {
  const [form] = Form.useForm();
  const [dropdowndata, setDropdowndata] = useState([]);
  const [addInputReturns, setAddInputReturns] = useState();

  return (
    <>
      <StockDetailsForm
        dropdowndata={dropdowndata}
        setDropdowndata={setDropdowndata}
        inputReturns={addInputReturns}
        setInputReturns={setAddInputReturns}
        form={form}
      />
      <div className="d-flex justify-content-end">
        <button
          type="primary"
          className=" btn-bg-primary  mb-10 p-10 h-45 fw-500 br-5 text-white"
          onClick={() => form.submit()}
        >
          Submit Details
        </button>
      </div>
    </>
  );
}

export default AddStockDetails;
