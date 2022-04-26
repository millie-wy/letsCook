import { Container, Typography } from "@mui/material";
import React from "react";

const RecipeLiked = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        minHeight: 200,
        placeContent: "center",
        placeItems: "center",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontFamily: "Poppins",
          fontWeight: 500,
        }}
      >
        You have not liked any recipes yet.
      </Typography>
    </Container>
  );
};

export default RecipeLiked;
