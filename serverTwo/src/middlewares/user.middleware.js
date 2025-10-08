import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";
import ApiError from "../utils/ApiError.js";

export const userProtection = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.cookies.token;
  // console.log("authHeader:", authHeader);//token
  // console.log("req.cookies.token:", req.cookies.token);//token
  // console.log("req.headers.authorization:", req.headers.authorization);// undefined

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }
  try {
    const token = authHeader.split(" ")[1] || req.cookies.token;
    console.log(token);//token

    if (!token) {
      throw new ApiError(401, "not authorized");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);// token decode and give the user_id and iat and exp
    if (!decode) {
      throw new ApiError(401, "not authorized, token failed");
    }
    const user = await User.findById(decode.user_id);
    console.log(user);//complete the user details from the user_id
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
