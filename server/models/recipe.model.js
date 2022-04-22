import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  servings: { type: Number, required: true },
  cookingMinute: { type: Number, required: true },
  ingredients: [{ type: String, required: true }],
  direction: [{ type: String, required: true }],
  tags: [{ type: String }],
  star: { type: Number },
  comments: [{ type: String }],
});

export default mongoose.model("recipe", schema);
