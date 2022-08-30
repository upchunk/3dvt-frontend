import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import * as api from "../utils/api";

const initialState = {
  userid: "",
  apikey: "",
  loading: true,
  reload: false,
  popUp: false,
  toApprove: "",
  isApproved: false,
  userData: {},
  groupNames: [],
  username: "",
  password: "",
  accessToken: "",
  refreshToken: "",
  jwtToken: "",
  isAuthenticated: false,
};

export const userConfigSlice = createSlice({
  name: "userConfig",
  initialState,
  reducers: {
    setUserid: (state, action) => {
      state.userid = action.payload;
    },

    setApikey: (state, action) => {
      state.apikey = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setReload: (state, action) => {
      state.reload = action.payload;
    },

    setPopUp: (state, action) => {
      state.popUp = action.payload;
    },

    setUserData: (state, action) => {
      state.userData = action.payload;
      state.apikey = action.payload.apikey;
    },

    setGroupNames: (state, action) => {
      state.groupNames = action.payload;
    },

    setAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    setJwtToken: (state, action) => {
      const jwt = action.payload;
      state.jwtToken = jwt;

      const access = String(jwt.access);
      state.accessToken = access;
      state.userid = jwt_decode(access).user_id;
      api.setDefaultToken(access);

      const refresh = String(jwt.refresh);
      state.refreshToken = refresh;

      state.isAuthenticated = true;
    },

    setApproval: (state, action) => {
      state.isApproved = action.payload;
    },

    setToApprove: (state, action) => {
      state.toApprove = String(action.payload);
    },
  },
});

export const {
  setUserid,
  setApikey,
  setLoading,
  setReload,
  setPopUp,
  setUserData,
  setGroupNames,
  setAuth,
  setJwtToken,
  setApproval,
  setToApprove,
} = userConfigSlice.actions;

export default userConfigSlice.reducer;
