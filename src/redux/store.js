import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userConfigReducer from "./userConfig";
import runnerConfigReducer from "./runnerConfig";
import storage from "redux-persist/lib/storage/";
// import session from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage,
  // storage: session,
  stateReconciler: autoMergeLevel2,
  blacklist: ["crawlerConfig"],
};

const rootReducer = combineReducers({
  userConfig: userConfigReducer,
  runnerConfig: runnerConfigReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
