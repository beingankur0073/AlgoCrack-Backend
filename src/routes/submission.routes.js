// routes/submissionRoutes.js
import express from 'express';
import mongoose from 'mongoose'; // Still needed for new mongoose.Types.ObjectId() in dummy auth
import Problem from '../models/problem.models.js';
import Submission from '../models/submission.models.js';
import { submitCode, getSubmissionStatus, LANGUAGE_IDS } from '../services/judge0Service.js';
import { verfiyJWT } from "../middlewares/auth.middleware.js"; // <--- IMPORT YOUR AUTH MIDDLEWARE

const router = express.Router();

// --- Route 1: Handle Code Submission ---
// POST /api/submissions/:problemId
// This route will now require a valid JWT token
router.post('/:problemId', verfiyJWT, async (req, res) => { // <--- USE verfiyJWT HERE
    const { problemId } = req.params;
    const { code, language } = req.body;
    // Assuming verfiyJWT middleware attaches user info (e.g., user ID) to req.user
    // Make sure your verfiyJWT middleware populates req.user with the user's ID.
    // For example: req.user = { _id: userFromDb._id, ... };
    const userId = req.user._id; // <--- ACCESS USER ID FROM req.user (adjust based on your middleware)

    if (!code || !language) {
        return res.status(400).json({ message: 'Code and language are required.' });
    }
    if (!LANGUAGE_IDS[language.toLowerCase()]) {
        return res.status(400).json({ message: `Unsupported language: ${language}. Supported languages are: ${Object.keys(LANGUAGE_IDS).join(', ')}` });
    }

    try {
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found.' });
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

        for (const testCase of problem.testCases) {
            const judge0Response = await submitCode(
                code,
                language,
                testCase.input,
                testCase.expectedOutput
            );
            newSubmission.judge0Submissions.push({
                token: judge0Response.token,
                testCaseId: testCase._id,
                status: 'Processing'
            });
        }

        await newSubmission.save();

        res.status(202).json({
            message: 'Code submitted. Judging in progress...',
            submissionId: newSubmission._id
        });

    } catch (error) {
        console.error('Error in code submission route:', error);
        if (error.response && error.response.status === 429) {
            return res.status(429).json({ message: 'Too many submissions. Please try again in a moment.' });
        }
        res.status(500).json({ message: 'Internal server error during submission.' });
    }
});






// --- Route 2: Get Submission Details and Poll Judge0 for Status ---
// GET /api/submissions/:submissionId
// This route will also require a valid JWT token
router.get('/:submissionId', verfiyJWT, async (req, res) => { // <--- USE verfiyJWT HERE
    console.log("hello")
    const { submissionId } = req.params;
    const userId = req.user._id; // <--- ACCESS USER ID FOR AUTHORIZATION

    try {
        // Find the submission and ensure it belongs to the authenticated user
        let submission = await Submission.findOne({ _id: submissionId, userId: userId }).populate('problemId');
        if (!submission) {
            // Return 404 if not found, or 403 if found but doesn't belong to user
            return res.status(404).json({ message: 'Submission not found or you do not have access to it.' });
        }

        if (submission.status === 'Pending' || submission.status === 'Processing') {
            let allTestCasesPassed = true;
            let overallVerdict = 'Accepted';
            let totalExecutionTime = 0;
            let maxMemoryUsed = 0;
            let compileErrorOutput = null;
            let runtimeErrorOutput = null;

            const updatedJudge0Submissions = [];
            const finalTestCaseResults = [];

            for (const j0Sub of submission.judge0Submissions) {
                if (j0Sub.status === 'Processing' || j0Sub.status === 'Pending') {
                    const judge0Result = await getSubmissionStatus(j0Sub.token);
                    const { status, stdout, stderr, compile_output, time, memory } = judge0Result;
                    const statusDescription = status.description;

                    j0Sub.status = statusDescription;
                    j0Sub.stdout = stdout;
                    j0Sub.stderr = stderr;
                    j0Sub.compile_output = compile_output;
                    j0Sub.time = time;
                    j0Sub.memory = memory;
                }
                updatedJudge0Submissions.push(j0Sub);
            }

            for (const j0Sub of updatedJudge0Submissions) {
                const statusDescription = j0Sub.status;
                // Assuming problemId is populated and has testCases array
                const problemTestCase = submission.problemId.testCases.find(tc => tc._id.equals(j0Sub.testCaseId));

                let tcStatus = 'Failed';
                let tcMessage = 'Error';

                if (statusDescription === 'Accepted') {
                    tcStatus = 'Passed';
                    tcMessage = 'Passed';
                    totalExecutionTime += j0Sub.time || 0;
                    maxMemoryUsed = Math.max(maxMemoryUsed, j0Sub.memory || 0);
                } else {
                    allTestCasesPassed = false;
                    tcStatus = 'Failed';

                    if (statusDescription === 'Compilation Error') {
                        tcMessage = 'Compilation Error';
                        compileErrorOutput = j0Sub.compile_output;
                        if (overallVerdict !== 'Compilation Error') overallVerdict = 'Compilation Error';
                    } else if (statusDescription === 'Runtime Error') {
                        tcMessage = 'Runtime Error';
                        runtimeErrorOutput = j0Sub.stderr;
                        if (overallVerdict !== 'Compilation Error') overallVerdict = 'Runtime Error';
                    } else if (statusDescription === 'Wrong Answer') {
                        tcMessage = 'Wrong Answer';
                        if (overallVerdict === 'Accepted' || overallVerdict === 'Processing' || overallVerdict === 'Pending') overallVerdict = 'Wrong Answer';
                    } else if (statusDescription === 'Time Limit Exceeded') {
                        tcMessage = 'Time Limit Exceeded';
                        if (overallVerdict === 'Accepted' || overallVerdict === 'Processing' || overallVerdict === 'Pending' || overallVerdict === 'Wrong Answer') overallVerdict = 'Time Limit Exceeded';
                    } else if (statusDescription === 'Memory Limit Exceeded') {
                        tcMessage = 'Memory Limit Exceeded';
                         if (overallVerdict === 'Accepted' || overallVerdict === 'Processing' || overallVerdict === 'Pending' || overallVerdict === 'Wrong Answer' || overallVerdict === 'Time Limit Exceeded') overallVerdict = 'Memory Limit Exceeded';
                    } else {
                        tcMessage = statusDescription;
                        if (overallVerdict === 'Accepted' || overallVerdict === 'Processing' || overallVerdict === 'Pending') overallVerdict = 'Internal Error';
                    }
                }

                finalTestCaseResults.push({
                    testCaseId: j0Sub.testCaseId,
                    input: problemTestCase ? problemTestCase.input : 'N/A',
                    expectedOutput: problemTestCase ? problemTestCase.expectedOutput : 'N/A',
                    actualOutput: j0Sub.stdout,
                    status: tcStatus,
                    message: tcMessage
                });
            }

            if (allTestCasesPassed) {
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

        res.status(200).json(submission);

    } catch (error) {
        console.error('Error fetching submission details or polling Judge0:', error);
        res.status(500).json({ message: 'Internal server error while fetching submission details.' });
    }
});

export default router;