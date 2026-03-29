import React from "react";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";

const Layout = ({ children, title }) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>{children}</Box>
    </Box>
  );
};

export default Layout;
