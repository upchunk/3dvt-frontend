import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import Rekonstruksi3d from "./pages/rekonstruksi3d/rekonstruksi3d";
import Feedback from "./pages/feedback/feedback";
import PersistentDrawerLeft from "./components/navigation/navigation";
import Pengaturan from "./pages/pengaturan/pengaturan";
import DataSegmentasi from "./pages/dataSegmentasi/dataSegmentasi";
import DataRekonstruksi from "./pages/dataRekonstruksi/dataRekonstruksi";
import User from "./pages/user/user";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, newRefreshToken, setDefaultToken } from "./utils/api";
import {
  setAuth,
  setJwtToken,
  setLoading,
  setUserData,
} from "./redux/userConfig";
import AuthPage from "./pages/authPage/authPage";
import Snackbars from "./components/snackbar";
import PrivateWrapper from "./utils/PrivateWrapper";
import Segmentasi from "./pages/segmentasi/segmentasi";
import Landing from "./pages/landing/landing";
import TopAppBar from "./components/appbar/appbar";
import LamanAdmin from "./pages/adminPage/adminPage";

export default function App() {
  const userid = useSelector((state) => state.userConfig.userid);
  const jwtToken = useSelector((state) => state.userConfig.jwtToken);
  const refreshToken = useSelector((state) => state.userConfig.refreshToken);
  const accessToken = useSelector((state) => state.userConfig.accessToken);
  const dispatch = useDispatch();

  function updateToken() {
    if (refreshToken && refreshToken !== "")
      newRefreshToken(refreshToken).then((token) => {
        dispatch(setJwtToken(token));
      });
  }

  useEffect(() => {
    if (accessToken && accessToken !== "")
      setDefaultToken(accessToken).catch(() => dispatch(setAuth(false)));
  }, [accessToken]);

  useEffect(() => {
    let delay = 1000 * 60 * 29; // 29Min Delay
    let interval = setInterval(() => {
      updateToken();
    }, delay);
    return () => clearInterval(interval);
  }, [jwtToken]);

  useEffect(() => {
    if (userid)
      getUserInfo(userid).then((res) => {
        dispatch(setUserData(res?.data));
        dispatch(setLoading(false));
      });
  }, [userid]);

  return (
    <>
      <Snackbars />
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateWrapper />}>
            <Route element={<PersistentDrawerLeft />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/segmentasi" element={<Segmentasi />} />
              <Route path="/segmentasi/data" element={<DataSegmentasi />} />
              <Route path="/rekonstruksi" element={<Rekonstruksi3d />} />
              <Route path="/rekonstruksi/data" element={<DataRekonstruksi />} />
              <Route path="/saran" element={<Feedback />} />
              <Route path="/pengaturan" element={<Pengaturan />} />
              <Route path="/user" element={<User />} />
              <Route path="/edit-landing-page" element={<LamanAdmin />} />
            </Route>
          </Route>
          <Route element={<TopAppBar />}>
            <Route path="/" element={<Landing />} />
          </Route>
          <Route path="/masuk" element={<AuthPage page={"masuk"} />} exact />
          <Route path="/daftar" element={<AuthPage page={"daftar"} />} exact />
        </Routes>
      </BrowserRouter>
    </>
  );
}
