import { useState, useEffect } from "react";
import { Badge, Menu, MenuItem } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";

import { Local_Number } from "/src/functions/Convert";
import { getNotifications } from "/src/network/fetchData/user";

export default function NotificationsBtnIcon() {
  // Badge Counter
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    async function fetchNotifications() {
      const data = await getNotifications();
      setNotifications(data);
    }
    fetchNotifications();
  }, []);

  // Badge Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Badge
        badgeContent={notifications ? Local_Number(notifications.length) : 0}
        color="error"
        sx={{ marginLeft: "15px", cursor: "pointer", marginTop: "5px" }}
        onClick={handleMenu}
        aria-controls="menu-appbar"
        aria-haspopup="true"
      >
        <NotificationsIcon />
      </Badge>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleClose}>
            {notification.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
