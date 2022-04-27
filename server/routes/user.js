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

// get one user from db
router.get("/:id", secure, async (req, res) => {
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
    let updatedUser = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
      profilePic: req.body.profilePic,
      bio: req.body.bio,
    };
    let updates;
    if (!req.body.password) {
      updates = updatedUser;
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updates = { ...updatedUser, password: hashedPassword };
    }
    const user = await userModel.findByIdAndUpdate(id, updates, {
      useFindAndModify: false,
    });
    if (updates.email) user.email = updates.email;
    if (updates.firstName) user.firstName = updates.firstName;
    if (updates.lastName) user.lastName = updates.lastName;
    if (updates.password) user.lastName = updates.password;
    if (updates.isAdmin) user.isAdmin = updates.isAdmin;
    if (updates.profilePic) user.profilePic = updates.profilePic;
    if (updates.bio) user.bio = updates.bio;

    return res.json("Your profile has been updated!");
  } catch (err) {
    if (err.code == 11000) {
      res.send("Email already exists");
      return;
    }
    res.send("Other error", err);
  }
});

// delete an user
router.delete("/:id", async (req, res) => {
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
    user.profilePic = "";
    user.bio = "";
    await user.save();
    return res.json(`New account with email '${user.email}' has been created.`);
  } catch (err) {
    if (err.code == 11000)
      return res.json("Email already exists. Try sign in instead?");
    res.json("Other error");
  }
});

// log in an user (+password because it is unselected in model)
router.post("/account/login", async (req, res) => {
  const user = await userModel
    .findOne({ email: req.body.email })
    .select("+password");
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res
      .status(401)
      .json("You have entered either an incorrect email or password.");
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
