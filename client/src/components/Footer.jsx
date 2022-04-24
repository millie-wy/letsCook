import { Box, Typography, Container } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        m: "0 auto 1rem auto",
        color: "#B6D5D5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <Typography
          variant="body2"
          sx={{ cursor: "pointer", fontFamily: "Poppins" }}
        >
          Terms & Conditions
        </Typography>
        <Typography
          variant="body2"
          sx={{ cursor: "pointer", fontFamily: "Poppins" }}
        >
          Privacy Policy
        </Typography>
        <Typography
          variant="body2"
          sx={{ cursor: "pointer", fontFamily: "Poppins" }}
        >
          Contact
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="body2"
          sx={{ cursor: "pointer", fontFamily: "Poppins" }}
        >
          Lets Cook © 2022
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
