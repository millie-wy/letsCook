import { Box, Container, Typography } from "@mui/material";
import userIcon from "../../../assets/logoAndIcons/usericon.svg";

const ProfileOverviewPage = () => {
  return (
    <Container sx={{ minHeight: "calc(100vh - 8rem)", mt: "2rem" }}>
      <Box
        sx={{ display: "flex", flexDirection: "row", gap: ".5rem", px: "1rem" }}
      >
        <Typography
          color="#E5C687"
          variant="h4"
          sx={{ fontFamily: "Poppins", fontWeight: 800 }}
        >
          My
        </Typography>
        <Typography
          color="#2E4739"
          variant="h4"
          sx={{ fontFamily: "Poppins", fontWeight: 800 }}
        >
          Profile
        </Typography>
      </Box>

      <Box
        sx={{ mt: "2rem", display: "flex", flexDirection: "row", gap: "1rem" }}
      >
        <Container
          sx={{ background: "white", borderRadius: 5, pt: "2rem", width: 300 }}
        >
          <Box
            sx={{
              background: "yellow",
              borderRadius: 50,
              width: 100,
              height: 100,
              overflow: "hidden",
              position: "absolute",
            }}
          >
            <Box
              component="img"
              style={{ height: "100px" }}
              src={userIcon}
              alt="LetsCook"
            />
          </Box>
        </Container>
        <Container sx={{ background: "white", borderRadius: 5, pt: "2rem" }}>
          right side
        </Container>
      </Box>
    </Container>
  );
};

export default ProfileOverviewPage;
