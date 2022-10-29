import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import Rekonstruksi3d from "./pages/rekonstruksi3d/rekonstruksi3d";
import Feedback from "./pages/feedback/feedback";
import PersistentDrawerLeft from "./components/navigation/navigation";
import DataSegmentasi from "./pages/segmentasi/dataSegmentasi";
import DataRekonstruksi from "./pages/rekonstruksi3d/dataRekonstruksi";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, newRefreshToken, setDefaultToken } from "./utils/api";
import { setJwtToken, setUserData } from "./redux/userConfig";
import AuthPage from "./pages/authPage/authPage";
import Snackbars from "./components/snackbar";
import PrivateWrapper from "./utils/PrivateWrapper";
import Segmentasi from "./pages/segmentasi/segmentasi";
import Landing from "./pages/landing/landing";
import TopAppBar from "./components/appbar/appbar";
import ScrollDialog from "./components/ScrollablePopUp";
import LihatSaran from "./pages/lihatSaran";
import LandingPageModification from "./pages/landingPageForm";
import StaffOnly from "./utils/StaffOnlyWrapper";

export default function App() {
  const userid = useSelector((state) => state.userConfig.userid);
  const refreshToken = useSelector((state) => state.userConfig.refreshToken);
  const accessToken = useSelector((state) => state.userConfig.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (refreshToken && refreshToken !== "") {
      let delay = 1000 * 60 * 29; // 29Min Delay
      let interval = setInterval(() => {
        newRefreshToken(refreshToken).then((token) => {
          dispatch(setJwtToken(token));
        });
      }, delay);
      return () => clearInterval(interval);
    }
  }, [refreshToken]);

  useEffect(() => {
    if (accessToken && accessToken !== "") setDefaultToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (userid && userid !== "")
      getUserInfo(userid).then((res) => {
        dispatch(setUserData(res?.data));
      });
  }, [userid]);

  console.log("Web Frontend By: Habibul Rahman Qalbi");

  return (
    <>
      <Snackbars />
      <ScrollDialog />
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
              <Route element={<StaffOnly />}>
                <Route path="/saran/data" element={<LihatSaran />} />
                <Route
                  path="/edit-landing-page"
                  element={<LandingPageModification />}
                />
              </Route>
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
