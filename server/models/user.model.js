import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, minLength: 8, select: false },
  isAdmin: { type: Boolean },
  profilePic: { type: String },
  bio: { type: String },
});

export default mongoose.model("user", schema);
