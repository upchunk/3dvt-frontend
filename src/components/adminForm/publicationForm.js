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
  deletePublicationData,
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
  const [publicationList, setPublicationList] = React.useState([]);
  const [mode, setMode] = React.useState("update");
  const cardTitle = (
    <Typography variant="h6" fontFamily={"Montserrat"} fontWeight={"bold"}>
      Modifikasi Data Publikasi
    </Typography>
  );

  const defaultBody = {
    id: "",
    name: "",
    link: "",
    description: "",
  };

  const [requestBody, setRequestBody] = React.useState({
    id: "",
    name: "",
    link: "",
    description: "",
  });

  const handleChange = (event) => {
    if (mode !== event.target.value) {
      setRequestBody({ ...requestBody, ...defaultBody });
      setMode(event.target.value);
    }
  };

  const loadData = () => {
    getPublicationList().then((res) => {
      if (res.count > 0) {
        setPublicationList(res.results);
      }
    });
  };

  React.useEffect(() => {
    loadData();
  }, []);

  React.useEffect(() => {
    publicationList.map((each) => {
      if (each.id === requestBody.id) {
        setRequestBody({
          ...requestBody,
          id: each.id,
          name: each.name,
          link: each.link,
          description: each.description,
        });
      }
    });
  }, [requestBody.id, publicationList]);

  async function handleUpdate() {
    await updatePublicationData(requestBody.id, requestBody).then((res) => {
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

  async function handleDelete() {
    await deletePublicationData(requestBody.id).then((res) => {
      if (res.status === 204) {
        dispatch(setErrSeverity("success"));
        dispatch(
          setErrMessage(
            `Data ${toHeaderCase(requestBody.name)} Berhasil di Hapus`
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
          {mode === "create" ? null : (
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
                    {publicationList.map((each) => (
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
          )}
          {mode === "delete" ? null : (
            <>
              <Grid item xs={2}>
                <Typography fontFamily={"montserrat"}>
                  Nama Publikasi
                </Typography>
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
                <Typography fontFamily={"montserrat"}>
                  Link Publikasi
                </Typography>
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
            </>
          )}
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
            <ToggleButton
              value="create"
              sx={{
                "&:hover": {
                  color: "white",
                  backgroundColor: "#00c800",
                },
                "&.Mui-selected, &.Mui-selected:hover": {
                  color: "white",
                  backgroundColor: "#00c800",
                },
              }}
            >
              Create
            </ToggleButton>
            <ToggleButton
              value="delete"
              sx={{
                "&:hover": {
                  color: "white",
                  backgroundColor: "red",
                },
                "&.Mui-selected, &.Mui-selected:hover": {
                  color: "white",
                  backgroundColor: "red",
                },
              }}
            >
              Delete
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="contained"
            onClick={
              mode === "update"
                ? handleUpdate
                : mode === "create"
                ? handleCreate
                : handleDelete
            }
          >
            Terapkan
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
