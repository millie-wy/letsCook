import express from "express";
import recipeModel from "../models/recipe.model.js";

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
    const currentRecipe = await recipeModel.findById(id);
    if (!currentRecipe) {
      res.json("No recipe found with this id");
      return;
    }
    res.json(currentRecipe);
  } catch (err) {
    res.send("Other error");
  }
});

router.post("/", async (req, res) => {
  let {
    title,
    description,
    image,
    servings,
    cookingMinute,
    ingredients,
    direction,
    tags,
    star,
    comments,
  } = req.body;
  try {
    const recipe = new recipeModel({
      title,
      description,
      image: req.body.image,
      servings,
      cookingMinute,
      ingredients,
      direction,
      tags,
      star,
      comments,
    });
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
    const recipe = await recipeModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    res.json({
      old: recipe,
      new: req.body,
    });
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
