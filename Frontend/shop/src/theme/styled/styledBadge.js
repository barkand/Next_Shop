import { Badge, styled } from "@mui/material";

import UseGlobalContext from "/src/context/global";

const StyledBadge = styled(Badge)(function StyledBadge({ theme }) {
  const globalContext = UseGlobalContext();

  return {
    "& .MuiBadge-badge": {
      right: globalContext.culture.align === "left" ? 10 : [],
      left: globalContext.culture.align === "left" ? [] : 10,
      top: 5,
      padding: "0 4px",
    },
  };
});

export default StyledBadge;
