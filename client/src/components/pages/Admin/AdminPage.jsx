import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { makeRequest } from "../../../helper";
import { useAccount } from "../../context/AccountContext";
import ManageAccount from "../Profile/ManageAccount";
import ProfilePosts from "../Profile/ProfilePosts";
import RecipeLiked from "../Profile/RecipeLiked";
import AdminRecipes from "./AdminRecipes";
import AdminUsers from "./AdminUsers";

const AdminPage = () => {
  const [selectedContent, setSelectedContent] = useState("users");
  const { currentUser } = useAccount();
  const [user, setUser] = useState({});
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    if (currentUser === undefined) {
      setIsLoading(true);
    } else {
      const fetchUser = async () => {
        let result = await makeRequest(`/api/users/${currentUser.id}`, "GET");
        setUser(result);
        setIsLoading(false);
      };
      fetchUser();

      const fetchUsersRecipes = async () => {
        let response = await makeRequest("/api/recipes", "GET");
        let author = response.map((recipe) => recipe.author);
        console.log(author);
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
  ) : (
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
          Admin
          <span style={{ color: "#2E4739" }}> page</span>
        </Typography>
      </Box>

      <Box
        sx={{
          mt: "4rem",
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          gap: "1rem",
        }}
      >
        {/* right - user contents  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 1,
            alignItems: { xs: "center", sm: "center", md: "start" },
          }}
        >
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
                color: selectedContent === "users" ? "#0B814A" : "#989C9C",
                "&:hover": {
                  color: "#0B814A",
                  background: "none",
                },
              }}
              onClick={() => setSelectedContent("users")}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Poppins",
                  lineHeight: 1.5,
                  fontWeight: 600,
                  mx: ".5rem",
                  borderBottom:
                    selectedContent === "users" ? "2px solid " : "none",
                }}
              >
                All users
              </Typography>
            </Button>
            <Button
              disableRipple
              key="two"
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
                All Recipes
              </Typography>
            </Button>
          </ButtonGroup>
          <Box width={1} sx={{ pt: ".5rem" }}>
            {selectedContent === "users" ? <AdminUsers /> : <AdminRecipes />}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminPage;
