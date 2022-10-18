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
export default function LandingPageForm() {
  const [sectionList, setSectionList] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [sectionData, setSectionData] = React.useState({});
  const cardTitle = (
    <Typography variant="h6" fontFamily={"Montserrat"} fontWeight={"bold"}>
      Modifikasi Landing Page
    </Typography>
  );

  const [requestBody, setRequestBody] = React.useState({
    section: "",
    title: "",
    content: "",
    image: "",
    kwargs: {},
  });

  React.useEffect(() => {
    getSectionList().then((res) => {
      if (res.count > 0) {
        setSectionList(res.results);
      }
    });
  }, []);

  React.useEffect(() => {
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
  }, [requestBody.section]);

  async function handleUpdate() {
    await updateSectionData(requestBody.section, requestBody).then((res) => {
      console.log(res.status, res.statusText);
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
                  <MenuItem key={each.section} value={each.section}>
                    {each.section}
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
          {requestBody.image !== null ? (
            <>
              <Grid item xs={2}>
                <Typography fontFamily={"montserrat"}>Gambar</Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControl fullWidth>
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
                    <TextField
                      fullWidth
                      className="white soften"
                      multiline
                      size="small"
                      type="string"
                      variant="outlined"
                      value={requestBody.image}
                      sx={{ marginBottom: 1 }}
                      onChange={(e) =>
                        setRequestBody({
                          ...requestBody,
                          image: e.target.value,
                        })
                      }
                    />
                  </Stack>
                </FormControl>
              </Grid>
            </>
          ) : null}
          {requestBody.kwargs !== null ? (
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
        <Button variant="contained" onClick={handleUpdate}>
          Terapkan
        </Button>
      </CardActions>
    </Card>
  );
}
