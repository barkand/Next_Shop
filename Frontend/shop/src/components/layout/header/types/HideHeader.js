import PropTypes from "prop-types";
import { useScrollTrigger, Slide, Box } from "@mui/material";

import AppBarComponent from "/src/components/layout/header/types/AppBar";

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger({ target: undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function HideHeader(props) {
  return (
    <>
      <HideOnScroll {...props}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBarComponent
            toggleTheme={props.toggleTheme}
            toggleLang={props.toggleLang}
          />
        </Box>
      </HideOnScroll>

      <div style={{ marginTop: "70px" }} />
    </>
  );
}
