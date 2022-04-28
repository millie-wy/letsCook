import { ArrowBackIosNew, NoFood } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RandomRecipeCard from "./RecipeStart/RandomRecipeCard";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        minHeight: "calc(100vh - 7.5rem)",
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
        <Box sx={{ p: "1rem" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              py: "2rem",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "#2E4739",
                fontWeight: "900",
                fontFamily: "Poppins",
                textShadow: "0px 1px, 1px 0px, 1px 1px #2E4739",
              }}
            >
              Sorry...
            </Typography>
            <NoFood sx={{ color: "#2E4739", fontSize: "3rem" }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              color: "#2E4739",
              fontWeight: "900",
              fontFamily: "Poppins",
              textShadow: "0px 1px, 1px 0px, 1px 1px #2E4739",
            }}
          >
            This page does not exist.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#2E4739",
              fontWeight: "500",
              fontFamily: "Poppins",
              textShadow: "0px 1px, 1px 0px, 1px 1px #2E4739",
            }}
          >
            Try a new url or go pack to{" "}
            <Box
              component="span"
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "#2E4739",
                "&:hover": {
                  color: "#E5C687",
                },
              }}
              onClick={() => navigate(-1)}
            >
              previous
            </Box>{" "}
            page.
          </Typography>
        </Box>
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

export default NotFound;
