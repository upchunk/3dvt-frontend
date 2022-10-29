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
import { useNavigate } from "react-router-dom";
import { toHeaderCase } from "js-convert-case";
import "./userAuth.css";
import logo from "../../assets/Logo Horizontal Crop.png";
import {
  setErrCatch,
  setErrMessage,
  setErrSeverity,
} from "../../redux/runnerConfig";
import { ChangePassword } from "../../utils/api";
import { Box } from "@mui/system";

const defaultRequestBody = {
  old_password: "",
  password: "",
  password2: "",
};

export default function ChangeUserPassword({ page }) {
  const userid = useSelector((state) => state.userConfig.userid);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [requestBody, setRequestBody] = React.useState(defaultRequestBody);

  async function handlePasswordChange() {
    ChangePassword(userid, requestBody).then((response) => {
      if (response.status === 200) {
        console.log("response : " + JSON.stringify(response));
        dispatch(setErrSeverity("success"));
        dispatch(setErrMessage("Passwor anda berhasil dirubah"));
        dispatch(setErrCatch(true));
        navigate("../masuk");
      }
    });
  }

  const changePasswordForm = (
    <div>
      <FormControl sx={{ marginBottom: 1 }} fullWidth>
        <FormLabel>Password Lama</FormLabel>
        <TextField
          className="white soften"
          size="small"
          type="password"
          placeholder="Masukkan Password Lama"
          variant="outlined"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, old_password: e.target.value })
          }
        />
        <FormLabel>Password</FormLabel>
        <TextField
          className="white soften"
          size="small"
          type="password"
          placeholder="Masukkan Password Baru"
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
          placeholder="Validasi Password Baru"
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
            <CardContent>{changePasswordForm}</CardContent>
            <CardActions sx={{ justifyContent: "center", paddingBottom: 3 }}>
              <Button
                variant="contained"
                onClick={handlePasswordChange}
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
      </Grid>
    </Box>
  );
}
