import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userConfigReducer from "./userConfig";
import runnerConfigReducer from "./runnerConfig";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["runnerConfig"],
};

const combinedReducer = combineReducers({
  userConfig: userConfigReducer,
  runnerConfig: runnerConfigReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "userConfig/setAuth" && action.payload === false) {
    storage.removeItem("persist:root");
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
