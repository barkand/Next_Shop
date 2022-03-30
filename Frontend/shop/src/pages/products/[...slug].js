import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Divider,
  Grid,
  Typography,
  CardMedia,
  Breadcrumbs,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import Link from "next/link";
import dynamic from "next/dynamic";
const BuyMultiBtn = dynamic(
  () => import("/src/components/shop/toys/BuyMultiBtn"),
  { ssr: false }
);

import { useTranslation } from "react-i18next";
import {
  getProducts,
  getProduct,
  getDynamicProductDetails,
  getProductAbout,
  getProductDetails,
} from "/src/network/fetchData/shop";
import UseGlobalContext from "/src/context/global";
import { Local_Number } from "/src/functions/Convert";

import TabPanel, { tabProps } from "/src/theme/styled/styledTab";
import RatingIcon from "/src/components/layout/base/toys/RatingIcon";
import FavoriteBtnIcon from "/src/components/layout/base/toys/FavoriteBtnIcon";

import ReviewsPanel from "/src/components/shop/panels/reviews";
import AboutPanel from "/src/components/shop/panels/about";
import DetailsPanel from "/src/components/shop/panels/details";
import SuggestProducts from "/src/components/shop/sections/SuggestProducts";

export default function ProductScreen({ product, about, details }) {
  const globalContext = UseGlobalContext();
  const { t } = useTranslation(["product"]);

  const [dynamicProduct, setDynamicProduct] = useState(product);
  useEffect(() => {
    async function getDynamic() {
      const data = await getProduct(product.id);
      setDynamicProduct(data);
    }
    if (product.id) {
      getDynamic();
    }
  }, [globalContext.culture.language]);

  const [tab, setTab] = useState(0);
  const tabHandleChange = (event, value) => {
    setTab(value);
  };

  const [dynamicProductDetails, setDynamicProductDetails] = useState({
    rating: 0.0,
    ratingCount: 0,
    offPercent: 0,
    formatPrice: 0,
    formatOffPrice: 0,
    price: 0,
    offPrice: 0,
    quantity: 0,
  });
  useEffect(() => {
    if (product) {
      async function getDynamic() {
        const data = await getDynamicProductDetails(product.id);
        setDynamicProductDetails(data);
      }
      getDynamic();
    }
  }, [product, globalContext.culture.language]);

  return (
    <>
      {product && (
        <>
          <div
            style={{
              maxWidth: "1366px",
              marginLeft: "auto",
              marginRight: "auto",
              width: "100%",
              paddingX: "5%",
              paddingBottom: "2%",
              paddingTop: "1%",
            }}
          >
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginX: "5%" }}>
              <Link underline="hover" color="inherit" href="/products" passHref>
                {t("productsList")}
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href={`/products/?category=${product.subcategory.category.id}`}
                passHref
              >
                {dynamicProduct.subcategory.category.title}
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href={`/products/?subcategory=${product.subcategory.id}`}
                passHref
              >
                {dynamicProduct.subcategory.title}
              </Link>

              <Typography color="text.primary">
                {dynamicProduct.title}
              </Typography>
            </Breadcrumbs>

            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              mt={2}
              mb={2}
              spacing={3}
              sx={{ paddingX: "5%" }}
            >
              <Grid item md={5} xs={12}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={dynamicProduct.title}
                  // className="hover-zoom"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "5px",
                    objectFit: "contain",
                  }}
                />
              </Grid>
              <Grid item md={7} xs={12}>
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    paddingX: "5%",
                    minHeight: "250px",
                  }}
                >
                  <CardHeader title={dynamicProduct.title} />
                  <Divider />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingTop: "2%",
                    }}
                  >
                    <div>
                      <RatingIcon
                        rating={dynamicProductDetails.rating}
                        ratingCount={dynamicProductDetails.ratingCount}
                        readOnly={true}
                      />
                    </div>
                    <div>
                      <FavoriteBtnIcon productId={product.id} />
                    </div>
                  </div>
                  <Card
                    variant="outlined"
                    sx={{ padding: "2%", marginY: "15px", minHeight: "200px" }}
                  >
                    <div style={{ paddingTop: "2%" }}>
                      {dynamicProduct.description}
                    </div>
                  </Card>
                  <Card sx={{ padding: "2%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      {globalContext.catalog ? (
                        <></>
                      ) : dynamicProductDetails.offPrice === 0 ? (
                        <div style={{ direction: "rtl", textAlign: "end" }}>
                          <Typography
                            component="div"
                            sx={{ textSlign: "left", fontWeight: "700" }}
                          >
                            {dynamicProductDetails.formatPrice !== "unavailable"
                              ? Local_Number(dynamicProductDetails.formatPrice)
                              : t("unavailable")}
                            <span
                              style={{
                                fontSize: "14px",
                                marginRight: "5px",
                                marginLeft: "5px",
                              }}
                            >
                              {dynamicProductDetails.formatPrice ===
                              "unavailable"
                                ? ""
                                : t("currency")}
                            </span>
                          </Typography>
                        </div>
                      ) : (
                        <div>
                          <span
                            style={{
                              backgroundColor: "#fb3449",
                              fontWeight: "700",
                              color: "#fff",
                              borderRadius: "20px",
                              padding: "0px 6px 1px",
                              marginRight: "5px",
                              fontSize: "15px",
                            }}
                          >
                            {Local_Number(dynamicProductDetails.offPercent)}
                          </span>
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "gray",
                            }}
                          >
                            {Local_Number(dynamicProductDetails.formatPrice)}
                          </span>
                          <span>
                            <Typography
                              component="div"
                              sx={{
                                textSlign: "left",
                                marginTop: "6px",
                                fontWeight: "700",
                              }}
                            >
                              {Local_Number(
                                dynamicProductDetails.formatOffPrice
                              )}
                              <span
                                style={{
                                  fontSize: "14px",
                                  marginRight: "5px",
                                  marginLeft: "5px",
                                }}
                              >
                                {t("currency")}
                              </span>
                            </Typography>
                          </span>
                        </div>
                      )}
                      {dynamicProductDetails.formatPrice === "unavailable" ? (
                        <></>
                      ) : (
                        <BuyMultiBtn product={product} />
                      )}
                    </div>
                  </Card>
                </Card>
              </Grid>
            </Grid>

            <Divider sx={{ marginTop: "50px" }} />

            <SuggestProducts subcategoryId={product.subcategory.id} />

            <Divider sx={{ marginBottom: "50px" }} />

            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              mt={2}
              mb={2}
              spacing={3}
              sx={{
                width: "100%",
                maxWidth: "1366px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingX: "5%",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={tab}
                    onChange={tabHandleChange}
                    aria-label="product tabs Details About Review"
                  >
                    <Tab label={t("productDetails")} {...tabProps(0)} />
                    <Tab label={t("productAbout")} {...tabProps(1)} />
                    <Tab label={t("productReviews")} {...tabProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={tab} index={0}>
                  <DetailsPanel productDetails={details} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                  <AboutPanel text={about} productId={product.id} />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                  <ReviewsPanel productId={product.id} />
                </TabPanel>
              </Box>
            </Grid>
          </div>
        </>
      )}
    </>
  );
}

export async function getStaticProps({ params }) {
  let id = params.slug[0];
  try {
    const _product = await getProduct(id);
    const _about = await getProductAbout(id);
    const _details = await getProductDetails(id);

    return {
      props: {
        product: _product,
        about: _about,
        details: _details,
      },
    };
  } catch (err) {}
}

export async function getStaticPaths() {
  const data = await getProducts(8, 0, 0, "", 0, [], [], 0, 0, "", "");
  let products = data["products"];

  const path1 = products.map(
    (product) => `/products/${product.id}/${product.slug}`
  );
  const path2 = products.map((product) => `/products/${product.id}`);
  const paths = path1.concat(path2);

  return {
    paths,
    fallback: "blocking",
  };
}
