import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ingredient from "../../../assets/logoAndIcons/ingredient.svg";
import portion from "../../../assets/logoAndIcons/portion.svg";
import star from "../../../assets/logoAndIcons/star.svg";
import time from "../../../assets/logoAndIcons/time.svg";
import { makeRequest } from "../../../helper.js";

const RecipeDetailPage = () => {
  const [recipe, setRecipe] = useState([]);
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      let response = await makeRequest(`/api/recipes/${id}`, "GET");
      setRecipe(response);
    };
    fetchData();
  }, [id]);

  console.log(recipe);

  const postStars = () => {
    for (let i = 0; i < 5; i++)
      return (
        <Box
          component="img"
          style={{ height: "20px" }}
          src={star}
          alt={`rating${i}`}
        />
      );
  };

  return recipe.length < 1 ? (
    <Container> Nothing to show</Container>
  ) : (
    <Container sx={{ minHeight: "calc(100vh - 8rem)", mt: "2rem" }}>
      <Container sx={{ background: "white", borderRadius: 5 }}>
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
          <Box
            component="img"
            width="100%"
            maxWidth="400px"
            height="400px"
            src={recipe.image}
            title={recipe.title}
            sx={{ borderRadius: 5, m: "auto", objectFit: "cover" }}
          />

          {/* upper: intro */}
          <Box sx={{ padding: "1rem" }}>
            <Typography
              variant="h5"
              sx={{ fontFamily: "Poppins", fontWeight: 600 }}
            >
              {recipe.title}
            </Typography>
            <Box sx={{ my: "1rem" }}>{postStars()}</Box>
            <Typography
              variant="subtitle1"
              sx={{ my: "2rem", fontFamily: "Poppins" }}
            >
              {recipe.description}
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
                  {recipe.cookingMinute} min
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
                  {recipe.servings} portions
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
                  {recipe.ingredients.length} ingredients
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
            {/* <Typography>Ingredients</Typography> */}
            {recipe.ingredients.map((ingredient) => (
              <Box
                key={ingredient}
                sx={{
                  mt: ".7rem",
                  color: "#0B814A",
                  borderBottom: "1px solid #C4C4C4",
                }}
              >
                {ingredient}
              </Box>
            ))}
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
            <ol>
              {recipe.direction.map((step) => (
                <Box key={step} sx={{ mt: "1rem" }}>
                  <li>{step}</li>
                </Box>
              ))}
            </ol>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default RecipeDetailPage;
