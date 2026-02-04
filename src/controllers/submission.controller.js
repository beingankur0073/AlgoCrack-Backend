import Problem from '../models/problem.models.js';
import Submission from '../models/submission.models.js';
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    submitCode,
    getSubmissionStatus,
    createJudge0WrapperCode, // This now simply returns code as-is
    decodeBase64,
    LANGUAGE_IDS
} from '../services/judge0Service.js';

// Status mappings
const JUDGE0_STATUS_CODES = {
    ACCEPTED: 3,
    COMPILATION_ERROR: 6,
    RUNTIME_ERROR_SIGSEGV: 7,
};

const JUDGE0_STATUS_DESCRIPTIONS = {
    3: 'Accepted',
    4: 'Wrong Answer',
    5: 'Time Limit Exceeded',
    6: 'Compilation Error',
    // ... maps to other codes as needed
};

// --- Controller: createSubmission ---
const createSubmission = asyncHandler(async (req, res) => {
    const { problemId } = req.params;
    const { code, language } = req.body;
    const userId = req.user._id;

    if (!code || !language) throw new ApiError(400, "Code and language are required.");

    // Validate Language
    if (!LANGUAGE_IDS[language.toLowerCase()]) {
        throw new ApiError(400, `Unsupported language: ${language}`);
    }

    const problem = await Problem.findById(problemId);
    if (!problem) throw new ApiError(404, "Problem not found.");

    // 1. Create Initial Submission Record
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
        // 2. Loop through Test Cases & Submit to Judge0
        for (const testCase of problem.testCases) {
            
            // For Standard I/O, we do NOT wrap code. 
            // We pass the user's code exactly as written.
            const fullSourceCode = createJudge0WrapperCode(code); 

            // Input is ALREADY a raw string in the DB (e.g., "5\n1 2 3 4 5")
            // We pass it directly to Judge0's stdin.
            const stdin = testCase.input;
            
            // Expected Output is ALREADY a raw string
            const expectedOutput = testCase.expectedOutput;

            // Submit to Judge0
            const judge0Response = await submitCode(
                fullSourceCode,
                language,
                stdin,
                expectedOutput,
                problem.timeLimit,
                problem.memoryLimit * 1024 // MB to KB
            );

            // Store Token
            newSubmission.judge0Submissions.push({
                token: judge0Response.token,
                testCaseId: testCase._id,
                isSample: testCase.isSample,
                status: 'Processing'
            });
        }

        await newSubmission.save();

        

        res.status(202).json(
            new ApiResponse(202, { submissionId: newSubmission._id }, "Code submitted for judging.")
        );

    } catch (error) {
        console.error('Submission Error:', error);
        throw new ApiError(500, 'Failed to submit code for judging.');
    }
});




// --- Controller: getSubmissionDetails ---
const getSubmissionDetails = asyncHandler(async (req, res) => {
    const { submissionId } = req.params;
    const userId = req.user._id;

    // Fetch submission with problem details to get expected outputs
    const submission = await Submission.findOne({ _id: submissionId, userId }).populate('problemId');
    if (!submission) throw new ApiError(404, 'Submission not found.');

    // Only proceed if submission is not fully complete (Pending/Processing)
    // Or if we want to force a refresh on the specific judge0 tokens
    if (submission.status === 'Pending' || submission.status === 'Processing') {
        
        let allFinished = true;
        let overallVerdict = 'Accepted'; 
        let totalTime = 0;
        let maxMemory = 0;
        let compileErrorOutput = null;
        let runtimeErrorOutput = null;
        const finalTestCaseResults = [];

        // Loop through each test case submission token
        for (const j0Sub of submission.judge0Submissions) {
            
            // 1. POLL JUDGE0 (Only if not already finished)
            // We check if status is 'Processing', 'In Queue', or null
            if (!j0Sub.status || j0Sub.status === 'Processing' || j0Sub.status === 'In Queue') {
                try {
                    const result = await getSubmissionStatus(j0Sub.token);
                    
                    // Update Status Description
                    j0Sub.status = result.status.description;
                    
                    // --- CRITICAL FIX: Decode Base64 Content ---
                    j0Sub.stdout = decodeBase64(result.stdout); 
                    j0Sub.stderr = decodeBase64(result.stderr);
                    j0Sub.compile_output = decodeBase64(result.compile_output);
                    // ------------------------------------------

                    j0Sub.time = result.time;
                    j0Sub.memory = result.memory;

                    // Check if Judge0 is still working on this specific case (IDs 1=In Queue, 2=Processing)
                    if (result.status.id <= 2) {
                        allFinished = false;
                    }
                } catch (err) {
                    console.error(`Failed to poll token ${j0Sub.token}:`, err.message);
                    // Don't crash the whole request, just mark incomplete
                    allFinished = false; 
                }
            }

            // 2. AGGREGATE RESULTS (Compare Output)
            const problemTestCase = submission.problemId.testCases.find(tc => tc._id.equals(j0Sub.testCaseId));
            
            let tcStatus = 'Failed';
            let tcMessage = j0Sub.status;

            // Scenario A: Judge0 says "Accepted" (Exit Code 0)
            if (j0Sub.status === 'Accepted') {
                // Robust String Comparison: Trim whitespace to ignore trailing newlines
                const actual = (j0Sub.stdout || "").trim();
                const expected = (problemTestCase?.expectedOutput || "").trim();

                if (actual === expected) {
                    tcStatus = 'Passed';
                    tcMessage = 'Passed';
                    // Update stats only for passed cases usually, or all non-error cases
                    totalTime = Math.max(totalTime, parseFloat(j0Sub.time || 0));
                    maxMemory = Math.max(maxMemory, j0Sub.memory || 0);
                } else {
                    // Logic Error: Program ran fine, but output is wrong
                    tcStatus = 'Failed';
                    tcMessage = 'Wrong Answer'; 
                    if (overallVerdict === 'Accepted') overallVerdict = 'Wrong Answer';
                }
            } 
            // Scenario B: Judge0 returned an Error (Compilation, Runtime, Time Limit, etc.)
            else {
                // If not waiting/processing, it's a failure
                if (j0Sub.status !== 'In Queue' && j0Sub.status !== 'Processing') {
                    tcStatus = 'Failed';
                    
                    if (j0Sub.status === 'Compilation Error') {
                        compileErrorOutput = j0Sub.compile_output;
                        overallVerdict = 'Compilation Error';
                    } else if (j0Sub.status.includes('Runtime Error')) {
                        runtimeErrorOutput = j0Sub.stderr;
                        if (overallVerdict !== 'Compilation Error') overallVerdict = 'Runtime Error';
                    } else if (j0Sub.status === 'Time Limit Exceeded') {
                        if (overallVerdict === 'Accepted') overallVerdict = 'Time Limit Exceeded';
                    } else if (j0Sub.status === 'Wrong Answer') {
                        if (overallVerdict === 'Accepted') overallVerdict = 'Wrong Answer';
                    } else {
                        // Generic fallback for other errors (Memory Limit, etc.)
                        if (overallVerdict === 'Accepted') overallVerdict = j0Sub.status;
                    }
                }
            }

            // 3. PUSH TO RESULTS ARRAY (For Frontend Display)
            finalTestCaseResults.push({
                testCaseId: j0Sub.testCaseId,
                isSample: j0Sub.isSample,
                input: problemTestCase?.input,
                expectedOutput: problemTestCase?.expectedOutput,
                actualOutput: j0Sub.stdout, // Decoded string
                status: tcStatus,
                message: tcMessage,
                time: j0Sub.time,
                memory: j0Sub.memory
            });
        }

        // 4. UPDATE SUBMISSION RECORD
        if (!allFinished) {
            submission.status = 'Processing';
        } else {
            submission.status = overallVerdict;
        }

        submission.executionTime = totalTime;
        submission.memoryUsed = maxMemory;
        submission.compileOutput = compileErrorOutput;
        submission.stderr = runtimeErrorOutput;
        submission.testCaseResults = finalTestCaseResults;

        // Save changes to MongoDB
        await submission.save();
    }

    return res.status(200).json(new ApiResponse(200, submission, "Details fetched."));
});



const getLatestSubmissionsForUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    // --- 1. Pagination Setup ---
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // --- 2. Fetch Paginated Submissions & Total Count ---
    // We use Promise.all to fetch the data and the total count in parallel
    const [submissions, totalSubmissions] = await Promise.all([
        Submission.find({ userId: userId })
            .sort({ submittedAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('problemId', 'title difficulty'),
        
        Submission.countDocuments({ userId: userId })
    ]);

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

    // --- 3. Fetch Problem Stats Logic (Existing - Unpaginated) ---
    // Note: Stats usually need to calculate based on *all* history, not just the current page.
    const totalProblems = await Problem.countDocuments();

    const solvedProblemIds = await Submission.distinct('problemId', {
        userId: userId,
        status: 'Accepted'
    });
    const solvedProblemsCount = solvedProblemIds.length;

    const solvedPercentage = totalProblems > 0 ? (solvedProblemsCount / totalProblems) * 100 : 0;

    const problemStats = {
        totalProblems,
        solvedProblems: solvedProblemsCount,
        solvedPercentage: solvedPercentage.toFixed(2)
    };
    // --- End: Fetch Problem Stats Logic ---

    // --- 4. Fetch Submission Map (Activity) Logic (Existing - Time-based) ---
    // Note: Heatmaps need data for the full time range (last year), not paginated data.
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

    const submissionMapActivity = await Submission.aggregate([
        {
            $match: {
                userId: userId,
                submittedAt: {
                    $gte: oneYearAgo,
                    $lte: now 
                },
                status: { $ne: 'Pending' }
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
        { $sort: { _id: 1 } },
        {
            $project: {
                _id: 0,
                date: "$_id",
                count: 1
            }
        }
    ]);
    // --- End: Fetch Submission Map Logic ---

    // --- 5. Construct Response ---
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    submissions: formattedSubmissions,
                    pagination: {
                        totalSubmissions,       // Total items in DB
                        totalPages: Math.ceil(totalSubmissions / limit), // Total pages
                        currentPage: page,      // Current page number
                        limit: limit            // Items per page
                    },
                    problemStats: problemStats,
                    submissionMapActivity: submissionMapActivity
                },
                "User profile data fetched successfully."
            )
        );
});


const getLeaderboard = asyncHandler(async (req, res) => {
    try {
        const leaderboard = await Submission.aggregate([
            // Stage 1: Group by userId
            // In this stage, we'll calculate both total submissions and collect unique accepted problem IDs.
            {
                $group: {
                    _id: "$userId", // Group by user ID
                    totalSubmissions: { $sum: 1 }, // Count all submissions for this user
                    // Collect unique problem IDs only if the submission status is 'Accepted'
                    acceptedUniqueProblemIds: {
                        $addToSet: {
                            $cond: [
                                { $eq: ["$status", "Accepted"] }, // If status is 'Accepted'
                                "$problemId",                     // Add problemId to set
                                "$$REMOVE"                        // Else, remove (don't add)
                            ]
                        }
                    }
                }
            },
            // Stage 2: Add a new field 'solvedProblems' by counting the size of the acceptedUniqueProblemIds set
            {
                $addFields: {
                    solvedProblems: { $size: "$acceptedUniqueProblemIds" }
                }
            },
            // Stage 3: Sort the leaderboard
            // Primary sort: by solvedProblems in descending order (more problems solved is better)
            // Secondary sort: by totalSubmissions in ascending order (fewer submissions for the same solved problems is better)
            {
                $sort: {
                    solvedProblems: -1,
                    totalSubmissions: 1
                }
            },
            // Stage 4: Lookup user details from the 'users' collection
            {
                $lookup: {
                    from: "users", // MongoDB collection name for User model (check your actual collection name, it's usually 'users')
                    localField: "_id", // Field from the current pipeline (which is userId)
                    foreignField: "_id", // Field in the 'users' collection
                    as: "user" // The output array field containing the matched user document
                }
            },
            // Stage 5: Deconstruct the 'user' array (since _id is unique, it will have one element)
            {
                $unwind: "$user"
            },
            // Stage 6: Project the desired fields for the final output
            {
                $project: {
                    _id: 0, // Exclude the default _id
                    userId: "$_id", // Rename _id to userId
                    username: "$user.username",
                    avatar: "$user.avatar", // Assuming your User model has an 'avatar' field
                    solvedProblems: "$solvedProblems",
                    totalSubmissions: "$totalSubmissions" // <--- Added this field
                    // Add other user fields if needed, e.g., fullName: "$user.fullName"
                }
            }
        ]);

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    leaderboard
                },
                "Leaderboard fetched successfully"
            )
        );

    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        throw new ApiError(500, "Failed to fetch leaderboard. Internal server error.");
    }
});

export {
    createSubmission,
    getSubmissionDetails,
    getLatestSubmissionsForUser,
    getLeaderboard,
};