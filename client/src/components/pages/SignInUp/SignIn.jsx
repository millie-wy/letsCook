import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import threeFood from "../../../assets/images/threeFood.png";
import { useAccount } from "../../context/AccountContext";

const SignIn = () => {
  const matches = useMediaQuery("(max-width:650px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAccount();

  return (
    <main
      style={{ backgroundColor: "#F1F8F6", height: "calc(100vh - 5.5rem)" }}
    >
      <Container sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "80%",
              borderRadius: "2rem",
            }}
          >
            {" "}
            {!matches ? (
              <Box
                sx={{
                  textAlign: "center",
                  paddingLeft: "2rem",
                  paddingRight: "6rem",
                }}
              >
                <img src={threeFood} alt="food" style={{ height: "25vw" }} />
                <Typography
                  sx={{
                    color: "#2E4739",
                    fontWeight: "bolder",
                    fontFamily: "Poppins",
                  }}
                >
                  Don't have an account?
                </Typography>
                <Link
                  to={"/signUp"}
                  style={{
                    color: "#0B814A",
                    fontWeight: "bolder",
                    fontFamily: "Poppins",
                  }}
                >
                  Sign Up
                </Link>
              </Box>
            ) : null}
            <Box
              sx={{
                width: "100%",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: "#989C9C",
                  fontWeight: "900",
                  fontFamily: "Poppins",
                  textShadow: "0px 1px, 1px 0px, 1px 1px #989C9C",
                }}
              >
                Sign in
              </Typography>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    id="email"
                    sx={{
                      "& .MuiInputBase-input": {
                        fontFamily: [
                          "Poppins",
                          "Roboto",
                          '"Helvetica Neue"',
                          "Arial",
                          "sans-serif",
                        ].join(","),
                        fontWeight: "bolder",
                        color: "#989C9C",
                      },
                      // For styling input
                      "& label.Mui-focused": {
                        color: "#0B814A",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "#0B814A",
                      },
                      // Normal border
                      "& .MuiOutlinedInput-root": {
                        borderRadius: ".8rem",
                        "& fieldset": {
                          borderColor: "#B6D5D5",
                        },
                        // On Hover
                        "&:hover fieldset": {
                          borderColor: "#0AA35C",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0B814A",
                        },
                      },
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  sx={{
                    // For styling input
                    "& label.Mui-focused": {
                      color: "#0B814A",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#0B814A",
                    },
                    // Normal border
                    "& .MuiOutlinedInput-root": {
                      borderRadius: ".8rem",
                      "& fieldset": {
                        borderColor: "#B6D5D5",
                      },
                      // On Hover
                      "&:hover fieldset": {
                        borderColor: "#0AA35C",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0B814A",
                      },
                    },
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox color="success" />}
                  label="Remember me"
                  sx={{
                    margin: ".2rem",
                    fontFamily: "Poppins",
                  }}
                />
              </Box>
              <Button
                sx={{
                  backgroundColor: "#0B814A",
                  color: "#F1F8F6",
                  fontFamily: "Poppins",
                  borderRadius: "70px",
                  fontWeight: "bold",
                  border: "none",
                  height: "4rem",
                  width: "100%",
                  fontSize: "1.2rem",
                  marginBottom: "1rem",
                  cursor: "pointer",
                  transition: "all .15s ease-in-out",
                  "&:hover": {
                    background: "#0AA35C",
                    transform: "scale(1.01)",
                  },
                }}
                onClick={() => signIn(email, password)}
              >
                sign in
              </Button>
              {matches ? (
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      color: "#2E4739",
                      fontWeight: "bolder",
                      fontFamily: "Poppins",
                    }}
                  >
                    Don't have an account?
                  </Typography>
                  <Link
                    to={"/signUp"}
                    style={{
                      color: "#0B814A",
                      fontWeight: "bolder",
                      fontFamily: "Poppins",
                    }}
                  >
                    Sign Up
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

export default SignIn;
