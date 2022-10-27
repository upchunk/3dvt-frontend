import React from "react";
import "./imageGalery.css";
import ImageGallery from "react-image-gallery";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setResultImages,
  setShowGalery,
  setSourceImages,
} from "../../redux/runnerConfig";

export default function ImageGalleryViewer() {
  const source = useSelector((state) => state.runnerConfig.sourceImages);
  const result = useSelector((state) => state.runnerConfig.resultImages);
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(setSourceImages([]));
    dispatch(setResultImages([]));
    dispatch(setShowGalery(false));
  }

  return (
    <Card sx={{ p: 3, mt: 2 }}>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button variant="contained" size="small" onClick={() => handleClose()}>
          Tutup
        </Button>
      </Box>

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
