import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Alert,
  Pagination,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";

import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";
import { getProducts } from "/src/network/fetchData/shop";
import { queryString } from "/src/functions/queryString";

import Product from "/src/components/shop/Product";
import FilterSlide from "/src/components/shop/filterSlide";
import SortSelect from "/src/components/shop/filterSlide/toys/sort";
import ItemNumberSelect from "/src/components/shop/filterSlide/toys/itemNumbers";

function ProductsScreen(props) {
  const router = useRouter();
  const globalContext = UseGlobalContext();
  const { t } = useTranslation(["product"]);

  let defaultContext = {
    page: 1,
    perpage: 8,
    sort: 0,
    brands: [],
    price: [
      props.filter.details.price_range.price__min,
      props.filter.details.price_range.price__max,
    ],
    available: 0,
    offprice: 0,
    category: props.filter.category,
    subcategory: props.filter.subcategory,
    q: props.filter.q,
    lang: globalContext.culture.language,
  };
  const products = props.products;

  const [isPending, setIsPending] = useState(true);
  const [filterContext, setFilterContext] = useState(defaultContext);
  const [count, setCount] = useState(props.filter.count);
  const [changedLanguage, setChangedLanguage] = useState(false);

  const PageChange = (event, value) => {
    setFilterContext((prev) => ({ ...prev, page: value }));
  };

  const resetfilters = () => {
    setFilterContext(defaultContext);
    router.push("/products");
  };

  useEffect(() => {
    setCount(Math.ceil(props.filter.count / filterContext.perpage));

    if (changedLanguage) {
      filterContext.price = [
        props.filter.details.price_range.price__min,
        props.filter.details.price_range.price__max,
      ];
      setChangedLanguage(false);
    }
  }, [products]);

  useEffect(() => {
    setIsPending(true);
    if (filterContext.lang !== globalContext.culture.language) {
      filterContext.lang = globalContext.culture.language;
      filterContext.price = [];
      setChangedLanguage(true);
    }
    router.push(`/products/?${queryString(filterContext)}`);

    setIsPending(false);
  }, [filterContext, globalContext.culture.language]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isPending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <center>
        <h1>{t("productsList")}</h1>
      </center>
      {!isPending && (
        <div>
          <Box
            sx={{
              display: { md: "flex", sm: "block" },
              paddingBottom: "2%",
            }}
          >
            <Box
              sx={{
                minWidth: { md: "250px", sm: "100%" },
                width: { md: "250px", sm: "100%" },
              }}
            >
              <FilterSlide
                details={props.filter.details}
                filterContext={filterContext}
                setFilterContext={setFilterContext}
                resetfilters={resetfilters}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: "1366px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingLeft: "1%",
                paddingRight: "1%",
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                mb={2}
              >
                <SortSelect
                  filterContext={filterContext}
                  setFilterContext={setFilterContext}
                />
                <span style={{ paddingLeft: "20px" }} />
                <ItemNumberSelect
                  filterContext={filterContext}
                  setFilterContext={setFilterContext}
                />
                <span style={{ paddingLeft: "20px" }} />
              </Grid>

              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                mb={6}
                spacing={3}
                rowSpacing={3}
              >
                {count > 0 ? (
                  <>
                    {products.map((item, index) => (
                      <Grid
                        item
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                        key={index}
                        alignItems="center"
                      >
                        <Product item={item} label buy fav />
                      </Grid>
                    ))}
                    {products.length % 4 !== 0 &&
                      Array(4 - (products.length % 4))
                        .fill(0)
                        .map((item, index) => (
                          <Grid
                            item
                            lg={3}
                            md={4}
                            sm={6}
                            xs={12}
                            key={index}
                            alignItems="center"
                          >
                            <div />
                          </Grid>
                        ))}
                    <div style={{ minWidth: "310px" }}>
                      <Pagination
                        sx={{ marginTop: "50px", direction: "ltr" }}
                        count={count}
                        page={filterContext.page}
                        onChange={PageChange}
                      />
                    </div>
                  </>
                ) : (
                  <Grid item sx={{ width: "80%" }}>
                    <Alert severity="info">{t("emptyProduct")}</Alert>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps({
  query: {
    perpage = 8,
    page = 1,
    sort = 0,
    q = "",
    brands = [],
    price = [],
    offprice = "",
    available = "",
    category = "",
    subcategory = "",
    lang = "",
  },
}) {
  const data = await getProducts(
    perpage,
    page,
    sort,
    q,
    1,
    [...brands],
    [...price],
    offprice,
    available,
    category,
    subcategory,
    lang
  );
  return {
    props: {
      products: data["products"],
      filter: {
        count: data["count"],
        details: data["details"],
        category: category,
        subcategory: subcategory,
        q: q,
      },
    },
  };
}

export default ProductsScreen;
