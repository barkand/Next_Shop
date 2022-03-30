import { useDispatch } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import { AddShoppingCart as AddShoppingCartIcon } from "@mui/icons-material";

import { useTranslation } from "react-i18next";
import { addToCart } from "/src/redux/actions";

export default function BuyBtnIcon({ product }) {
  const { t } = useTranslation(["product"]);
  const dispatch = useDispatch();

  return (
    <Tooltip title={t("addToCart")}>
      <IconButton
        sx={{ color: "#01a74b" }}
        onClick={() => {
          dispatch(addToCart(product));
        }}
      >
        <AddShoppingCartIcon />
      </IconButton>
    </Tooltip>
  );
}
