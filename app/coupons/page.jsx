"use client";
import React, { useMemo, useState } from "react";
import styles from "./coupons.module.css";
import ProtectedRoute from "../utility/client-redirect";
import CouponTable from "../../components/Coupons/CouponTable";
import { postAddCoupon, putEditCoupon } from "@/api/fetchClient";
import moment from "moment";
import AddCouponModal from "@/components/Coupons/AddCouponModal";

function Coupons() {
  const StageArray = ["Coupons Details"];
  const [tableType, settableType] = useState("Coupons Details");
  const [Modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editdata, seteditdata] = useState({});

  const addCoupon = async (values, form) => {
    const data = {
      ...values,
      valid_until: moment(values.valid_until).format(),
    };
    await postAddCoupon(data)
      .then((resp) => {
        if (resp.status === 201) {
          message.success("Coupon Added successfully");
        }
        setModal(false);
      })
      .catch((err) => {
        const errArr = err.response.data?.map((obj) => {
          const objData = Object.keys(obj);
          const objDataVal = Object.values(obj);

          return {
            name: objData[0],
            errors: [objDataVal[0]],
          };
        });

        form.setFields(errArr);
      });
  };
  const editInitValues = useMemo(() => {
    let data = { ...editdata, valid_until: moment(editdata.valid_until) };
    delete data.id;
    delete data.coupon_type;
    delete data.created_at;
    return { data, id: editdata.id };
  }, [editModal]);
  const editCoupon = async (values, form) => {
    const data = {
      ...values,
      valid_until: moment(values.valid_until).format(),
    };
    await putEditCoupon(data, editdata.id)
      .then((resp) => {
        if (resp.status === 200) {
          message.success("Coupon Updated successfully");
        }
        setEditModal(false);
      })
      .catch((err) => {
        const errArr = err.response.data?.map((obj) => {
          const objData = Object.keys(obj);
          const objDataVal = Object.values(obj);

          return {
            name: objData[0],
            errors: [objDataVal[0]],
          };
        });

        form.setFields(errArr);
      });
  };

  return (
    <ProtectedRoute>
      {" "}
      <div>
        <div className={styles.flex_end}>
          <button onClick={() => setModal(true)} className={styles.buttons}>
            Create Coupon
          </button>
        </div>
        <div className={styles.table_container}>
          <CouponTable
            editModal={editModal}
            setEditModal={setEditModal}
            editdata={editdata}
            seteditdata={seteditdata}
            modal={Modal}
          />
        </div>
      </div>
      {Modal && (
        <AddCouponModal
          openModal={Modal}
          closeModal={setModal}
          addCoupon={true}
          onSubmit={addCoupon}
          initialValues={{
            active: "Active",
            visible: "Yes",
            type: "monetary",
            couponCategory: "all",
          }}
        />
      )}
      {editModal && (
        <AddCouponModal
          openModal={editModal}
          closeModal={setEditModal}
          onSubmit={editCoupon}
          initialValues={editInitValues?.data}
          propdate={editInitValues?.valid_until}
        />
      )}
    </ProtectedRoute>
  );
}

export default Coupons;
