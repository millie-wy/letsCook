import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import comment from "../../../assets/logoAndIcons/comment.svg";
// @ts-ignore
import star from "../../../assets/logoAndIcons/star.svg";
// @ts-ignore
import data from "../../../data.json";

function ProductCard() {
  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "3rem 6rem",
        justifyContent: "center",
        paddingBottom: "4rem",
      }}
    >
      {data.map((recipe) => (
        <Card sx={cardStyle} key={recipe.title}>
          <CardMedia
            component="img"
            height="180px"
            src={recipe.image}
            title={recipe.title}
            sx={{ borderRadius: 8 }}
          />
          <Box
            sx={{
              background: "white",
              height: 180,
              borderRadius: 8,
              mt: "1rem",
              boxSizing: "border-box",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                }}
                gutterBottom
                variant="body2"
              >
                {recipe.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 300,
                  color: "#989C9C",
                  fontSize: ".7rem",
                }}
                gutterBottom
                variant="body2"
              >
                {recipe.description}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Link
                to={`/recipe/${recipe.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    fontFamily: "Poppins",
                    letterSpacing: "none",
                    fontSize: ".7rem",
                    fontWeight: "600",
                    bgcolor: "white",
                    color: "#0B814A",
                    border: "1.2px solid #0B814A",
                    textTransform: "capitalize",
                    borderRadius: 10,
                    boxShadow: "none",
                  }}
                >
                  To recipe
                </Button>
              </Link>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: ".3rem",
                  placeItems: "center",
                }}
              >
                <Box
                  component="img"
                  style={{ height: "15px" }}
                  src={star}
                  alt="rating"
                />
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    color: "#E5C687",
                    fontSize: ".9rem",
                    margin: "auto",
                  }}
                  gutterBottom
                  variant="body2"
                >
                  {recipe.star.toFixed(1)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: ".3rem",
                  placeItems: "center",
                }}
              >
                <Box
                  component="img"
                  style={{ height: "18px" }}
                  src={comment}
                  alt="comment"
                />
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    color: "#E5C687",
                    fontSize: ".9rem",
                    margin: "auto",
                  }}
                  gutterBottom
                  variant="body2"
                >
                  {recipe.comments.length}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      ))}
    </Container>
  );
}

const cardStyle = {
  width: 250,
  boxShadow: "none",
  background: "none",
};

export default ProductCard;
