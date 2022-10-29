import { Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import StyledDropzone from "../../components/dropzone";
import ModelRederer from "../../components/modelRender/modelRender";
import "./rekonstruksi3d.css";

export default function Rekonstruksi3d() {
  const showModel = useSelector((state) => state.runnerConfig.showModel);
  return (
    <div className="rekonstruksi3d">
      <Stack direction="column" spacing={{ xs: 3 }} sx={{ minHeight: "100vh" }}>
        <StyledDropzone type={"rekonstruksi"} />
        {showModel ? <ModelRederer /> : null}
      </Stack>
    </div>
  );
}
