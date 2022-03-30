import { cloneElement } from "react";
import { useScrollTrigger } from "@mui/material";
import PropTypes from "prop-types";

import AppBarComponent from "/src/components/layout/header/types/AppBar";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function ElevateHeader(props) {
  return (
    <>
      <ElevationScroll {...props}>
        <AppBarComponent
          elevation={props.elevation}
          position="sticky"
          toggleTheme={props.toggleTheme}
          toggleLang={props.toggleLang}
        />
      </ElevationScroll>

      <div style={{ marginTop: "20px" }} />
    </>
  );
}
