import Problem from '../models/problem.models.js'; 
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js"; // Assuming your ApiError utility path
import { ApiResponse } from "../utils/ApiResponse.js"; // Assuming your ApiResponse utility path

const getAllProblems = asyncHandler(async (req, res) => {
    const problems = await Problem.find().select('_id title difficulty');

    if (!problems || problems.length === 0) {
        throw new ApiError(404, "No problems found.");
    }
    

   
    return res.status(200).json(
        new ApiResponse(200, problems, "Problems fetched successfully")
    );
});




const getProblemById = asyncHandler(async (req, res) => {
    // Extract the ProblemId from the query parameters
    const { ProblemId } = req.query; // This is the key change: using req.query

    // Basic validation to ensure ProblemId is provided
    if (!ProblemId) {
        // If ProblemId is not provided, this endpoint shouldn't handle it
        throw new ApiError(400, "The 'ProblemId' query parameter is required to fetch a specific problem.");
    }

    // Find the problem by its ID. We want all details, so no .select() here.
    const problem = await Problem.findById(ProblemId);

    // If no problem is found with the given ID
    if (!problem) {
        throw new ApiError(404, "Problem not found with the provided ID.");
    }

    // Return the problem details
    return res.status(200).json(
        new ApiResponse(200, problem, "Problem details fetched successfully.")
    );
});

export { getAllProblems,getProblemById }; // Export the function