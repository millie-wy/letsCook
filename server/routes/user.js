import bcrypt from "bcrypt";
import express from "express";
import userModel from "../models/user.model.js";

const router = express.Router();

// check if the user is logged in
export const secure = (req, res, next) => {
  req.session.user ? next() : res.status(403).json("You must log in first.");
};

// check the role of a logged in user
const secureWithRole = (role) => {
  return [
    secure,
    (req, res, next) => {
      req.session.user.role == role
        ? next()
        : res.status(403).json("You do not have access to this data.");
    },
  ];
};

// get all users from db (admin only)
router.get("/", secureWithRole("admin"), async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.json(users);
  } catch (err) {
    res.json("Other error");
  }
});

// get one user from db (admin only)
router.get("/:id", secureWithRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = await userModel.findById(id);
    if (!currentUser) return res.json("No user found with this id");
    return res.json(currentUser);
  } catch (err) {
    res.json("Other error");
  }
});

// update an user
/** for now the put wouldnt show error if an user is not found */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updatedUser = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
      isAdmin: req.body.isAdmin,
    };
    const user = await userModel.findByIdAndUpdate(id, updatedUser, {
      useFindAndModify: false,
    });
    return res.json({
      old: user,
      new: updatedUser,
    });
  } catch (err) {
    if (err.code == 11000) return res.json("Username already exists");
    res.json("Other error");
  }
});

// delete an user (admin only)
router.delete("/:id", secureWithRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const removedUser = await userModel.findByIdAndRemove(id);
    if (!removedUser) return res.json("No user found with this email");
    return res.json(`User with email '${removedUser.email}' has been deleted.`);
  } catch (err) {
    res.json("Other error");
  }
});

// create new user
router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = new userModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    user.isAdmin = "false";
    user.profilePic =
      "https://user-images.githubusercontent.com/89253350/164979203-98afd15c-e3db-419e-b37d-9bc714dccc30.svg";
    await user.save();
    return res.json(`New account with email '${user.email}' has been created.`);
  } catch (err) {
    if (err.code == 11000) return res.json("Email already exists");
    res.json("Other error");
  }
});

// log in an user (+password because it is unselected in model)
router.post("/account/login", async (req, res) => {
  const user = await userModel
    .findOne({ email: req.body.email })
    .select("+password");
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).send("Wrong email or password");
  }

  // save info about the user to the session (a cookie stored on the client)
  req.session.user = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.isAdmin ? "admin" : "user",
  };
  res.json("You have logged in!");
});

// log out an user
router.delete("/account/logout", (req, res) => {
  if (!req.session.user.id)
    return res
      .status(401)
      .json("You cannot log out when you are not logged in.");
  req.session = null;
  res.json("You are now logged out.");
});

/** return the information stored in the cookie - for testing, will be deleted */
router.get("/account/login", (req, res) => {
  if (!req.session.user.id)
    return res.status(401).send("You are not logged in.");
  res.json(req.session);
});

export default router;
