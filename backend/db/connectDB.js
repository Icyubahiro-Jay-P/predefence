import mongoose from "mongoose";

export const connectDB = () => {
  try {
    mongoose.connect(`${ process.env.MONGO_URI }`);
    console.log("Mongo DB connected successfully");
  } catch (error) {
    console.log(error);
  }
}