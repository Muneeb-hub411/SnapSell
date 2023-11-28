import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MongoDB_URL);
    console.log(`Connnected to mongodb Host:${conn.connection.host}`);
  } catch (error) {
    console.log(`Mongo DB Error ${error}`);
  }
};
export default connectDB;
