// src/routes/question.routes.js
import { Router } from "express";
import {
    createQuestion,
    getQuestionsByTopic,
    submitQuiz
} from "../controllers/question.controller.js";
import { verfiyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Routes for administrators to add questions
router.route("/").post(verfiyJWT, isAdmin, createQuestion);

// Route for users to get questions for a topic
router.route("/topic/:topicName").get(verfiyJWT, getQuestionsByTopic);

// Route for users to submit quiz answers and get a score
router.route("/submit-quiz").post(verfiyJWT, submitQuiz);

export default router;