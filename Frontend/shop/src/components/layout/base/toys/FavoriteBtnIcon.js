import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";

import { GetValueLocalStorage } from "/src/localStorage";
import { checkFavorite, addToFavorite } from "/src/network/fetchData/shop";
import DialogLogin from "/src/components/user/form/dialogLogin";

export default function FavoriteBtnIcon({ productId }) {
  let userStorage = GetValueLocalStorage("token");
  const [user, setUSer] = useState(userStorage);
  useEffect(() => {
    setUSer(userStorage);
  }, [userStorage]);

  var [mode, setMode] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (user) {
      async function checkIsFav() {
        const data = await checkFavorite(productId);
        setMode(data.favorite);
      }
      checkIsFav();
    }
  }, []);

  const toggle = () => {
    if (user) {
      let flag = mode === true ? false : true;
      setMode(flag);

      async function addToFav() {
        await addToFavorite(productId, flag ? 1 : 0);
      }
      addToFav();
    }
  };

  return (
    <div>
      <IconButton
        aria-label="Favorite"
        onClick={toggle}
        sx={{ color: "#cc0202" }}
      >
        {user ? (
          <>
            {mode ? (
              <FavoriteIcon className="icon" />
            ) : (
              <FavoriteBorderIcon className="icon" />
            )}
          </>
        ) : (
          <>
            <FavoriteBorderIcon
              className="icon"
              onClick={() => setOpenDialog(true)}
            />
            <DialogLogin
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              setMode={setMode}
            />
          </>
        )}
      </IconButton>
    </div>
  );
}
