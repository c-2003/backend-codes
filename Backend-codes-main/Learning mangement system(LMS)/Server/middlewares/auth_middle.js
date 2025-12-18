import  jwt  from "jsonwebtoken";
import AppError from "../utilis/error-utile.js";

export const isLoggedIn = async (req, res , next) =>{
    const {token} =req.cookies;
    
    if(token){
        return next(new AppError("Unauthenticated, Please login again",401))
    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET)
    req.user = userDetails;
    next()
}

export const authorizedRoles = (...roles) =>async (req, res, next)=>{
    const currentUserRoles = req.user.roles
    if(!roles.includes(currentUserRoles)){
        return next(new AppError("You are not authorized to perform this action",401))
    }
    next()
}




