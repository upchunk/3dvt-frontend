import React, { useEffect, useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toHeaderCase } from "js-convert-case";
import "./userAuth.css";
import logo from "../../assets/Logo Horizontal Crop.png";
import * as api from "../../utils/api";
import { setApikey, setJwtToken } from "../../redux/userConfig";
import {
  setErrCatch,
  setErrMessage,
  setErrSeverity,
} from "../../redux/runnerConfig";
import Card from "../common/card/card";

export default function LoginAndRegister({ page }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const apikey = useSelector((state) => state.userConfig.apikey);
  const [requestBody, setRequestBody] = useState({});

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown);
    return () => document.removeEventListener("keydown", detectKeyDown);
  }, []);

  const detectKeyDown = (e) => {
    if (e.key === "Enter") {
      if (page === "masuk" && requestBody) {
        handleLogin();
      } else if (requestBody) handleRegister();
    }
  };

  async function handleLogin() {
    api
      .jwtauthenticate(requestBody)
      .then((res) => {
        if (res.data.access) {
          dispatch(setJwtToken(res.data));
          navigate("../");
        }
      })
      .then(() => {
        if (!apikey || apikey === "")
          api.GenerateApiKey(requestBody).then((apikey) => {
            dispatch(setApikey(apikey?.token));
          });
      });
  }

  async function handleRegister() {
    api.deleteAuthHeader();
    api.Register(requestBody).then((response) => {
      if (response) {
        dispatch(setErrSeverity("success"));
        dispatch(setErrMessage(response.statusText));
        dispatch(setErrCatch(true));
        navigate("../masuk");
      }
    });
  }

  const Login = (
    <>
      <FormControl sx={{ marginBottom: 1 }} fullWidth>
        <TextField
          className="white soften"
          type="string"
          variant="outlined"
          placeholder="Username"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, username: e.target.value })
          }
        />
        <TextField
          className="white soften"
          type="password"
          placeholder="Password"
          variant="outlined"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, password: e.target.value })
          }
        />
      </FormControl>
    </>
  );

  const Register = (
    <div>
      <FormControl sx={{ marginBottom: 1 }} fullWidth>
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
        <TextField
          className="white soften"
          size="small"
          type="string"
          placeholder="Masukkan Institusi"
          variant="outlined"
          sx={{ marginBottom: 1 }}
          onChange={(e) =>
            setRequestBody({ ...requestBody, institution: e.target.value })
          }
        />
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

  return (
    <>
      <Card className="wrapcard">
        <img src={logo} alt="3DVT" className="logo"></img>
        <div>
          <span>
            <h3 className="headerFont">{toHeaderCase(page)} </h3>
          </span>
          {page === "masuk" ? Login : Register}
          <div className="reversed-row">
            <Button
              variant="contained"
              onClick={page === "masuk" ? handleLogin : handleRegister}
              onKeyDown={detectKeyDown}
              sx={{ mt: 1, mb: 1, width: "100%", backgroundColor: "#0148A9" }}
            >
              {toHeaderCase(page)}
            </Button>
          </div>
        </div>
      </Card>
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
    </>
  );
}
