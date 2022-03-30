import { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Grid, Paper, Alert } from "@mui/material";

import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";
import { getCategories } from "/src/network/fetchData/shop";

export default function CategoriesScreen({ categories }) {
  const globalContext = UseGlobalContext();
  const { t } = useTranslation(["product"]);

  const productImagePath = "/media/products/";

  const [dynamicCategories, setDynamicCategories] = useState(categories);
  useEffect(() => {
    async function getDynamic() {
      const data = await getCategories();
      setDynamicCategories(data);
    }
    getDynamic();
  }, [globalContext.culture.language]);

  return (
    <>
      <center>
        <h1>{t("categoriesList")}</h1>
      </center>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "1366px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "2%",
          paddingLeft: "1%",
          paddingRight: "1%",
        }}
      >
        <img
          src={`${productImagePath}categories/categories.gif`}
          alt="Categories Cover"
          loading="lazy"
          style={{
            objectFit: "cover",
            width: "100%",
            marginTop: 20,
            marginBottom: 40,
          }}
        />
        {dynamicCategories.length > 0 ? (
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            mb={6}
            spacing={3}
            rowSpacing={3}
          >
            {dynamicCategories.map((dynamicCategories) => (
              <Grid
                item
                lg={3}
                sm={6}
                xs={12}
                key={dynamicCategories.id}
                alignItems="center"
              >
                <Link
                  href={`/products/?category=${dynamicCategories.id}`}
                  passHref
                >
                  <a>
                    <img
                      src={dynamicCategories.image}
                      alt={dynamicCategories.title}
                      loading="lazy"
                      style={{ objectFit: "cover", width: "100%" }}
                    />
                    <center>
                      <Paper sx={{ padding: "5px" }}>
                        {dynamicCategories.title}
                      </Paper>
                    </center>
                  </a>
                </Link>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info">{t("noCategories")}</Alert>
        )}
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const data = await getCategories();
  return {
    props: {
      categories: data,
    },
  };
}
