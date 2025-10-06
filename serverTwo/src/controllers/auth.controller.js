import User from '../models/auth.model.js'
import bcrypt from 'bcrypt';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import genAuthToken from '../configs/jwt.js';

const userRegister = async (req, res, next)=>{
    try {
        const {userName, email, phoneNumber, password, dob,gender} = req.body;
        console.log(email);
        console.log(userName);

        if(!userName || !email || !phoneNumber || !password || !dob || !gender){
            throw new ApiError(400, 'All fields are required');
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            throw new ApiError(409, 'User is already  registered');
        }
        console.log('after existing user');

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        if(!hashPassword){
            throw new ApiError(500, 'Unable to hash the password');
        }
        console.log('after hash password');
        const profilePic = `https://api.dicebear.com/5.x/initials/svg?seed=${userName
      .charAt(0)
      .toUpperCase()}`;

      console.log(profilePic);

        const newUser = await User.create({
            userName,
            email,
            phoneNumber,
            password : hashPassword,
            dob,
            profilePic : profilePic,
            gender

        })
        if(!newUser){
            throw new ApiError(500, 'Unable to create user');
        }
        console.log('after new user');

        res.status(200).json(
            new ApiResponse(200,'User register sucessfully', newUser)
        )
        
    } catch (error) {
        throw new ApiError(500, 'Server error', false, error.message);
       
        
    }
}


const userLogin = async (req,res,next) =>{
    try {
        const {email, phoneNumber, password} = req.body;
        if(!email || !phoneNumber || !password){
            throw new ApiError(400, 'All fields are required');
        }
        console.log(email);
        console.log(phoneNumber);
        
        const existingUser = await User.findOne({
            $or : [{email}, {phoneNumber}]
        });

        if(!existingUser){
            throw new ApiError(404, 'User is not registered');
        }
        console.log('after existing user');
        const ispasswordMatch = await bcrypt.compare(password, existingUser.password);
        if(!ispasswordMatch){
            throw new ApiError(400, 'Invalid credentials');
        }
        genAuthToken(existingUser._id, res);

        console.log('after password match');
        res.status(200).json(
            new ApiResponse(200, 'User login sucessfully', existingUser)
        );
    } catch (error) {
        throw new ApiError(500, 'Server error', false, error.message);
    }
}





export {userRegister, userLogin};