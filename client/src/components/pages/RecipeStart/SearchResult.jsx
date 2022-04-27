import { Add, Search } from "@mui/icons-material";
import { Box, Container, TextField, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";

const SearchResult = () => {
  const [search, setSearch] = useState("");
  const searchInput = (e) => setSearch(e.target.value);

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
      {/* create recipe button  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
        }}
      >
        <Link to="/recipe/create" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              backgroundColor: "#0B814A",
              color: "#F1F8F6",
              fontFamily: "Poppins",
              borderRadius: "70px",
              border: "none",
              width: "fit-content",
              fontSize: ".7rem",
              marginBottom: "1rem",
              px: "1rem",
              transition: "all .15s ease-in-out",
              textTransform: "none",
              my: "2rem",
              "&:hover": {
                background: "#0AA35C",
                transform: "scale(1.01)",
              },
            }}
          >
            <Add fontSize="small" sx={{ mr: ".2rem" }} />
            Create new recipe
          </Button>
        </Link>
      </Box>

      {/* search header and cards  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: ".5rem",
          justifyContent: "center",
          mb: "3.5rem",
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
      <RecipeCard />
    </Container>
  );
};

export default SearchResult;
