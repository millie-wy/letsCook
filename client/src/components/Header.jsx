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
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// @ts-ignore // ask David
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
              openMenu ? { display: "none" } : { color: "#989C9C", width: 45 }
            }
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Box
              component="img"
              style={{ height: "35px", margin: "0.3rem 1rem 0 1rem" }}
              src={logo}
              alt="LetsCook"
            />
          </Link>
        </Box>
        <Drawer variant="persistent" anchor="left" open={openMenu}>
          <Box
            sx={{
              background: "#f1f8f6",
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
          <List sx={{ fontSize: ".9rem" }}>
            <ListItem>
              <Link
                style={{ textDecoration: "none", color: "#2E4739" }}
                to="/"
                onClick={handleMenuClose}
              >
                Home
              </Link>
            </ListItem>
            <ListItem>
              <Link
                style={{ textDecoration: "none", color: "#2E4739" }}
                to="/start"
                onClick={handleMenuClose}
              >
                Inspirations
              </Link>
            </ListItem>
            <ListItem>
              <Link
                style={{ textDecoration: "none", color: "#2E4739" }}
                to="/search"
                onClick={handleMenuClose}
              >
                Recipes
              </Link>
            </ListItem>
            <ListItem>
              <Link
                style={{ textDecoration: "none", color: "#2E4739" }}
                to="/"
                onClick={handleMenuClose}
              >
                Contact Us
              </Link>
            </ListItem>
            <ListItem>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#2E4739",
                  marginTop: "1rem",
                }}
                to="/signup"
                onClick={handleMenuClose}
              >
                Sign In / Up
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
              fontSize: ".7rem",
              fontWeight: "600",
              bgcolor: "white",
              color: "#2E4739",
              textTransform: "capitalize",
              borderRadius: 10,
              boxShadow: "none",
              paddingX: "1.5rem",
            }}
          >
            Sign In/Up
          </Button>
          <Box
            sx={{
              color: "#B6D5D5",
              width: "100px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Instagram />
            <FacebookRounded />
            <Twitter />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
