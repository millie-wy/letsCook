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
    const {
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
    if (tags) recipe.direction = tags;
    if (star) recipe.star = star;
    if (comments) recipe.comments = comments;
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

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;

  const user = users.find((user) => user.id === id);
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (age) user.age = age;

  res.send(`User with the id ${id} has been updated`);
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
