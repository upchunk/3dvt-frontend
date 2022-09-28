import React from "react";
import { useSelector } from "react-redux";
import StyledDropzone from "../../components/dropzone";
import ImageGalleryViewer from "../../components/imageGalery/imageGalery";

import "./segmentasi.css";

export default function Segmentasi() {
  const showGalery = useSelector((state) => state.runnerConfig.showGalery);

  return (
    <div className="segmentasi">
      <StyledDropzone></StyledDropzone>
      {showGalery ? <ImageGalleryViewer /> : null}
    </div>
  );
}
