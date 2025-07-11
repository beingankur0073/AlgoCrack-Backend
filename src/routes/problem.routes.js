// routes/problem.routes.js
import express from 'express';
import { addProblem, getAllProblems, getProblemById } from '../controllers/problems.controller.js';
import { isAdmin, verfiyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// GET /api/v1/problems => Get all problems
router.get('/', getAllProblems);

router.get('/details', getProblemById);
router.route("/add").post(verfiyJWT, isAdmin, addProblem); 

export default router;
