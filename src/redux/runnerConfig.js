import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskid: "",
  lastType: "",
  type: "",
  popUpHeader: "",
  popUpMsg: "",
  segData: {},
  recData: {},
  userDetail: {},
  viewUserDetail: false,
  page: "dashboard",
  errCatch: false,
  errMessage: "",
  errSeverity: "warning",
  showGalery: false,
  files: [],
  sourceImages: [],
  resultImages: [],
  model: "",
  showModel: false,
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
    setPopUpHeader: (state, action) => {
      state.popUpHeader = action.payload;
    },
    setPopUpMsg: (state, action) => {
      state.popUpMsg = action.payload;
    },
    setSegData: (state, action) => {
      state.segData = action.payload;
    },
    setRecData: (state, action) => {
      state.recData = action.payload;
    },
    setUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
    setViewUserDetail: (state, action) => {
      state.viewUserDetail = action.payload;
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
    setShowModel: (state, action) => {
      state.showModel = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTaskid,
  setType,
  setLastType,
  setPopUpHeader,
  setPopUpMsg,
  setSegData,
  setRecData,
  setUserDetail,
  setViewUserDetail,
  setPage,
  setErrMessage,
  setErrCatch,
  setErrSeverity,
  setShowGalery,
  setFiles,
  setSourceImages,
  setResultImages,
  setModel,
  setShowModel,
} = runnerConfigSlice.actions;

export default runnerConfigSlice.reducer;
