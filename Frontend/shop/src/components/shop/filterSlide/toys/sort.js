import { useEffect, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";

import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";
import { CustomSelect, StyledOption } from "/src/theme/styled/styledSelect";

export default function SortSelect({ filterContext, setFilterContext }) {
  const globalContext = UseGlobalContext();
  const { t } = useTranslation(["product"]);

  const [value, setValue] = useState(filterContext.sort);
  useEffect(() => {
    setFilterContext({ ...filterContext, sort: value });
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
        <SortIcon />
      </span>
      <span>
        {t("sortBy")}{" "}
        <CustomSelect value={value} onChange={setValue}>
          <StyledOption value={0}>{t("sortByNewest")}</StyledOption>
          <StyledOption value={1}>{t("sortByAscPrice")}</StyledOption>
          <StyledOption value={2}>{t("sortByDescPrice")}</StyledOption>
        </CustomSelect>
      </span>
    </>
  );
}
