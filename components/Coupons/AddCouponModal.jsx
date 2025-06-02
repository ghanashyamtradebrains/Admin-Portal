import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import moment from "moment";
import styles from "./Coupons.module.css";

const AddCouponModal = ({
  openModal,
  closeModal,
  lightMode,
  onSubmit,
  addCoupon,
  initialValues = {},
  propdate,
}) => {
  const [formData, setFormData] = useState({
    type: "monetary",
    code: "",
    valid_until: "",
    description: "",
    value: "",
    couponCategory: "all",
    user_limit: "",
    active: "Active",
    visible: "Yes",
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        ...formData,
        ...initialValues,
        valid_until: initialValues.valid_until
          ? moment(initialValues.valid_until).format("YYYY-MM-DD")
          : "",
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      title={
        <p className={styles.create_coupon}>
          {addCoupon ? "Create" : "Edit"} Coupon
        </p>
      }
      className="modal-bg-custom"
      open={openModal}
      width="800px"
      centered
      onCancel={() => closeModal(false)}
      footer={[
        <button
          key="submit"
          type="submit"
          className={`${styles.btnPrimary}`}
          onClick={handleSubmit}
        >
          {addCoupon ? "Add" : "Update"} Coupon
        </button>,
      ]}
    >
      <form onSubmit={handleSubmit} className={styles.flex_row}>
        <div className={styles.w_50}>
          <label>Coupon Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            disabled={!addCoupon}
            className={styles.input}
          >
            <option value="monetary">Monetary</option>
            <option value="percentage">Percentage</option>
          </select>

          <label>Coupon Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            disabled={!addCoupon}
            className={styles.input}
            required
          />

          <label>Expiration Date</label>
          <input
            type="date"
            name="valid_until"
            value={formData.valid_until}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            maxLength={250}
            className={styles.textarea}
            required
          />
        </div>

        <div className={styles.w_50}>
          <label>
            {formData.type === "monetary" ? "Monetary" : "Percentage"}
          </label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <label>Coupon Category</label>
          <select
            name="couponCategory"
            value={formData.couponCategory}
            onChange={handleChange}
            disabled={!addCoupon}
            className={styles.input}
            required
          >
            <option value="all">All</option>
            <option value="6months">Sharks</option>
            <option value="year">Whales</option>
            <option value="lifetime">Unlimited</option>
          </select>

          <label>Limit Uses</label>
          <input
            type="number"
            name="user_limit"
            value={formData.user_limit}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <label>Status</label>
          <select
            name="active"
            value={formData.active}
            onChange={handleChange}
            className={styles.input}
            required
          >
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select>

          <label>Visible</label>
          <select
            name="visible"
            value={formData.visible}
            onChange={handleChange}
            className={styles.input}
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </form>
    </Modal>
  );
};

export default AddCouponModal;
