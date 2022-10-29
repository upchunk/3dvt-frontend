import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
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
  updateUserData,
  updateUserDataJSON,
} from "../../utils/api";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrCatch,
  setErrMessage,
  setErrSeverity,
  setViewUserDetail,
} from "../../redux/runnerConfig";
import { toHeaderCase } from "js-convert-case";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

export default function UserDetailForm() {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.runnerConfig.userDetail);
  const [avatar, setAvatar] = React.useState(null);
  const [imageURL, setImageURL] = React.useState("");
  const [mode, setMode] = React.useState("update");
  const cardTitle = (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Typography
        variant="h5"
        fontWeight={"bold"}
        fontFamily={"montserrat"}
        p={1}
      >
        User Detail
      </Typography>
      <Button
        variant="contained"
        size="small"
        onClick={() => {
          dispatch(setViewUserDetail(false));
        }}
      >
        Tutup
      </Button>
    </Stack>
  );

  let formData = new FormData();

  const defaultBody = {
    id: "",
    username: "",
    full_name: "",
    email: "",
    avatar: "",
    institution: "",
    is_staff: "",
    is_active: "",
    date_joined: "",
    last_login: "",
    apikey: "",
  };

  const [requestBody, setRequestBody] = React.useState(defaultBody);

  React.useEffect(() => {
    setRequestBody({ ...requestBody, ...userDetail });
  }, [userDetail]);

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

  async function handleUpdate() {
    formData.append("name", requestBody.name);
    if (avatar !== null) formData.append("avatar", avatar, avatar.name);
    if (requestBody.link !== null && requestBody.link !== "")
      formData.append("link", requestBody.link);
    formData.append("kwargs", JSON.stringify(requestBody.kwargs));
    await updateUserData(requestBody.id, formData).then((res) => {
      if (res.status === 200) {
        dispatch(setErrSeverity("success"));
        dispatch(
          setErrMessage(
            `Data ${toHeaderCase(requestBody.name)} Berhasil di Update`
          )
        );
        dispatch(setErrCatch(true));
      }
    });
  }

  async function handleDelete() {
    await deleteResearcherData(requestBody.id).then((res) => {
      if (res.status === 204) {
        dispatch(setErrSeverity("success"));
        dispatch(
          setErrMessage(
            `Data ${toHeaderCase(requestBody.username)} Berhasil di Hapus`
          )
        );
        dispatch(setErrCatch(true));
      }
    });
  }

  async function deleteAvatar() {
    setAvatar(null);
    setRequestBody({ ...requestBody, avatar: null });
    const data = {
      avatar: null,
    };
    await updateUserDataJSON(requestBody.id, data).then((res) => {
      if (res.status === 200) {
        dispatch(setErrSeverity("success"));
        dispatch(
          setErrMessage(
            `Data ${toHeaderCase(requestBody.id)} Berhasil di Update`
          )
        );
        dispatch(setErrCatch(true));
        setRequestBody({ ...requestBody, defaultBody });
      }
    });
  }

  return (
    <Card sx={{ p: 1 }}>
      {cardTitle}
      <CardContent>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <>
            <Grid item xs={2}>
              <Typography fontFamily={"montserrat"}>Username</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <TextField
                  className="white soften"
                  size="small"
                  type="string"
                  variant="outlined"
                  value={requestBody.username}
                  sx={{ marginBottom: 1 }}
                  onChange={(e) =>
                    setRequestBody({ ...requestBody, username: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Typography fontFamily={"montserrat"}>Nama Lengkap</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <TextField
                  className="white soften"
                  size="small"
                  type="string"
                  variant="outlined"
                  value={requestBody.full_name}
                  sx={{ marginBottom: 1 }}
                  onChange={(e) =>
                    setRequestBody({
                      ...requestBody,
                      full_name: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Typography fontFamily={"montserrat"}>Email</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <TextField
                  className="white soften"
                  size="small"
                  type="email"
                  variant="outlined"
                  value={requestBody.email}
                  sx={{ marginBottom: 1 }}
                  onChange={(e) =>
                    setRequestBody({
                      ...requestBody,
                      email: e.target.value,
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
              <Typography fontFamily={"montserrat"}>Institusi</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <TextField
                  className="white soften"
                  size="small"
                  type="string"
                  variant="outlined"
                  value={requestBody.institution}
                  sx={{ marginBottom: 1 }}
                  onChange={(e) =>
                    setRequestBody({
                      ...requestBody,
                      institution: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={2} direction={"column"}>
              <Typography fontFamily={"montserrat"}>Staff</Typography>
            </Grid>
            <Grid item xs={4} direction={"column"}>
              <FormControl>
                <Select
                  value={requestBody.is_staff}
                  onChange={(e) => {
                    setRequestBody({
                      ...requestBody,
                      is_staff: e.target.value,
                    });
                  }}
                >
                  <MenuItem value={true}>Ya</MenuItem>
                  <MenuItem value={false}>Tidak</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2} direction={"column"}>
              <Typography fontFamily={"montserrat"}>Aktif</Typography>
            </Grid>
            <Grid item xs={4} direction={"column"}>
              <FormControl>
                <Select
                  value={requestBody.is_active}
                  onChange={(e) => {
                    setRequestBody({
                      ...requestBody,
                      is_active: e.target.value,
                    });
                  }}
                >
                  <MenuItem value={true}>Ya</MenuItem>
                  <MenuItem value={false}>Tidak</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Typography fontFamily={"montserrat"}>
                Tanggal Registrasi
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <TextField
                  className="white soften"
                  size="small"
                  disabled
                  type="datetime-local"
                  variant="outlined"
                  value={requestBody.date_joined.slice(0, 16)}
                  sx={{ marginBottom: 1 }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Typography fontFamily={"montserrat"}>Login Terakhir</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <TextField
                  className="white soften"
                  size="small"
                  disabled
                  type="datetime-local"
                  variant="outlined"
                  value={requestBody.last_login.slice(0, 16)}
                  sx={{ marginBottom: 1 }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Typography fontFamily={"montserrat"}>API Key</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <TextField
                  className="white soften"
                  size="small"
                  disabled
                  type="string"
                  variant="outlined"
                  value={requestBody.apikey}
                  sx={{ marginBottom: 1 }}
                />
              </FormControl>
            </Grid>
          </>
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
            onClick={mode === "update" ? handleUpdate : handleDelete}
          >
            Terapkan
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
