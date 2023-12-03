import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
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
    photo: {
      type: String,
      default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fprofile-avatar&psig=AOvVaw1yQ1mkZYCy9cvQTHSZp5gK&ust=1701718448973000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCMiI766B9IIDFQAAAAAdAAAAABAE",
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);
