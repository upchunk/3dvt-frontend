import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { getSectionList, updateSectionData } from "../../utils/api";
import { Stack } from "@mui/system";
import { useDispatch } from "react-redux";
import {
  setErrCatch,
  setErrMessage,
  setErrSeverity,
} from "../../redux/runnerConfig";
import { toHeaderCase } from "js-convert-case";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

export default function LandingPageSectionForm() {
  const [sectionList, setSectionList] = React.useState([]);
  const [imageURL, setImageURL] = React.useState("");
  const [image, setImage] = React.useState(null);
  const dispatch = useDispatch();
  const cardTitle = (
    <Typography variant="h6" fontFamily={"Montserrat"} fontWeight={"bold"}>
      Modifikasi Landing Page
    </Typography>
  );

  let formData = new FormData();

  const defaultBody = {
    title: "",
    content: "",
    image: "",
    kwargs: "",
  };

  const [requestBody, setRequestBody] = React.useState({
    section: "",
    title: "",
    content: "",
    image: "",
    kwargs: "",
  });

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setImageURL(URL.createObjectURL(e.target.files[0]));
  };

  const emptyImage = () => {
    setImage(null);
    setImageURL(null);
  };

  async function loadData() {
    getSectionList()
      .then((res) => {
        if (res.count > 0) {
          setSectionList(res.results);
        }
      })
      .then(() => {
        emptyImage();
      });
  }

  React.useEffect(() => {
    loadData();
  }, []);

  React.useEffect(() => {
    sectionList.map((each) => {
      if (each.section === requestBody.section) {
        setRequestBody({
          ...requestBody,
          section: each.section,
          title: each.title,
          content: each.content,
          image: each.image,
          kwargs: each.kwargs,
        });
      }
    });
  }, [requestBody.section, sectionList]);

  async function handleUpdate() {
    formData.append("title", requestBody.title);
    if (image !== null) formData.append("image", image, image.name);
    formData.append("content", requestBody.content);
    formData.append("kwargs", JSON.stringify(requestBody.kwargs));
    await updateSectionData(requestBody.section, formData).then((res) => {
      if (res.status === 200) {
        dispatch(setErrSeverity("success"));
        dispatch(
          setErrMessage(
            `Data ${toHeaderCase(requestBody.section)} Berhasil di Update`
          )
        );
        dispatch(setErrCatch(true));
        setRequestBody({ ...requestBody, defaultBody });
        loadData();
      }
    });
  }

  return (
    <Card sx={{ p: 3 }}>
      <CardHeader
        sx={{
          color: "black",
          size: "small",
          height: 0,
        }}
        title={cardTitle}
      ></CardHeader>
      <CardContent>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid item xs={2}>
            <Typography fontFamily={"montserrat"}>Pilih Section</Typography>
          </Grid>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <Select
                value={requestBody.section}
                onChange={(e) => {
                  setRequestBody({ ...requestBody, section: e.target.value });
                }}
              >
                {sectionList.map((each) => (
                  <MenuItem
                    key={each.section}
                    value={each.section}
                    aria-label="Section"
                  >
                    {each.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {requestBody.title !== "" ? (
            <>
              <Grid item xs={2}>
                <Typography fontFamily={"montserrat"}>Judul</Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControl fullWidth>
                  <TextField
                    className="white soften"
                    size="small"
                    type="string"
                    variant="outlined"
                    value={requestBody.title}
                    sx={{ marginBottom: 1 }}
                    onChange={(e) =>
                      setRequestBody({ ...requestBody, title: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>
            </>
          ) : null}
          {requestBody.content !== "" ? (
            <>
              <Grid item xs={2}>
                <Typography fontFamily={"montserrat"}>
                  Konten / Isi Paragraf
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControl fullWidth>
                  <TextField
                    className="white soften"
                    size="small"
                    multiline
                    type="string"
                    variant="outlined"
                    value={requestBody.content}
                    sx={{ marginBottom: 1 }}
                    onChange={(e) =>
                      setRequestBody({
                        ...requestBody,
                        content: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </Grid>
            </>
          ) : null}
          {requestBody.image !== "" ? (
            <>
              <Grid item xs={2}>
                <Typography fontFamily={"montserrat"}>Gambar</Typography>
              </Grid>
              <Grid item xs={10}>
                <Stack
                  direction={"row"}
                  spacing={{ xs: 2, md: 4 }}
                  alignItems="center"
                >
                  {requestBody.image ? (
                    <img
                      width="200px"
                      src={requestBody.image}
                      alt="Image Preview"
                    />
                  ) : null}
                  {image ? (
                    <>
                      <DoubleArrowIcon fontSize="large" />
                      <img width="200px" src={imageURL} alt="image" />
                      <Button
                        variant="contained"
                        component="label"
                        onClick={emptyImage}
                        sx={{
                          "&:hover": {
                            backgroundColor: "orange",
                          },
                        }}
                      >
                        Batalkan
                      </Button>
                    </>
                  ) : (
                    <Button variant="contained" component="label">
                      Pilih Gambar Baru
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleImage}
                      />
                    </Button>
                  )}
                </Stack>
              </Grid>
            </>
          ) : null}
          {requestBody.kwargs !== "" ? (
            <>
              <Grid item xs={2}>
                <Typography fontFamily={"montserrat"}>
                  Keyword Argument (JSON)
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControl fullWidth>
                  <TextField
                    className="white soften"
                    size="small"
                    multiline
                    type="string"
                    variant="outlined"
                    value={JSON.stringify(requestBody.kwargs, null, 2)}
                    sx={{ marginBottom: 1 }}
                    onChange={(e) =>
                      setRequestBody({
                        ...requestBody,
                        kwargs: JSON.parse(e.target.value),
                      })
                    }
                  />
                </FormControl>
              </Grid>
            </>
          ) : null}
        </Grid>
      </CardContent>

      <CardActions>
        {requestBody.section !== "" ? (
          <Button variant="contained" onClick={handleUpdate}>
            Terapkan
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
}
