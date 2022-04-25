import bcrypt from "bcrypt";
import cookieSession from "cookie-session";
import express from "express";
import { v4 as uuid } from "uuid";
import userModel from "../models/user.model.js";

const router = express.Router();

// prepare tamper-proof cookie (currently using http...?)
router.use(
  cookieSession({
    secret: "aVeryS3cr3tK3y", // not sure what this key is
    sameSite: "strict",
    httpOnly: false,
    secrue: false,
    maxAge: 1000 * 600, // 10 mins for now
  })
);

// check if the user is logged in
export const secure = (req, res, next) => {
  req.session.user.email
    ? next()
    : res.status(403).json("You must log in first.");
  console.log(req);
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
/** !!! add back the secure with role thingy at the end */
router.get("/", async (req, res) => {
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
    const user = new userModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: req.body.isAdmin,
    });
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
