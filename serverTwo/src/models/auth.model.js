import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
    },
    profilePic: {
      type: String,
      
    },
    gender: {
      enum: ["Male", "Female", "Other"],
    },
    bloodGroup: {
      type: String,
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
