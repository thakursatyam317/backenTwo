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
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addressSchema",
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      enum: ["Male", "Female", "Other"],
      
    },
    dob: {
      type: String,
    },
    profilePic: {
      type: String,
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export const addressSchema = new mongoose.Schema({
  houseNumber: {
    type: String,
    required: true,
  },
  colonyName: {
    type: String,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});

export default  User ;
