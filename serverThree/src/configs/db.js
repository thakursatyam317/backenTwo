import mongoose from "mongoose";
import ApiError from "../utils/ApiError";

const connectDb = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDb is connected secussfully ", conn.connection.host);
  } catch (error) {
    new ApiError(500, "MongoDb connected Failed");
    process.exit(1);
  }
};

export default connectDb;
