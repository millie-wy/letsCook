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
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../../helper";
import { ArrowBackIosNew } from "@mui/icons-material";

const SignUp = () => {
  const matches = useMediaQuery("(max-width:650px)");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = async () => {
    const newUser = { email, firstName, lastName, password, isAdmin: false };
    console.log(newUser); // to be deleted
    let result = await makeRequest("/api/users", "POST", newUser);
    alert(result); // for now it is showing an alert, change style if we have time!
    setTimeout(() => {
      navigate("/start");
    }, 1000);
  };

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
            {" "}
            {!matches ? (
              <Box
                sx={{
                  textAlign: "center",
                  paddingLeft: "2rem",
                  paddingRight: "6rem",
                }}
              >
                <img
                  // @ts-ignore
                  src={require("../../../assets/images/threeFood.png")}
                  alt="food"
                  style={{ height: "25vw" }}
                />
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
                    label="First Name"
                    id="firstName"
                    sx={formStyling}
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    id="lastName"
                    sx={formStyling}
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Email Address"
                    id="email"
                    sx={formStyling}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    sx={formStyling}
                  />
                </div>

                <TextField
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Reconfirm Password"
                  type="password"
                  autoComplete="current-password"
                  sx={formStyling}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox color="success" />}
                  label="I agree to LetsCook terms of services."
                  sx={{
                    margin: ".2rem",
                    fontFamily: "Poppins",
                  }}
                />
              </Box>
              <Button
                onClick={signUp}
                sx={{
                  backgroundColor: "#0B814A",
                  color: "#F1F8F6",
                  fontFamily: "Poppins",
                  borderRadius: "70px",
                  fontWeight: "bold",
                  border: "none",
                  height: "3rem",
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
              >
                sign up
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
                    Already have an account?
                  </Typography>
                  <Link
                    to={"/login"}
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

const formStyling = {
  "& .MuiInputBase-input": {
    fontFamily: [
      "Poppins",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    fontWeight: "bold",
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
};

export default SignUp;
