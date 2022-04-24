import {
  ChevronLeft,
  ChevronRight,
  FacebookRounded,
  Instagram,
  MenuRounded as MenuIcon,
  Twitter,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoAndIcons/logo.svg";

const Header = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenuOpen = () => {
    setOpenMenu(true);
    props.setMenuIsOpen(true);
  };
  const handleMenuClose = () => {
    setOpenMenu(false);
    props.setMenuIsOpen(false);
  };

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: "#F1F8F6",
        display: "flex",
        flexDirection: "row",
        height: "4rem",
        position: "sticky",
        width: 1,
      }}
    >
      <Toolbar
        sx={{
          width: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* below is header right  */}
        <Box
          sx={
            openMenu
              ? {
                  display: "flex",
                  gap: "1.5rem",
                  flexDirection: "row",
                  marginLeft: -5,
                }
              : { display: "flex", gap: "1.5rem", flexDirection: "row" }
          }
        >
          <IconButton
            size="small"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            sx={
              openMenu ? { display: "none" } : { color: "#989C9C", width: 50 }
            }
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Box
              component="img"
              style={{ height: "40px", margin: "0.3rem 1rem 0 1rem" }}
              src={logo}
              alt="LetsCook"
            />
          </Link>
        </Box>
        <Drawer variant="temporary" anchor="left" open={openMenu}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 1,
              justifyContent: "flex-end",
              minWidth: 160,
            }}
          >
            <IconButton onClick={handleMenuClose}>
              {openMenu ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Box>
          <List>
            <ListItem>
              <Link
                style={{ textDecoration: "none" }}
                to="/"
                onClick={handleMenuClose}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#2E4739",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    "&:hover": {
                      color: "#E5C687",
                    },
                  }}
                >
                  Home
                </Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                style={{ textDecoration: "none" }}
                to="/start"
                onClick={handleMenuClose}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#2E4739",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    "&:hover": {
                      color: "#E5C687",
                    },
                  }}
                >
                  Inspirations
                </Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                style={{ textDecoration: "none" }}
                to="/search"
                onClick={handleMenuClose}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#2E4739",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    "&:hover": {
                      color: "#E5C687",
                    },
                  }}
                >
                  Recipes
                </Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                style={{ textDecoration: "none" }}
                to="/"
                onClick={handleMenuClose}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#2E4739",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    "&:hover": {
                      color: "#E5C687",
                    },
                  }}
                >
                  Contact Us
                </Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                style={{ textDecoration: "none", marginTop: "1.5rem" }}
                to="/signup"
                onClick={handleMenuClose}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#E5C687",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    "&:hover": {
                      color: "#2E4739",
                    },
                  }}
                >
                  Sign In / Up
                </Typography>
              </Link>
            </ListItem>
          </List>
        </Drawer>

        {/* below is header right  */}
        <Box sx={{ display: "flex", gap: "1.5rem", flexDirection: "row" }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              fontFamily: "Poppins",
              letterSpacing: "none",
              fontSize: ".9rem",
              fontWeight: "600",
              bgcolor: "white",
              color: "#2E4739",
              textTransform: "capitalize",
              borderRadius: 10,
              boxShadow: "none",
              paddingX: "1.5rem",
              "&:hover": {
                backgroundColor: "#E5C687",
                color: "white",
                boxShadow: "none",
              },
            }}
          >
            Sign In/Up
          </Button>
          <Box
            sx={{
              color: "#B6D5D5",
              width: "100px",
              display: "flex",
              placeItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Instagram
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "#2E4739",
                },
              }}
            />
            <FacebookRounded
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "#2E4739",
                },
              }}
            />
            <Twitter
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "#2E4739",
                },
              }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
