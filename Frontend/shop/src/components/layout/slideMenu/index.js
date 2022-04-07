import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Stack,
} from "@mui/material";
import {
  Home as HomeIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Copyright as CopyrightIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Book as BookIcon,
  Favorite as FavoriteIcon,
  AccountBox as AccountBoxIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Category as CategoryIcon,
  CardGiftcard as CardGiftcardIcon,
  ShoppingBag as ShoppingBagIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";
import { GetValueLocalStorage } from "/src/localStorage";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function CustomLink({ link, name, icon, onclick }) {
  return (
    <>
      <Link href={link} passHref>
        <ListItem button component="a" onClick={onclick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      </Link>
    </>
  );
}

export default function SlideMenu() {
  const globalContext = UseGlobalContext();
  const { t } = useTranslation(["public"]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  let closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  let userStorage = GetValueLocalStorage("token");
  const [user, setUSer] = useState(userStorage);
  useEffect(() => {
    setUSer(userStorage);
  }, [userStorage]);

  let backColor = globalContext.theme.color === "dark" ? "#505050" : "#d4d4d4";

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          width: 240,
          minHeight: "50px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <List
          sx={{ width: "100%", direction: globalContext.culture.direction }}
          className={globalContext.culture.language}
        >
          <Divider />
          <DrawerHeader sx={{ backgroundColor: backColor }}>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <>
            <CustomLink
              link={"/"}
              name={t("home")}
              icon={<HomeIcon />}
              onclick={closeDrawer}
            />

            {user ? (
              <>
                <CustomLink
                  link={"/user/profile"}
                  name={t("profile")}
                  icon={<AccountBoxIcon />}
                  onclick={closeDrawer}
                />

                <CustomLink
                  link={"/user/favorites"}
                  name={t("favorites")}
                  icon={<FavoriteIcon />}
                  onclick={closeDrawer}
                />

                <CustomLink
                  link={"/user/orders"}
                  name={t("orders")}
                  icon={<ShoppingBagIcon />}
                  onclick={closeDrawer}
                />

                <CustomLink
                  link={"/user/logout"}
                  name={t("logout")}
                  icon={<LogoutIcon />}
                  onclick={closeDrawer}
                />
              </>
            ) : (
              <CustomLink
                link={"/user/login"}
                name={t("login")}
                icon={<LoginIcon />}
                onclick={closeDrawer}
              />
            )}
          </>
          <Divider />

          <CustomLink
            link={"/products/category"}
            name={t("categories")}
            icon={<CategoryIcon />}
            onclick={closeDrawer}
          />

          <CustomLink
            link={"/products"}
            name={t("products")}
            icon={<CardGiftcardIcon />}
            onclick={closeDrawer}
          />

          <Divider />

          <CustomLink
            link={"/blog"}
            name={t("blog")}
            icon={<BookIcon />}
            onclick={closeDrawer}
          />

          <Divider />
        </List>
        <div
          style={{
            position: "fixed",
            bottom: "0rem",
            fontSize: "12px",
            width: 240,
            paddingBottom: "10px",
            backgroundColor: backColor,
          }}
        >
          <Divider flexItem />
          <Stack
            direction="row"
            sx={{
              paddingTop: "20px",
              paddingBottom: "15px",
            }}
          >
            <ListItemIcon>
              <TwitterIcon
                sx={{ ml: 7, cursor: "pointer" }}
                onClick={() =>
                  window.open("https://twitter.com/HamidBarkand", "_blank")
                }
              />
              <GitHubIcon
                sx={{ ml: 3, mr: 3, cursor: "pointer" }}
                onClick={() =>
                  window.open("https://github.com/barkand", "_blank")
                }
              />
              <LinkedInIcon
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  window.open("https://www.linkedin.com/in/barkand", "_blank")
                }
              />
            </ListItemIcon>
          </Stack>
          <Stack direction="row" sx={{ ml: 8 }}>
            Next Shop
            <CopyrightIcon
              sx={{
                ml: 0.3,
                mr: 0.3,
                fontSize: 15,
                backgroundColor: backColor,
              }}
            />
            2022
          </Stack>
        </div>
      </Drawer>
    </>
  );
}
