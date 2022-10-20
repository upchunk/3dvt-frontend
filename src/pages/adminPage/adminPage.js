import { Stack } from "@mui/system";
import React from "react";
import LandingPageForm from "../../components/landingPageForm";
import ResearchersForm from "../../components/researchersForm ";

import "./adminPage.css";

export default function LamanAdmin() {
  return (
    <div className="adminPage">
      <Stack direction={{ xs: "column" }} spacing={{ xs: 2 }}>
        <LandingPageForm />
        <ResearchersForm />
      </Stack>
    </div>
  );
}
