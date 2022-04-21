import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
// @ts-ignore
import data from "../../../data.json";
// @ts-ignore
import star from "../../../assets/logoAndIcons/star.svg";
// @ts-ignore
import time from "../../../assets/logoAndIcons/time.svg";
// @ts-ignore
import portion from "../../../assets/logoAndIcons/portion.svg";
// @ts-ignore
import ingredient from "../../../assets/logoAndIcons/ingredient.svg";

const RecipeDetailPage = () => {
  const params = useParams();
  const recipe = data.find(
    (recipe) => recipe.title.replaceAll(" ", "-") === params?.recipe
  );

  const postStars = () => {
    for (let i = 0; i < 5; i++) {
      return (
        <Box
          component="img"
          style={{ height: "15px" }}
          src={star}
          alt={`rating${i}`}
        />
      );
    }
  };

  return (
    <Container sx={{ minHeight: "calc(100vh - 8rem)", mt: "2rem" }}>
      <Container sx={{ background: "white", borderRadius: 5 }}>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: { md: "column", lg: "row" },
            padding: "2rem 1rem",
          }}
        >
          <Box
            component="img"
            height="300px"
            src={recipe.image}
            title={recipe.title}
            sx={{ borderRadius: 8 }}
          />
          <Box sx={{ padding: "1rem" }}>
            <Typography
              variant="h5"
              sx={{ fontFamily: "Poppins", fontWeight: 600 }}
            >
              {recipe.title}
            </Typography>
            <Box sx={{ my: ".5rem" }}>{postStars()}</Box>
            <Typography variant="body2" sx={{ fontFamily: "Poppins" }}>
              {recipe.description}
            </Typography>
            <Box>
              <Box
                component="img"
                style={{ height: "30px" }}
                src={time}
                alt="time"
              />
              <Box
                component="img"
                style={{ height: "30px" }}
                src={portion}
                alt="portion"
              />{" "}
              <Box
                component="img"
                style={{ height: "30px" }}
                src={ingredient}
                alt="ingredient"
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default RecipeDetailPage;
