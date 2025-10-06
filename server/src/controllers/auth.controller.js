import User from "../models/auth.model.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import ApiResponse from '../utils/ApiResponse.js'
import genAuthToken from "../configs/jwt.js";

export const userRegister = async (req, res, next) => {
  try {
    console.log(`hi from register`);
    const { userName, email, password } = req.body;
    console.log(email, password);
    if (!userName || !email || !password) {
      throw new ApiError(400, "Please fill all required fields");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User already register");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      userName,
      email,
      password: hashPassword,
    });

    res.status(200).json({
      success: true,
      message: "User register sucessfully",
      user: newUser,
    });
  } catch (error) {
    throw new ApiError(500, "Server Error", error);
  }
};


export const userLogin = async(req, res, next) => {
   try {
     const {email, password} = req.body;
     console.log(email+" "+password);
 
     if(!email || !password){
         throw new ApiError(400, "Filled the field");
     }
 
     const user = await User.findOne({email});
     console.log(user);
     if(!user){
         throw new ApiError(400, "User not register");
     }
     const isPassworMatch = await bcrypt.compare(password, user.password);
     if(!isPassworMatch){
         throw new ApiError(400, "Invalid password");
     }
     console.log(password);
     console.log(isPassworMatch);

     genAuthToken(user._id, res);
 
     res.status(200).json(
         new ApiResponse(true, "User login sucessfully", user)
     )
   } catch (error) {
    throw new ApiError(404, "User is not found ",error)
    
   }

}


export const userLogout = async (req,res, next)=>{

  try {
    res.cookie('token', '',{
      httpOnly: true,
      expires : new Date(0)
    })
    res.status(200).json(
      new ApiResponse(true, "User logout successfully", null)
    );
  } catch (error) {
    throw new ApiError(500, 'Server Error', error)
  }

}
