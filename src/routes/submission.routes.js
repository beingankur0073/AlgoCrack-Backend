// routes/submissionRoutes.js
import express from 'express';
// import mongoose from 'mongoose'; // No longer needed directly in routes file if controllers handle it
import { verfiyJWT } from "../middlewares/auth.middleware.js"; // Your auth middleware
import { createSubmission, getLatestSubmissionsForUser, getSubmissionDetails } from '../controllers/submission.controller.js'; // Import your new controller functions

const router = express.Router();

router.get('/user-submissions',verfiyJWT, getLatestSubmissionsForUser);


// --- Route 1: Handle Code Submission (POST /api/submissions/:problemId) ---
router.post('/:problemId', verfiyJWT, createSubmission);

// --- Route 2: Get Submission Details and Poll Judge0 for Status (GET /api/submissions/:submissionId) ---
router.get('/:submissionId', verfiyJWT, getSubmissionDetails);

export default router;