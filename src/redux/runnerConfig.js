import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskid: "",
  lastType: "",
  type: "",
  result: "",
  segData: {},
  recData: {},
  page: "dashboard",
  errCatch: false,
  errMessage: "",
  errSeverity: "warning",
  showGalery: false,
  files: [],
  sourceImages: [],
  resultImages: [],
  model: "",
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
    setSegData: (state, action) => {
      state.segData = action.payload;
    },
    setRecData: (state, action) => {
      state.recData = action.payload;
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
    setShowGalery: (state, action) => {
      state.showGalery = action.payload;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setSourceImages: (state, action) => {
      state.sourceImages = action.payload;
    },
    setResultImages: (state, action) => {
      state.resultImages = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTaskid,
  setType,
  setLastType,
  setResult,
  setSegData,
  setRecData,
  setPage,
  setErrMessage,
  setErrCatch,
  setErrSeverity,
  setShowGalery,
  setFiles,
  setSourceImages,
  setResultImages,
  setModel,
} = runnerConfigSlice.actions;

export default runnerConfigSlice.reducer;
