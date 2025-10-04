import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`The mongoose is connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`The mongoose connected failed`);
    process.exit(1);
  }
};
export default connectDB;
