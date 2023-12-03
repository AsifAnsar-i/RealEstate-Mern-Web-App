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
      message: "RegisterSuccessfully",
      username: user.username,
      email: user.email,
      role: user.role,
      userId: user._id,
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
      name: user.username,
      email: user.email,
      role: user.role,
      userId: user._id,
      password: user.password,
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

const generateToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
