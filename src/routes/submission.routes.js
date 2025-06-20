// routes/submissionRoutes.js
import express from 'express';
import { verfiyJWT } from "../middlewares/auth.middleware.js"; // Your auth middleware
import {
    createSubmission,
    getLatestSubmissionsForUser,
    getSubmissionDetails // Make sure to import getSubmissionDetails
} from '../controllers/submission.controller.js'; // Adjust the path if controllers are in a different file

const router = express.Router();

// --- IMPORTANT: Place the more specific static path FIRST ---

// Route 1: Get all latest submissions AND problem stats for the current user
// This route is specifically '/user-submissions'.
router.get('/user-submissions', verfiyJWT, getLatestSubmissionsForUser);


// --- Then place the less specific (parameterized) GET route ---

// Route 2: Get a single submission by its ID
// This route uses a parameter ':submissionId'. If it was placed before '/user-submissions',
// it would incorrectly try to interpret 'user-submissions' as an ID.
router.get('/:submissionId', verfiyJWT, getSubmissionDetails); // Correctly calls getSubmissionDetails


// --- POST routes generally don't conflict with GET routes due to method difference ---

// Route 3: Handle Code Submission (POST /api/submissions/:problemId)
router.post('/:problemId', verfiyJWT, createSubmission);


export default router;