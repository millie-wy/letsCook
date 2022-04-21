import { Box, Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
// @ts-ignore
import data from "../../../data.json";

const RecipeDetailPage = () => {
  const params = useParams();
  const recipe = data.find(
    (recipe) => recipe.title.replaceAll(" ", "-") === params?.recipe
  );

  return (
    <Container sx={{ minHeight: "calc(100vh - 8rem)", mt: "2rem" }}>
      Recipe Detail Page - this page is for:
      <h3>{recipe.title}</h3>
      <Box
        component="img"
        height="180px"
        src={recipe.image}
        title={recipe.title}
        sx={{ borderRadius: 8 }}
      />
      <p>{recipe.description}</p>
    </Container>
  );
};

export default RecipeDetailPage;
