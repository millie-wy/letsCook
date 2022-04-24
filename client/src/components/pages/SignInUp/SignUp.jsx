import {
  Box,
  Container,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SignUpForm from "./SignUpForm";
import SignUpImage from "./SignUpImage";
import { Link } from "react-router-dom";

const SignUp = () => {
  const matches = useMediaQuery("(max-width:650px)");

  return (
    <main style={{ backgroundColor: "#F1F8F6", height: "calc(100vh -5rem)" }}>
      <Container sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "90%",
              borderRadius: "2rem",
              margin: "1rem",
            }}
          >
            {!matches ? <SignUpImage /> : null}

            <Box
              sx={{
                width: "100%",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#989C9C",
                  fontWeight: "900",
                  fontFamily: "Poppins",
                  textShadow: "0px 1px, 1px 0px, 1px 1px #989C9C",
                }}
              >
                Sign up
              </Typography>

              <SignUpForm />

              {matches ? (
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      color: "#2E4739",
                      fontWeight: "bolder",
                      fontFamily: "Poppins",
                    }}
                  >
                    Already have an account?
                  </Typography>
                  <Link
                    to={"/signin"}
                    style={{
                      color: "#0B814A",
                      fontWeight: "bolder",
                      fontFamily: "Poppins",
                    }}
                  >
                    Sign In
                  </Link>
                </Box>
              ) : null}
            </Box>
          </Paper>
        </Box>
      </Container>
    </main>
  );
};

export default SignUp;
