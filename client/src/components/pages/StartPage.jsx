import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

const StartPage = () => {
  return (
    <main style={{ backgroundColor: "#B6D5D5" }}>
      <Container>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <Box>
                <Typography sx={{ color: "#2E4739" }}>Looking for</Typography>
                <Typography sx={{ color: "#E5C687" }}>delicious</Typography>
                <Typography sx={{ color: "#2E4739" }}>recipes?</Typography>
              </Box>
              <Box>
                <Typography sx={{ color: "#989C9C" }}>
                  Whether you want a meal to impress the royal family of Monaco
                  or a quick meal for monday after work, we've got you!
                </Typography>
              </Box>
            </Box>
            <Box>
              <img
                // @ts-ignore
                src={require("../../assets/images/threeFood.png")}
                alt="food"
                style={{ height: "30rem" }}
              />
            </Box>
          </Box>
          <Box>
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
