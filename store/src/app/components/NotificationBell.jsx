import React from "react";
import { IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationBell = ({ count }) => {
  return (
    <IconButton color="inherit">
      <Badge badgeContent={count} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};

export default NotificationBell;
