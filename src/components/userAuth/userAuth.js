import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CssBaseline,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toHeaderCase } from "js-convert-case";
import "./userAuth.css";
import logo from "../../assets/Logo Horizontal Crop.png";
import { setApikey, setJwtToken } from "../../redux/userConfig";
import {
  setErrCatch,
  setErrMessage,
  setErrSeverity,
} from "../../redux/runnerConfig";
import {
  deleteAuthHeader,
  GenerateApiKey,
  jwtauthenticate,
} from "../../utils/api";
import { Box } from "@mui/system";

export default function LoginAndRegister({ page }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const apikey = useSelector((state) => state.userConfig.apikey);
  const [requestBody, setRequestBody] = React.useState({});

  React.useEffect(() => {
    deleteAuthHeader();
    window.localStorage.clear();
    window.sessionStorage.clear();
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", detectKeyDown);
    return () => document.removeEventListener("keydown", detectKeyDown);
  }, [requestBody]);

  async function detectKeyDown(e) {
    if (e.key === "Enter") page === "masuk" ? handleLogin() : handleRegister();
  }

  async function handleLogin() {
    jwtauthenticate(requestBody)
      .then((res) => {
        if (res.data.access) {
          dispatch(setJwtToken(res.data));
          navigate("../dashboard");
        }
      })
      .then(() => {
        if (!apikey || apikey === "")
          GenerateApiKey(requestBody).then((apikey) => {
            dispatch(setApikey(apikey?.token));
          });
      });
  }

  async function handleRegister() {
    deleteAuthHeader();
    Register(requestBody).then((response) => {
      if (response) {
        dispatch(setErrSeverity("success"));
        dispatch(setErrMessage(response.statusText));
        dispatch(setErrCatch(true));
        navigate("../masuk");
      }
    });
  }

  const Login = (
    <div>
      <FormControl sx={{ marginBottom: 1 }} fullWidth>
        <FormLabel>Username:</FormLabel>
        <TextField
          className="white soften"
          type="string"
          variant="outlined"
          placeholder="Masukkan Username"
          sx={{ marginBottom: 2 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, username: e.target.value })
          }
        />
        <FormLabel>Password:</FormLabel>
        <TextField
          className="white soften"
          type="password"
          placeholder="Masukkan Password"
          variant="outlined"
          onChange={(e) =>
            setRequestBody({ ...requestBody, password: e.target.value })
          }
        />
      </FormControl>
    </div>
  );

  const Register = (
    <div>
      <FormControl sx={{ marginBottom: 1 }} fullWidth>
        <FormLabel>Username</FormLabel>
        <TextField
          className="white soften"
          size="small"
          type="string"
          variant="outlined"
          placeholder="Masukkan Username"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, username: e.target.value })
          }
        />
        <FormLabel>Name</FormLabel>
        <TextField
          className="white soften"
          size="small"
          type="string"
          placeholder="Masukkan Nama"
          variant="outlined"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, full_name: e.target.value })
          }
        />
        <FormLabel>Institusi</FormLabel>
        <TextField
          className="white soften"
          size="small"
          type="string"
          placeholder="Masukkan Asal Institusi"
          variant="outlined"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, institution: e.target.value })
          }
        />
        <FormLabel>Email</FormLabel>
        <TextField
          className="white soften"
          size="small"
          type="email"
          placeholder="Masukkan Email"
          variant="outlined"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, email: e.target.value })
          }
        />
        <FormLabel>Password</FormLabel>
        <TextField
          className="white soften"
          size="small"
          type="password"
          placeholder="Masukkan Password"
          variant="outlined"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, password: e.target.value })
          }
        />
        <TextField
          className="white soften"
          size="small"
          type="password"
          placeholder="Validasi Password"
          variant="outlined"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, password2: e.target.value })
          }
        />
      </FormControl>
    </div>
  );

  const cardTitle = (
    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
      {toHeaderCase(page)}
    </Typography>
  );

  return (
    <Box
      className="flex-container"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <CssBaseline />
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Card sx={{ maxWidth: 400, height: "content", p: 1 }}>
            <CardMedia
              component="img"
              height="150"
              image={logo}
              alt="3DVT Logo"
              sx={{ pt: 5, pb: 3, paddingX: 7 }}
            />
            <CardHeader
              sx={{
                backgroundColor: "white",
                color: "black",
                p: 0,
                m: 0,
              }}
              align="center"
              title={cardTitle}
            />
            <CardContent>{page === "masuk" ? Login : Register}</CardContent>
            <CardActions sx={{ justifyContent: "center", paddingBottom: 3 }}>
              <Button
                variant="contained"
                onClick={page === "masuk" ? handleLogin : handleRegister}
                onKeyDown={detectKeyDown}
                sx={{
                  width: "90%",
                  backgroundColor: "#0148A9",
                  paddingX: 3,
                  paddingBottom: 1,
                  align: "center",
                }}
              >
                {toHeaderCase(page)}
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <div className="center-text">
            {page === "masuk" ? (
              <p>
                Belum punya akun?{" "}
                <Link className="linkText" to="/daftar">
                  Daftar di sini
                </Link>
              </p>
            ) : (
              <p>
                Sudah punya akun?{" "}
                <Link className="linkText" to="/masuk">
                  Masuk di sini
                </Link>
              </p>
            )}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
