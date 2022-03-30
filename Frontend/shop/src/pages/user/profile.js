import { useState, useEffect } from "react";
import { Avatar, Box, Grid, Typography, Divider } from "@mui/material";
import {
  Favorite as FavoriteIcon,
  AddShoppingCart as AddShoppingCartIcon,
  Logout as LogoutIcon,
  ShoppingBag as ShoppingBagIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";

import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";
import { getProfile } from "/src/network/fetchData/user";
import StyledSvgButton from "/src/theme/styled/styledSvgButton";
import { GetValueLocalStorage } from "/src/localStorage";

export default function ProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation(["public"]);
  const globalContext = UseGlobalContext();

  const [profile, setProfile] = useState({});
  useEffect(() => {
    if (!GetValueLocalStorage("token")) {
      router.push("/user/login");
    } else {
      async function fillProfile() {
        const response = await getProfile();
        setProfile(response);
      }
      fillProfile();
    }
  }, [globalContext.culture.language]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          maxWidth: "1366px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <Grid item xs="auto">
          <Avatar
            alt={profile.name}
            src={profile.image}
            sx={{
              bgcolor: "gray",
              width: "20vh",
              height: "20vh",
              marginX: "10px",
              fontSize: "10vh",
            }}
          />
        </Grid>
        <Grid item xs>
          <Box>
            <Box>
              <Typography variant="h4" color="primary" component="p">
                {profile.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="textSecondary" component="p">
                {profile.username}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="textSecondary" component="p">
                {profile.email}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Divider
        orientation="horizontal"
        variant="middle"
        sx={{ marginTop: "10px" }}
      />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        mt={10}
        mb={10}
      >
        <Link href="/user/favorites" passHref>
          <a>
            <StyledSvgButton
              title={t("favorites")}
              icon={<FavoriteIcon sx={{ fontSize: "2.5rem" }} />}
            />
          </a>
        </Link>
        <Link href="/cart" passHref>
          <a>
            <StyledSvgButton
              title={t("cart")}
              icon={<AddShoppingCartIcon sx={{ fontSize: "2.5rem" }} />}
            />
          </a>
        </Link>
        <Link href="/user/orders" passHref>
          <a>
            <StyledSvgButton
              title={t("orders")}
              icon={<ShoppingBagIcon sx={{ fontSize: "2.5rem" }} />}
            />
          </a>
        </Link>
        <Link href="/user/logout" passHref>
          <a>
            <StyledSvgButton
              title={t("logout")}
              icon={<LogoutIcon sx={{ fontSize: "2.5rem" }} />}
            />
          </a>
        </Link>
      </Grid>
    </>
  );
}
