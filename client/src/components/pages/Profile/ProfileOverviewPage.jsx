import { Box, Container, Typography, Button, ButtonGroup } from "@mui/material";
import userIcon from "../../../assets/logoAndIcons/usericon.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProfilePosts from "./ProfilePosts";
import RecipeLiked from "./RecipeLiked";

const ProfileOverviewPage = () => {
  const [selectedContent, setSelectedContent] = useState("recipes");

  return (
    <Container sx={{ minHeight: "calc(100vh - 8rem)", mt: "2rem" }}>
      <Box
        sx={{ display: "flex", flexDirection: "row", gap: ".5rem", px: "1rem" }}
      >
        {/* heading */}
        <Typography
          color="#E5C687"
          variant="h4"
          sx={{ fontFamily: "Poppins", fontWeight: 800 }}
        >
          My <span style={{ color: "#2E4739" }}>Profile</span>
        </Typography>
      </Box>

      <Box
        sx={{ mt: "4rem", display: "flex", flexDirection: "row", gap: "1rem" }}
      >
        {/* left - user details  */}
        <Container
          sx={{
            background: "white",
            borderRadius: 5,
            pt: "2rem",
            width: 300,
            position: "relative",
            minHeight: 500,
          }}
        >
          <Box
            sx={{
              background: "white",
              borderRadius: 50,
              width: 120,
              height: 120,
              overflow: "hidden",
              position: "absolute",
              left: "50%",
              top: "-50px",
              transform: "translateX(-50%)",
            }}
          >
            <Box
              component="img"
              style={{ height: "120px" }}
              src={userIcon}
              alt="LetsCook"
            />
          </Box>
          <Box
            sx={{
              height: "90%",
              py: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                mt: "60px",
                color: "#2E4739",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  mb: "1rem",
                }}
              >
                William Saar
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: "Poppins", lineHeight: 1.2 }}
              >
                Welcome to my profile! I am a self taught cook who specialies in
                fast food. I hope you’ll like my recipes, and if not, feel free
                to comment!
              </Typography>
            </Box>
            <Box>
              <Link
                to="/"
                // to={`/recipe/${recipe.title.replaceAll(" ", "-")}`} // to be adjusted
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
            </Box>
          </Box>
        </Container>

        {/* right - user contents  */}
        <Box sx={{ display: "flex", flexDirection: "column", width: 1 }}>
          <ButtonGroup
            value={selectedContent}
            orientation="horizontal"
            aria-label="horizontal text button group"
            variant="string"
            sx={{ py: ".5rem" }}
          >
            <Button
              disableRipple
              key="one"
              sx={{
                textTransform: "capitalize",
                color: selectedContent === "recipes" ? "#0B814A" : "#989C9C",
                "&:hover": {
                  color: "#0B814A",
                  background: "none",
                },
              }}
              onClick={() => setSelectedContent("recipes")}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Poppins",
                  lineHeight: 1.5,
                  fontWeight: 600,
                  mx: ".5rem",
                  borderBottom:
                    selectedContent === "recipes" ? "2px solid " : "none",
                }}
              >
                Created Recipes
              </Typography>
            </Button>
            <Button
              disableRipple
              key="two"
              sx={{
                textTransform: "capitalize",
                color: selectedContent === "liked" ? "#0B814A" : "#989C9C",
                "&:hover": {
                  color: "#0B814A",
                  background: "none",
                },
              }}
              onClick={() => setSelectedContent("liked")}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Poppins",
                  lineHeight: 1.5,
                  fontWeight: 600,
                  mx: ".5rem",
                  borderBottom:
                    selectedContent === "liked" ? "2px solid " : "none",
                }}
              >
                Liked Recipes
              </Typography>
            </Button>
          </ButtonGroup>
          <Container sx={{ pt: ".5rem" }}>
            {selectedContent === "liked" ? <RecipeLiked /> : <ProfilePosts />}
          </Container>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileOverviewPage;
