import React from "react";
import LoginAndRegister from "../../components/userAuth/userAuth";

export default function AuthPage({ page }) {
  return (
    <div className="flex-container spotlight">
      <LoginAndRegister page={page} />
    </div>
  );
}
