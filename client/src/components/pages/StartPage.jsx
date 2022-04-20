import { Box, Button, Container, Typography } from "@mui/material";
import { textAlign } from "@mui/system";
import React from "react";

const StartPage = () => {
  return (
    <main style={{ backgroundColor: "#F1F8F6", height: "calc(100vh - 3rem)" }}>
      <Container sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box>
                <Typography
                  sx={{
                    color: "#2E4739",
                    fontWeight: "900",
                    fontSize: "3rem",
                    transform: "scaleY(1.1)",
                  }}
                >
                  Looking for
                </Typography>

                <Typography
                  sx={{
                    color: "#E5C687",
                    fontWeight: "900",
                    fontStyle: "normal",
                    fontSize: "5rem",
                    lineHeight: "1.2",
                    transform: "scaleY(1.1)",
                  }}
                >
                  delicious
                </Typography>
                <Typography
                  sx={{
                    color: "#2E4739",
                    fontWeight: "900",
                    fontSize: "3rem",
                    transform: "scaleY(1.1)",
                  }}
                >
                  recipes?
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "#989C9C",
                    fontSize: "1.2rem",
                    paddingTop: "1rem",
                  }}
                >
                  Whether you want a meal to impress the royal family of
                  <br />
                  Monaco or a quick meal for monday after work,
                  <br /> we've got you!
                </Typography>
              </Box>
            </Box>
            <Box>
              <img
                // @ts-ignore
                src={require("../../assets/images/threeFood.png")}
                alt="food"
                style={{ height: "33vw" }}
              />
            </Box>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <button
              style={{
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
              }}
            >
              Get started
            </button>

            <Typography sx={{ color: "#989C9C" }}>
              Join over 1 000 000 others
            </Typography>
          </Box>
        </Box>
      </Container>
    </main>
  );
};

export default StartPage;
