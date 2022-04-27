import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import threeFood from "../../../assets/images/threeFood.png";

const SignUpImage = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        paddingLeft: "2rem",
        paddingRight: "6rem",
      }}
    >
      <img src={threeFood} alt="food" style={{ height: "25vw" }} />
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
  );
};

export default SignUpImage;
