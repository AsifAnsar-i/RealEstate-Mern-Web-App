import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique:true
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);
