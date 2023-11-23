import React, { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";

export default function Login(handleClose) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="containeed"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}>
        Login
      </Button>
    </Box>
  );
}
