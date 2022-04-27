import { Add } from "@mui/icons-material";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import React from "react";
import comment from "../../../assets/logoAndIcons/comment.svg";

const AdminRecipes = () => {
  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* profile recipe card - delete the second card and fetch and map to be used here */}
      <Container
        sx={{
          background: "white",
          borderRadius: 5,
          py: "1.5rem",
          w: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
          }}
        >
          <Box
            width="70%"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  lineHeight: 1,
                  mb: ".5rem",
                }}
              >
                Pizza Pepperoni
              </Typography>
              <Typography
                variant="body2"
                color="#989C9C"
                sx={{
                  fontFamily: "Poppins",
                  mb: ".5rem",
                }}
              >
                Pepperoni pizza is a American variety of salami, made from cured
                pork and beef seasoned with paprika or other chili pepper.
              </Typography>
            </Box>
            <Box
              width="95%"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Link
                to="/"
                //  to={`/recipe/${recipe.title.replaceAll(" ", "-")}`} // to be fixed
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
                    123
                    {/* {recipe.comments.length} */}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            width="30%"
            minWidth="140px"
            sx={{
              borderRadius: "20px",
            }}
          >
            <Box
              height="150px"
              width="100%"
              component="img"
              src="https://lh3.googleusercontent.com/cKFMscy0nPuWC-EiEmEiuY17SfvIALbfiACen-SArCMLBMhrIRx753rXj4IrM07xItTDZMgR2k0-5VjZ0gw8PZxQEwiQrWhx4C39=s640-c-rw-v1-e365"
              alt="name of the dish"
              sx={{
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </Box>
        </Box>
      </Container>
      <Container
        sx={{
          background: "white",
          borderRadius: 5,
          py: "1.5rem",
          w: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
          }}
        >
          <Box
            width="70%"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  lineHeight: 1,
                  mb: ".5rem",
                }}
              >
                Pizza Pepperoni
              </Typography>
              <Typography
                variant="body2"
                color="#989C9C"
                sx={{
                  fontFamily: "Poppins",
                  mb: ".5rem",
                }}
              >
                Pepperoni pizza is a American variety of salami, made from cured
                pork and beef seasoned with paprika or other chili pepper.
              </Typography>
            </Box>
            <Box
              width="95%"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Link
                to="/"
                //  to={`/recipe/${recipe.title.replaceAll(" ", "-")}`} // to be fixed
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
                    123
                    {/* {recipe.comments.length} */}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            width="30%"
            minWidth="140px"
            sx={{
              borderRadius: "20px",
            }}
          >
            <Box
              height="150px"
              width="100%"
              component="img"
              src="https://lh3.googleusercontent.com/cKFMscy0nPuWC-EiEmEiuY17SfvIALbfiACen-SArCMLBMhrIRx753rXj4IrM07xItTDZMgR2k0-5VjZ0gw8PZxQEwiQrWhx4C39=s640-c-rw-v1-e365"
              alt="name of the dish"
              sx={{
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </Box>
        </Box>
      </Container>

      {/* create recipe button  */}
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
          alignSelf: "end",
          "&:hover": {
            background: "#0AA35C",
            transform: "scale(1.01)",
          },
        }}
      >
        <Add fontSize="small" sx={{ mr: ".2rem" }} />
        Create new recipe
      </Button>
    </Container>
  );
};

export default AdminRecipes;
