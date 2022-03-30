import { useState } from "react";
import { Paper } from "@mui/material";

import Login from "/src/components/user/toys/login";
import Alert from "/src/components/layout/base/toys/alert";

export default function LoginScreen() {
  let [code, setCode] = useState("");

  return (
    <>
      <div dir="ltr">
        <Paper
          elevation={12}
          sx={{
            marginTop: "10%",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "10%",
            maxWidth: "400px",
          }}
        >
          <Login setCode={setCode} redirectTo={"/"} />
        </Paper>
      </div>
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
