import { ArrowBackIosNew } from "@mui/icons-material";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import ingredient from "../../../assets/logoAndIcons/ingredient.svg";
import portion from "../../../assets/logoAndIcons/portion.svg";
import time from "../../../assets/logoAndIcons/time.svg";
import userIcon from "../../../assets/logoAndIcons/usericon.svg";
import { makeRequest } from "../../../helper.js";
import { useAccount } from "../../context/AccountContext";

const RecipeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  return (
    <Container sx={{ minHeight: "calc(100vh - 8rem)", mt: "2rem" }}>
      <Container sx={{ background: "white", borderRadius: 5 }}>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            pt: "2rem",
            cursor: "pointer",
            color: "#2E4739",
            "&:hover": {
              color: "#E5C687",
            },
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNew fontSize="small" />
          <Typography
            variant="subtitle1"
            sx={{ fontFamily: "Poppins", fontWeight: 600, lineHeight: 1.2 }}
          >
            Back
          </Typography>
        </Box>
        {/* upper section */}
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
            padding: "2rem 1rem",
          }}
        >
          {/* upper: image */}
          <p>image</p>

          {/* upper: intro */}
          <Box sx={{ padding: "1rem" }}>
            <Typography
              variant="h5"
              sx={{ fontFamily: "Poppins", fontWeight: 600, mb: "1rem" }}
            >
              title with {id}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ my: "2rem", fontFamily: "Poppins" }}
            >
              description
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box
                  component="img"
                  style={{ height: "30px" }}
                  src={time}
                  alt="time"
                />
                <Typography
                  color="#0B814A"
                  variant="h6"
                  sx={{ mx: ".5rem", fontFamily: "Poppins" }}
                >
                  cooking min
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box
                  component="img"
                  style={{ height: "30px" }}
                  src={portion}
                  alt="servings"
                />
                <Typography
                  color="#0B814A"
                  variant="h6"
                  sx={{ mx: ".5rem", fontFamily: "Poppins" }}
                >
                  amount of portions
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box
                  component="img"
                  style={{ height: "30px" }}
                  src={ingredient}
                  alt="ingredient"
                />
                <Typography
                  color="#0B814A"
                  variant="h6"
                  sx={{ mx: ".5rem", fontFamily: "Poppins" }}
                >
                  amount of ingredients
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* middle section */}
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
            p: "1rem",
          }}
        >
          {/* middle: ingredients */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
              py: "1rem",
            }}
          >
            <Box
              key={ingredient}
              sx={{
                mt: ".7rem",
                color: "#0B814A",
                borderBottom: "1px solid #C4C4C4",
              }}
            >
              <p> insert here</p>
            </Box>
          </Box>

          {/* middle: directions */}
          <Box sx={{ p: "1rem" }}>
            <Typography
              variant="h5"
              color="#0B814A"
              sx={{ fontFamily: "Poppins", fontWeight: 500 }}
            >
              Directions
            </Typography>
            <p> insert here</p>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default RecipeForm;
