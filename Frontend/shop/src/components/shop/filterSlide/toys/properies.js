import { Switch } from "@mui/material";

import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";

export default function FilterProperties({ filterContext, setFilterContext }) {
  const globalContext = UseGlobalContext();
  const { t } = useTranslation(["product"]);

  function offPriceChange() {
    setFilterContext({
      ...filterContext,
      offprice: filterContext.offprice ? 0 : 1,
    });
  }

  function availableChange() {
    setFilterContext({
      ...filterContext,
      available: filterContext.available ? 0 : 1,
    });
  }

  return (
    <>
      <div style={{ paddingBottom: "15px" }}>
        <span>{t("justOffPrice")}</span>
        <span
          style={{
            position: "absolute",
            right: globalContext.culture.direction === "ltr" ? "0px" : "auto",
            left: globalContext.culture.direction === "ltr" ? "auto" : "0px",
            marginTop: "-6px",
          }}
        >
          <Switch
            color="warning"
            checked={filterContext.offprice === 1}
            onChange={offPriceChange}
          />
        </span>
      </div>
      <div style={{ paddingBottom: "15px" }}>
        <span>{t("onlyAvailable")}</span>
        <span
          style={{
            position: "absolute",
            right: globalContext.culture.direction === "ltr" ? "0px" : "auto",
            left: globalContext.culture.direction === "ltr" ? "auto" : "0px",
            marginTop: "-6px",
          }}
        >
          <Switch
            color="secondary"
            checked={filterContext.available === 1}
            onChange={availableChange}
          />
        </span>
      </div>
    </>
  );
}
