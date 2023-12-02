import bcrypt from "bcryptjs"
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const {username,email,password} = req.body

    if(!username || !email || !password){
        return res.status(400).send({
            success:false,
            message:"Provide all fields"
        })
    }
    const existingUser = await userModel.findOne({email})
    if(existingUser){
        return res.status(400).send({
            success:false,
            message:"User Already exist"
        })
    }

    const hashedPassword = bcrypt.hashSync(password,10);
    const user = await new userModel({username,email,password:hashedPassword}).save();
    return res.status(201).send({
        success:true,
        message:"RegisterSuccessfully",
        user
    })
  } catch (error) {
    console.warn(error);
    return res.status(500).send({
      success: false,
      message: "Error in register api",
    });
  }
};
