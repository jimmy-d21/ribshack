import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login:", username, password);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper sx={{ p: 4, width: 300 }}>
        <Typography variant="h5" gutterBottom>
          Store Login
        </Typography>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
