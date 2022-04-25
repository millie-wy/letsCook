import {
  Add,
  ArrowBackIosNew,
  HdrPlus,
  PlusOne,
  Remove,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ingredient from "../../../assets/logoAndIcons/ingredient.svg";
import portion from "../../../assets/logoAndIcons/portion.svg";
import time from "../../../assets/logoAndIcons/time.svg";
import userIcon from "../../../assets/logoAndIcons/usericon.svg";
import { makeRequest } from "../../../helper.js";
import { useAccount } from "../../context/AccountContext";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState, useEffect } from "react";

const RecipeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const [recipe, setRecipe] = useState([]);
  const [amountOfIngredients, setAmountOfIngredients] = useState([1, 2]);
  const [amountOfInstructions, setAmountOfInstructions] = useState([1]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await makeRequest(`/api/recipes/${id}`, "GET");
      console.log(response);
      setRecipe(response);
    };
    fetchData();
  }, [id]);

  const regExURL =
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

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
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        "Description should only contain latin letters."
      )
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
    initialValues: {
      title: "",
      description: "",
      image: "",
      servings: "",
      cookingMinute: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });

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

  return (
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
                  {amountOfIngredients.map((ingredient) => (
                    <TextField
                      key={ingredient}
                      sx={formStyling}
                      id={"ingredient " + ingredient}
                      name={"ingredient " + ingredient}
                      label={"Ingredient " + ingredient}
                      //   value={formik.values.image}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                      //   error={formik.touched.image && Boolean(formik.errors.image)}
                      //   helperText={formik.touched.image && formik.errors.image}
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
                        onClick={() =>
                          setAmountOfIngredients([
                            ...amountOfIngredients,
                            Math.max(...amountOfIngredients) + 1,
                          ])
                        }
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
                        disabled={amountOfIngredients.length === 1}
                        onClick={() => {
                          const newArray = amountOfIngredients.slice(0, -1);
                          setAmountOfIngredients([...newArray]);
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
                    General
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {amountOfInstructions.map((instruction) => (
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      key={instruction}
                      sx={formStyling}
                      id={"instruction " + instruction}
                      name={"instruction " + instruction}
                      label={"Instruction " + instruction}
                      //   value={formik.values.image}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                      //   error={formik.touched.image && Boolean(formik.errors.image)}
                      //   helperText={formik.touched.image && formik.errors.image}
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
                        onClick={() =>
                          setAmountOfInstructions([
                            ...amountOfInstructions,
                            Math.max(...amountOfInstructions) + 1,
                          ])
                        }
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
                        disabled={amountOfInstructions.length === 1}
                        onClick={() => {
                          const newArray = amountOfInstructions.slice(0, -1);
                          setAmountOfInstructions([...newArray]);
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
