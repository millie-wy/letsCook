import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ingredient from "../../../assets/logoAndIcons/ingredient.svg";
import portion from "../../../assets/logoAndIcons/portion.svg";
import star from "../../../assets/logoAndIcons/star.svg";
import time from "../../../assets/logoAndIcons/time.svg";
import { makeRequest } from "../../../helper.js";

const RecipeDetailPage = (props) => {
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
