"use client";

import { getUserManagementUserData } from "@/api/fetchClient";
import ProtectedRoute from "@/app/utility/client-redirect";
import UserAboutSection from "@/components/UserManagement/UserAboutSection";
import UserPermissionTable from "@/components/UserManagement/UserPermissionTable";
import { Form, message } from "antd";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

function EditUserManagement() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const userId = Number(id);
  const [pagePermission, setPagePermission] = useState([]);
  const [userData, setUserData] = useState();
  const getIndividualData = async () => {
    const res = await getUserManagementUserData(Number(id));
    setPagePermission(res?.data?.permissions);
    setUserData(res?.data?.user_data[0]);
  };
  useEffect(() => {
    getIndividualData();
  }, [id]);
  const onPermissionChange = (permissions) => {
    setPagePermission(permissions);
  };
  return (
    <ProtectedRoute>
      <div>
        <UserAboutSection userData={userData} />
        {pagePermission?.length !== 0 && (
          <UserPermissionTable
            userData={userData}
            pagePermission={pagePermission}
            onPermissionChange={onPermissionChange}
            userId={userId}
            getIndividualData={getIndividualData}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}

export default EditUserManagement;
