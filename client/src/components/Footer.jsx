import { Box, Typography, Container } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        m: "1rem auto 1rem auto",
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
          sx={{
            cursor: "pointer",
            fontFamily: "Poppins",
            fontSize: { xs: "10px", sm: "12px", md: "14px" },
            wordWrap: "normal",
          }}
        >
          Terms & Conditions
        </Typography>
        <Typography
          variant="body2"
          sx={{
            cursor: "pointer",
            fontFamily: "Poppins",
            fontSize: { xs: "10px", sm: "12px", md: "14px" },
          }}
        >
          Privacy Policy
        </Typography>
        <Typography
          variant="body2"
          sx={{
            cursor: "pointer",
            fontFamily: "Poppins",
            fontSize: { xs: "10px", sm: "12px", md: "14px" },
          }}
        >
          Contact
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="body2"
          sx={{
            cursor: "pointer",
            fontFamily: "Poppins",
            fontSize: { xs: "10px", sm: "12px", md: "14px" },
          }}
        >
          Lets Cook © 2022
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
