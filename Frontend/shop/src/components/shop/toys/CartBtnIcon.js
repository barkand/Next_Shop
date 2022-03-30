import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Badge } from "@mui/material";
import { ShoppingBasket as ShoppingBasketIcon } from "@mui/icons-material";

import { Local_Number } from "/src/functions/Convert";

export default function CartBtnIcon() {
  const cart = useSelector((state) => state.cart);
  const [items, setItems] = useState([cart.addedIds]);

  useEffect(() => {
    setItems(cart.addedIds);
  }, [cart.addedIds]);

  return (
    <>
      <Link href="/cart" passHref>
        <a>
          <Badge
            badgeContent={items.length ? Local_Number(items.length) : 0}
            color="error"
            sx={{ marginLeft: "15px", cursor: "pointer" }}
            aria-controls="menu-appbar"
            aria-haspopup="true"
          >
            <ShoppingBasketIcon />
          </Badge>
        </a>
      </Link>
    </>
  );
}
