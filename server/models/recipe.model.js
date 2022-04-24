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
  comments: [
    {
      author: { type: String },
      content: { type: String },
      rated: { type: Number },
    },
  ],
});

export default mongoose.model("recipe", schema);
