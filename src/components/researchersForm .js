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
import { getSectionList, updateSectionData } from "../utils/api";
import { Stack } from "@mui/system";
import { MuiFileInput } from "mui-file-input";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../redux/userConfig";
export default function ResearchersForm() {
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.userConfig.reload);
  const [sectionList, setSectionList] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const cardTitle = (
    <Typography variant="h6" fontFamily={"Montserrat"} fontWeight={"bold"}>
      Modifikasi Data Researcher
    </Typography>
  );

  let formData = new FormData();

  const [requestBody, setRequestBody] = React.useState({
    section: "",
    title: "",
    content: "",
    image: "",
    kwargs: "",
  });

  const handleImage = (img) => {
    setImage(img);
    console.log(img);
  };

  const loadData = () => {
    if (reload)
      getSectionList()
        .then((res) => {
          if (res.count > 0) {
            setSectionList(res.results);
          }
        })
        .then(() => {
          dispatch(setReload(false));
        });
  };

  React.useEffect(() => {
    loadData();
  }, [reload]);

  React.useEffect(() => {
    console.log(requestBody.section);
    sectionList.map((each) => {
      if (each.section === requestBody.section) {
        setRequestBody({
          ...requestBody,
          title: each.title,
          content: each.content,
          image: each.image,
          kwargs: each.kwargs,
        });
      }
    });
  }, [requestBody.section, sectionList]);

  async function handleUpdate() {
    formData.append("section", requestBody.section);
    formData.append("title", requestBody.title);
    formData.append("image", image, image.name);
    formData.append("content", requestBody.content);
    formData.append("kwargs", JSON.stringify(requestBody.kwargs));
    await updateSectionData(requestBody.section, formData).then((res) => {
      console.log(res.status, res.statusText);
      if (res.status === 200) dispatch(setReload(true));
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
                    {each.section}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {requestBody.title && requestBody.title !== "" ? (
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
          {requestBody.content && requestBody.content !== "" ? (
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
          {requestBody.image && requestBody.image !== "" ? (
            <>
              <Grid item xs={2}>
                <Typography fontFamily={"montserrat"}>Gambar</Typography>
              </Grid>
              <Grid item xs={10}>
                <Stack
                  direction={"row"}
                  spacing={{ xs: 2, md: 4 }}
                  alignItems="center"
                  justifyContent="space-around"
                >
                  <img
                    width="200px"
                    src={requestBody.image}
                    alt="Image Preview"
                  />
                  <MuiFileInput
                    label={"Input Gambar"}
                    value={image}
                    helperText={"Masukkan Gambar disini"}
                    onChange={handleImage}
                  />
                </Stack>
              </Grid>
            </>
          ) : null}
          {requestBody.kwargs && requestBody.kwargs !== "" ? (
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
        {requestBody.section && requestBody.section !== "" ? (
          <Button variant="contained" onClick={handleUpdate}>
            Terapkan
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
}