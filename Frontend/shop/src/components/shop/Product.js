import Link from "next/link";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
  NoSsr,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";
import { Local_Number } from "/src/functions/Convert";

import StyledBadge from "/src/theme/styled/styledBadge";
import FavoriteBtnIcon from "/src/components/layout/base/toys/FavoriteBtnIcon";
import BuyBtnIcon from "/src/components/shop/toys/BuyBtnIcon";

function Product(props) {
  const globalContext = UseGlobalContext();
  const { t } = useTranslation(["product"]);

  let showBuyIcon = props.buy === true;
  let showFavIcon = props.fav === true;

  const product = props.item;

  let labelColors = {
    new: "success",
    special: "secondary",
    soldout: "primary",
  };
  let label = props.item.label !== null ? props.item.label.title : "";

  return (
    <div style={{ textAlign: "center" }}>
      <StyledBadge
        color={labelColors[label]}
        badgeContent={t(label)}
        anchorOrigin={{
          vertical: "top",
          horizontal: globalContext.culture.revertAlign,
        }}
        sx={{ marginTop: "5px" }}
      >
        <Card sx={{ maxWidth: 250 }}>
          <div className="img-wrapper">
            <Link href={`/products/${product.id}/${product.slug}`} passHref>
              <a>
                <CardMedia
                  key={product.id}
                  component="img"
                  height="250"
                  image={product.image}
                  alt={product.title}
                  className="hover-zoom"
                />
              </a>
            </Link>
          </div>
          <Divider />
          <div style={{ direction: "rtl", textAlign: "end" }}>
            <CardContent sx={{ minHeight: "114px" }}>
              <Link href={`/products/${product.id}/${product.title}`} passHref>
                <a>
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.title}
                  </Typography>
                </a>
              </Link>
              {showFavIcon ? (
                <span
                  style={{
                    display: "flex",
                    marginTop: "-40px",
                    marginRight: "-9px",
                  }}
                >
                  <NoSsr>
                    <FavoriteBtnIcon productId={product.id} />
                  </NoSsr>
                </span>
              ) : (
                <></>
              )}
              {globalContext.catalog ? (
                <></>
              ) : product.offPrice === 0 ? (
                <div style={{ direction: "rtl", textAlign: "end" }}>
                  <Typography component="div" sx={{ textSlign: "left" }}>
                    {product.formatPrice !== "unavailable"
                      ? Local_Number(product.formatPrice)
                      : t("unavailable")}
                    <span
                      style={{
                        fontSize: "14px",
                        marginRight: "5px",
                        marginLeft: "5px",
                      }}
                    >
                      {product.formatPrice === "unavailable"
                        ? ""
                        : t("currency")}
                    </span>
                  </Typography>
                  {showBuyIcon && product.formatPrice !== "unavailable" ? (
                    <span
                      style={{
                        display: "flex",
                        marginTop: "-20px",
                        marginRight: "-9px",
                      }}
                    >
                      <BuyBtnIcon product={product} />
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <>
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
                    {Local_Number(product.offPercent)}
                  </span>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    component="span"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {Local_Number(product.formatPrice)}
                  </Typography>
                  <div>
                    <Typography component="span" sx={{ textSlign: "left" }}>
                      {Local_Number(product.formatOffPrice)}
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
                    {showBuyIcon ? (
                      <span
                        style={{
                          display: "flex",
                          marginTop: "-47px",
                          marginRight: "-9px",
                        }}
                      >
                        <BuyBtnIcon product={product} />
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </div>
        </Card>
      </StyledBadge>
    </div>
  );
}

export default Product;
