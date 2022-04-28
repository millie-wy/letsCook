import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import comment from "../../../assets/logoAndIcons/comment.svg";
import star from "../../../assets/logoAndIcons/star.svg";
import { getAvgRating, makeRequest } from "../../../helper.js";

const RandomRecipeCard = () => {
  const [recipe, setRecipe] = useState();
  const [isLoading, setIsLoading] = useState({});

  useEffect(() => {
    if (recipe === undefined) {
      setIsLoading(true);
    }
    /** get a random recipe from the recipe db */
    const fetchRandomRecipe = async () => {
      let response = await makeRequest("/api/recipes", "GET");
      let random = response[Math.floor(Math.random() * response.length)];
      setRecipe(random);
      setIsLoading(false);
    };
    fetchRandomRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Container sx={{ height: "calc(100vh - 8rem)", mt: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    </Container>
  ) : (
    <Container
      sx={{
        display: "flex",
        gap: "3rem 6rem",
        justifyContent: "center",
        paddingBottom: "4rem",
      }}
    >
      <Card sx={cardStyle} key={recipe.title}>
        <CardMedia
          component="img"
          height="220px"
          src={recipe.image}
          title={recipe.title}
          sx={{ borderRadius: 8 }}
        />
        <Box
          sx={{
            background: "white",
            height: 200,
            borderRadius: 8,
            mt: "1rem",
            boxSizing: "border-box",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 600,
              }}
              gutterBottom
              variant="body2"
            >
              {recipe.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 300,
                color: "#989C9C",
                fontSize: ".7rem",
              }}
              gutterBottom
              variant="body2"
            >
              {recipe.description}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Link
              to={`/recipe/${recipe.title.replaceAll(" ", "-")}`}
              state={{
                id: recipe._id,
                rating: getAvgRating(recipe.comments),
              }}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  fontFamily: "Poppins",
                  letterSpacing: "none",
                  fontSize: ".7rem",
                  fontWeight: "600",
                  bgcolor: "white",
                  color: "#0B814A",
                  border: "1.2px solid #0B814A",
                  textTransform: "capitalize",
                  borderRadius: 10,
                  boxShadow: "none",
                }}
              >
                To recipe
              </Button>
            </Link>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: ".3rem",
                placeItems: "center",
              }}
            >
              <Box
                component="img"
                style={{ height: "15px" }}
                src={star}
                alt="rating"
              />
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  color: "#E5C687",
                  fontSize: ".9rem",
                  margin: "auto",
                }}
                gutterBottom
                variant="body2"
              >
                {getAvgRating(recipe.comments)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: ".3rem",
                placeItems: "center",
              }}
            >
              <Box
                component="img"
                style={{ height: "18px" }}
                src={comment}
                alt="comment"
              />
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  color: "#E5C687",
                  fontSize: ".9rem",
                  margin: "auto",
                }}
                gutterBottom
                variant="body2"
              >
                {recipe.comments.length}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

const cardStyle = {
  width: 300,
  boxShadow: "none",
  background: "none",
};

export default RandomRecipeCard;
