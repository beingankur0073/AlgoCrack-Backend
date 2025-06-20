// src/controllers/submission.controller.js

import Problem from '../models/problem.models.js'; // Assuming problem.models.js
import Submission from '../models/submission.models.js'; // Assuming submission.models.js
// import { DailySubmissionCount } from '../models/dailySubmissionCount.model.js'; // REMOVED: DailySubmissionCount import
import { ApiError } from "../utils/ApiErrors.js"; // Your custom error handler
import { ApiResponse } from "../utils/ApiResponse.js"; // Your custom API response formatter
import { asyncHandler } from "../utils/asyncHandler.js"; // Your async error wrapper
import { submitCode, getSubmissionStatus, LANGUAGE_IDS } from '../services/judge0Service.js'; // Judge0 service

import { createJudge0WrapperCode } from '../utils/judge0utils.js'; // Utility function import

// --- Controller 1: createSubmission (handles POST /api/submissions/:problemId) ---
const createSubmission = asyncHandler(async (req, res) => {
    const { problemId } = req.params;
    const { code, language } = req.body;
    const userId = req.user._id; // Extracted from verifyJWT middleware

    if (!code || !language) {
        throw new ApiError(400, "Code and language are required.");
    }
    if (!LANGUAGE_IDS[language.toLowerCase()]) {
        throw new ApiError(400, `Unsupported language: ${language}. Supported languages are: ${Object.keys(LANGUAGE_IDS).join(', ')}`);
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
        throw new ApiError(404, "Problem not found.");
    }

    const newSubmission = new Submission({
        userId,
        problemId,
        code,
        language,
        status: 'Pending',
        submittedAt: new Date(),
        judge0Submissions: []
    });

    try {
        for (const testCase of problem.testCases) {
            // --- CRUCIAL: Generate wrapped code for Judge0 ---
            const fullSourceCode = await createJudge0WrapperCode(
                code,
                LANGUAGE_IDS[language.toLowerCase()], // Judge0 language ID
                problem.functionSignatures, // Use problem's function signature info
                testCase.input // Input for the test case
            );

            // Submit the WRAPPED code to Judge0
            const judge0Response = await submitCode(
                fullSourceCode, // Send the wrapped code
                language, // Still pass the human-readable language
                testCase.input, // This might not be strictly needed by judge0Service if wrapper handles stdin
                testCase.expectedOutput // Used for comparison by judge0Service
            );

            newSubmission.judge0Submissions.push({
                token: judge0Response.token,
                testCaseId: testCase._id,
                status: 'Processing' // Initial status
            });
        }

        await newSubmission.save();

        // --- REMOVED LOGIC: Daily Submission Count Update ---
        // const today = new Date();
        // today.setUTCHours(0, 0, 0, 0);
        // await DailySubmissionCount.findOneAndUpdate(
        //     { userId: userId, date: today },
        //     { $inc: { count: 1 } },
        //     { upsert: true, new: true, setDefaultsOnInsert: true }
        // );
        // --- END REMOVED LOGIC ---

        res.status(202).json(
            new ApiResponse(202, { submissionId: newSubmission._id }, "Code submitted for judging.")
        );

    } catch (error) {
        // More specific error handling
        console.error('Error during Judge0 submission preparation:', error);
        if (error instanceof ApiError) {
             throw error; // Re-throw custom API errors
        }
        if (error.response && error.response.status === 429) {
            throw new ApiError(429, 'Too many submissions. Please try again in a moment.');
        }
        throw new ApiError(500, 'Failed to submit code for judging. Internal server error.');
    }
});




const decodeBase64 = (encodedString) => {
    if (!encodedString) return null;
    try {
        return Buffer.from(encodedString, 'base64').toString('utf8');
    } catch (e) {
        console.error("Error decoding base64 string:", e);
        return null; // Or return the raw string if decoding fails
    }
};


const getSubmissionDetails = asyncHandler(async (req, res) => {
    const { submissionId } = req.params;
    const userId = req.user._id;

    let submission = await Submission.findOne({ _id: submissionId, userId: userId }).populate('problemId');
    if (!submission) {
        throw new ApiError(404, 'Submission not found or you do not have access to it.');
    }

    if (submission.status === 'Pending' || submission.status === 'Processing') {
        let allTestCasesStillProcessing = false;
        let overallVerdict = 'Accepted';
        let totalExecutionTime = 0;
        let maxMemoryUsed = 0;
        let compileErrorOutput = null;
        let runtimeErrorOutput = null;

        const updatedJudge0Submissions = [];
        // finalTestCaseResults will be built after all Judge0 polls
        const finalTestCaseResults = [];


        for (const j0Sub of submission.judge0Submissions) {
            if (j0Sub.status === 'Processing' || j0Sub.status === 'Pending') {
                const judge0Result = await getSubmissionStatus(j0Sub.token);
                const { status, stdout, stderr, compile_output, time, memory } = judge0Result;
                const statusDescription = status.description;

                // --- NEW: Decode base64 outputs ---
                j0Sub.status = statusDescription;
                j0Sub.stdout = decodeBase64(stdout); // Decode stdout
                j0Sub.stderr = decodeBase64(stderr); // Decode stderr
                j0Sub.compile_output = decodeBase64(compile_output); // Decode compile_output
                j0Sub.time = time;
                j0Sub.memory = memory;

                if (statusDescription === 'Processing' || statusDescription === 'Pending') {
                    allTestCasesStillProcessing = true;
                }
            }
            updatedJudge0Submissions.push(j0Sub);
        }

        // Aggregate overall submission status and results *after* polling all
        for (const j0Sub of updatedJudge0Submissions) {
            const statusDescription = j0Sub.status;
            const problemTestCase = submission.problemId.testCases.find(tc => tc._id.equals(j0Sub.testCaseId));

            let tcStatus = 'Failed';
            let tcMessage = 'Error';

            if (statusDescription === 'Accepted') {
                tcStatus = 'Passed';
                tcMessage = 'Passed';
                totalExecutionTime += j0Sub.time || 0;
                maxMemoryUsed = Math.max(maxMemoryUsed, j0Sub.memory || 0);
            } else {
                if (overallVerdict === 'Accepted') {
                    overallVerdict = statusDescription;
                }

                tcStatus = 'Failed';

                if (statusDescription === 'Compilation Error') {
                    tcMessage = 'Compilation Error';
                    compileErrorOutput = j0Sub.compile_output;
                    overallVerdict = 'Compilation Error';
                } else if (statusDescription === 'Runtime Error') {
                    tcMessage = 'Runtime Error';
                    runtimeErrorOutput = j0Sub.stderr;
                    if (overallVerdict !== 'Compilation Error') overallVerdict = 'Runtime Error';
                } else if (statusDescription === 'Wrong Answer') {
                    tcMessage = 'Wrong Answer';
                    if (overallVerdict !== 'Compilation Error' && overallVerdict !== 'Runtime Error') overallVerdict = 'Wrong Answer';
                } else if (statusDescription === 'Time Limit Exceeded') {
                    tcMessage = 'Time Limit Exceeded';
                    if (overallVerdict !== 'Compilation Error' && overallVerdict !== 'Runtime Error' && overallVerdict !== 'Wrong Answer') overallVerdict = 'Time Limit Exceeded';
                } else if (statusDescription === 'Memory Limit Exceeded') {
                    tcMessage = 'Memory Limit Exceeded';
                    if (overallVerdict !== 'Compilation Error' && overallVerdict !== 'Runtime Error' && overallVerdict !== 'Wrong Answer' && overallVerdict !== 'Time Limit Exceeded') overallVerdict = 'Memory Limit Exceeded';
                } else {
                    tcMessage = statusDescription;
                    if (overallVerdict !== 'Compilation Error' && overallVerdict !== 'Runtime Error' && overallVerdict !== 'Wrong Answer' && overallVerdict !== 'Time Limit Exceeded' && overallVerdict !== 'Memory Limit Exceeded') overallVerdict = 'Internal Error';
                }
            }

            finalTestCaseResults.push({
                testCaseId: j0Sub.testCaseId,
                input: problemTestCase ? problemTestCase.input : 'N/A',
                expectedOutput: problemTestCase ? problemTestCase.expectedOutput : 'N/A',
                actualOutput: j0Sub.stdout, // This will now be the decoded string
                status: tcStatus,
                message: tcMessage
            });
        }

        if (allTestCasesStillProcessing) {
            submission.status = 'Processing';
        } else if (overallVerdict === 'Accepted' && updatedJudge0Submissions.length > 0) {
            submission.status = 'Accepted';
        } else {
            submission.status = overallVerdict;
        }

        submission.executionTime = totalExecutionTime;
        submission.memoryUsed = maxMemoryUsed;
        submission.compileOutput = compileErrorOutput;
        submission.stderr = runtimeErrorOutput;
        submission.testCaseResults = finalTestCaseResults;
        submission.judge0Submissions = updatedJudge0Submissions;

        await submission.save();
    }

    return res.status(200).json(new ApiResponse(200, submission, "Submission details fetched successfully."));

});





const getLatestSubmissionsForUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "User not authenticated.");
    }

    // --- Start: Fetch Submissions Logic (Existing) ---
    const submissions = await Submission.find({ userId: userId })
        .sort({ submittedAt: -1 })
        .populate('problemId', 'title difficulty');

    const formattedSubmissions = submissions.map(sub => ({
        _id: sub._id,
        problemTitle: sub.problemId ? sub.problemId.title : 'Unknown Problem',
        problemDifficulty: sub.problemId ? sub.problemId.difficulty : 'N/A',
        problemId: sub.problemId ? sub.problemId._id : "Unknown ID",
        status: sub.status,
        language: sub.language,
        submittedAt: sub.submittedAt,
        code: sub.code,
    }));
    // --- End: Fetch Submissions Logic ---

    // --- Start: Fetch Problem Stats Logic (Existing) ---
    const totalProblems = await Problem.countDocuments();

    const solvedProblemIds = await Submission.distinct('problemId', {
        userId: userId,
        status: 'Accepted' // Assuming 'Accepted' is the status for a successful solution
    });
    const solvedProblemsCount = solvedProblemIds.length;

    const solvedPercentage = totalProblems > 0 ? (solvedProblemsCount / totalProblems) * 100 : 0;

    const problemStats = {
        totalProblems,
        solvedProblems: solvedProblemsCount,
        solvedPercentage: solvedPercentage.toFixed(2) // Format to 2 decimal places
    };
    // --- End: Fetch Problem Stats Logic ---

    // --- Start: Fetch Submission Map (Activity) Logic (NEW) ---
    const now = new Date();
    // Default to last 365 days for the activity map
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

    const submissionMapActivity = await Submission.aggregate([
        {
            $match: {
                userId: userId,
                submittedAt: {
                    $gte: oneYearAgo,
                    $lte: now // Ensure we're within the last year up to now
                },
                status: { $ne: 'Pending' } // Exclude pending submissions from activity count
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$submittedAt" }
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 } // Sort by date ascending
        },
        {
            $project: {
                _id: 0,
                date: "$_id",
                count: 1
            }
        }
    ]);
    // --- End: Fetch Submission Map (Activity) Logic ---

    // Combine all data into a single response object
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    submissions: formattedSubmissions,
                    problemStats: problemStats,
                    submissionMapActivity: submissionMapActivity // <--- NEW: Include submission map data
                },
                "User profile data (submissions, problem stats, activity map) fetched successfully."
            )
        );
});










export {
    createSubmission,
    getSubmissionDetails,
    getLatestSubmissionsForUser,
};