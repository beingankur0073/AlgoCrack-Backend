import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import {User} from "../models/user.models.js"
import { uploadOnCloudinary, deleteFromCloudinary, getPublicIdFromCloudinaryUrl } from '../utils/cloudinary.js'; 
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken'



const generateAccessAndRefreshToken= async(userId)=>{
  try {
    const user=await User.findById(userId);

    const accessToken=user.generateAccessToken();
    const refreshToken=user.generateRefreshToken();

    user.refreshToken=refreshToken;
    user.save({validateBeforeSave:false});

    return {accessToken,refreshToken};

  } catch (error) {
    throw new ApiError(500,"Something went wrong while generating refresh and access token")
  }
}




const registerUser=asyncHandler(async(req,res)=>{
   

   const{fullName,email,username,password} =req.body;
   if(
    [fullName,email,username,password].some((feild)=>feild?.trim()==="")
   ){
       throw new ApiError(400,"fullname is required")
   }

   const existedUser=await User.findOne(
      {
        $or:[{username},{email}]
      }
   )

   if(existedUser) throw new ApiError(409,"User with email or username already exists")

    const avatarLocalPath=req.files?.avatar[0]?.path;

   
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required");
    }
    
    const avatar=await uploadOnCloudinary(avatarLocalPath)
   
    if(!avatar){
        throw new ApiError(400,"Avatar file is required");
    }

  const user=await User.create({
        fullName,
        avatar:avatar.url,
        email,
        password,
        username:username.toLowerCase(),
    })

  const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered successfully")
  )

})


const loginUser=asyncHandler(async(req,res)=>{
   // req body -> data
   // username or email
   // find the user
   // password check
   // access and refresh token
   // send cookie


   const {email,username,password}=req.body;

   if(!username && !email){
    throw new ApiError(400,"username or email is required")
   }

  const user= await User.findOne({
    $or:[{username},{email}]
   })

   if(!user){
    throw new ApiError(404,"User not exist");
   }

   const isPasswordValid=await user.isPasswordCorrect(password);
   
   if(!isPasswordValid){
      throw new ApiError(401,"Inavalid user credentials");
   }

  const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id);
  // console.log(accessToken);

  const loggedInUser=await User.findById(user._id).select("-password -refreshtoken");

  const options={
    httpOnly:true,
    secure:true,
    sameSite: 'None',
  }

  return res.status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new ApiResponse(
      200,
      {
        user:loggedInUser,accessToken,refreshToken,
      },
      "User logged in Successfully"
    )
  )

})



const logoutUser=asyncHandler(async(req,res)=>{

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set:{
          refreshToken:undefined
        }
      },
      {
        new:true
      }
     )

     const options={
      httpOnly:true,
      secure:true,
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out successfully"))
})


const refreshAccessToken=asyncHandler(async(req,res)=>{
  try {
    // .body is for mobile users
    const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshAccessToken

    if(!incomingRefreshToken){
      throw new ApiError(401,"unauthorized request")
    }
  
    const decodedToken=jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    )
  
    const user=await User.findById(decodedToken?._id);
  
    if(!user){
      throw new ApiError(401,"Invalid refresh token");
    }
  
    if(incomingRefreshToken!==user?.refreshToken){
      throw new ApiError(401,"Refresh Token is expired or used");
    }
  
    const options={
      httpOnly:true,
      secure:true,
    }
  
    const {accessToken,newRefreshToken}=await generateAccessAndRefreshToken(user._id);
  
  
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",newRefreshToken,options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,refreshToken:newRefreshToken,
        },
        "Access token refreshed"
      )
    )
  } catch (error) {
    throw new ApiError(401,error?.message||"Invalid refresh token");
  }
})


const changeCurrentPassword=asyncHandler(async(req,res)=>{
     const {oldPassword,newPassword}=req.body;
     const user=await User.findById(req.user?._id)
     const isPasswordCorrect=await user.isPasswordCorrect(oldPassword);

     if(!isPasswordCorrect){
      throw new ApiError(400,"Invalid old password");
     }

     user.password=newPassword;
     await user.save({validateBeforeSave:false});

    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password changed successfully"))
})

const getCurrentUser=asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(new ApiResponse(200,req.user,"Current user fetched successfully"))
})


const updateAccountDetails=asyncHandler(async(req,res)=>{
  const {fullName,email}=req.body;
  if(!fullName || !email){
    throw new ApiError(400,"All fileds are required")
  }
  const user=await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{
        fullName,
        email:email
      }
    },
    {new:true}
  ).select("-password")

  return res
  .status(200)
  .json(new ApiResponse(200,user,"Account details updated successfully"));

}) 


const updateUserAvatar = asyncHandler(async (req, res) => {
    // 1. Get the path to the newly uploaded avatar file
    const avatarLocalPath = req.file?.path;

    // Validate if a new avatar file was provided
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing.");
    }

    // 2. Find the current user to get their existing avatar URL
    const currentUser = await User.findById(req.user?._id);

    // Basic validation to ensure the user exists (should be handled by verifyJWT, but good practice)
    if (!currentUser) {
        throw new ApiError(404, "User not found.");
    }

    // 3. Upload the new avatar to Cloudinary
    const newAvatarCloudinaryResponse = await uploadOnCloudinary(avatarLocalPath);

    // Validate if the new avatar was successfully uploaded
    if (!newAvatarCloudinaryResponse || !newAvatarCloudinaryResponse.url) {
        throw new ApiError(500, "Error while uploading the new avatar to Cloudinary.");
    }

    // 4. Delete the old avatar from Cloudinary (if one exists)
    const oldAvatarUrl = currentUser.avatar; // Get the URL of the current avatar from the database

    if (oldAvatarUrl) {
        const publicIdToDelete = getPublicIdFromCloudinaryUrl(oldAvatarUrl);

        if (publicIdToDelete) {
            // Attempt to delete the old avatar from Cloudinary
            // We use await here, but the overall update process won't halt if deletion fails.
            // Consider logging the result of this deletion for monitoring.
            await deleteFromCloudinary(publicIdToDelete);
            console.log(`Attempted to delete old avatar with Public ID: ${publicIdToDelete}`);
        } else {
            console.warn(`Could not extract public ID from old avatar URL: ${oldAvatarUrl}. Skipping deletion.`);
        }
    }

    // 5. Update the user's avatar URL in the database with the new one
    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: newAvatarCloudinaryResponse.url // Set the new avatar URL
            }
        },
        { new: true } // Return the updated document
    ).select("-password"); // Exclude the password from the returned user object

    // Final validation of the user update
    if (!updatedUser) {
        throw new ApiError(500, "Failed to update user avatar in the database after Cloudinary upload.");
    }

    // 6. Send a success response
    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "Avatar image updated successfully."));
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
    // 1. Get the path to the newly uploaded cover image file
    const coverImageLocalPath = req.file?.path;

    // Validate if a new cover image file was provided
    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image file is missing.");
    }

    // 2. Find the current user to get their existing cover image URL
    const currentUser = await User.findById(req.user?._id);

    // Basic validation to ensure the user exists
    if (!currentUser) {
        throw new ApiError(404, "User not found.");
    }

    // 3. Upload the new cover image to Cloudinary
    const newCoverImageCloudinaryResponse = await uploadOnCloudinary(coverImageLocalPath);

    // Validate if the new cover image was successfully uploaded
    if (!newCoverImageCloudinaryResponse || !newCoverImageCloudinaryResponse.url) {
        throw new ApiError(500, "Error while uploading the new cover image to Cloudinary.");
    }

    // 4. Delete the old cover image from Cloudinary (if one exists)
    const oldCoverImageUrl = currentUser.coverImage; // Get the URL of the current cover image from the database

    if (oldCoverImageUrl) {
        const publicIdToDelete = getPublicIdFromCloudinaryUrl(oldCoverImageUrl);

        if (publicIdToDelete) {
            // Attempt to delete the old cover image from Cloudinary
            await deleteFromCloudinary(publicIdToDelete);
            console.log(`Attempted to delete old cover image with Public ID: ${publicIdToDelete}`);
        } else {
            console.warn(`Could not extract public ID from old cover image URL: ${oldCoverImageUrl}. Skipping deletion.`);
        }
    }

    // 5. Update the user's coverImage URL in the database with the new one
    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: newCoverImageCloudinaryResponse.url // Set the new cover image URL
            }
        },
        { new: true } // Return the updated document
    ).select("-password"); // Exclude the password from the returned user object

    // Final validation of the user update
    if (!updatedUser) {
        throw new ApiError(500, "Failed to update user cover image in the database after Cloudinary upload.");
    }

    // 6. Send a success response
    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "Cover image updated successfully."));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,

  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage
};