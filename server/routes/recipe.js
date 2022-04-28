import express from "express";
import recipeModel from "../models/recipe.model.js";
import { secure } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recipes = await recipeModel.find({});
    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const currentRecipe = await recipeModel.findById(id).populate("author");
    if (!currentRecipe) {
      return res.status(404).json("No recipe found with this id");
    }
    return res.status(200).json(currentRecipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/", secure, async (req, res) => {
  try {
    let {
      title,
      description,
      image,
      servings,
      cookingMinute,
      ingredients,
      direction,
      tags,
    } = req.body;
    const recipe = new recipeModel({
      title,
      description,
      image,
      servings,
      cookingMinute,
      ingredients,
      direction,
      tags,
    });
    recipe.author = req.session.user;
    recipe.comments = [];
    await recipe.save();
    return res
      .status(200)
      .json(`Recipe with title '${recipe.title}' has been created!`);
  } catch (err) {
    if (err.code == 11000) {
      return res.status(403).json("Recipe title already exists.");
    }
    return res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let {
      title,
      description,
      image,
      servings,
      cookingMinute,
      ingredients,
      direction,
      tags,
    } = req.body;
    const recipe = await recipeModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    if (title) recipe.title = title;
    if (description) recipe.description = description;
    if (image) recipe.image = image;
    if (servings) recipe.servings = servings;
    if (cookingMinute) recipe.cookingMinute = cookingMinute;
    if (ingredients) recipe.ingredients = ingredients;
    if (direction) recipe.direction = direction;
    if (tags) recipe.tags = tags;

    res
      .status(200)
      .json(`Recipe with title '${recipe.title}' has been updated.`);
  } catch (err) {
    if (err.code == 11000) {
      return res.status(403).json("Recipe already exists");
    }
    return res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const removedRecipe = await recipeModel.findByIdAndRemove(id);
    if (!removedRecipe) {
      res.status(404).json("No recipe found with this id");
      return;
    }
    res.status(200).json(removedRecipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
