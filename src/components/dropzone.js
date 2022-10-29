import React from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { getSegmentasi, postRekonstruksi, postSegmentasi } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrCatch,
  setErrMessage,
  setErrSeverity,
  setModel,
  setResultImages,
  // setResultImages,
  setShowGalery,
  setShowModel,
  setSourceImages,
  // setSourceImages,
} from "../redux/runnerConfig";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  height: "200px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "gray",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "gray",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function StyledDropzone({ type }) {
  if (!type) type = "segmentasi";

  const fileType = type === "segmentasi" ? { accept: { "image/*": [] } } : {};
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone(fileType);
  const [modelIndex, setModelIndex] = React.useState(0);
  const userid = useSelector((state) => state.userConfig.userid);
  const models = ["model_tesis_epoch20_sz448.hdf5"];
  const dispatch = useDispatch();

  function getExtension(filename) {
    const parts = filename.split(".");
    return parts[parts.length - 1];
  }

  let formData = new FormData();

  const cardTitle = (
    <Typography
      variant="h5"
      fontWeight={"bold"}
      fontFamily={"montserrat"}
      p={1}
    >
      {type === "segmentasi"
        ? "Buat Projek Segmentasi Baru"
        : "Buat Projek Rekonstruksi Baru"}
    </Typography>
  );

  const files =
    type === "segmentasi"
      ? acceptedFiles.map((file) => <li key={file.path}>{file.path}</li>)
      : acceptedFiles.map((file, index) =>
          index === 0 ? <li key={file.path}>{file.path}</li> : null
        );

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  async function handleSegmentasi() {
    if (acceptedFiles.length > 0) {
      dispatch(setShowGalery(false));
      formData.append("user", userid);
      formData.append("model", models[modelIndex]);
      acceptedFiles.map((file) => {
        formData.append("images", file, file.name);
      });

      postSegmentasi(formData).then((res) => {
        getSegmentasi(res.task_data.id).then((response) => {
          const soureList = [];
          const resultList = [];
          response.data.images.forEach((image) => {
            soureList.push({
              original: image.images,
              originalHeight: 448,
              originalWidth: 448,
            });
            resultList.push({
              original: image.result,
              originalHeight: 448,
              originalWidth: 448,
            });
          });
          dispatch(setSourceImages(soureList));
          dispatch(setResultImages(resultList));
          dispatch(setShowGalery(true));
        });
      });
    }
  }

  async function handleRekonstruksi() {
    if (acceptedFiles.length > 0) {
      dispatch(setShowGalery(false));
      formData.append("user", userid);
      formData.append("model", models[modelIndex]);
      formData.append("files", acceptedFiles[0], acceptedFiles[0].name);
      const ext = getExtension(acceptedFiles[0].name);
      if (ext === "gltf" || ext === "obj") {
        postRekonstruksi(formData);
        dispatch(setModel(URL.createObjectURL(acceptedFiles[0])));
        dispatch(setShowModel(true));
      } else {
        dispatch(setErrSeverity("error"));
        dispatch(
          setErrMessage("File ini tidak didukung >> " + acceptedFiles[0].name)
        );
        dispatch(setErrCatch(true));
      }
    }
  }

  return (
    <Card sx={{ p: 1 }}>
      {cardTitle}
      {type === "segmentasi" ? (
        <CardContent>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid item xs={2}>
              <Typography fontFamily={"montserrat"}>Model:</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <Select
                  value={modelIndex}
                  onChange={(e) => setModelIndex(e.target.value)}
                >
                  {models.map((each, index) => (
                    <MenuItem key={index} value={index}>
                      {each}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      ) : null}
      <CardContent>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid item xs={2}>
            <Typography fontFamily={"montserrat"}>
              {type === "segmentasi"
                ? "Lampirkan Gambar :"
                : "Lampirkan File (.gltf)"}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <div className="container">
              <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <CloudUploadIcon fontSize="large" />
                <p>{"Tarik dan lepas file disini untuk mengunggah"}</p>
              </div>
            </div>
            {files.length !== 0 ? (
              <aside>
                <Typography mt={1}>Files: </Typography>
                <Typography component={"ul"} ml={3}>
                  {files}
                </Typography>
              </aside>
            ) : null}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {type === "segmentasi" ? (
          <Button onClick={handleSegmentasi} variant="contained">
            Jalankan
          </Button>
        ) : (
          <Button onClick={handleRekonstruksi} variant="contained">
            Jalankan
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
