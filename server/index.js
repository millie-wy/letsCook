import mongoose from "mongoose";
import express from "express";

// set up express app
const app = express();
const PORT = 3001;

app.use(express.json());

const main = async () => {
  console.log("called ");
  await mongoose.connect("mongodb://localhost:27017/test");
  const userSchema = new mongoose.Schema({
    name: String,
  });
  const User = mongoose.model("User", userSchema);
  const william = new User({ name: "William" });
  console.log(User);
  console.log(william.name);
};

main().catch((err) => console.log(err));

app.listen(PORT, () =>
  console.log(`App is running on port: http://localhost:${PORT}.`)
);
