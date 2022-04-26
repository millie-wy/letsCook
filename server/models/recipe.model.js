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
  author: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      email: { type: String },
      firstName: { type: String },
      lastName: { type: String },
      role: { type: String },
    },
  ],
  comments: [
    {
      author: { type: String },
      content: { type: String },
      rated: { type: Number },
    },
  ],
});

export default mongoose.model("recipe", schema);
