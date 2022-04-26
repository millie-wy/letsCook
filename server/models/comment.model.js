import mongoose from "mongoose";

const schema = new mongoose.Schema({
  content: { type: String },
  rated: { type: Number },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: "recipe" },
});

export default mongoose.model("comment", schema);
