"use client";

import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { useParams, useRouter } from "next/navigation";
import { getStockToStockDetails } from "@/api/fetchClient";
import StockDetailsForm from "@/components/StockDetails/StockDetailsForm";
import styles from "./edit.module.css";

function EditStockDetails() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [stockData, setStockData] = useState(null);
  const navigate = useRouter();

  useEffect(() => {
    getStockToStockDetails(id)
      .then((response) => {
        const stockDetails = response.data;
        setStockData(stockDetails);
        form.setFieldsValue({
          ...stockDetails,
          company: stockDetails.company_name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, form]);

  return (
    <>
      {stockData && (
        <StockDetailsForm
          form={form}
          initialData={stockData}
          disableautocomplete={true}
        />
      )}

      <div className="d-flex justify-content-end">
        <button
          type="primary"
          className={styles.submitButton}
          onClick={() => form.submit()}
        >
          Update Details
        </button>
      </div>
    </>
  );
}

export default EditStockDetails;
