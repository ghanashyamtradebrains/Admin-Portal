"use client";
import React, { useEffect, useState } from "react";
import { getAdminSuperStarEdit, putStarPortfolioNew } from "@/api/fetchClient";
import styles from "./edit.module.css";
import { usePathname, useRouter } from "next/navigation";
import { message } from "antd";

function EditSuperstar() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const router = useRouter();
  const [formData, setFormData] = useState({
    investorName: "",
    netWorth: "",
    stockHoldings: "",
    dob: "",
    education: "",
    college: "",
    occupation: "",
    description: "",
    picture: null,
  });

  const [apiId, setApiId] = useState(null);
  const [errors, setErrors] = useState({});
  const [filePreview, setFilePreview] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getAdminSuperStarEdit(id);
        const data = resp?.data || {};
        setApiId(data.id);
        setFormData({
          investorName: data.investor_name || "",
          netWorth: data.networth || "",
          stockHoldings: data.stock_holdings || "",
          dob: data.dob || "",
          education: data.education || "",
          college: data.college || "",
          occupation: data.occupation || "",
          description: data.description || "",
          picture: null,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, picture: file }));
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleFileRemove = () => {
    setFormData((prev) => ({ ...prev, picture: null }));
    setFilePreview("");
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "investorName",
      "netWorth",
      "stockHoldings",
      "dob",
      "education",
      "college",
      "occupation",
      "description",
    ];
    requiredFields.forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      console.log("Validation failed:", formData);
      return;
    }

    console.log("Sending API call...");

    const submitData = new FormData();
    submitData.append("dob", formData.dob);
    submitData.append("education", formData.education);
    submitData.append("college", formData.college);
    submitData.append("occupation", formData.occupation);
    submitData.append("description", formData.description);
    if (formData.picture) {
      submitData.append("image", formData.picture);
    }

    try {
      const res = await putStarPortfolioNew(apiId, submitData);
      if (res.status === 202) {
        router.push("/superstar");
        message.success("Superstar updated successfully!");
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Superstar Creation</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <input
            name="investorName"
            value={formData.investorName}
            onChange={handleChange}
            className={styles.input}
            disabled
          />
          {errors.investorName && (
            <span className={styles.error}>{errors.investorName}</span>
          )}
        </div>

        <label className={styles.text_color}>Thumbnail Image</label>
        <p className={styles.text_color}>
          Image Dimension 300×300px less than 50KB
        </p>
        <div className={styles.formGroup}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {filePreview && (
            <div>
              <img src={filePreview} alt="Preview" width="100" height="100" />
              <button type="button" onClick={handleFileRemove}>
                Remove
              </button>
            </div>
          )}
        </div>

        <p className={styles.required}>* Bio</p>

        <div className={styles.formGroup}>
          <label className={styles.label}>Net Worth</label>
          <input
            name="netWorth"
            className={styles.input}
            value={formData.netWorth}
            onChange={handleChange}
          />
          {errors.netWorth && (
            <span className={styles.error}>{errors.netWorth}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>No. of Stocks</label>
          <input
            name="stockHoldings"
            className={styles.input}
            value={formData.stockHoldings}
            onChange={handleChange}
          />
          {errors.stockHoldings && (
            <span className={styles.error}>{errors.stockHoldings}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Born</label>
          <input
            className={styles.input}
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <span className={styles.error}>{errors.dob}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Education</label>
          <input
            name="education"
            className={styles.input}
            value={formData.education}
            onChange={handleChange}
          />
          {errors.education && (
            <span className={styles.error}>{errors.education}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>College</label>
          <input
            name="college"
            className={styles.input}
            value={formData.college}
            onChange={handleChange}
          />
          {errors.college && (
            <span className={styles.error}>{errors.college}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Occupation</label>
          <input
            name="occupation"
            className={styles.input}
            value={formData.occupation}
            onChange={handleChange}
          />
          {errors.occupation && (
            <span className={styles.error}>{errors.occupation}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea
            name="description"
            rows="5"
            className={styles.textarea}
            placeholder="Type here"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>

        <button type="submit" className={styles.createBtn}>
          Update
        </button>
      </form>
    </div>
  );
}

export default EditSuperstar;
