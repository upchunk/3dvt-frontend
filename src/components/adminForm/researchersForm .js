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
  deleteResearcherData,
  getResearcherList,
  postResearcherData,
  updateResearcherData,
  updateResearcherDataJSON,
} from "../../utils/api";
import { Stack } from "@mui/system";
import { useDispatch } from "react-redux";
import {
  setErrCatch,
  setErrMessage,
  setErrSeverity,
} from "../../redux/runnerConfig";
import { toHeaderCase } from "js-convert-case";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

export default function ResearchersForm() {
  const dispatch = useDispatch();
  const [researcherList, setResearcherList] = React.useState([]);
  const [avatar, setAvatar] = React.useState(null);
  const [imageURL, setImageURL] = React.useState("");
  const [mode, setMode] = React.useState("update");
  const cardTitle = (
    <Typography variant="h6" fontFamily={"Montserrat"} fontWeight={"bold"}>
      Modifikasi Data Peneliti
    </Typography>
  );

  let formData = new FormData();

  const defaultBody = {
    id: "",
    name: "",
    link: "",
    avatar: "",
    kwargs: "",
  };

  const [requestBody, setRequestBody] = React.useState(defaultBody);

  const handleChange = (event) => {
    if (mode !== event.target.value) {
      setRequestBody({ ...requestBody, ...defaultBody });
      setMode(event.target.value);
    }
  };

  const handleAvatar = (e) => {
    setAvatar(e.target.files[0]);
    setImageURL(URL.createObjectURL(e.target.files[0]));
  };

  const emptyAvatar = () => {
    setAvatar(null);
    setImageURL(null);
  };

  const loadData = () => {
    getResearcherList()
      .then((res) => {
        if (res.count > 0) {
          setResearcherList(res.results);
        }
      })
      .then(() => {
        emptyAvatar();
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
          id: each.id,
          name: each.name,
          link: each.link,
          avatar: each.avatar,
          kwargs: each.kwargs,
        });
      }
    });
  }, [requestBody.id, researcherList]);

  async function handleUpdate() {
    formData.append("name", requestBody.name);
    if (avatar !== null) formData.append("avatar", avatar, avatar.name);
    if (requestBody.link !== null && requestBody.link !== "")
      formData.append("link", requestBody.link);
    formData.append("kwargs", JSON.stringify(requestBody.kwargs));
    await updateResearcherData(requestBody.id, formData).then((res) => {
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
    formData.append("name", requestBody.name);
    if (avatar !== null) formData.append("avatar", avatar, avatar.name);
    if (requestBody.link !== null && requestBody.link !== "")
      formData.append("link", requestBody.link);
    formData.append("kwargs", JSON.stringify(requestBody.kwargs));
    await postResearcherData(formData).then((res) => {
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
    await deleteResearcherData(requestBody.id).then((res) => {
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

  async function deleteAvatar() {
    setAvatar(null);
    setRequestBody({ ...requestBody, avatar: null });
    const data = {
      avatar: null,
    };
    await updateResearcherDataJSON(requestBody.id, data).then((res) => {
      if (res.status === 200) {
        dispatch(setErrSeverity("success"));
        dispatch(
          setErrMessage(
            `Data ${toHeaderCase(requestBody.id)} Berhasil di Update`
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
          {mode === "create" ? null : (
            <>
              <Grid item xs={2}>
                <Typography fontFamily={"montserrat"}>
                  Pilih Dosen / Peneliti
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
          )}
          {mode === "delete" ? null : (
            <>
              <Grid item xs={2}>
                <Typography fontFamily={"montserrat"}>
                  Nama Dosen / Peneliti
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
                  Link Profile / Akun ITS
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
                <Typography fontFamily={"montserrat"}>Avatar</Typography>
              </Grid>
              <Grid item xs={10}>
                <Stack
                  direction={"row"}
                  spacing={{ xs: 2, md: 4 }}
                  alignItems="center"
                >
                  {requestBody.avatar ? (
                    <img width="200px" src={requestBody.avatar} alt="Avatar" />
                  ) : null}
                  {avatar ? (
                    <>
                      <DoubleArrowIcon fontSize="large" />
                      <img width="200px" src={imageURL} alt="Avatar" />
                      <Button
                        variant="contained"
                        component="label"
                        onClick={emptyAvatar}
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
                    <Stack spacing={1}>
                      <Button variant="contained" component="label">
                        Pilih Avatar Baru
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={handleAvatar}
                        />
                      </Button>
                      <Button
                        variant="contained"
                        component="label"
                        onClick={deleteAvatar}
                      >
                        Hapus Avatar
                      </Button>
                    </Stack>
                  )}
                </Stack>
              </Grid>
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
                    value={requestBody.kwargs}
                    sx={{ marginBottom: 1 }}
                    onChange={(e) =>
                      setRequestBody({
                        ...requestBody,
                        kwargs: e.target.value,
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
