import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useSelector, useDispatch } from "react-redux";
import { setApproval, setPopUp, setReload } from "../../redux/userConfig";
import { toHeaderCase } from "js-convert-case";

export default function ScrollDialog() {
  const result = useSelector((state) => state.crawlerConfig.result);
  const toApprove = useSelector((state) => state.userConfig.toApprove);
  const taskid = useSelector((state) => state.crawlerConfig.taskid);
  const popUp = useSelector((state) => state.userConfig.popUp);
  const dispatch = useDispatch();
  const scroll = "paper";

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([result], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `RT Crawl Result ${taskid}.json`;
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const handleApproval = () => {
    if (toApprove !== "") {
      dispatch(setApproval(true));
      dispatch(setReload(true));
    }
  };

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
        <DialogTitle id="scroll-dialog-title">Crawl Result</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            component={"pre"}
          >
            {toApprove !== ""
              ? `Are You Sure to ${toHeaderCase(toApprove)} this task?`
              : result}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {toApprove !== "" ? (
            <Button onClick={handleApproval}>
              {toHeaderCase(String(toApprove))}
            </Button>
          ) : (
            <Button onClick={handleDownload}>Download</Button>
          )}
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
