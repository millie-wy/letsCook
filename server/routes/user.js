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
    maxAge: 1000 * 10, // 10s for now
  })
);

// I guess in no situation we will show this?
// router.all("admin", (req, res, next) => {
//   if (!req.session.id || req.session.role != "admin") {
//     return res.status(401).send("You are not permitted here, go away!");
//   }
//   next();
// });

// check if the user is logged in
const secure = (req, res, next) => {
  req.session.email ? next() : res.status(403).json("You must log in first.");
};

// check the role of a logged in user
const secureWithRole = (role) => {
  return [
    secure,
    (req, res, next) => {
      req.session.role == role
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
/** the password is not encrypted, I guess it causes that once
 * the user detail has been updated the user wont be able to
 * sign in */
/** for now the put wouldnt show error if an user is not found */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    return res.json({
      old: user,
      new: req.body,
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

// log in an user
router.post("/account/login", async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  console.log(user);
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    console.log("req pw: " + req.body.password);
    console.log("user pw: " + user.password);
    console.log(Boolean(req.body.password == user.password));
    return res.status(401).send("Wrong email or password");
  }

  // save info about the user to the session (a coookie stored on the client)
  req.session.id = uuid();
  req.session.email = req.body.email;
  req.session.loginDate = new Date();
  req.session.role = user.isAdmin ? "admin" : "user";
  res.json("You have logged in!");
});

// log out an user
router.delete("/account/logout", (req, res) => {
  if (!req.session.id)
    return res
      .status(401)
      .json("You cannot log out when you are not logged in.");
  req.session = null;
  res.json("You are now logged out.");
});

/** return the information stored in the cookie - for testing, will be deleted */
router.get("/account/login", (req, res) => {
  if (!req.session.id) return res.status(401).send("You are not logged in.");
  res.json(req.session);
});

export default router;
