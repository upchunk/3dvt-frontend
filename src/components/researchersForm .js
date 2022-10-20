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
import { getResearcherList, updateResearcherData } from "../utils/api";
import { Stack } from "@mui/system";
import { MuiFileInput } from "mui-file-input";
import { useDispatch } from "react-redux";
import {
  setErrCatch,
  setErrMessage,
  setErrSeverity,
} from "../redux/runnerConfig";
import { toHeaderCase } from "js-convert-case";
export default function ResearchersForm() {
  const dispatch = useDispatch();
  const [researcherList, setResearcherList] = React.useState([]);
  const [avatar, setAvatar] = React.useState(null);
  const cardTitle = (
    <Typography variant="h6" fontFamily={"Montserrat"} fontWeight={"bold"}>
      Modifikasi Data Peneliti
    </Typography>
  );

  let formData = new FormData();

  const [requestBody, setRequestBody] = React.useState({
    id: "",
    name: "",
    link: "",
    avatar: "",
    kwargs: "",
  });

  const handleAvatar = (img) => {
    setAvatar(img);
    console.log(img);
  };

  const loadData = () => {
    getResearcherList().then((res) => {
      if (res.count > 0) {
        setResearcherList(res.results);
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
                  <MenuItem key={each.id} value={each.id} aria-label="Section">
                    {each.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {requestBody.name !== "" ? (
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
            </>
          ) : null}
          {requestBody.link !== "" ? (
            <>
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
            </>
          ) : null}
          {requestBody.avatar !== "" ? (
            <>
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

                  <MuiFileInput
                    label={"Input Gambar"}
                    value={avatar}
                    fullWidth
                    helperText={"Masukkan Gambar disini"}
                    onChange={handleAvatar}
                  />
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
        {requestBody.id !== "" ? (
          <Button variant="contained" onClick={handleUpdate}>
            Terapkan
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
}
