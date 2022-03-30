import { Slider, TextField, Box } from "@mui/material";

import { useTranslation } from "react-i18next";

export default function FilterPriceRange({
  price_range,
  filterContext,
  setFilterContext,
}) {
  const { t } = useTranslation(["product"]);

  function priceChange(event, newValue) {
    setFilterContext({
      ...filterContext,
      price: newValue,
    });
  }

  function minPriceChange(event) {
    setFilterContext({
      ...filterContext,
      price: [parseInt(event.target.value), filterContext.price[1]],
    });
  }
  function maxPriceChange(event) {
    setFilterContext({
      ...filterContext,
      price: [filterContext.price[0], parseInt(event.target.value)],
    });
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ direction: "ltr" }}>
          <TextField
            id="from-number"
            label={t("from")}
            type="number"
            value={filterContext.price[0]}
            onChange={minPriceChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            fullWidth
          />
          <TextField
            id="to-number"
            label={t("to")}
            type="number"
            value={filterContext.price[1]}
            onChange={maxPriceChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            fullWidth
          />
          <Slider
            name="price-range"
            getAriaLabel={() => "Price range"}
            min={price_range.price__min}
            step={1}
            max={price_range.price__max}
            value={filterContext.price}
            onChange={priceChange}
            color="primary"
            sx={{ marginTop: "1rem" }}
          />
        </div>
      </Box>
    </>
  );
}
