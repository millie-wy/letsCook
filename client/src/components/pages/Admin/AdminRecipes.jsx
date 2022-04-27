import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import comment from "../../../assets/logoAndIcons/comment.svg";
import { makeRequest } from "../../../helper";

const AdminRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const matches = useMediaQuery("(max-width:500px)");

  useEffect(() => {
    const fetchData = async () => {
      let response = await makeRequest("/api/recipes", "GET");
      setRecipes(response);
    };
    fetchData();
  }, []);

  const getAvgRating = (comments) => {
    let rated = [];
    comments.map((comment) => rated.push(comment.rated));
    let avg = rated.reduce((a, b) => a + b, 0) / comments.length || 0;
    return avg.toFixed(1);
  };

  return recipes.length < 1 ? (
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
    <Container sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography
        variant="body1"
        sx={{
          fontFamily: "Poppins",
          lineHeight: 1.5,
          fontWeight: 600,
          mx: ".5rem",
        }}
      >
        Here you can see all recipes, Click "To recipe" to{" "}
        <span style={{ color: "#0B814A" }}>edit</span> or{" "}
        <span style={{ color: "#FF5858" }}>delete</span> them.
      </Typography>
      {/* profile recipe card - delete the second card and fetch and map to be used here */}
      {recipes.map((recipe) => (
        <Container
          key={recipe._id}
          sx={{
            background: "white",
            borderRadius: 5,
            py: "1.5rem",
            w: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "2rem",
            }}
          >
            <Box
              width="100%"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    lineHeight: 1,
                    mb: ".5rem",
                  }}
                >
                  {recipe.title}
                </Typography>
                {matches && (
                  <Box
                    component="img"
                    src={recipe.image}
                    alt={recipe.title}
                    sx={{
                      objectFit: "cover",
                      borderRadius: "20px",
                      height: { xs: "100px", sm: "150px", md: "150px" },
                      width: { xs: "70%", sm: "100%", md: "100%" },
                    }}
                  />
                )}
                <Typography
                  variant="body2"
                  color="#989C9C"
                  sx={{
                    fontFamily: "Poppins",
                    mb: ".5rem",
                  }}
                >
                  {recipe.description}
                </Typography>
              </Box>
              <Box
                width="95%"
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
                ></Box>
              </Box>
            </Box>{" "}
            {!matches && (
              <Box
                width="30%"
                minWidth="140px"
                sx={{
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={recipe.image}
                  alt={recipe.title}
                  sx={{
                    objectFit: "cover",
                    borderRadius: "20px",
                    height: { xs: "100px", sm: "150px", md: "150px" },
                    width: { xs: "70%", sm: "100%", md: "100%" },
                  }}
                />
              </Box>
            )}
          </Box>
        </Container>
      ))}

      {/* create recipe button  */}
      <Link to={`/recipe/create`} style={{ textDecoration: "none" }}>
        <Button
          sx={{
            backgroundColor: "#0B814A",
            color: "#F1F8F6",
            fontFamily: "Poppins",
            borderRadius: "70px",
            border: "none",
            width: "fit-content",
            fontSize: ".7rem",
            marginBottom: "1rem",
            px: "1rem",
            transition: "all .15s ease-in-out",
            textTransform: "none",
            alignSelf: "end",
            "&:hover": {
              background: "#0AA35C",
              transform: "scale(1.01)",
            },
          }}
        >
          <Add fontSize="small" sx={{ mr: ".2rem" }} />
          Create new recipe
        </Button>
      </Link>
    </Container>
  );
};

export default AdminRecipes;
