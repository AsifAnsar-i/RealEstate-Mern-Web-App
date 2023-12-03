import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Provide all fields",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User Already exist",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await new userModel({
      username,
      email,
      password: hashedPassword,
    }).save();
    return res.status(201).send({
      success: true,
      message: "Register Successfully",
      username: user.username,
      email: user.email,
      role: user.role,
      userId: user._id,
      photo: user.photo,
      password: user.password,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.warn(error);
    return res.status(500).send({
      success: false,
      message: "Error in register api",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Provide all field",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credential",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      username: user.username,
      email: user.email,
      role: user.role,
      userId: user._id,
      password: user.password,
      photo: user.photo,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.warn(error);
    return res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};

export const googleController = async (req, res) => {
  try {
    const { username, email, photo } = req.body;
    const password = "23e3443e23097821145321wwq";
    const existingUser=await userModel.findOne({email})
    if(existingUser){
      return res.status(200).send({
           username:existingUser.username,
           email:existingUser.email,
           photo:existingUser.photo,
           password,
           token:generateToken(existingUser._id)
      })
    }
    const user = await new userModel({
      username,
      email,
      password,
      photo,
    }).save();
    return res.status(201).send({
      success: true,
      message: "Register Successfully",
      user,
    });
  } catch (error) {
    console.warn(error);
    return res.status(500).send({
      success: false,
      message: "Error in google auth api",
    });
  }
};

const generateToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
