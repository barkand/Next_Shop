import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonGroup } from "@mui/material";
import { AddShoppingCart as AddShoppingCartIcon } from "@mui/icons-material";

import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";
import { Local_Number } from "/src/functions/Convert";
import { addToCart, removeFromCart } from "/src/redux/actions";

export default function BuyMultiBtn({ product }) {
  const globalContext = UseGlobalContext();
  const { t } = useTranslation(["product"]);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <>
      {!globalContext.catalog && product.formatPrice !== "unavailable" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            direction: "ltr",
          }}
        >
          {cart.products && cart.products[product.id] ? (
            <ButtonGroup
              disableElevation
              variant="contained"
              color="success"
              sx={{ direction: globalContext.culture.direction }}
            >
              <Button
                key="minus"
                size="small"
                onClick={() => {
                  dispatch(removeFromCart(product));
                }}
              >
                -
              </Button>
              <Button key="value" size="small" variant="outlined" disabled>
                {Local_Number(cart.products[product.id].quantity)}
              </Button>

              <Button
                key="plus"
                size="small"
                onClick={() => {
                  dispatch(addToCart(product));
                }}
              >
                +
              </Button>
            </ButtonGroup>
          ) : (
            <Button
              size="small"
              variant="contained"
              color="success"
              aria-label="add to shopping cart"
              endIcon={<AddShoppingCartIcon />}
              onClick={() => {
                dispatch(addToCart(product));
              }}
            >
              {t("buy")}
            </Button>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
