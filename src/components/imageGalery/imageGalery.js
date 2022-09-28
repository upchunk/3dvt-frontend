import React from "react";
import "./imageGalery.css";
import ImageGallery from "react-image-gallery";
import { Card, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function ImageGalleryViewer() {
  const source = useSelector((state) => state.runnerConfig.sourceImages);
  const result = useSelector((state) => state.runnerConfig.resultImages);

  return (
    <Card sx={{ p: 3, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography
            align="center"
            pb={1}
            mb={1}
            fontFamily={"Montserrat"}
            fontWeight={"Bold"}
          >
            Citra Yang Dimasukkan
          </Typography>
          <ImageGallery
            lazyLoad={true}
            items={source}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets={true}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography
            align="center"
            pb={1}
            mb={1}
            fontFamily={"Montserrat"}
            fontWeight={"Bold"}
          >
            Citra Hasil Segmentasi
          </Typography>
          <ImageGallery
            lazyLoad={true}
            items={result}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets={true}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
