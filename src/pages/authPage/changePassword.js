import React from "react";
import ChangeUserPassword from "../../components/userAuth/ChangePassword";

export default function ChangePasswordPage({ page }) {
  return (
    <div className="flex-container spotlight">
      <ChangeUserPassword page={page} />
    </div>
  );
}
