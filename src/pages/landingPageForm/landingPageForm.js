import { Stack } from "@mui/system";
import React from "react";
import LandingPageSectionForm from "../../components/adminForm/landingPageSectionForm";
import PublicationForm from "../../components/adminForm/publicationForm";
import ResearchersForm from "../../components/adminForm/researchersForm ";

import "./landingPageForm.css";

export default function LandingPageModification() {
  return (
    <div className="adminPage">
      <Stack direction={{ xs: "column" }} spacing={{ xs: 2 }}>
        <LandingPageSectionForm />
        <PublicationForm />
        <ResearchersForm />
      </Stack>
    </div>
  );
}
