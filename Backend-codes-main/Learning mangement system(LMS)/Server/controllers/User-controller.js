import User from "../models/User-model.js";
import AppError from "../utilis/error-utile.js";
import cloudinary from "cloudinary"
import fs from "fs/promises"
import jwt from 'jsonwebtoken'
import sendEmail from "../utilis/sendEmail.js";
import crypto from "crypto";

const cookieOptions = {
    maxAge: 7*24*60*60*1000, // 7days
    httpOnly:true,
    secure:true
}

export const register = async (req, res, next) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return next(new AppError('All fileds are require ', 400))
    }
    const userExists = await User.findOne({email})
    if (userExists) {
        return next(new AppError('Email already Exists',409))
    }
   const user = await User.create(
    {   fullName,
        email, 
        password ,
        avatar:{
            public_id: email,
            secure_url: `https://res.cloudinary.com/dxqyqzj5p/image`
        }
    })

        if (!user){
            return next(new AppError('User rigestation is failed, please try again',400))
        }

      
        if ( req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload( req.file.path,{
                    folder: "lms",
                    width: 150,
                    height: 150,
                    crop: "fill",
                    gravity:"faces"
                })
                if(result){
                    user.avatar.public_id =result.public_id;
                    user.avatar.secure_url = result.secure_url;
                    await user.save();

                    // Remove the file from local chaces
                    fs.rm(`uploads/${req.file.filename}`)
                }
            } catch (error) {
                return next(new AppError(error ||'File upload failed',400))
                
            }
        }

        await user.save()

        user.password = undefined

        const token = await user.generateJwtToken();

        res.cookie("token", token,cookieOptions)

        res.status(201).json({
            success:true,
            message:'User registered Successfully',
            user,
        })
};

export const login = async (req, res,next) => {
    // login logic here
    try {
        const { email, password } = req.body;

    if(!email || !password){
        return next(new AppError('Email or password is required',400))
    }
    const user = await User.findOne({
        email
    }).select('+password')

    if(!user || !user.comparePassword(password)){
        return next(new AppError('Email or password is incorrect',400))
    }
   
    const token = await generateJWTToken();
    user.password = undefined

    res.cookie("token", token,cookieOptions)
    res.status(200).json({
        success:true,
        message:'User logged in Successfully',
        user,
    })
        
    } catch (error) {
        return next(new AppError(error.message,500))
    }
    
};

export const logout = (req, res,next) => {
    // logout logic here
    res.cookie("token", null,
        {
            secure:true,
            maxAge:0,
            httpOnly:true,
        })
        res.status(200).json({
            success:true,
            message:'User logged out Successfully',

        })
};

export const getProfile = async (req, res,next) => {
    // get profile logic here
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('+password');
       
        res.status(200).json({
            success:true,
            message:'User profile fetched Successfully',
            user,
        })
    } catch (error) {
        return next(new AppError('User not found',500))
    }
    
};


export const DeleteProfile = (req, res) => {
    // delete profile logic here
};

export const forgotPassword = async (req,res,next) =>{
    // forgot password logic here
    const {email} = req.body
   
    if(!email){
        return next(new AppError('Email is required',400))
    }

    const user = await User.findOne({email})
    if(!user){
        return next(new AppError('Email is not Registered',400))
    }

    const resetToken = user.generatePasswordResetToken()
    await user.save({validateBeforeSave:false})
    
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-Password/${resetToken}`
    
    const subject = "Reset Password"
    const message = `${resetPasswordUrl}`

    try{
        await sendEmail(email,subject,message);

        res.status(200).json({
            success:true,
            message:`Reset password token has sent to ${email} successfully`
        })
    } 
    catch(error){
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpire= undefined;
        await user.save({validateBeforeSave:false})

        return next(new AppError(error.message,500))
    }

}
export const resetPassword =async(req,res,next) =>{
    // reset password logic here
    const {resetToken} = req.params;
    const {password} = req.body

    const forgotPasswordToken =crypto
    .createHash("sha256")
    .update(resetToken)
    .digest('hex')

     const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpire:{$gt:Date.now()}
    })
        if(!user){
            return next(new AppError('Reset token is invalid or has expired',400))
        }

        user.password = password;
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpire = undefined;
        user.save()
        res.status(200).json({
            success:true,
            message:'Password reset successfully'
        })
    }

export const changePassword = async(req,res,next)=>{
    const {oldPassword,newPassword} = req.body
    const {id} = req.user

    if(!oldPassword || !newPassword){
        return next(new AppError('Please provide old password and new password',400))
    }
    const user = await User.findById(id).select('+password');

    if(!user){
        return next(new AppError('User does not exist',400))
    }

    const isPasswordValid = await user.comparePassword(oldPassword)
    if(!isPasswordValid){
        return next(new AppError('Old password is incorrect',400))
    }
    user.password = newPassword;
    await user.save()

    user.password = undefined
    res.status(200).json({
        success:true,
        message:'Password changed successfully',
    })

 }   
 export const UpdateProfile = async(req, res,next) => {
    // update profile logic here
    const {id} = req.user.id;
    const {fullName} = req.body;

    const user = await User.findById(id);
    if (!user) {
        return next(new AppError('User does not exist', 400));
    }
    if(req.fullName){
         user.fullName = fullName;
    }
    if(req.file){
        await cloudinary.v2.uploader.destroy(user.avatar.public_id)
        try {
            const result = await cloudinary.v2.uploader.upload( req.file.path,{
                folder: "lms",
                width: 150,
                height: 150,
                crop: "fill",
                gravity:"faces"
            })
            if(result){
                user.avatar.public_id =result.public_id;
                user.avatar.secure_url = result.secure_url;
                await user.save();

                // Remove the file from local chaces
                fs.rm(`uploads/${req.file.filename}`)
            }
        } catch (error) {
            return next(new AppError(error ||'File upload failed',400))
            
        }
        await  user.save();
        res.status(200).json({
            success:true,
            message:'Profile updated successfully',
        })
    }
};

