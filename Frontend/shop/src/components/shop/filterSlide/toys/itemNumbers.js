import { useEffect, useState } from "react";
import GridViewIcon from "@mui/icons-material/GridView";

import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";
import { CustomSelect, StyledOption } from "/src/theme/styled/styledSelect";

export default function ItemNumberSelect({ filterContext, setFilterContext }) {
  const globalContext = UseGlobalContext();
  const { t } = useTranslation(["product"]);

  const [value, setValue] = useState(filterContext.perpage);
  useEffect(() => {
    setFilterContext({ ...filterContext, perpage: value });
  }, [value]);

  return (
    <>
      <span
        style={{
          verticalAlign: "-webkit-baseline-middle",
          color:
            globalContext.theme.color === "dark"
              ? "rgba(255, 255, 255, 0.3)"
              : "rgba(0, 0, 0, 0.3)",
        }}
      >
        <GridViewIcon />
      </span>
      <span>
        <CustomSelect value={value} onChange={setValue}>
          <StyledOption value={8}>8</StyledOption>
          <StyledOption value={12}>12</StyledOption>
          <StyledOption value={16}>16</StyledOption>
        </CustomSelect>
      </span>
    </>
  );
}
