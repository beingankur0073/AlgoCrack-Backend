// routes/problem.routes.js
import express from 'express';
import { addProblem, deleteProblemById, getAllProblems, getProblemById } from '../controllers/problems.controller.js';
import { isAdmin, verfiyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// GET /api/v1/problems => Get all problems
router.get('/', getAllProblems);

router.get('/details', getProblemById);
router.post("/add",verfiyJWT, isAdmin, addProblem); 
router.delete("/:problemId",verfiyJWT, isAdmin, deleteProblemById);

export default router;
