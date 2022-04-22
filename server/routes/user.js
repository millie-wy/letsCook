import express from "express";
import userModel from "../models/user.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (err) {
    res.send("Other error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = await userModel.findById(id);
    if (!currentUser) {
      res.json("No user found with this id");
    }
    res.json(currentUser);
  } catch (err) {
    res.send("Other error");
  }
});

router.post("/", async (req, res) => {
  try {
    const user = new userModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });
    await user.save();
    res.json(user);
  } catch (err) {
    if (err.code == 11000) {
      res.send("Username already exists");
      return;
    }
    res.send("Other error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    res.json({
      old: user,
      new: req.body,
    });
  } catch (err) {
    if (err.code == 11000) {
      res.send("Username already exists");
      return;
    }
    res.send("Other error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const removedUser = await userModel.findByIdAndRemove(id);
    if (!removedUser) {
      res.json("No user found with this id");
    }
    res.json(removedUser);
  } catch (err) {
    res.send("Other error");
  }
});

export default router;
