import { Search } from "@mui/icons-material";
import { Box, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const SearchResult = () => {
  const [search, setSearch] = useState("");
  const searchInput = (e) => setSearch(e.target.value);

  // not sure if we need this function?
  const performSearch = () => console.log("clicked");

  return (
    <Container sx={{ minHeight: "calc(100vh - 8rem)", mt: "2rem" }}>
      <Box
        sx={{
          width: 1,
          display: "flex",
          flexWrap: "wrap",
          placeContent: "center",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "40%",
            display: "flex",
            alignItems: "center",
            placeContent: "center",
            minWidth: 300,
          }}
        >
          <TextField
            id="search"
            variant="standard"
            placeholder="Search..."
            onChange={searchInput}
            style={{
              borderRadius: 10,
              background: "white",
              padding: "0 .8rem",
              width: "90%",
            }}
            InputProps={{
              disableUnderline: true,
              style: { fontFamily: "Poppins", fontWeight: 500 },
            }}
          />
          <Search
            onClick={performSearch}
            sx={{
              position: "absolute",
              color: "#989C9C",
              right: "3%",
              zIndex: 99,
              cursor: "pointer",
            }}
          />
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "40%",
            display: "flex",
            alignItems: "center",
            placeContent: "center",
            minWidth: 300,
          }}
        >
          <TextField
            id="search"
            variant="standard"
            placeholder="Filter by: "
            style={{
              borderRadius: 10,
              background: "white",
              padding: "0 .8rem",
              width: "90%",
            }}
            InputProps={{
              disableUnderline: true,
              style: { fontFamily: "Poppins", fontWeight: 500 },
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: ".5rem",
          justifyContent: "center",
          my: "2rem",
        }}
      >
        <Typography
          variant="h4"
          color="#2E4739"
          sx={{ fontFamily: "Poppins", fontWeight: 800 }}
        >
          Showing recipes for:
        </Typography>
        <Typography
          variant="h4"
          color="#E5C687"
          sx={{ fontFamily: "Poppins", fontWeight: 800 }}
        >
          {search}
        </Typography>
      </Box>
    </Container>
  );
};

export default SearchResult;
