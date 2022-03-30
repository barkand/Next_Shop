import { forwardRef } from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function StyledSnackbar({ text, open, code, color }) {
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity={color} sx={{ width: "100%" }}>
          {text}
        </Alert>
      </Snackbar>
    </>
  );
}
