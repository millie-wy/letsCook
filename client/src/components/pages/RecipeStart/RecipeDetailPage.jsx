import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ingredient from "../../../assets/logoAndIcons/ingredient.svg";
import portion from "../../../assets/logoAndIcons/portion.svg";
import time from "../../../assets/logoAndIcons/time.svg";
import { makeRequest } from "../../../helper.js";
import StarRatings from "react-star-ratings";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const RecipeDetailPage = () => {
  const [recipe, setRecipe] = useState([]);
  const location = useLocation();
  const { id } = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let response = await makeRequest(`/api/recipes/${id}`, "GET");
      setRecipe(response);
    };
    fetchData();
  }, [id]);

  return recipe.length < 1 ? (
    <Container
      sx={{ minHeight: "calc(100vh - 8rem)", mt: "2rem", textAlign: "center" }}
    >
      Something went wrong. Try refreshing the page.
    </Container>
  ) : (
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
              sx={{ fontFamily: "Poppins", fontWeight: 600, mb: "1rem" }}
            >
              {recipe.title}
            </Typography>
            <StarRatings
              // rating={recipe.star}
              rating={recipe.star}
              starDimension="35px"
              starSpacing="5px"
              starRatedColor="#E5C687"
              starEmptyColor="#B6D5D5"
              svgIconPath="M15.0979 1.8541C15.6966 0.011476 18.3034 0.0114803 18.9021 1.8541L21.4903 9.81966C21.758 10.6437 22.5259 11.2016 23.3924 11.2016H31.7679C33.7053 11.2016 34.5109 13.6809 32.9434 14.8197L26.1675 19.7426C25.4666 20.2519 25.1732 21.1547 25.441 21.9787L28.0292 29.9443C28.6279 31.7869 26.5189 33.3191 24.9515 32.1803L18.1756 27.2574C17.4746 26.7481 16.5254 26.7481 15.8244 27.2574L9.04852 32.1803C7.48109 33.3191 5.37213 31.7869 5.97084 29.9443L8.559 21.9787C8.82675 21.1547 8.53344 20.2519 7.83246 19.7426L1.05655 14.8197C-0.510878 13.6809 0.294677 11.2016 2.23212 11.2016H10.6076C11.4741 11.2016 12.242 10.6437 12.5097 9.81966L15.0979 1.8541Z"
            />
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
      <Container
        sx={{
          background: "white",
          borderRadius: 5,
          mt: "2rem",
          textAlign: "center",
          p: "2rem 1rem",
        }}
      >
        <Typography
          variant="h4"
          color="#0B814A"
          sx={{ fontFamily: "Poppins", fontWeight: 500 }}
        >
          What do others say about this recipe?
        </Typography>
        {recipe.comments.length < 1 ? (
          <Container
            sx={{
              mt: "2rem",
              textAlign: "center",
            }}
          >
            No one has commented on this recipe yet.
          </Container>
        ) : (
          // the below is not done
          recipe.comments.map((comment) => (
            <Box key={comment} sx={{ mt: "1rem" }}>
              {comment}
            </Box>
          ))
        )}
      </Container>
    </Container>
  );
};

export default RecipeDetailPage;
