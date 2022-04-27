import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import comment from "../../../assets/logoAndIcons/comment.svg";
import { getAvgRating, makeRequest } from "../../../helper";
import { useAccount } from "../../context/AccountContext";

const ProfilePosts = () => {
  const { currentUser } = useAccount();
  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    if (currentUser === undefined) {
      setIsLoading(true);
    } else {
      const fetchUsersRecipes = async () => {
        let response = await makeRequest("/api/recipes", "GET");
        let recipesWithAuthor = response.filter(
          (recipe) => recipe.author !== undefined
        );
        let myPosts = recipesWithAuthor.filter(
          (recipe) => recipe.author.id === currentUser.id
        );
        setMyPosts(myPosts);
      };
      fetchUsersRecipes();
    }
  }, [currentUser]);

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
  ) : myPosts.length < 1 ? (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        minHeight: 200,
        placeContent: "center",
        placeItems: "center",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontFamily: "Poppins",
          fontWeight: 500,
        }}
      >
        You have not created any recipes yet.
      </Typography>
      <Link to="/recipe/create" style={{ textDecoration: "none" }}>
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
  ) : (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {myPosts.map((recipe) => (
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
              width="70%"
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
                >
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
            </Box>
            <Box
              width="30%"
              minWidth="140px"
              sx={{
                borderRadius: "20px",
              }}
            >
              <Box
                height="150px"
                width="100%"
                component="img"
                src={recipe.image}
                alt={recipe.title}
                sx={{
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
            </Box>
          </Box>
        </Container>
      ))}
      {/* create recipe button  */}
      <Link to="/recipe/create" style={{ textDecoration: "none" }}>
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

export default ProfilePosts;
