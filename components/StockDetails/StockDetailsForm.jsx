import { AutoComplete, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import {
  addStockToStockDetails,
  getStockDetails,
  putStockToStockDetails,
} from "@/api/fetchClient";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { usePathname, useRouter } from "next/navigation";
import { ClassicEditor } from "ckeditor5-custom-build";
import Tiptap from "../TipTapEditor/TipTapEditor";

function StockDetailsForm({
  form,
  dropdowndata,
  setDropdowndata,
  inputReturns,
  setInputReturns,
  initialData,
  disableautocomplete,
}) {
  const navigate = useRouter();
  const [selectedLabel, setSelectedLabel] = useState(
    (initialData && initialData?.company_name) || ""
  );
  const [ekkeditor, setekkeditor] = useState(initialData?.description || "");
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const getResults = async (e) => {
    const response = await getStockDetails(e)
      .then((resp) => {
        setInputReturns(resp.data);
        setSelectedLabel(resp.data[0]?.FINCODE);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (inputReturns) {
      const options = inputReturns.map((items) => ({
        value: items.company,
        label: items.company,
      }));
      setDropdowndata(options);
    }
  }, [inputReturns]);
  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
      setSelectedLabel(initialData.company);
      setekkeditor(initialData.description);
    }
  }, [initialData]);
  const onSubmit = async (values) => {
    const updatedValues = {
      ...values,
      fincode: selectedLabel,
    };
    updatedValues.description = ekkeditor;

    if (initialData) {
      try {
        const response = await putStockToStockDetails(updatedValues, id);
        navigate.push(`/stock-details`, { replace: true });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await addStockToStockDetails(updatedValues);
        navigate.push(`/stock-details`, { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item type="hidden" name="fincode" initialValue={selectedLabel}>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item
        label="Stock Name"
        rules={[
          {
            required: true,
            message: "Please select a stock",
          },
        ]}
        name="company"
        className={` ${"dark-input-login"}`}
      >
        <AutoComplete
          className={"border1px-dark-mode antd-Selete-Custom-dark  "}
          style={{
            width: "100%",
          }}
          notFoundContent="No Stocks"
          placeholder=" Select Stock"
          options={dropdowndata}
          dropdownClassName={`${"drop-down-stock invert-text"}`}
          onFocus={() => getResults("")}
          onChange={(e) => {
            getResults(e);
            setSelectedLabel(e);
          }}
          value={selectedLabel}
          onSelect={(value, option) => {
            setSelectedLabel(option?.label);
          }}
          disabled={disableautocomplete}
          defaultActiveFirstOption={true}
        />
      </Form.Item>

      <Form.Item
        label="Description"
        rules={[
          {
            required: true,
            message: "Please enter description",
          },
        ]}
        name="description"
        className={` ${"dark-input-login"}`}
      >
        {/* <CKEditor
          editor={ClassicEditor}
          data={ekkeditor}
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setekkeditor(data);
          }}
        /> */}
        <Tiptap data={ekkeditor} />
      </Form.Item>
    </Form>
  );
}

export default StockDetailsForm;
