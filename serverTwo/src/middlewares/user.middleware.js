import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";
import ApiError from "../utils/ApiError.js";

export const userProtection = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log(token); //token

    if (!token) {
      throw new ApiError(401, "not authorized");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decode the token : ", decode); // token decode and give the user_id and iat and exp
    if (!decode) {
      throw new ApiError(401, "not authorized, token failed");
    }
    const user = await User.findById(decode.id); //jwt me id hai
    // console.log("user for middleware : ",user);//complete the user details from the user_id
    if (!user) {
      throw new ApiError(404, "not authorized, user not found");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(
      400,
      "not authorized token failed",
      false,
      error.message
    );
  }
};
