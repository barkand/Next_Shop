import { Typography } from "@mui/material";

import UseGlobalContext from "/src/context/global";

function Footer(props) {
  const globalContext = UseGlobalContext();
  const { lang } = props;

  return (
    <footer
      style={{
        padding: "20px",
        height: "150px",
        backgroundColor:
          globalContext.theme.color === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(0, 0, 0, 0.03)",
        borderTop: "ridge",
      }}
    >
      <div className={lang}>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ paddingTop: "40px" }}
        >
          Next Shop @ 2022
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
