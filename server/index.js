import cookieSession from "cookie-session";
import express from "express";
import mongoose from "mongoose";
import recipeRouter from "./routes/recipe.js";
import userRouter from "./routes/user.js";

mongoose.connect(
  "mongodb://localhost:27017/letscookDB",
  { useNewUrlParser: true },
  (err) => {
    console.log("Database is connected!");
  }
);

const app = express();

app.use(express.json());

app.use(
  cookieSession({
    secret: "aVeryS3cr3tK3y",
    sameSite: "strict",
    httpOnly: false,
    secrue: false,
    maxAge: 1000 * 60000, // 1000 mins for now
  })
);

app.use("/api/users", userRouter);
app.use("/api/recipes", recipeRouter);

app.use((err, req, res, next) => {
  res.send("Something went wrong with communication to the DB");
});

app.listen(3002, () => console.log("Server is running on port 3002"));
