// src/controllers/submission.controller.js

import Problem from '../models/problem.models.js'; // Assuming problem.models.js
import Submission from '../models/submission.models.js'; // Assuming submission.models.js

import { ApiError } from "../utils/ApiErrors.js"; // Your custom error handler
import { ApiResponse } from "../utils/ApiResponse.js"; // Your custom API response formatter
import { asyncHandler } from "../utils/asyncHandler.js"; // Your async error wrapper
import {
    submitCode,
    getSubmissionStatus,
    createJudge0WrapperCode,
    decodeBase64,
    LANGUAGE_IDS // Import LANGUAGE_IDS from the service file
} from '../services/judge0Service.js';



// Define JUDGE0_STATUS_CODES here
const JUDGE0_STATUS_CODES = {
    IN_QUEUE: 1,
    PROCESSING: 2,
    ACCEPTED: 3,
    WRONG_ANSWER: 4,
    TIME_LIMIT_EXCEEDED: 5,
    COMPILATION_ERROR: 6,
    RUNTIME_ERROR_SIGSEGV: 7,
    RUNTIME_ERROR_SIGXFSZ: 8,
    RUNTIME_ERROR_SIGFPE: 9,
    RUNTIME_ERROR_SIGABRT: 10,
    RUNTIME_ERROR_NZEC: 11,
    RUNTIME_ERROR_OTHER: 12,
    INTERNAL_ERROR: 13,
    EXEC_FORMAT_ERROR: 14,
};

// You might still keep JUDGE0_STATUS_DESCRIPTIONS for clarity if you prefer,
// but you can also directly use j0Sub.status for string comparison
const JUDGE0_STATUS_DESCRIPTIONS = {
    1: 'In Queue',
    2: 'Processing',
    3: 'Accepted',
    4: 'Wrong Answer',
    5: 'Time Limit Exceeded',
    6: 'Compilation Error',
    7: 'Runtime Error (SIGSEGV)',
    8: 'Runtime Error (SIGXFSZ)',
    9: 'Runtime Error (SIGFPE)',
    10: 'Runtime Error (SIGABRT)',
    11: 'Runtime Error (NZEC)',
    12: 'Runtime Error (Other)',
    13: 'Internal Error',
    14: 'Exec Format Error',
};


/**
 * Helper function to format input for C++ Codeforces-style problems.
 * This assumes testCaseInput is an object like { n: 4 } and problem format is a single number.
 * You'll need to expand this for more complex C++ inputs (arrays, multiple lines, etc.).
 * @param {object} testCaseInput - The structured input object from the problem's test case.
 * @param {string} language - The language name (e.g., 'cpp').
 * @returns {string} The raw string to be sent as stdin to Judge0.
 */
// src/controllers/submission.controller.js

// ... (existing imports and other helper functions) ...


const formatStdinForJudge0 = (testCaseInput, language) => {
    // For languages that expect plain string inputs (like C++)
    // We check for the C++ language here
    if (language.toLowerCase() === 'cpp') {
        if (typeof testCaseInput === 'string' || typeof testCaseInput === 'number') {
            // If the input is already a string or number, just return it
            // This is useful for single-value inputs like a number 'n'
            return String(testCaseInput);
        }

        if (typeof testCaseInput === 'object' && testCaseInput !== null) {
            // Handle JSON objects by extracting values and formatting them
            const values = Object.values(testCaseInput);
            
            // For a single value like {"x": 123}, return just the value
            if (values.length === 1) {
                // Ensure the value is converted to a string with a newline for standard input
                return `${values[0]}\n`;
            }
            
            // For multiple values in an object, join them with newlines
            // This is a common format for problems with multiple parameters
            // e.g., {"arr": [1, 2, 3], "target": 4}
            const formattedValues = values.map(value => {
                if (Array.isArray(value)) {
                    // If a value is an array, format it for Judge0
                    // Common format: size\nelements separated by spaces
                    return `${value.length}\n${value.join(' ')}`;
                }
                return String(value);
            });

            return formattedValues.join('\n') + '\n';
        }

        // If the input is an array, format it appropriately
        if (Array.isArray(testCaseInput)) {
            const formattedArray = testCaseInput.map(item => {
                if (Array.isArray(item)) {
                    return item.join(' ');
                }
                return String(item);
            }).join('\n');
            return formattedArray + '\n';
        }
    }

    // For other languages that use a wrapper and expect JSON strings (like Python or JS)
    return JSON.stringify(testCaseInput);
};

/**
 * Helper function to format expected output for C++ Codeforces-style problems.
 * This assumes expectedOutput is a numerical result (e.g., 5) and the C++ output format is known.
 * @param {object} testCaseInput - The original structured input for context (e.g., { n: 4 }).
 * @param {*} expectedNumericalOutput - The raw expected result (e.g., 5).
 * @param {string} language - The language name (e.g., 'cpp').
 * @returns {string} The raw string that Judge0 should compare against.
 */
const formatExpectedOutputForJudge0 = (testCaseInput, expectedNumericalOutput, language) => {
    if (language.toLowerCase() === 'cpp') {
        // For the climbStairs example, the expected C++ output is:
        // "Number of distinct ways to climb 4 stairs: 5\n"
        // We need to construct this exact string.
      
        return `${expectedNumericalOutput}\n`;
        // Adapt this for other C++ problems based on their specific cout format.
        // If the C++ problem only outputs the result (e.g., just "5\n"), then:
        // return `${expectedNumericalOutput}\n`;
    }

    // For other languages that use JSON-stringified outputs.
    return JSON.stringify(expectedNumericalOutput);
};


// --- Controller: createSubmission (handles POST /api/submissions/:problemId) ---
const createSubmission = asyncHandler(async (req, res) => {
    const { problemId } = req.params;
    const { code, language } = req.body;
    // Assuming req.user._id is set by an authentication middleware
    const userId = req.user._id;

    if (!code || !language) {
        throw new ApiError(400, "Code and language are required.");
    }
    const lowerCaseLanguage = language.toLowerCase();
    if (!LANGUAGE_IDS[lowerCaseLanguage]) {
        throw new ApiError(400, `Unsupported language: ${language}. Supported languages are: ${Object.keys(LANGUAGE_IDS).join(', ')}`);
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
        throw new ApiError(404, "Problem not found.");
    }

    // Initialize a new submission record in your database
    const newSubmission = new Submission({
        userId,
        problemId,
        code,
        language,
        status: 'Pending',
        submittedAt: new Date(),
        judge0Submissions: [] // This array will store Judge0 tokens and initial status for each test case
    });

    try {
        // Iterate through each test case defined in the problem
        for (const testCase of problem.testCases) {
            // For C++, the problem's `functionSignatures` and `testCase.input` are now
            // just metadata for formatting, not directly used by the C++ wrapper.
            // The `createJudge0WrapperCode` handles passing raw user code for C++.

            // Determine if the language uses full program submission or a wrapper
            const isFullProgramSubmission = (lowerCaseLanguage === 'cpp'); // Add other languages here if they become full program submission

            // Generate the complete source code (with wrapper for some langs, or just user code for others)
            const fullSourceCode = createJudge0WrapperCode(
                code,
                language, // Pass human-readable language name
                problem.functionSignatures, // Pass the problem's full function signature info (used by wrapper-based langs)
                testCase.input // Pass the specific input for this test case (used by wrapper-based langs)
            );

            // --- IMPORTANT CHANGE HERE ---
            // Format stdin and expected_output based on language type
            const stdinForJudge0 = formatStdinForJudge0(testCase.input, language);
            console.log(stdinForJudge0)
            
            const expectedOutputForJudge0 = formatExpectedOutputForJudge0(
                testCase.input, // Pass full input for context
                testCase.expectedOutput, // Assuming this holds the *numerical* expected result for C++
                language
            );
            // --- END IMPORTANT CHANGE ---


            // Submit the (potentially wrapped) code to Judge0 for this specific test case
            const judge0Response = await submitCode(
                fullSourceCode,
                language,
                stdinForJudge0,
                expectedOutputForJudge0,
                problem.timeLimit, // Use problem-specific limits
                problem.memoryLimit * 1024 // Judge0 expects memory in KB, convert MB to KB
            );

            // Store the Judge0 token and the associated testCaseId in your submission record
            newSubmission.judge0Submissions.push({
                token: judge0Response.token,
                testCaseId: testCase._id, // Store Mongoose ObjectId of the test case
                isSample: testCase.isSample, // Mark if it's a sample test case
                status: 'Processing' // Initial status from your system's perspective
            });
        }

        // Save the submission record with Judge0 tokens
        await newSubmission.save();

        // Respond immediately, letting the client know the submission is being judged.
        // The client will then poll getSubmissionDetails for results.
        res.status(202).json(
            new ApiResponse(202, { submissionId: newSubmission._id }, "Code submitted for judging. Please check status shortly.")
        );

    } catch (error) {
        console.error('Error during Judge0 submission creation:', error);
        // Re-throw custom API errors to be caught by a global error handler
        if (error instanceof ApiError) {
            throw error;
        }
        // Handle Judge0 specific errors
        if (error.message && error.message.includes('Judge0')) {
            throw new ApiError(503, 'Judging service unavailable. Please try again later.');
        }
        // General server error
        throw new ApiError(500, 'Failed to submit code for judging. Internal server error.');
    }
});


// --- Controller: getSubmissionDetails (handles GET /api/submissions/:submissionId) ---
const getSubmissionDetails = asyncHandler(async (req, res) => {
    const { submissionId } = req.params;
    const userId = req.user._id;

    // Find the submission and populate the problem details to access test cases
    let submission = await Submission.findOne({ _id: submissionId, userId: userId }).populate('problemId');
    if (!submission) {
        throw new ApiError(404, 'Submission not found or you do not have access to it.');
    }

    // Only proceed to poll Judge0 if the submission is still in a pending/processing state
    // This prevents unnecessary Judge0 API calls for already-judged submissions
    if (submission.status === 'Pending' || submission.status === 'Processing') {
        let allTestCasesStillProcessing = false;
        let overallVerdict = 'Accepted'; // Start with optimistic assumption
        let totalExecutionTime = 0;
        let maxMemoryUsed = 0;
        let compileErrorOutput = null; // To store compile error for display
        let runtimeErrorOutput = null; // To store runtime error for display

        // We will build this array for final saving to `submission.testCaseResults`
        const finalTestCaseResults = [];

        // Loop through each Judge0 submission token associated with this submission
        for (const j0Sub of submission.judge0Submissions) {
            // Only poll Judge0 if this specific test case hasn't been fully processed yet
            if (j0Sub.status === 'Processing' || j0Sub.status === 'In Queue') {
                const judge0Result = await getSubmissionStatus(j0Sub.token); // Poll Judge0 for status
                const judge0StatusId = judge0Result.status.id;
                const judge0StatusDescription = judge0Result.status.description;

                // Update the Judge0 specific submission details in our record
                j0Sub.status = judge0StatusDescription; // Update status
                j0Sub.stdout = decodeBase64(judge0Result.stdout); // Decode and store stdout
                j0Sub.stderr = decodeBase64(judge0Result.stderr); // Decode and store stderr
                j0Sub.compile_output = decodeBase64(judge0Result.compile_output); // Decode and store compile output
                j0Sub.time = judge0Result.time;
                j0Sub.memory = judge0Result.memory;

                if (judge0StatusId === JUDGE0_STATUS_CODES.PROCESSING || judge0StatusId === JUDGE0_STATUS_CODES.IN_QUEUE) {
                    allTestCasesStillProcessing = true;
                }
            }
            // (No need to push to `updatedJudge0Submissions` anymore as we're modifying `j0Sub` directly)
        }

        // After all Judge0 polls for this request are done, aggregate results
        for (const j0Sub of submission.judge0Submissions) { // Iterate through the now updated j0Submissions
            const problemTestCase = submission.problemId.testCases.find(tc => tc._id.equals(j0Sub.testCaseId));

            let tcStatus = 'Failed'; // Default for individual test case
            let tcMessage = 'Error'; // Default message

            // Process based on Judge0's final status for this test case
            if (j0Sub.status === JUDGE0_STATUS_DESCRIPTIONS[JUDGE0_STATUS_CODES.ACCEPTED]) {
                // Determine if this is a "full program submission" language (like C++)
                const isFullProgramSubmission = (submission.language.toLowerCase() === 'cpp');

                let actualOutputToCompare = j0Sub.stdout;
                let expectedOutputToCompare;

                // Re-generate expected output string for comparison if it's a full program submission
                if (isFullProgramSubmission) {
                    // This re-generates the *exact* string the user's C++ code is expected to print.
                    // This relies on `problemTestCase.input` and `problemTestCase.expectedOutput`
                    // holding the raw numerical values for the C++ scenario.
                    expectedOutputToCompare = formatExpectedOutputForJudge0(
                        problemTestCase.input,
                        problemTestCase.expectedOutput, // Assuming this is the raw numerical result
                        submission.language
                    );
                    // For C++, actualOutputToCompare (j0Sub.stdout) is already the raw string.
                } else {
                    // For languages using wrappers, actualOutput is JSON string, expectedOutput is structured JSON
                    try {
                        // Attempt to parse actual output if it's JSON (array or object)
                        if (actualOutputToCompare && (actualOutputToCompare.startsWith('[') || actualOutputToCompare.startsWith('{'))) {
                            actualOutputToCompare = JSON.parse(actualOutputToCompare);
                        }
                    } catch (e) {
                        console.warn(`Could not parse stdout as JSON for testCaseId ${j0Sub.testCaseId}: ${e.message}`);
                        // If parsing fails, actualOutputToCompare remains the raw string.
                        // Comparison below will still work but might result in WA if structure is expected.
                    }
                    expectedOutputToCompare = problemTestCase.expectedOutput; // Already structured
                }


                // Compare the actual output with the problem's expected output
                // Use JSON.stringify for robust comparison of arrays/objects (if applicable)
                // For C++, both will be raw strings so direct comparison works fine.
                if (JSON.stringify(actualOutputToCompare) === JSON.stringify(expectedOutputToCompare)) {
                    tcStatus = 'Passed';
                    tcMessage = 'Passed';
                    totalExecutionTime += j0Sub.time || 0;
                    maxMemoryUsed = Math.max(maxMemoryUsed, j0Sub.memory || 0);
                } else {
                    tcStatus = 'Failed';
                    tcMessage = 'Wrong Answer';
                    // Downgrade overall verdict if this is a "worse" error
                    if (overallVerdict === 'Accepted') {
                        overallVerdict = 'Wrong Answer';
                    }
                }
            } else {
                // Handle non-Accepted statuses and update overallVerdict
                tcStatus = 'Failed'; // Mark individual test case as failed

                if (j0Sub.status === JUDGE0_STATUS_DESCRIPTIONS[JUDGE0_STATUS_CODES.COMPILATION_ERROR]) {
                    tcMessage = 'Compilation Error';
                    compileErrorOutput = j0Sub.compile_output;
                    overallVerdict = 'Compilation Error'; // Compilation error takes precedence
                } else if (j0Sub.status.includes('Runtime Error')) { // Catches various runtime errors
                    tcMessage = 'Runtime Error';
                    runtimeErrorOutput = j0Sub.stderr || j0Sub.stdout; // Stderr is primary, stdout can also contain errors
                    if (overallVerdict !== 'Compilation Error') overallVerdict = 'Runtime Error';
                } else if (j0Sub.status === JUDGE0_STATUS_DESCRIPTIONS[JUDGE0_STATUS_CODES.TIME_LIMIT_EXCEEDED]) {
                    tcMessage = 'Time Limit Exceeded';
                    if (overallVerdict !== 'Compilation Error' && overallVerdict !== 'Runtime Error') overallVerdict = 'Time Limit Exceeded';
                } else if (j0Sub.status === JUDGE0_STATUS_DESCRIPTIONS[JUDGE0_STATUS_CODES.MEMORY_LIMIT_EXCEEDED]) {
                    tcMessage = 'Memory Limit Exceeded';
                    if (overallVerdict !== 'Compilation Error' && overallVerdict !== 'Runtime Error' && overallVerdict !== 'Time Limit Exceeded') overallVerdict = 'Memory Limit Exceeded';
                } else if (j0Sub.status === JUDGE0_STATUS_DESCRIPTIONS[JUDGE0_STATUS_CODES.WRONG_ANSWER]) {
                    tcMessage = 'Wrong Answer';
                    if (overallVerdict !== 'Compilation Error' && overallVerdict !== 'Runtime Error' && overallVerdict !== 'Time Limit Exceeded' && overallVerdict !== 'Memory Limit Exceeded') overallVerdict = 'Wrong Answer';
                }
                else {
                    tcMessage = j0Sub.status; // Use Judge0's exact description if not explicitly mapped
                    if (overallVerdict === 'Accepted') overallVerdict = 'Error'; // Generic error
                }
            }

            // Populate the final `testCaseResults` array for the submission document
            finalTestCaseResults.push({
                testCaseId: j0Sub.testCaseId,
                isSample: j0Sub.isSample, // Include if it's a sample test case
                input: problemTestCase ? problemTestCase.input : 'N/A', // Original input from problem
                expectedOutput: problemTestCase ? problemTestCase.expectedOutput : 'N/A', // Original expected output from problem (structured)
                actualOutput: j0Sub.stdout, // Decoded stdout from Judge0 (raw string)
                status: tcStatus, // 'Passed' or 'Failed'
                message: tcMessage, // Specific verdict message for this test case
                time: j0Sub.time,
                memory: j0Sub.memory
            });
        }

        // Set the overall submission status based on all test cases
        if (allTestCasesStillProcessing) {
            submission.status = 'Processing';
        } else if (overallVerdict === 'Accepted' && submission.judge0Submissions.length > 0) {
            submission.status = 'Accepted';
        } else {
            submission.status = overallVerdict;
        }

        // Update overall metrics and error outputs on the submission document
        submission.executionTime = totalExecutionTime;
        submission.memoryUsed = maxMemoryUsed;
        submission.compileOutput = compileErrorOutput;
        submission.stderr = runtimeErrorOutput;
        submission.testCaseResults = finalTestCaseResults;
        // The `submission.judge0Submissions` array is already updated in place

        await submission.save(); // Save the updated submission record
    }

    // Return the (potentially updated) submission object to the client
    return res.status(200).json(new ApiResponse(200, submission, "Submission details fetched successfully."));
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