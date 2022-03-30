import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { FilterAltOff as FilterAltOffIcon } from "@mui/icons-material";

import { useTranslation } from "react-i18next";

export default function FilterButtons({
  defaultContext,
  filterContext,
  setFilterContext
}) {
  const router = useRouter();
  const { t } = useTranslation(["product"]);

  const resetfilters = () => {
    setFilterContext(defaultContext);
    router.push("/products");
  };

  return (
    <>
      <center>
        <div style={{ marginTop: "15px" }}>
          <Button variant="contained" color="success" onClick={resetfilters}>
            <FilterAltOffIcon />
            {t("clearfilter")}
          </Button>
        </div>
      </center>
    </>
  );
}
