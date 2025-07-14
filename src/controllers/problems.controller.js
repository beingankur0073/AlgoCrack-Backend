import Problem from '../models/problem.models.js'; 
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js"; 
import { ApiResponse } from "../utils/ApiResponse.js";
import Submission from '../models/submission.models.js'; 

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


const addProblem = asyncHandler(async (req, res) => {
    // The request body should contain the full JSON structure of the problem
    const problemData = req.body;

    // Basic validation: Check for essential fields
    if (!problemData.title || !problemData.description || !problemData.difficulty || !problemData.testCases || problemData.testCases.length === 0) {
        throw new ApiError(400, "Problem must include a title, description, difficulty, and at least one test case.");
    }

    // You might want more specific validation here for testCases structure, etc.
    // However, Mongoose schema validation will also catch type mismatches and required fields.

    try {
        const newProblem = await Problem.create(problemData);

        if (!newProblem) {
            throw new ApiError(500, "Failed to create the problem. Please check input data.");
        }

        return res.status(201).json(
            new ApiResponse(
                201,
                newProblem, // Return the newly created problem document
                "Problem added successfully!"
            )
        );

    } catch (error) {
        // Handle Mongoose validation errors or other database errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            throw new ApiError(400, `Validation failed: ${errors.join(', ')}`);
        }
        // If there's a duplicate key error (e.g., title unique constraint)
        if (error.code === 11000) {
            throw new ApiError(409, "Problem with this title already exists.");
        }
        console.error("Error adding problem:", error);
        throw new ApiError(500, "Internal server error while adding problem.");
    }
});


const deleteProblemById = asyncHandler(async (req, res) => {
    const { problemId } = req.params;

    if (!problemId) {
        throw new ApiError(400, "Problem ID is required.");
    }

    try {
        // Find the problem first to ensure it exists
        const problemToDelete = await Problem.findById(problemId);

        if (!problemToDelete) {
            throw new ApiError(404, "Problem not found.");
        }

        // --- Optional: Delete associated submissions ---
        // This is highly recommended to prevent orphaned data.
        const deleteSubmissionsResult = await Submission.deleteMany({ problemId: problemToDelete._id });
        console.log(`Deleted ${deleteSubmissionsResult.deletedCount} submissions associated with problem ${problemId}.`);
        // --- End Optional ---

        // Now, delete the problem itself
        const deletedProblem = await Problem.findByIdAndDelete(problemId);

        if (!deletedProblem) {
            // This case should ideally not be hit if problemToDelete was found,
            // but as a safeguard.
            throw new ApiError(500, "Failed to delete the problem.");
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Problem and its associated submissions deleted successfully.")
        );

    } catch (error) {
        // Handle Mongoose CastError if problemId is not a valid ObjectId
        if (error.name === 'CastError') {
            throw new ApiError(400, "Invalid Problem ID format.");
        }
        console.error("Error deleting problem:", error);
        // Re-throw if it's an ApiError already, otherwise create a generic one
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, "Internal server error while deleting problem.");
    }
});

export { getAllProblems,getProblemById,addProblem,deleteProblemById }; // Export the function