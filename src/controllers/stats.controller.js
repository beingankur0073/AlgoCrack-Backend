// src/controllers/stats.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import {User} from "../models/user.models.js"
import Problem from '../models/problem.models.js';
import Submission from '../models/submission.models.js';


export const getPlatformStats = asyncHandler(async (req, res) => {
    try {
        // --- 1. Total Users Count ---
        const totalUsers = await User.countDocuments();

        // --- 2. Users Joined Over Time (Daily Count) ---
        const usersJoinedOverTime = await User.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date (YYYY-MM-DD)
                    count: { $sum: 1 } // Count users for each date
                }
            },
            { $sort: { _id: 1 } } // Sort by date ascending
        ]);

        // --- 3. Total Submissions Count ---
        const totalSubmissions = await Submission.countDocuments();

        // --- 4. Submissions Over Time (Daily Count) ---
        const submissionsOverTime = await Submission.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date (YYYY-MM-DD)
                    count: { $sum: 1 } // Count submissions for each date
                }
            },
            { $sort: { _id: 1 } } // Sort by date ascending
        ]);

        // --- 5. Most Solved Problems (Top 10 based on unique accepted users) ---
        const mostSolvedProblems = await Submission.aggregate([
            { $match: { status: "Accepted" } }, // Only consider accepted submissions
            {
                // Group by problemId and userId to count each unique user who solved a problem
                $group: {
                    _id: { problemId: "$problemId", userId: "$userId" }
                }
            },
            {
                // Now count how many unique users solved each problem
                $group: {
                    _id: "$_id.problemId", // Group by just the problem ID
                    solvedCount: { $sum: 1 } // Sum the unique solvers
                }
            },
            { $sort: { solvedCount: -1 } }, // Sort by solved count (descending)
            { $limit: 10 }, // Get the top 10
            {
                // Join with the 'problems' collection to get problem details (like title)
                $lookup: {
                    from: "problems", // The name of the collection for your Problem model (usually lowercase and plural of model name)
                    localField: "_id",
                    foreignField: "_id",
                    as: "problemDetails"
                }
            },
            {
                $unwind: "$problemDetails" // Deconstruct the array created by $lookup
            },
            {
                // Reshape the output
                $project: {
                    _id: 0, // Exclude default _id from output
                    problemId: "$_id",
                    title: "$problemDetails.title",
                    difficulty: "$problemDetails.difficulty", // Include difficulty if you have it
                    solvedCount: 1
                }
            }
        ]);
        
        // --- 6. Total Number of Problems ---
        const totalProblems = await Problem.countDocuments();

        // --- 7. Submission Status Distribution (e.g., Accepted, Wrong Answer, TLE) ---
        const submissionStatusDistribution = await Submission.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } } // Group by status field
        ]);

        // --- 8. Submissions Per Language ---
        const submissionsPerLanguage = await Submission.aggregate([
            { $group: { _id: "$language", count: { $sum: 1 } } } // Group by language field
        ]);

        // Combine all fetched statistics into a single response object
        const stats = {
            totalUsers,
            usersJoinedOverTime,
            totalSubmissions,
            submissionsOverTime,
            mostSolvedProblems,
            totalProblems,
            submissionStatusDistribution,
            submissionsPerLanguage
        };

        // Send a successful API response
        return res.status(200).json(
            new ApiResponse(
                200,
                stats,
                "Platform statistics fetched successfully."
            )
        );

    } catch (error) {
        console.error("Error fetching platform statistics:", error);
        // Throw an ApiError for consistent error handling
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, "Internal server error while fetching platform statistics.");
    }
});