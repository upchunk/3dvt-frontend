import { Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import UserDetailForm from "../components/adminForm/userDetailForm";
import AdminTable from "../components/AdminTable";

export default function UserManagement() {
  const viewUserDetail = useSelector(
    (state) => state.runnerConfig.viewUserDetail
  );

  return (
    <div className="adminPage">
      <Stack direction={{ xs: "column" }} spacing={{ xs: 2 }}>
        <AdminTable type="users" />
        {viewUserDetail ? <UserDetailForm /> : null}
      </Stack>
    </div>
  );
}
