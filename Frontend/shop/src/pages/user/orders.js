import { useState, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";

import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";
import Product from "/src/components/shop/Product";
import CarouselItems from "/src/components/layout/base/sections/CarouselItems";
import { getOrders } from "/src/network/fetchData/shop";
import { GetValueLocalStorage } from "/src/localStorage";

export default function OrdersScreen() {
  const router = useRouter();
  const { t } = useTranslation(["product"]);
  const globalContext = UseGlobalContext();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!GetValueLocalStorage("token")) {
      router.push("/user/login");
    } else {
      async function getOrdProducts() {
        const response = await getOrders();
        setOrders(response);
      }
      getOrdProducts();
    }
  }, [globalContext.culture.language]);

  return (
    <>
      <center>
        <h1>{t("orderList")}</h1>
      </center>
      <Divider />

      {orders.map((order, index) => (
        <div key={index}>
          <Typography variant="h6" marginX={5}>
            {t("order")} {index + 1}
          </Typography>
          <CarouselItems
            title={order.updated_at}
            backgrundColor={
              globalContext.theme.color === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.03)"
            }
            color={"default"}
          >
            {order.products.map((item, index) => (
              <Product item={item} key={index} />
            ))}
          </CarouselItems>
          <Divider />
        </div>
      ))}
    </>
  );
}
