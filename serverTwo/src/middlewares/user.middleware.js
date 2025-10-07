import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const userProtection = async (req, res, next) => {
  try {
    const token = req.cookies;
    if (!token) {
      throw new ApiError(401, "not authorized");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.userId);
    if (!user) {
      throw new ApiError(404, "not authorized, user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "not authorized");
  }
};
