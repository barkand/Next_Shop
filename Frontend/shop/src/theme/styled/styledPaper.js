import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "#1A2027" : "rgba(0, 0, 0, 0.03)",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export default StyledPaper;
