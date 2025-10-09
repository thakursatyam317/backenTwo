import User from "../models/auth.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
// import jwt from 'jsonwebtoken';

export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;
    console.log("req.user _id:", req.user?._id);//req.user _id: new ObjectId('68e54d308db5a88e57b16fdc')
    console.log("req.user id:", req.user?.id);//req.user id: 68e54d308db5a88e57b16fdc

    console.log(userId);//new ObjectId('68e54d308db5a88e57b16fdc') this give the mongoose _id
    if (!userId) {
      throw new ApiError(400, "User id is required");
    }
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(userId) }).select("-password"); //_id: new mongoose.Types.ObjectId(userId) it is a conversion the string to the miongoose _id
    console.log(user);// it give the complete user details except the password
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, "User profile fetched successfully", user));
      next();
  } catch (error) {
    next(new ApiError(500, "Server error getting user profile", false, error.message));
  }
};


export const updateUserProfile = async (req, res, next) => {
  const {userName, email, phoneNumber, dob, gender} = req.body;

  try{
    const userId = req.user?._id || req.user?.id;
    if(!userId){
      throw new ApiError(400, "User id is required");
    }
    const user = await User.findById({userId});
    if(!user){
      throw new ApiError(404, "User not found");
    }

    if(!userName || !email || !phoneNumber){
      throw new ApiError(400, "userName, email and phoneNumber are required");
    }
    const updatedData = await User.findByIdAndUpdate(
      userId,
      {userName, email, phoneNumber, dob, gender},
      {new: true, runValidators: true}
    ).select("-password");
    res
      .status(200)
      .json(new ApiResponse(200, "User profile updated successfully", updatedData));
      next();

  }
  catch(error){
    next(new ApiError(500, "Server error updating user profile", false, error.message));
  }
}