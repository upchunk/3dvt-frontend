import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setErrCatch, setErrMessage } from "../redux/runnerConfig";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbars() {
  const errMessage = useSelector((state) => state.runnerConfig.errMessage);
  const errCatch = useSelector((state) => state.runnerConfig.errCatch);
  const errSeverity = useSelector((state) => state.runnerConfig.errSeverity);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setErrCatch(false));
    dispatch(setErrMessage(""));
  };

  return (
    <Snackbar open={errCatch} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={errSeverity}
        sx={{ width: "100%" }}
      >
        {errMessage}
      </Alert>
    </Snackbar>
  );
}
