import { ArrowBackIosNew, Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Fade,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import avatarpic from "../../../assets/images/avatarpic.png";
import ingredient from "../../../assets/logoAndIcons/ingredient.svg";
import portion from "../../../assets/logoAndIcons/portion.svg";
import time from "../../../assets/logoAndIcons/time.svg";
import { makeRequest } from "../../../helper.js";
import { useAccount } from "../../context/AccountContext";

const RecipeDetailPage = () => {
  const { isLoggedIn, currentUser } = useAccount();
  const [recipe, setRecipe] = useState([]);
  const [individualRating, setIndividualRating] = useState(0);
  const [comment, setComment] = useState("");
  const [disableButton, setDisabledButton] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [canEdit, setCanEdit] = useState(false);
  const [isDeletingRecipe, setIsDeletingRecipe] = useState(false);

  const location = useLocation();
  const { id, rating } = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let response = await makeRequest(`/api/recipes/${id}`, "GET");
      setRecipe(response);
      setIsLoading(false);
    };
    fetchData();

    comment.length > 4 && individualRating >= 1
      ? setDisabledButton(false)
      : setDisabledButton(true);
  }, [comment.length, id, individualRating]);

  function isObjectEmpty(object) {
    var isEmpty = true;
    for (let keys in object) {
      isEmpty = false;
      break; // exiting since we found that the object is not empty
    }
    return isEmpty;
  }

  useEffect(() => {
    if (!isLoading) {
      // Since the mocked data doesn't have an author, we have to check if the autor object is empty
      if (isObjectEmpty(recipe.author)) {
        setIsLoading(false);
        return;
      } else {
        const fetchUser = async () => {
          let result = await makeRequest(
            `/api/users/${recipe.author.id}`,
            "GET"
          );
          setUser(result);
          setIsLoading(false);
          console.log(result);
        };
        fetchUser();
      }
    }
  }, [recipe]);

  const submitComment = async (existingComments) => {
    const allComments = {
      comments: [
        ...existingComments,
        {
          author: user.firstName + " " + user.lastName, // need to connect to the user database...
          content: comment,
          rated: individualRating,
          profilePic: user.profilePic,
        },
      ],
    };
    await makeRequest(`/api/recipes/${id}`, "PUT", allComments);
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

  const deleteRecipe = async (id, title) => {
    setIsDeletingRecipe(true);
    let response = await makeRequest(`/api/recipes/${id}`, "DELETE");
    setTimeout(() => {
      alert(`Recipe ${title} has been deleted`);

      setIsDeletingRecipe(false);
      handleClose();
      navigate("/start");
    }, 1000);
  };

  // modal

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
    textAlign: "center",
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return recipe.length < 1 ? (
    <Container
      sx={{ minHeight: "calc(100vh - 8rem)", mt: "2rem", textAlign: "center" }}
    >
      Something went wrong. Try refreshing the page.
    </Container>
  ) : (
    <Container sx={{ minHeight: "calc(100vh - 8rem)", mt: "2rem" }}>
      <Container sx={{ background: "white", borderRadius: 5, pt: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            cursor: "pointer",
            color: "#2E4739",
            width: 100,
            "&:hover": {
              color: "#E5C687",
            },
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNew fontSize="small" />
          <Typography
            variant="subtitle1"
            sx={{ fontFamily: "Poppins", fontWeight: 600, lineHeight: 1.2 }}
          >
            Back
          </Typography>
        </Box>
        {/* upper section */}
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
            padding: "2rem 1rem",
          }}
        >
          {/* upper: image */}
          <Box
            component="img"
            width="100%"
            maxWidth="400px"
            height="400px"
            src={recipe.image}
            title={recipe.title}
            sx={{ borderRadius: 5, m: "auto", objectFit: "cover" }}
          />

          {/* upper: intro */}
          <Box sx={{ padding: "1rem" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                columnGap: "1rem",
                flexWrap: "wrap",
                minHeight: "4.063",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontFamily: "Poppins", fontWeight: 600, mb: "1rem" }}
              >
                {recipe.title}
              </Typography>
              {currentUser !== undefined
                ? currentUser.role === "admin" ||
                  (currentUser.id === recipe.author.id && (
                    <Box>
                      <IconButton aria-label="delete" size="large">
                        {" "}
                        <Link
                          to={"/recipe/edit"}
                          state={{
                            id: id,
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          <Edit fontSize="large" sx={{ color: "#2E4739" }} />
                        </Link>
                      </IconButton>

                      <IconButton
                        onClick={handleOpen}
                        aria-label="delete"
                        size="large"
                      >
                        <Delete fontSize="large" sx={{ color: "#FF5858" }} />
                      </IconButton>
                    </Box>
                  ))
                : null}
            </Box>
            <StarRatings
              rating={parseInt(rating)}
              starDimension="35px"
              starSpacing="5px"
              starRatedColor="#E5C687"
              starEmptyColor="#B6D5D5"
              svgIconPath="M15.0979 1.8541C15.6966 0.011476 18.3034 0.0114803 18.9021 1.8541L21.4903 9.81966C21.758 10.6437 22.5259 11.2016 23.3924 11.2016H31.7679C33.7053 11.2016 34.5109 13.6809 32.9434 14.8197L26.1675 19.7426C25.4666 20.2519 25.1732 21.1547 25.441 21.9787L28.0292 29.9443C28.6279 31.7869 26.5189 33.3191 24.9515 32.1803L18.1756 27.2574C17.4746 26.7481 16.5254 26.7481 15.8244 27.2574L9.04852 32.1803C7.48109 33.3191 5.37213 31.7869 5.97084 29.9443L8.559 21.9787C8.82675 21.1547 8.53344 20.2519 7.83246 19.7426L1.05655 14.8197C-0.510878 13.6809 0.294677 11.2016 2.23212 11.2016H10.6076C11.4741 11.2016 12.242 10.6437 12.5097 9.81966L15.0979 1.8541Z"
            />{" "}
            <Typography
              variant="subtitle1"
              sx={{ my: "2rem", fontFamily: "Poppins" }}
            >
              {recipe.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box
                  component="img"
                  style={{ height: "30px" }}
                  src={time}
                  alt="time"
                />
                <Typography
                  color="#0B814A"
                  variant="h6"
                  sx={{ mx: ".5rem", fontFamily: "Poppins" }}
                >
                  {recipe.cookingMinute} min
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box
                  component="img"
                  style={{ height: "30px" }}
                  src={portion}
                  alt="servings"
                />
                <Typography
                  color="#0B814A"
                  variant="h6"
                  sx={{ mx: ".5rem", fontFamily: "Poppins" }}
                >
                  {recipe.servings} portions
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box
                  component="img"
                  style={{ height: "30px" }}
                  src={ingredient}
                  alt="ingredient"
                />
                <Typography
                  color="#0B814A"
                  variant="h6"
                  sx={{ mx: ".5rem", fontFamily: "Poppins" }}
                >
                  {recipe.ingredients.length} ingredients
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* middle section */}
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
            p: "1rem",
          }}
        >
          {/* middle: ingredients */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
              py: "1rem",
            }}
          >
            {recipe.ingredients.map((ingredient) => (
              <Box
                key={ingredient}
                sx={{
                  mt: ".7rem",
                  color: "#0B814A",
                  borderBottom: "1px solid #C4C4C4",
                }}
              >
                {ingredient}
              </Box>
            ))}
            {!user ? (
              <Box
                sx={{
                  p: "1rem 0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="William Saar"
                  src={avatarpic}
                  sx={{ bgcolor: "#B6D5D5", width: 70, height: 70 }}
                />
                <Box sx={{ p: "0 1rem" }}>
                  <Typography variant="h6" sx={{ color: "#0B814A" }}>
                    William Saar
                  </Typography>
                  <Typography
                    sx={{
                      color: "#0B814A",
                      fontSize: ".8rem",
                      fontWeight: "600",
                    }}
                  >
                    Pro chef
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  p: "1rem 0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt={user.firstName + " " + user.lastName}
                  src={user.profilePic}
                  sx={{ bgcolor: "#B6D5D5", width: 70, height: 70 }}
                />
                <Box sx={{ p: "0 1rem" }}>
                  <Typography variant="h6" sx={{ color: "#0B814A" }}>
                    {user.firstName + " " + user.lastName}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#0B814A",
                      fontSize: ".8rem",
                      fontWeight: "600",
                    }}
                  >
                    User
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          {/* middle: directions */}
          <Box sx={{ p: "1rem" }}>
            <Typography
              variant="h5"
              color="#0B814A"
              sx={{ fontFamily: "Poppins", fontWeight: 500 }}
            >
              Directions
            </Typography>
            <ol>
              {recipe.direction.map((step) => (
                <li key={step} style={{ marginTop: "1rem" }}>
                  {step}
                </li>
              ))}
            </ol>
          </Box>
        </Box>
      </Container>

      {/* comment section */}
      <Container
        sx={{
          background: "white",
          borderRadius: 5,
          mt: "2rem",
          textAlign: "center",
          p: "2rem 1rem",
        }}
      >
        <Typography
          variant="h5"
          color="#0B814A"
          sx={{ fontFamily: "Poppins", fontWeight: 500, mb: "2rem" }}
        >
          What do others say about this recipe?
        </Typography>

        {recipe.comments.length < 1 ? (
          <Container
            sx={{
              mt: "2rem",
              textAlign: "center",
            }}
          >
            No one has commented on this recipe yet.
          </Container>
        ) : (
          recipe.comments.map((comment) => (
            <Box
              key={comment._id}
              sx={{
                mt: "1rem",
                background: "#F1F8F6",
                maxWidth: "60%",
                m: "1rem auto",
                borderRadius: "15px",
                p: ".5rem",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box
                minWidth="200px"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  placeItems: "center",
                }}
              >
                <Avatar
                  alt={comment.author}
                  src={comment.profilePic}
                  sx={{
                    bgcolor: "#B6D5D5",
                    width: 45,
                    height: 45,
                    margin: "0.3rem 1rem 0 1rem",
                  }}
                />
                <Typography
                  variant="body2"
                  color="#0B814A"
                  sx={{
                    textAlign: "start",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    display: "flex",
                  }}
                >
                  {comment.author}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: ".5rem .8rem 0 0",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontFamily: "Poppins",
                    display: "flex",
                    fontSize: ".8rem",
                  }}
                >
                  {comment.content}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: ".6rem",
                    mt: ".2rem",
                    alignSelf: "flex-end",
                  }}
                >
                  <StarRatings
                    rating={comment.rated}
                    starDimension="20px"
                    starSpacing="1px"
                    starRatedColor="#E5C687"
                    starEmptyColor="#B6D5D5"
                    svgIconPath="M15.0979 1.8541C15.6966 0.011476 18.3034 0.0114803 18.9021 1.8541L21.4903 9.81966C21.758 10.6437 22.5259 11.2016 23.3924 11.2016H31.7679C33.7053 11.2016 34.5109 13.6809 32.9434 14.8197L26.1675 19.7426C25.4666 20.2519 25.1732 21.1547 25.441 21.9787L28.0292 29.9443C28.6279 31.7869 26.5189 33.3191 24.9515 32.1803L18.1756 27.2574C17.4746 26.7481 16.5254 26.7481 15.8244 27.2574L9.04852 32.1803C7.48109 33.3191 5.37213 31.7869 5.97084 29.9443L8.559 21.9787C8.82675 21.1547 8.53344 20.2519 7.83246 19.7426L1.05655 14.8197C-0.510878 13.6809 0.294677 11.2016 2.23212 11.2016H10.6076C11.4741 11.2016 12.242 10.6437 12.5097 9.81966L15.0979 1.8541Z"
                  />
                </Box>
              </Box>
            </Box>
          ))
        )}
        {!isLoggedIn ? (
          <Box
            sx={{
              background: "#F1F8F6",
              maxWidth: "60%",
              m: "1rem auto",
              borderRadius: "15px",
              p: ".5rem",
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Poppins",
                display: "flex",
                fontWeight: 500,
                py: "1rem",
              }}
            >
              Create an account or sign in order to comment.
            </Typography>
            <Link
              to="/signin"
              style={{ width: "100%", textDecoration: "none" }}
            >
              <Button
                sx={{
                  backgroundColor: "#0B814A",
                  color: "#F1F8F6",
                  fontFamily: "Poppins",
                  borderRadius: "70px",
                  border: "none",
                  width: "60%",
                  height: "2rem",
                  m: "auto",
                  fontSize: ".8rem",
                  marginBottom: "1rem",
                  cursor: "pointer",
                  transition: "all .15s ease-in-out",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "#0AA35C",
                    transform: "scale(1.01)",
                  },
                }}
              >
                Sign In or Sign Up
              </Button>
            </Link>
          </Box>
        ) : (
          <Box
            sx={{
              background: "#F1F8F6",
              maxWidth: { xs: "100%", sm: "100%", md: "60%" },
              m: "1rem auto",
              borderRadius: "15px",
              p: ".5rem",
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Poppins",
                display: "flex",
                fontWeight: 500,
                py: "1rem",
              }}
            >
              Tell the others your thoughts about this recipe!
            </Typography>
            <TextField
              required
              multiline
              rows={4}
              size="small"
              id="comment"
              type="text"
              InputProps={{
                style: { fontSize: "0.8rem", minLength: 5 },
              }}
              onChange={(e) => setComment(e.target.value)}
              sx={{
                width: "80%",
                backgroundColor: "white",
                borderRadius: ".5rem",
                mb: "1rem",
                // For styling input
                "& label.Mui-focused": {
                  color: "#0B814A",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#0B814A",
                },
                // Normal border
                "& .MuiOutlinedInput-root": {
                  borderRadius: ".5rem",
                  fontFamily: "Poppins",

                  "& fieldset": {
                    borderColor: "#B6D5D5",
                  },
                  // On Hover
                  "&:hover fieldset": {
                    borderColor: "#0AA35C",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0B814A",
                  },
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <StarRatings
                rating={individualRating}
                changeRating={setIndividualRating}
                starDimension="30px"
                starSpacing="2px"
                starHoverColor="#E5C687"
                starRatedColor="#E5C687"
                starEmptyColor="#B6D5D5"
                svgIconPath="M15.0979 1.8541C15.6966 0.011476 18.3034 0.0114803 18.9021 1.8541L21.4903 9.81966C21.758 10.6437 22.5259 11.2016 23.3924 11.2016H31.7679C33.7053 11.2016 34.5109 13.6809 32.9434 14.8197L26.1675 19.7426C25.4666 20.2519 25.1732 21.1547 25.441 21.9787L28.0292 29.9443C28.6279 31.7869 26.5189 33.3191 24.9515 32.1803L18.1756 27.2574C17.4746 26.7481 16.5254 26.7481 15.8244 27.2574L9.04852 32.1803C7.48109 33.3191 5.37213 31.7869 5.97084 29.9443L8.559 21.9787C8.82675 21.1547 8.53344 20.2519 7.83246 19.7426L1.05655 14.8197C-0.510878 13.6809 0.294677 11.2016 2.23212 11.2016H10.6076C11.4741 11.2016 12.242 10.6437 12.5097 9.81966L15.0979 1.8541Z"
              />

              <Button
                sx={{
                  backgroundColor: "#0B814A",
                  color: "#F1F8F6",
                  fontFamily: "Poppins",
                  borderRadius: "70px",
                  border: "none",
                  width: "100px",
                  height: "2rem",
                  fontSize: ".8rem",
                  marginBottom: "1rem",
                  cursor: "pointer",
                  transition: "all .15s ease-in-out",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "#0AA35C",
                    transform: "scale(1.01)",
                  },
                }}
                disabled={disableButton}
                onClick={(e) => submitComment(recipe.comments, e)}
              >
                Send
              </Button>
            </Box>
          </Box>
        )}
      </Container>
      {!isDeletingRecipe ? (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={modalStyle}>
              <Typography
                sx={{ fontFamily: "Poppins" }}
                id="transition-modal-title"
                variant="h6"
                component="h3"
              >
                Delete this recipe?
              </Typography>

              <Button
                sx={{
                  borderRadius: "1rem",
                  fontFamily: "Poppins",
                  backgroundColor: "#FF5858",
                  transition: "all .15s ease-in-out",
                  textTransform: "capitalize",
                  color: "#fff",
                  "&:hover": {
                    background: "#DC1919",
                  },
                }}
                onClick={() => deleteRecipe(recipe._id, recipe.title)}
              >
                Yes
              </Button>
              <Button
                sx={{
                  borderRadius: "1rem",
                  fontFamily: "Poppins",
                  backgroundColor: "#C4C4C4",
                  transition: "all .15s ease-in-out",
                  textTransform: "capitalize",
                  color: "#fff",
                  "&:hover": {
                    background: "#9C9999",
                  },
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </Fade>
        </Modal>
      ) : (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={modalStyle}>
              <Typography
                sx={{ fontFamily: "Poppins" }}
                id="transition-modal-title"
                variant="h6"
                component="h3"
              >
                Deleting recipe...
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <CircularProgress />
              </Box>
            </Box>
          </Fade>
        </Modal>
      )}
    </Container>
  );
};

export default RecipeDetailPage;
