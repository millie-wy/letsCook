import { Add, ArrowBackIosNew, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { makeRequest } from "../../../helper.js";
import { useAccount } from "../../context/AccountContext";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState, useEffect } from "react";

const RecipeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    image: "",
    servings: "",
    cookingMinute: "",
    ingredients: [],
    direction: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      let response = await makeRequest(`/api/recipes/${id}`, "GET");
      console.log(response);
      setRecipe(response);
    };
    fetchData();
  }, [id]);

  const regExURL =
    "^(?:(?:http(?:s)?|ftp)://)(?:\\S+(?::(?:\\S)*)?@)?(?:(?:[a-z0-9\u00a1-\uffff](?:-)*)*(?:[a-z0-9\u00a1-\uffff])+)(?:\\.(?:[a-z0-9\u00a1-\uffff](?:-)*)*(?:[a-z0-9\u00a1-\uffff])+)*(?:\\.(?:[a-z0-9\u00a1-\uffff]){2,})(?::(?:\\d){2,5})?(?:/(?:\\S)*)?$";

  const validationSchema = yup.object({
    title: yup
      .string("Enter a title")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        "Title should only contain Latin letters."
      )
      .max(60, "Title should be of maximum 60 letters")
      .required("Title is required"),
    description: yup
      .string("Enter a description")
      .max(200, "Description should be of maximum 200 letters")
      .required("Description is required"),
    image: yup
      .string("Enter an image URL")
      .matches(regExURL, "Image URL has to be a valid URL")
      .required("An Image URL is required"),
    servings: yup
      .number("Enter amount of servings")
      .max(999, "Servings should not be more than 3 numbers.")
      .min(1, "There should be at least 1 serving")
      .required("Amount of servings is required"),
    cookingMinute: yup
      .number("Enter cooking time in minutes")
      .max(9999, "Cooking time should not be more than 4 numbers.")
      .min(1, "Cooking time should be at least 1 minute")
      .required("Cooking time is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: recipe,
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  const addIngredient = () => {
    setRecipe(recipe, recipe.ingredients.push("Empty ingredient"));
    formik.setValues(recipe);
  };
  const removeIngredient = () => {
    setRecipe(recipe, recipe.ingredients.pop());
    formik.setValues(recipe);
  };
  const addDirection = () => {
    setRecipe(recipe, recipe.direction.push("Empty instruction"));
    formik.setValues(recipe);
  };
  const removeDirection = () => {
    setRecipe(recipe, recipe.direction.pop());
    formik.setValues(recipe);
  };

  const signUp = async (values) => {
    const { image, title, description, password } = values;
    const newUser = { image, title, description, password, isAdmin: false };
    console.log(newUser); // to be deleted
    let result = await makeRequest("/api/users", "POST", newUser);
    alert(result); // for now it is showing an alert, change style if we have time!
    setTimeout(() => {
      navigate("/start");
    }, 1000);
  };

  return !recipe ? (
    <Container
      sx={{ minHeight: "calc(100vh - 8rem)", mt: "2rem", textAlign: "center" }}
    >
      Something went wrong. Try refreshing the page.
    </Container>
  ) : (
    <main style={{ backgroundColor: "#F1F8F6", height: "calc(100vh -5rem)" }}>
      <Container sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "90%",
              borderRadius: "2rem",
              margin: "1rem",
            }}
          >
            <Box
              sx={{
                width: "100%",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {" "}
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  pt: "2rem",
                  cursor: "pointer",
                  color: "#2E4739",
                  "&:hover": {
                    color: "#E5C687",
                  },
                }}
                onClick={() => navigate(-1)}
              >
                <ArrowBackIosNew fontSize="small" />
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  Back
                </Typography>
              </Box>
              <Typography
                variant="h4"
                sx={{
                  color: "#0B814A",
                  fontWeight: "900",
                  fontFamily: "Poppins",
                  textShadow: "0px 1px, 1px 0px, 1px 1px #989C9C",
                }}
              >
                Create Recipe
              </Typography>
              <Box sx={{ p: "1rem 0" }}>
                <Typography
                  variant="h5"
                  color="#0B814A"
                  sx={{ fontFamily: "Poppins", fontWeight: 500 }}
                >
                  General
                </Typography>
              </Box>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: ".8rem",
                }}
                onSubmit={formik.handleSubmit}
              >
                <TextField
                  fullWidth
                  sx={formStyling}
                  id="title"
                  name="title"
                  label="Recipe Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  sx={formStyling}
                  id="description"
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
                <TextField
                  fullWidth
                  sx={formStyling}
                  id="image"
                  name="image"
                  label="Image URL"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  helperText={formik.touched.image && formik.errors.image}
                />
                <Box sx={{ display: "flex", columnGap: "1rem" }}>
                  <TextField
                    sx={formStyling}
                    id="servings"
                    name="servings"
                    label="Amount of Servings"
                    type="number"
                    value={formik.values.servings}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.servings && Boolean(formik.errors.servings)
                    }
                    helperText={
                      formik.touched.servings && formik.errors.servings
                    }
                  />
                  <TextField
                    sx={formStyling}
                    id="cookingMinute"
                    name="cookingMinute"
                    label="Cooking minutes"
                    type="number"
                    value={formik.values.cookingMinute}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.cookingMinute &&
                      Boolean(formik.errors.cookingMinute)
                    }
                    helperText={
                      formik.touched.cookingMinute &&
                      formik.errors.cookingMinute
                    }
                  />
                </Box>
                <Box sx={{ p: "1rem 0" }}>
                  <Typography
                    variant="h5"
                    color="#0B814A"
                    sx={{ fontFamily: "Poppins", fontWeight: 500 }}
                  >
                    Ingredients
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {recipe.ingredients.length &&
                    recipe.ingredients.map((ingredient, index) => (
                      <TextField
                        key={index}
                        sx={formStyling}
                        id={"ingredient" + "[" + index + "]"}
                        name={"ingredient" + "[" + index + "]"}
                        label={"Ingredient " + (index + 1)}
                        value={formik.values.ingredients[index]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    ))}
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "1rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        onClick={() => addIngredient()}
                        sx={{
                          backgroundColor: "#FFFFFF",
                          textTransform: "capitalize",
                          color: "#0B814A",
                          fontFamily: "Poppins",
                          borderRadius: "70px",
                          fontWeight: "500",
                          border: "2px solid #0B814A",
                          height: "3rem",
                          width: "40%",
                          minWidth: "15rem",
                          fontSize: "1rem",
                          cursor: "pointer",
                          transition: "all .15s ease-in-out",
                          "&:hover": {
                            background: "#0B814A",
                            color: "#ffffff",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            width: "80%",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Add /> Add ingredient <Box />
                        </Box>
                      </Button>
                      <Button
                        disabled={recipe.ingredients.length === 1}
                        onClick={() => {
                          removeIngredient();
                        }}
                        sx={{
                          backgroundColor: "#FFFFFF",
                          textTransform: "capitalize",
                          color: "#0B814A",
                          fontFamily: "Poppins",
                          borderRadius: "70px",
                          fontWeight: "500",
                          border: "2px solid #0B814A",
                          height: "3rem",
                          width: "40%",
                          minWidth: "15rem",

                          fontSize: "1rem",
                          cursor: "pointer",
                          transition: "all .15s ease-in-out",
                          "&:hover": {
                            background: "#FF5858",
                            border: "2px solid #FF5858",
                            color: "#ffffff",
                          },
                          "&&&": {
                            " &.Mui-disabled": {
                              color: "#F1F8F6",
                              border: "none",
                              background: "#94DAB9",
                            },
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            width: "80%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            lineHeight: "1rem",
                          }}
                        >
                          <Remove /> Remove Ingredient <Box />
                        </Box>
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ p: "1rem 0" }}>
                  <Typography
                    variant="h5"
                    color="#0B814A"
                    sx={{ fontFamily: "Poppins", fontWeight: 500 }}
                  >
                    instructions
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {recipe.direction.length &&
                    recipe.direction.map((direcive, index) => (
                      <TextField
                        key={index}
                        sx={formStyling}
                        id={"direction" + "[" + index + "]"}
                        name={"direction" + "[" + index + "]"}
                        label={"Direction " + (index + 1)}
                        value={formik.values.direction[index]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    ))}
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "1rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        onClick={() => addDirection()}
                        sx={{
                          backgroundColor: "#FFFFFF",
                          textTransform: "capitalize",
                          color: "#0B814A",
                          fontFamily: "Poppins",
                          borderRadius: "70px",
                          fontWeight: "500",
                          border: "2px solid #0B814A",
                          height: "3rem",
                          width: "40%",
                          minWidth: "15rem",
                          fontSize: "1rem",
                          cursor: "pointer",
                          transition: "all .15s ease-in-out",
                          "&:hover": {
                            background: "#0B814A",
                            color: "#ffffff",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            width: "80%",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Add /> Add instruction <Box />
                        </Box>
                      </Button>
                      <Button
                        disabled={recipe.direction.length === 1}
                        onClick={() => {
                          removeDirection();
                        }}
                        sx={{
                          backgroundColor: "#FFFFFF",
                          textTransform: "capitalize",
                          color: "#0B814A",
                          fontFamily: "Poppins",
                          borderRadius: "70px",
                          fontWeight: "500",
                          border: "2px solid #0B814A",
                          height: "3rem",
                          width: "40%",
                          minWidth: "15rem",

                          fontSize: "1rem",
                          cursor: "pointer",
                          transition: "all .15s ease-in-out",
                          "&:hover": {
                            background: "#FF5858",
                            border: "2px solid #FF5858",
                            color: "#ffffff",
                          },
                          "&&&": {
                            " &.Mui-disabled": {
                              color: "#F1F8F6",
                              border: "none",
                              background: "#94DAB9",
                            },
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            width: "80%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            lineHeight: "1rem",
                          }}
                        >
                          <Remove /> Remove Instruction <Box />
                        </Box>
                      </Button>
                    </Box>
                  </Box>
                </Box>

                <Button
                  type="submit"
                  disabled={!formik.isValid}
                  sx={{
                    backgroundColor: "#0B814A",
                    color: "#F1F8F6",
                    fontFamily: "Poppins",
                    borderRadius: "70px",
                    fontWeight: "bold",
                    border: "none",
                    height: "3rem",
                    width: "100%",
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                    cursor: "pointer",
                    transition: "all .15s ease-in-out",
                    "&:hover": {
                      background: "#0AA35C",
                      transform: "scale(1.01)",
                    },
                    "&&&": {
                      " &.Mui-disabled": {
                        color: "#F1F8F6",
                        background: "#94DAB9",
                      },
                    },
                  }}
                >
                  Update
                </Button>
              </form>
            </Box>
          </Paper>
        </Box>
      </Container>
    </main>
  );
};

const formStyling = {
  "& .MuiInputBase-input": {
    fontFamily: [
      "Poppins",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    fontWeight: "bold",
  },
  // For styling input
  "& label.Mui-focused": {
    color: "#0B814A",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#0B814A",
  },
  // Normal border
  "& .MuiOutlinedInput-root": {
    borderRadius: ".8rem",
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
};

export default RecipeForm;
