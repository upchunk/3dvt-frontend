import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import Segmentasi from "./pages/dataSegmentasi/dataSegmentasi";
import Rekonstruksi3d from "./pages/rekonstruksi3d/rekonstruksi3d";
import Feedback from "./pages/feedback/feedback";
import PersistentDrawerLeft from "./components/navigation/navigation";
import Pengaturan from "./pages/pengaturan/pengaturan";
import DataSegmentasi from "./pages/dataSegmentasi/dataSegmentasi";
import DataRekonstruksi from "./pages/dataRekonstruksi/dataRekonstruksi";
import User from "./pages/user/user";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "./utils/api";
import {
  setAuth,
  setGroupNames,
  setJwtToken,
  setUserData,
} from "./redux/userConfig";
import AuthPage from "./pages/authPage/authPage";
import Snackbars from "./components/snackbar/snackbar";
import * as api from "./utils/api";
import PrivateWrapper from "./utils/PrivateWrapper";

function App() {
  const userid = useSelector((state) => state.userConfig.userid);
  const jwtToken = useSelector((state) => state.userConfig.jwtToken);
  const refreshToken = useSelector((state) => state.userConfig.refreshToken);
  const accessToken = useSelector((state) => state.userConfig.accessToken);
  const userData = useSelector((state) => state.userConfig.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    api.setDefaultToken(accessToken).catch(() => dispatch(setAuth(false)));
  }, [jwtToken]);

  function updateToken() {
    if (refreshToken) {
      api.refreshToken(refreshToken).then((token) => {
        dispatch(setJwtToken(token));
      });
    }
  }

  useEffect(() => {
    let fourmin = 1000 * 60 * 4; // 1000ms (1s) * 60s (1m) * 4m
    let interval = setInterval(() => {
      updateToken();
    }, fourmin);
    return () => clearInterval(interval);
  }, [jwtToken]);

  useEffect(() => {
    var groupList = [];
    userData.groups?.forEach((id) =>
      api
        .getGroupInfo(id)
        .then((res) => {
          groupList.push(res.data.name);
        })
        .then(() => {
          dispatch(setGroupNames(groupList));
        })
    );
  }, [userData]);

  useEffect(() => {
    getUserInfo(userid).then((res) => {
      dispatch(setUserData(res.data));
    });
  }, [userid]);

  return (
    <>
      <Snackbars />
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateWrapper />}>
            <Route element={<PersistentDrawerLeft />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/segmentasi" element={<Segmentasi />} />
              <Route path="/segmentasi/data" element={<DataSegmentasi />} />
              <Route path="/rekonstruksi" element={<Rekonstruksi3d />} />
              <Route path="/rekonstruksi/data" element={<DataRekonstruksi />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/pengaturan" element={<Pengaturan />} />
              <Route path="/user" element={<User />} />
            </Route>
          </Route>
          <Route path="/masuk" element={<AuthPage page={"masuk"} />} exact />
          <Route path="/daftar" element={<AuthPage page={"daftar"} />} exact />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
