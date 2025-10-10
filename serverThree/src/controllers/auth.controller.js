import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';





const userRegister = async (req, res)=>{
    try {
        const {userName, email, phoneNumber, dob, password,gender, address} = req.body;
        if(!userName || !email || !phoneNumber || !dob || !password|| !gender){
            throw new ApiError(400, "Filled the details");
        }

        const existUser = await User.findOne({email});
        if(existUser){
            throw new ApiError(400, "User ia already registerr");
        }

        const salt = bcrypt.genSalt(10);

        const hashPassword = bcrypt.hash(password,salt);

        const newProfilePic  =  `https://api.dicebear.com/5.x/initials/svg?seed=${userName
      .charAt(0)
      .toUpperCase()}`;

      const newUser = await User.create({
        userName,
        email,
        password : hashPassword,
        dob,
        newProfilePic : newProfilePic,
        gender,
        phoneNumber,
        address
      })

      if(!newUser){
        throw new ApiError(500, "User is unable to create");
      }

      res.status(200).json(
        new ApiResponse(200,'User register sucessfully', newUser)
      )
        
    } catch (error) {
        throw new ApiError(500, 'Server problem of Register the User', error);
    }
}

export {userRegister};