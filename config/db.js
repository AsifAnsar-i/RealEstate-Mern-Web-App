import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.warn(`Connected to MOngo ${conn.connection.host}`.bgGreen.white);
  } catch (error) {
    console.warn(`Error in Mongo ${error}`.bgRed.white);
  }
};

export default connectDB;
