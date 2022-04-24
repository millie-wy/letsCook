import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../../helper";

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your first name")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can only contain Latin letters."
    )
    .max(20, "First name should be of maximum 20 letters")
    .required("First name is required"),
  lastName: yup
    .string("Enter your last name")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can only contain Latin letters."
    )
    .max(20, "Last name should be of maximum 20 letters")
    .required("Last name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password"),
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: (values) => {
      signUp(values);
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  const signUp = async (values) => {
    const { email, firstName, lastName, password } = values;
    const newUser = { email, firstName, lastName, password, isAdmin: false };
    console.log(newUser); // to be deleted
    let result = await makeRequest("/api/users", "POST", newUser);
    alert(result); // for now it is showing an alert, change style if we have time!
    setTimeout(() => {
      navigate("/start");
    }, 1000);
  };

  return (
    <Box>
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
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          sx={formStyling}
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          fullWidth
          sx={formStyling}
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          type="password"
          sx={formStyling}
          id="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          fullWidth
          type="password"
          sx={formStyling}
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="Confirm Password"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.passwordConfirmation &&
            Boolean(formik.errors.passwordConfirmation)
          }
          helperText={
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
          }
        />
        <FormControlLabel
          control={<Checkbox color="success" />}
          label="I agree to LetsCook terms of services."
          sx={{
            margin: ".2rem",
            fontFamily: "Poppins",
          }}
        />

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
          sign up
        </Button>
      </form>
    </Box>
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

export default SignUpForm;
