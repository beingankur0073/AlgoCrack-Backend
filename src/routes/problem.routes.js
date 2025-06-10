// routes/problem.routes.js
import express from 'express';
import { getAllProblems, getProblemById } from '../controllers/problems.controller.js';

const router = express.Router();

// GET /api/v1/problems => Get all problems
router.get('/', getAllProblems);

router.get('/details', getProblemById);

export default router;
