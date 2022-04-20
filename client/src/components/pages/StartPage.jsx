import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import React from "react";

const StartPage = () => {
  return (
    <main style={{ backgroundColor: "#B6D5D5" }}>
      <Container>
        <Box>
          <Box>
            <Box>
              <Typography>Looking for delicious recipes?</Typography>
              <Typography>
                Whether you want a meal to impress the royal family of Monaco or
                a quick meal for monday after work, we've got you!
              </Typography>
            </Box>
            <Box>
              <SvgIcon>
                <path />
              </SvgIcon>
            </Box>
          </Box>
          <Box>
            <Typography>Get started</Typography>
            <Typography>Join over 1 000 000 others </Typography>
          </Box>
        </Box>
      </Container>
    </main>
  );
};

export default StartPage;
