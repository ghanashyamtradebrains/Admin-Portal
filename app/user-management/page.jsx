"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoute from "../utility/client-redirect";
import styles from "./userM.module.css";
import UserManagementTable from "@/components/UserManagement/UserManagementTable";
import {
  deleteAdminStockRecommendation,
  getUserManagementUserList,
} from "@/api/fetchClient";
import { message } from "antd";
import DeleteModal from "@/components/UserManagement/DeleteModal";

function UserManagement() {
  const [inputSearch, setInputSearch] = useState("");
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ state: false, id: null });

  const getData = async () => {
    setIsLoading(true);
    await getUserManagementUserList(inputSearch)
      .then((resp) => {
        setUserList(resp?.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, [inputSearch]);

  const deleteClick = (id) => {
    setDeleteModal({ state: true, id: id });
  };
  const onDeleteConfirm = () => {
    deleteAdminStockRecommendation(deleteModal.id).then((resp) => {
      message.success("Stock Recommendation Deleted successfully");
      getData();
      setDeleteModal({ state: false, id: null });
    });
  };

  return (
    <ProtectedRoute>
      <div className={styles.flex_search_date}>
        <input
          style={{ width: "20%", color: "white" }}
          placeholder="Search By Email"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          type="text"
          className={styles.input_search}
        ></input>
      </div>
      <div className={styles.table}>
        <UserManagementTable
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          userList={userList}
          setDeleteModal={deleteClick}
          setUserList={setUserList}
        />
      </div>
      <DeleteModal
        item={true}
        visible={deleteModal.state}
        setVisible={setDeleteModal}
        onConfirm={onDeleteConfirm}
      />
    </ProtectedRoute>
  );
}

export default UserManagement;
