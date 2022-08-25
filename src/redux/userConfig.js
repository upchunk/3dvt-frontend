import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import * as api from "../utils/api";

const initialState = {
  userid: 1,
  loading: true,
  reload: false,
  popUp: false,
  toApprove: "",
  isApproved: false,
  userData: {},
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
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userid = action.payload;
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

// Action creators are generated for each case reducer function
export const {
  setUserid,
  setLoading,
  setReload,
  setPopUp,
  setUserData,
  setAuth,
  setJwtToken,
  setApproval,
  setToApprove,
} = userConfigSlice.actions;

export default userConfigSlice.reducer;
