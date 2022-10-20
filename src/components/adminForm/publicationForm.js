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
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  getPublicationList,
  postPublicationData,
  updatePublicationData,
} from "../../utils/api";
import { useDispatch } from "react-redux";
import {
  setErrCatch,
  setErrMessage,
  setErrSeverity,
} from "../../redux/runnerConfig";
import { toHeaderCase } from "js-convert-case";
import { Stack } from "@mui/system";
export default function PublicationForm() {
  const dispatch = useDispatch();
  const [researcherList, setPublicationList] = React.useState([]);
  const [mode, setMode] = React.useState("update");
  const cardTitle = (
    <Typography variant="h6" fontFamily={"Montserrat"} fontWeight={"bold"}>
      Modifikasi Data Publikasi
    </Typography>
  );

  const handleChange = (event) => {
    if (mode !== event.target.value) {
      console.log(event.target.value);
      setMode(event.target.value);
    }
  };

  const [requestBody, setRequestBody] = React.useState({
    id: "",
    name: "",
    link: "",
    description: "",
  });

  const loadData = () => {
    getPublicationList().then((res) => {
      if (res.count > 0) {
        setPublicationList(res.results);
        console.log(res.results);
      }
    });
  };

  React.useEffect(() => {
    loadData();
  }, []);

  React.useEffect(() => {
    researcherList.map((each) => {
      if (each.id === requestBody.id) {
        setRequestBody({
          ...requestBody,
          name: each.name,
          link: each.link,
          description: each.description,
        });
      }
    });
  }, [requestBody.id, researcherList]);

  async function handleUpdate() {
    await updatePublicationData(requestBody.id, requestBody).then((res) => {
      console.log(res.status, res.statusText);
      if (res.status === 200) {
        dispatch(setErrSeverity("success"));
        dispatch(
          setErrMessage(
            `Data ${toHeaderCase(requestBody.name)} Berhasil di Update`
          )
        );
        dispatch(setErrCatch(true));
        loadData();
      }
    });
  }

  async function handleCreate() {
    await postPublicationData(requestBody).then((res) => {
      console.log(res.status, res.statusText);
      if (res.status === 201) {
        dispatch(setErrSeverity("success"));
        dispatch(
          setErrMessage(
            `Data ${toHeaderCase(requestBody.name)} Berhasil di Buat`
          )
        );
        dispatch(setErrCatch(true));
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
          {mode === "update" ? (
            <>
              <Grid item xs={2}>
                <Typography fontFamily={"montserrat"}>
                  Pilih Publikasi
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <FormControl fullWidth>
                  <Select
                    value={requestBody.id}
                    onChange={(e) => {
                      setRequestBody({ ...requestBody, id: e.target.value });
                    }}
                  >
                    {researcherList.map((each) => (
                      <MenuItem
                        key={each.id}
                        value={each.id}
                        aria-label="Section"
                      >
                        {each.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </>
          ) : null}
          <Grid item xs={2}>
            <Typography fontFamily={"montserrat"}>Nama Publikasi</Typography>
          </Grid>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <TextField
                className="white soften"
                size="small"
                type="string"
                variant="outlined"
                value={requestBody.name}
                sx={{ marginBottom: 1 }}
                onChange={(e) =>
                  setRequestBody({ ...requestBody, name: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Typography fontFamily={"montserrat"}>Link Publikasi</Typography>
          </Grid>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <TextField
                className="white soften"
                size="small"
                multiline
                type="url"
                variant="outlined"
                value={requestBody.link}
                sx={{ marginBottom: 1 }}
                onChange={(e) =>
                  setRequestBody({
                    ...requestBody,
                    link: e.target.value,
                  })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Typography fontFamily={"montserrat"}>
              Deskripsi Publikasi
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
                value={requestBody.description}
                sx={{ marginBottom: 1 }}
                onChange={(e) =>
                  setRequestBody({
                    ...requestBody,
                    description: e.target.value,
                  })
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Stack spacing={2} direction={"row"}>
          <ToggleButtonGroup
            color="primary"
            value={mode}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="update">Update</ToggleButton>
            <ToggleButton value="create">Create</ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="contained"
            onClick={
              mode === "update"
                ? handleUpdate
                : mode === "create"
                ? handleCreate
                : null
            }
          >
            Terapkan
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
