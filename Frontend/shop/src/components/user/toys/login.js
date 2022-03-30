import { useEffect } from "react";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import { Email as EmailIcon, VpnKey as VpnKeyIcon } from "@mui/icons-material";
import { useRouter } from "next/router";

import { useTranslation } from "react-i18next";
import { registerUser } from "/src/network/fetchData/user";
import { useDispatch } from "react-redux";
import { GetJsonLocalStorage, GetValueLocalStorage } from "/src/localStorage";
import { getCarts } from "/src/network/fetchData/shop";
import { addToCart } from "/src/redux/actions";
import UseGlobalContext from "/src/context/global";

export default function Login({ setCode, redirectTo, setOpenDialog, setMode }) {
  const { t } = useTranslation(["public"]);
  const globalContext = UseGlobalContext();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (GetValueLocalStorage("token")) {
      router.push("/");
    }
  }, []);

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      LoginSignin(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginSignin(e);
  };

  const SyncCartWithDatabase = async () => {
    let localProductIds = GetJsonLocalStorage("cart").addedIds;
    let databaseProducts = await getCarts(localProductIds);
    if (databaseProducts.length > 0) {
      databaseProducts.map((product) => {
        if (localProductIds != undefined)
          if (!localProductIds.includes(product.id)) {
            dispatch(addToCart(product, false));
          }
      });
    }
  };

  const LoginSignin = (e) => {
    let email = e.target.form[0].value;
    let password = e.target.form[1].value;
    if (email && password) {
      async function register() {
        try {
          const response = await registerUser(email, password);
          if (!response.data.error) {
            setCode("successLogin");
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("refresh", response.data.refresh);

            SyncCartWithDatabase();

            if (redirectTo) {
              router.push(redirectTo);
            }
            if (setOpenDialog) {
              setOpenDialog(false);
            }
            if (setMode) {
              setMode(true);
            }
          } else {
            setCode(response.data.error);
          }
        } catch (error) {
          setCode(error.response.status);
        }
      }

      register();
    }
  };

  return (
    <>
      <form onKeyDown={keyPress} className={globalContext.culture.language}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            paddingTop: "20px",
            paddingLeft: "60px",
            paddingRight: "60px",
            paddingBottom: "60px",
          }}
        >
          <Grid item xs={12} sx={{ marginBottom: "20px" }}>
            <Typography variant="h4" gutterBottom>
              {t("loginRegister")}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField id="Email" label={t("email")} variant="standard" />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <VpnKeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="Password"
                label={t("password")}
                type="password"
                autoComplete="current-password"
                variant="standard"
              />
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ minWidth: "120px" }}
              onMouseDown={handleSubmit}
            >
              {t("login")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
