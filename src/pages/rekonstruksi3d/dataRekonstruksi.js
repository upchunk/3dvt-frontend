import { Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import DataTable from "../../components/dataTable";
import ModelRederer from "../../components/modelRender/modelRender";
import "./rekonstruksi3d.css";

export default function DataRekonstruksi() {
  const showModel = useSelector((state) => state.runnerConfig.showModel);
  return (
    <div className="dataRekonstruksi">
      <Stack direction="column" spacing={{ xs: 3 }} sx={{ minHeight: "100vh" }}>
        <DataTable title={"Rekonstruksi"} />
        {showModel ? <ModelRederer /> : null}
      </Stack>
    </div>
  );
}
