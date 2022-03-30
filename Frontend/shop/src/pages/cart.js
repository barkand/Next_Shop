import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  Grid,
  Paper,
  IconButton,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Tooltip,
  Alert,
  NoSsr,
} from "@mui/material";
import {
  AddCircle as AddCircleIcon,
  RemoveCircle as RemoveCircleIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";
import { Local_Number } from "/src/functions/Convert";
import {
  addToCart,
  removeFromCart,
  removeAllFromCart,
} from "/src/redux/actions";
import { StyledTableCell, StyledTableRow } from "/src/theme/styled/styledTable";
import RecommendProducts from "/src/components/shop/sections/RecommendProducts";

function CartScreen() {
  const globalContext = UseGlobalContext();
  const { t } = useTranslation(["product"]);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const rows = cart.addedIds.map((id) => {
    const product = cart.products[id];
    return {
      id: id,
      title: product.title,
      price: product.price,
      formatPrice: product.formatPrice,
      offPrice: product.offPrice,
      formatOffPrice: product.formatOffPrice,
      image: product.image,
      quantity: product.quantity,
      sumPrice: product.sumPrice,
      sumOffPrice: product.sumOffPrice,
      slug: product.slug,
    };
  });

  return (
    <>
      <Grid
        sx={{
          maxWidth: "1366px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: "1%",
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingBottom: "5%",
        }}
      >
        <center>
          <h1>{t("cartList")}</h1>
          <NoSsr>
            <div style={{ minHeight: 400, width: "100%" }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell align="center">
                        {t("code")}
                      </StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center">
                        {t("title")}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {t("price")}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {t("quantity")}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {t("sumPrice")}
                      </StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows && rows.length > 0 ? (
                      rows.map((row, i) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell
                            align={globalContext.culture.revertAlign}
                          >
                            {Local_Number(i + 1)}
                          </StyledTableCell>

                          <StyledTableCell
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {Local_Number(row.id)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Link
                              href={`/products/${row.id}/${row.slug}`}
                              passHref
                            >
                              <a>
                                <Avatar
                                  src={row.image}
                                  alt={row.title}
                                  variant="square"
                                  sx={{ width: 56, height: 56 }}
                                ></Avatar>
                              </a>
                            </Link>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Link
                              href={`/products/${row.id}/${row.slug}`}
                              passHref
                            >
                              {row.title}
                            </Link>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <div
                              style={{
                                textDecoration:
                                  row.offPrice === 0 ? "" : "line-through",
                              }}
                            >
                              <span>
                                {row.price !== "unavailable"
                                  ? Local_Number(row.formatPrice)
                                  : t("unavailable")}
                              </span>
                              <span
                                style={{
                                  fontSize: "12px",
                                  marginRight: "5px",
                                  marginLeft: "5px",
                                }}
                              >
                                {row.price === "unavailable"
                                  ? ""
                                  : t("currency")}
                              </span>
                            </div>
                            {row.offPrice === 0 ? (
                              <></>
                            ) : (
                              <div>
                                <span>{Local_Number(row.formatOffPrice)}</span>
                                <span
                                  style={{
                                    fontSize: "12px",
                                    marginRight: "5px",
                                    marginLeft: "5px",
                                  }}
                                >
                                  {t("currency")}
                                </span>
                              </div>
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {Local_Number(row.quantity)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <div
                              style={{
                                textDecoration:
                                  row.offPrice === 0 ? "" : "line-through",
                              }}
                            >
                              <span>{Local_Number(row.sumPrice)}</span>
                              <span
                                style={{
                                  fontSize: "12px",
                                  marginRight: "5px",
                                  marginLeft: "5px",
                                }}
                              >
                                {t("currency")}
                              </span>
                            </div>
                            {row.offPrice === 0 ? (
                              <></>
                            ) : (
                              <div>
                                <span>{Local_Number(row.sumOffPrice)}</span>
                                <span
                                  style={{
                                    fontSize: "12px",
                                    marginRight: "5px",
                                    marginLeft: "5px",
                                  }}
                                >
                                  {t("currency")}
                                </span>
                              </div>
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Tooltip title={t("minus")}>
                              <IconButton
                                aria-label="delete"
                                color="error"
                                onClick={() => {
                                  dispatch(removeFromCart(row));
                                }}
                              >
                                <RemoveCircleIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t("add")}>
                              <IconButton
                                aria-label="add"
                                color="success"
                                onClick={() => {
                                  dispatch(addToCart(row));
                                }}
                              >
                                <AddCircleIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t("removeFromCart")}>
                              <IconButton
                                aria-label="delete all"
                                color="primary"
                                onClick={() => {
                                  dispatch(removeAllFromCart(row));
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8}>
                          <Alert severity="info">{t("emptyCart")}</Alert>
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow key="total">
                      <TableCell colSpan={5} rowSpan={3}></TableCell>
                      <TableCell align={globalContext.culture.revertAlign}>
                        {t("total")}
                      </TableCell>
                      <TableCell colSpan={2} align="center">
                        {Local_Number(cart.sum)}
                        <span
                          style={{
                            fontSize: "12px",
                            marginRight: "5px",
                            marginLeft: "5px",
                          }}
                        >
                          {cart.sum > 0 ? t("currency") : ""}
                        </span>
                      </TableCell>
                    </TableRow>

                    <TableRow key="discount">
                      <TableCell align={globalContext.culture.revertAlign}>
                        {t("totaldiscount")}
                      </TableCell>
                      <TableCell colSpan={2} align="center">
                        {Local_Number(cart.sum - cart.sumOff)}
                        <span
                          style={{
                            fontSize: "12px",
                            marginRight: "5px",
                            marginLeft: "5px",
                          }}
                        >
                          {cart.sum - cart.sumOff > 0 ? t("currency") : ""}
                        </span>
                      </TableCell>
                    </TableRow>

                    <TableRow key="totalPayment">
                      <TableCell align={globalContext.culture.revertAlign}>
                        {t("totalPayment")}
                      </TableCell>
                      <TableCell colSpan={2} align="center">
                        {Local_Number(cart.sumOff)}
                        <span
                          style={{
                            fontSize: "12px",
                            marginRight: "5px",
                            marginLeft: "5px",
                          }}
                        >
                          {cart.sumOff > 0 ? t("currency") : ""}
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </NoSsr>
        </center>
      </Grid>
      <RecommendProducts productIds={cart.addedIds} />
      <div style={{ paddingBottom: "5%" }} />
    </>
  );
}

export default CartScreen;
