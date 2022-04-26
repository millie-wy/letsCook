import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAccount } from "../../context/AccountContext";

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
  profilePic: yup.string("URL of your profile picture"),
  bio: yup
    .string("Tell about yourself")
    .max(500, "Bio should be of maximum 500 letters"),
});

const EditAccountForm = () => {
  const { updateProfile } = useAccount();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      profilePic: "",
      bio: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  return (
    <Box sx={{ margin: "auto" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: ".8rem",
          width: "500px",
        }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          fullWidth
          size="small"
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
          size="small"
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
          size="small"
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
          size="small"
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
          size="small"
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
        <TextField
          fullWidth
          size="small"
          type="profilePic"
          sx={formStyling}
          id="profilePic"
          name="profilePic"
          label="Profile Picture URL"
          value={formik.values.profilePic}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.profilePic && Boolean(formik.errors.profilePic)}
          helperText={formik.touched.profilePic && formik.errors.profilePic}
          InputLabelProps={{ fontFamily: "Poppins" }}
        />
        <TextField
          fullWidth
          size="small"
          multiline
          rows={5}
          type="bio"
          sx={formStyling}
          id="bio"
          name="bio"
          label="Bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bio && Boolean(formik.errors.bio)}
          helperText={formik.touched.bio && formik.errors.bio}
        />

        <Button
          type="submit"
          disabled={!formik.isValid}
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
            alignSelf: "center",
            "&:hover": {
              background: "#0AA35C",
              transform: "scale(1.01)",
            },
          }}
        >
          Update Profile
        </Button>
      </form>
    </Box>
  );
};

const formStyling = {
  "& .MuiInputBase-input": {
    fontFamily: "Poppins",
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

export default EditAccountForm;
