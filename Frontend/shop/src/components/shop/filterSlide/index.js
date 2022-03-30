import { useState } from "react";
import { Tooltip, IconButton, Typography } from "@mui/material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "/src/theme/styled/styledAccordion";
import { FilterAltOff as FilterAltOffIcon } from "@mui/icons-material";

import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";

import FilterBrands from "/src/components/shop/filterSlide/toys/brands";
import FilterPriceRange from "/src/components/shop/filterSlide/toys/priceRange";
import FilterProperties from "/src/components/shop/filterSlide/toys/properies";

export default function FilterSlide({
  details,
  filterContext,
  setFilterContext,
  resetfilters,
}) {
  const globalContext = UseGlobalContext();
  const { t } = useTranslation(["product"]);

  const [accordionExpanded, setExpanded] = useState("panel1");
  const accordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div
        style={{
          minHeight: "95%",
          border: "1px solid rgba(0, 0, 0, .125)",
          borderRadius: "22px",
          paddingTop: "10px",
          paddingBottom: "50px",
          backgroundColor:
            globalContext.theme.color === "dark"
              ? "rgba(255, 255, 255, .05)"
              : "rgba(0, 0, 0, .03)",
        }}
      >
        <center>
          <Typography variant="h6" mb={1}>
            <a
              style={{
                position: "absolute",
                left:
                  globalContext.culture.direction === "ltr" ? "35px" : "auto",
                right:
                  globalContext.culture.direction === "ltr" ? "auto" : "35px",
              }}
            >
              <Tooltip title={t("clearfilter")}>
                <IconButton
                  sx={{ marginTop: "-4px", color: "gray" }}
                  onClick={resetfilters}
                >
                  <FilterAltOffIcon />
                </IconButton>
              </Tooltip>
            </a>{" "}
            {t("filters")}
          </Typography>
        </center>
        <Accordion
          expanded={accordionExpanded === "panel1"}
          onChange={accordionChange("panel1")}
        >
          <AccordionSummary aria-controls="brand-content" id="brand">
            <Typography>{t("brand")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FilterBrands
              allBrands={details.brands}
              filterContext={filterContext}
              setFilterContext={setFilterContext}
            />
          </AccordionDetails>
        </Accordion>
        {globalContext.catalog ? (
          <></>
        ) : (
          <>
            <Accordion
              expanded={accordionExpanded === "panel2"}
              onChange={accordionChange("panel2")}
            >
              <AccordionSummary aria-controls="price-content" id="price">
                <Typography>{t("price")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FilterPriceRange
                  price_range={details.price_range}
                  filterContext={filterContext}
                  setFilterContext={setFilterContext}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={accordionExpanded === "panel3"}
              onChange={accordionChange("panel3")}
            >
              <AccordionSummary aria-controls="property-content" id="property">
                <Typography>{t("property")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FilterProperties
                  filterContext={filterContext}
                  setFilterContext={setFilterContext}
                />
              </AccordionDetails>
            </Accordion>
          </>
        )}
        <span />
      </div>
    </>
  );
}
