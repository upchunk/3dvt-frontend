import React from "react";
import { useSelector } from "react-redux";
import DataTable from "../../components/dataTable";
import ImageGalleryViewer from "../../components/imageGalery/imageGalery";

import "./dataSegmentasi.css";

export default function DataSegmentasi() {
  const showGalery = useSelector((state) => state.runnerConfig.showGalery);

  return (
    <div className="dataSegmentasi">
      <DataTable title={"Segmentasi"} />
      {showGalery ? <ImageGalleryViewer /> : null}
    </div>
  );
}
