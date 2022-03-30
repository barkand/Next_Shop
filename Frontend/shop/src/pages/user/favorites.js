import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";

import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";
import { getFavorites } from "/src/network/fetchData/shop";
import { GetValueLocalStorage } from "/src/localStorage";
import Product from "/src/components/shop/Product";

export default function FavoritesScreen() {
  const router = useRouter();
  const { t } = useTranslation(["product"]);
  const globalContext = UseGlobalContext();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!GetValueLocalStorage("token")) {
      router.push("/user/login");
    } else {
      async function getFavProducts() {
        const response = await getFavorites();
        setFavorites(response);
      }
      getFavProducts();
    }
  }, [globalContext.culture.language]);

  return (
    <>
      <center>
        <h1>{t("favoriteList")}</h1>
      </center>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        mb={6}
        mt={2}
        spacing={3}
        rowSpacing={3}
        sx={{
          maxWidth: "1366px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: "1%",
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingBottom: "10%",
        }}
      >
        {favorites.map((item, index) => (
          <Grid item md={3} sm={6} key={index} alignItems="center">
            <Product item={item} buy fav />
          </Grid>
        ))}
        {favorites.length % 4 !== 0 &&
          Array(4 - (favorites.length % 4))
            .fill(0)
            .map((item, index) => (
              <Grid item md={3} sm={6} key={index} alignItems="center">
                <div />
              </Grid>
            ))}
      </Grid>
    </>
  );
}
