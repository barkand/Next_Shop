import { IconButton } from "@mui/material";
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";

import UseGlobalContext from "/src/context/global";

export default function DarkModeBtnIcon(props) {
  const globalContext = UseGlobalContext();
  let isDark = globalContext.theme.color === "dark";

  return (
    <>
      <IconButton
        sx={{ marginLeft: "5px" }}
        onClick={props.toggleTheme}
        color="inherit"
      >
        {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </>
  );
}
