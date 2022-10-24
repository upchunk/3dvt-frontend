import React from "react";
import StyledDropzone from "../../components/dropzone";
import "./rekonstruksi3d.css";

export default function Rekonstruksi3d() {
  return (
    <div className="rekonstruksi3d">
      <StyledDropzone type={"rekonstruksi"} />
    </div>
  );
}
