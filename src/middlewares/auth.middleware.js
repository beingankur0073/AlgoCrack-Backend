import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import {User} from "../models/user.models.js"

// middleware have next to it as a input
// as no response is there so _ in place of res
export const verfiyJWT=asyncHandler(async(req,_,next)=>{
    
    try {

       const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(401,"Unauthorised request")
        }
     
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
       const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
    
       if(!user){
        // frontend todo
        throw new ApiError(401,"Inavalid Access Token");
       }
    
       req.user=user;
       next();
    } catch (error) {
        throw new ApiError(401,error?.message||"Invalid access token");
    }

})