import express from "express";
import recipeModel from "../models/recipe.model.js";
import { secure } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recipes = await recipeModel.find({});
    res.json(recipes);
  } catch (err) {
    res.send("Other error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const currentRecipe = await recipeModel.findById(id).populate("author");
    if (!currentRecipe) {
      res.json("No recipe found with this id");
      return;
    }
    res.json(currentRecipe);
  } catch (err) {
    res.send("Other error");
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
    res.json(recipe);
  } catch (err) {
    if (err.code == 11000) {
      res.send("Recipe name already exists");
      return;
    }
    res.send("Other error " + err);
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

    res.json(`Recipe with title '${recipe.title}' has been updated.`);
  } catch (err) {
    if (err.code == 11000) {
      res.send("Recipe already exists");
      return;
    }
    res.send("Other error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const removedRecipe = await recipeModel.findByIdAndRemove(id);
    if (!removedRecipe) {
      res.json("No recipe found with this id");
      return;
    }
    res.json(removedRecipe);
  } catch (err) {
    res.send("Other error");
  }
});

export default router;
