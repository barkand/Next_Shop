import { Box, Zoom, Fab } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { KeyboardArrowUp as KeyboardArrowUpIcon } from "@mui/icons-material";

import PropTypes from "prop-types";

import UseGlobalContext from "/src/context/global";

function ScrollTop(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function ScrollTopButton(props) {
  const globalContext = UseGlobalContext();
  let isDark = globalContext.theme.color === "dark";

  return (
    <>
      <div id="back-to-top-anchor" />
      {props.children}
      <ScrollTop {...props}>
        <Fab
          size="small"
          aria-label="scroll back to top"
          sx={{
            color: isDark ? "default" : globalContext.theme.lightColor,
            backgroundColor: isDark
              ? "default"
              : globalContext.theme.lightBackgroundColor,
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
