import { useState } from "react";
import { createTheme } from "@mui/material/styles";

import UseGlobalContext from "/src/context/global";

export default function Template() {
  const globalContext = UseGlobalContext();
  const [mode, setMode] = useState(globalContext.theme.color);

  const muiTheme = createTheme({ palette: { mode } }, [mode]);

  const toggleTheme = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return {
    theme: {
      color: mode,
      lightBackgroundColor: "white",
      lightColor: "inherit",
    },
    muiTheme,
    toggleTheme,
  };
}
