import { useState } from "react";
import { IconButton, Dialog, DialogActions } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import Login from "/src/components/user/toys/login";
import Alert from "/src/components/layout/base/toys/alert";

export default function DialogLogin({
  openDialog,
  setOpenDialog,
  setMode,
  redirectTo,
}) {
  let [code, setCode] = useState("");
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogActions>
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <Login
          setCode={setCode}
          setOpenDialog={setOpenDialog}
          setMode={setMode}
          redirectTo={redirectTo}
        />
      </Dialog>
      <Alert
        code={code}
        color={
          code === "successLogin"
            ? "success"
            : code === "PasswordIsWrong"
            ? "warning"
            : "error"
        }
      />
    </>
  );
}
