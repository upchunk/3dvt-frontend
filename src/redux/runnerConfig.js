import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskid: "",
  lastType: "",
  type: "",
  result: "",
  page: "dashboard",
  errCatch: false,
  errMessage: "",
  errSeverity: "warning",
};

export const runnerConfigSlice = createSlice({
  name: "runnerConfig",
  initialState,
  reducers: {
    setTaskid: (state, action) => {
      state.taskid = action.payload;
    },
    setLastType: (state, action) => {
      state.lastType = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setResult: (state, action) => {
      state.result = JSON.stringify(action.payload, null, 2);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setErrCatch: (state, action) => {
      state.errCatch = action.payload;
    },
    setErrMessage: (state, action) => {
      state.errMessage = action.payload;
    },
    setErrSeverity: (state, action) => {
      state.errSeverity = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTaskid,
  setType,
  setLastType,
  setResult,
  setPage,
  setErrMessage,
  setErrCatch,
  setErrSeverity,
} = runnerConfigSlice.actions;

export default runnerConfigSlice.reducer;
