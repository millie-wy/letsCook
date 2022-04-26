import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import RandomRecipeCard from "./RandomRecipeCard";

const RecipeStartPage = () => {
  return (
    <Container
      sx={{
        minHeight: "calc(100vh - 5.5rem)",
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: { xs: 1, sm: 1, md: "60%" },
          minHeight: "500px",
          placeItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{
              color: "#2E4739",
              fontWeight: "900",
              fontFamily: "Poppins",
              textShadow: "0px 1px, 1px 0px, 1px 1px #2E4739",
            }}
          >
            What do you
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: "#2E4739",
              fontWeight: "900",
              fontFamily: "Poppins",
              textShadow: "0px 1px, 1px 0px, 1px 1px #2E4739",
            }}
          >
            want to eat
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: "#E5C687",
              fontWeight: "900",
              fontFamily: "Poppins",
              textShadow: "0px 1px, 1px 0px, 1px 1px #E5C687",
            }}
          >
            tonight<span style={{ color: "#2E4739" }}>?</span>
          </Typography>
        </Box>
        <Link to={"/search"} style={{ textDecoration: "none" }}>
          <Button
            sx={{
              backgroundColor: "#0B814A",
              color: "#F1F8F6",
              fontFamily: "Poppins",
              borderRadius: "70px",
              fontWeight: "bold",
              border: "none",
              height: "3rem",
              width: "350px",
              fontSize: "1.2rem",
              mt: "3rem",
              cursor: "pointer",
              transition: "all .15s ease-in-out",
              "&:hover": {
                background: "#0AA35C",
                transform: "scale(1.01)",
              },
            }}
          >
            Explore recipes
          </Button>
        </Link>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: { xs: 1, sm: 1, md: "40%" },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#2E4739",
            fontWeight: "900",
            fontFamily: "Poppins",
            mb: "1rem",
          }}
        >
          Recipe you may like
        </Typography>
        <RandomRecipeCard />
      </Box>
    </Container>
  );
};

export default RecipeStartPage;
