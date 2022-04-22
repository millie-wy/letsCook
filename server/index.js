import express from "express";
import mongoose from "mongoose";
import userModel from "./models/user.model.js";
import recipeModel from "./models/recipe.model.js";
import userRouter from "./routes/user.js";
import recipeRouter from "./routes/recipe.js";

mongoose.connect(
  "mongodb://localhost:27017/letscookDB",
  { useNewUrlParser: true },
  (err) => {
    console.log("Database is connected!");
  }
);

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/recipes", recipeRouter);

app.use((err, req, res, next) => {
  res.send("Something went wrong with communication to the DB");
});

app.listen(3002, () => console.log("Server is running on port 3002"));
