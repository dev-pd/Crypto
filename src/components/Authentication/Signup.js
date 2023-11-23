import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";

export default function Signup(handleClose) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

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
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmpassword}
        onChange={(e) => setConfirmpassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="containeed"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}>
        Sign Up
      </Button>
    </Box>
  );
}
