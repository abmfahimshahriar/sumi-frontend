import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

type Props = {
  openSnackbar: boolean;
  message: string;
  type: string;
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomSnackbar: React.FC<Props> = ({ openSnackbar, message, type }) => {
  const [open, setOpen] = useState(openSnackbar);
  console.log(open);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type === 'error' ? "error" : "success"}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
