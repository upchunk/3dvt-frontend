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
import { setUserData } from "./redux/userConfig";

function App() {
  const userid = useSelector((state) => state.userConfig.userid);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserInfo(userid).then((res) => {
      dispatch(setUserData(res.data));
    });
  }, [userid]);

  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
