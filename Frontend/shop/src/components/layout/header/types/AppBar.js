import { AppBar, Toolbar, Typography } from "@mui/material";

import MenuSlide from "/src/components/layout/slideMenu";
import UseGlobalContext from "/src/context/global";

import SearchInput from "/src/components/layout/header/toys/SearchInput";
import NotificationsBtnIcon from "/src/components/layout/header/toys/NotificationsBtnIcon";
import DarkModeBtnIcon from "/src/components/layout/header/toys/DarkModeBtnIcon";
import LanguageBtnIcon from "/src/components/layout/header/toys/LanguageBtnIcon";
import LogoIcon from "/src/components/layout/header/toys/LogoIcon";
import CartBtnIcon from "/src/components/shop/toys/CartBtnIcon";

export default function AppBarComponent(props) {
  const globalContext = UseGlobalContext();
  let isDark = globalContext.theme.color === "dark";

  return (
    <AppBar
      elevation={props.elevation}
      position={props.position}
      sx={{
        color: isDark ? "default" : globalContext.theme.lightColor,
        backgroundColor: isDark
          ? "default"
          : globalContext.theme.lightBackgroundColor,
        height: "50px",
      }}
    >
      <Toolbar variant="dense">
        <MenuSlide />
        <LogoIcon />
        <Typography sx={{ flexGrow: 1 }} />
        <SearchInput />
        {globalContext.catalog ? <></> : <CartBtnIcon />}
        <NotificationsBtnIcon />
        <LanguageBtnIcon toggleLang={props.toggleLang} />
        <DarkModeBtnIcon toggleTheme={props.toggleTheme} />
      </Toolbar>
    </AppBar>
  );
}
