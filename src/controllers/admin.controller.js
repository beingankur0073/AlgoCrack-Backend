// controllers/admin.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.models.js";
import Problem from '../models/problem.models.js'; 


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false }); // Save without triggering password validation

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating admin tokens");
    }
};


const getRealAllProblems = asyncHandler(async (req, res) => {
    // Remove .select() to retrieve all fields of the problem documents
    const problems = await Problem.find();

    if (!problems || problems.length === 0) {
        throw new ApiError(404, "No problems found.");
    }

    return res.status(200).json(
        new ApiResponse(200, problems, "Problems fetched successfully")
    );
});

/**
 * @desc Admin Login
 * @route POST /api/v1/admin/login
 * @access Public
 */
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required for admin login.");
    }

    const admin = await User.findOne({ email });

    // Check if user exists and has admin role
    if (!admin || admin.role !== 'admin') {
        throw new ApiError(401, "Invalid credentials or user is not an administrator.");
    }

    // Check password
    const isPasswordCorrect = await admin.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials or user is not an administrator.");
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin._id);

    const options = {
        httpOnly: true, // Makes the cookie inaccessible to client-side scripts
        secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
        sameSite: 'Lax', // Adjust as needed ('Strict', 'None')
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    admin: {
                        _id: admin._id,
                        username: admin.username,
                        email: admin.email,
                        fullName: admin.fullName,
                        avatar: admin.avatar,
                        role: admin.role
                    },
                    accessToken,
                    refreshToken,
                },
                "Admin logged in successfully."
            )
        );
});

// Example of an Admin-only API (you would add more here)
/**
 * @desc Get All Users (Admin-only)
 * @route GET /api/v1/admin/users
 * @access Private (Admin only)
 */
const getAllUsersForAdmin = asyncHandler(async (req, res) => {
    // This function assumes the request has already passed through `verfiyJWT` and `isAdmin` middleware
    const users = await User.find({ role: { $ne: 'admin' } }).select('-password -refreshToken'); // Exclude sensitive fields
    return res.status(200).json(new ApiResponse(200, users, "All users fetched for admin."));
});


const deleteProblemById = asyncHandler(async (req, res) => {
    const { problemId } = req.params;

    if (!problemId) {
        throw new ApiError(400, "Problem ID is required.");
    }

    const deletedProblem = await Problem.findByIdAndDelete(problemId);

    if (!deletedProblem) {
        throw new ApiError(404, "Problem not found.");
    }

    
    return res
        .status(200)
        .json(new ApiResponse(200, null, "Problem deleted successfully."));
});


export {
    loginAdmin,
    getAllUsersForAdmin,
    getRealAllProblems
    // ... any other admin-specific functions
};