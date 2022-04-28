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
import ManageAccount from "./ManageAccount";
import ProfilePosts from "./ProfilePosts";
import RecipeLiked from "./RecipeLiked";

const ProfileOverviewPage = () => {
  const [selectedContent, setSelectedContent] = useState("recipes");
  const { currentUser } = useAccount();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    if (currentUser === undefined) {
      setIsLoading(true);
    } else {
      /** get a specific user from the user db */
      const fetchUser = async () => {
        let result = await makeRequest(`/api/users/${currentUser.id}`, "GET");
        setUser(result);
        setIsLoading(false);
      };
      fetchUser();
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
          {user.firstName}
          <span style={{ color: "#2E4739" }}>'s Profile</span>
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
        {/* left - user details  */}
        <Container
          sx={{
            background: "white",
            borderRadius: 5,
            pt: "2rem",
            mx: { xs: "1rem", sm: "1rem", md: 0 },
            width: { xs: "auto", sm: "auto", md: 300 },
            position: "relative",
            minHeight: { xs: "fit-content", sm: "fit-content", md: 400 },
          }}
        >
          <Avatar
            alt={user.firstName}
            src={user.profilePic}
            sx={{
              bgcolor: "#B6D5D5",
              width: 120,
              height: 120,
              position: "absolute",
              left: "50%",
              top: "-50px",
              transform: "translateX(-50%)",
            }}
          />
          <Box
            sx={{
              height: "90%",
              pb: "1rem",
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
                  mb: "1.5rem",
                }}
              >
                {user.firstName} {user.lastName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: "Poppins", lineHeight: 1.5 }}
              >
                {user.bio}
              </Typography>
            </Box>
          </Box>
        </Container>

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
            <Button
              disableRipple
              key="three"
              sx={{
                textTransform: "capitalize",
                color: selectedContent === "account" ? "#0B814A" : "#989C9C",
                "&:hover": {
                  color: "#0B814A",
                  background: "none",
                },
              }}
              onClick={() => setSelectedContent("account")}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Poppins",
                  lineHeight: 1.5,
                  fontWeight: 600,
                  mx: ".5rem",
                  borderBottom:
                    selectedContent === "account" ? "2px solid " : "none",
                }}
              >
                Manage Account
              </Typography>
            </Button>
          </ButtonGroup>
          <Box width={1} sx={{ pt: ".5rem" }}>
            {selectedContent === "liked" ? (
              <RecipeLiked />
            ) : selectedContent === "account" ? (
              <ManageAccount />
            ) : (
              <ProfilePosts />
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileOverviewPage;
