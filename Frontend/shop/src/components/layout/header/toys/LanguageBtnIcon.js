import { IconButton } from "@mui/material";

import UseGlobalContext from "/src/context/global";

export default function LanguageBtnIcon(props) {
  const globalContext = UseGlobalContext();

  return (
    <>
      <IconButton
        sx={{ marginLeft: "17px", fontSize: "15px" }}
        onClick={props.toggleLang}
        color="inherit"
      >
        {globalContext.culture.language === "en" ? "Fa" : "En"}
      </IconButton>
    </>
  );
}
