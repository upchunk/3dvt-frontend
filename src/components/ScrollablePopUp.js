import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useSelector, useDispatch } from "react-redux";
import { setPopUp, setReload } from "../redux/userConfig";
import { toHeaderCase } from "js-convert-case";

export default function ScrollDialog() {
  const popUpHeader = useSelector((state) => state.runnerConfig.popUpHeader);
  const popUpMsg = useSelector((state) => state.runnerConfig.popUpMsg);
  const popUp = useSelector((state) => state.userConfig.popUp);
  const dispatch = useDispatch();
  const scroll = "paper";

  const handleClose = () => {
    dispatch(setPopUp(false));
    dispatch(setReload(true));
  };

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (popUp) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [popUp]);

  return (
    <div>
      <Dialog
        open={popUp}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" align="center">
          {toHeaderCase(popUpHeader)}
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            component={"pre"}
          >
            {popUpMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
